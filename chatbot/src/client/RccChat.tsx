import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { useState } from "react";

export function RccChat({ api = "/api/chat" }: { api?: string }) {
  const [input, setInput] = useState("");
  const { messages, sendMessage, status, stop, regenerate, error } = useChat({
    transport: new DefaultChatTransport({ api }),
  });
  const busy = status === "submitted" || status === "streaming";

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const text = input.trim();
    if (!text || busy) return;
    setInput("");
    await sendMessage({ text });
  }

  return (
    <section aria-label="RCC chatbot" className="rcc-chat">
      <div className="rcc-chat__messages" aria-live="polite">
        {messages.length === 0 && (
          <p className="rcc-chat__empty">
            Ask about RCC opportunities, events, values, history, teams, or contacts.
          </p>
        )}

        {messages.map(message => (
          <Message key={message.id} message={message} />
        ))}
      </div>

      {error && (
        <div role="alert" className="rcc-chat__error">
          The chatbot could not complete that request. Please try again.
          <button type="button" onClick={() => void regenerate()}>Retry</button>
        </div>
      )}

      <form onSubmit={submit} className="rcc-chat__form">
        <label htmlFor="rcc-chat-input">Message</label>
        <textarea
          id="rcc-chat-input"
          value={input}
          onChange={event => setInput(event.target.value)}
          placeholder="Ask a question about RCC"
          rows={3}
          disabled={busy}
        />
        <div className="rcc-chat__actions">
          <button type="submit" disabled={!input.trim() || busy}>Send</button>
          {busy && <button type="button" onClick={stop}>Stop</button>}
        </div>
      </form>
    </section>
  );
}

function Message({ message }: { message: UIMessage }) {
  return (
    <article className={`rcc-chat__message rcc-chat__message--${message.role}`}>
      <strong>{message.role === "user" ? "You" : "RCC Chatbot"}</strong>
      {message.parts.map((part, index) => {
        if (part.type === "text") return <p key={`${message.id}-text-${index}`}>{part.text}</p>;
        if (part.type === "source-url") {
          return (
            <p key={`${message.id}-source-${part.sourceId}`} className="rcc-chat__source">
              Source: <a href={part.url} target="_blank" rel="noreferrer">{part.title ?? part.url}</a>
            </p>
          );
        }
        return null;
      })}
    </article>
  );
}
