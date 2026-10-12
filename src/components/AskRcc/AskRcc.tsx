'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowUpIcon, ChevronDownIcon, MicIcon, RotateCcwIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { answerQuestion, PLACEHOLDER_QUESTIONS, SUGGESTIONS, type AskLink } from './answers';

type Message =
  | { id: number; role: 'user'; text: string }
  | { id: number; role: 'assistant'; text: string[]; links?: AskLink[]; shownWords: number; totalWords: number };

// minimal typing for the browser's built-in speech-to-text (not in TypeScript's DOM lib everywhere)
type SpeechRecognitionLike = {
  lang: string;
  interimResults: boolean;
  start: () => void;
  stop: () => void;
  onresult: ((event: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void) | null;
  onend: (() => void) | null;
};
type SpeechRecognitionConstructor = new () => SpeechRecognitionLike;

const THINKING_MS = 650;
const WORD_MS = 28;

/**
 * Floating "Ask RCC" box pinned to the bottom of every page. Collapsed, it types out example questions; focused, it
 * widens and offers suggestions; once you ask something, a glass panel grows up from it with the conversation.
 * Answers come from the site's own info for now (see answers.ts); it's built so an AI backend can replace that.
 */
export default function AskRcc() {
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);
  const nextId = useRef(0);

  const [focused, setFocused] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);
  const [value, setValue] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [busy, setBusy] = useState(false);
  const [listening, setListening] = useState(false);
  const [speechSupported] = useState(
    () =>
      typeof window !== 'undefined' &&
      Boolean(
        (window as unknown as { SpeechRecognition?: unknown; webkitSpeechRecognition?: unknown }).SpeechRecognition ??
          (window as unknown as { webkitSpeechRecognition?: unknown }).webkitSpeechRecognition
      )
  );
  const [typedPlaceholder, setTypedPlaceholder] = useState('');

  const active = focused || panelOpen;
  const hasConversation = messages.length > 0;

  // typewriter placeholder while collapsed: type a question, pause, erase, move to the next one
  useEffect(() => {
    if (active) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const timer = window.setTimeout(() => setTypedPlaceholder(PLACEHOLDER_QUESTIONS[0]), 0);
      return () => window.clearTimeout(timer);
    }
    let question = 0;
    let length = 0;
    let deleting = false;
    let timer = 0;
    const tick = () => {
      const full = PLACEHOLDER_QUESTIONS[question];
      length += deleting ? -1 : 1;
      setTypedPlaceholder(full.slice(0, length));
      let delay = deleting ? 22 : 55;
      if (!deleting && length === full.length) {
        deleting = true;
        delay = 1800;
      } else if (deleting && length === 0) {
        deleting = false;
        question = (question + 1) % PLACEHOLDER_QUESTIONS.length;
        delay = 350;
      }
      timer = window.setTimeout(tick, delay);
    };
    timer = window.setTimeout(tick, 600);
    return () => window.clearTimeout(timer);
  }, [active]);

  // collapse when clicking outside or pressing Escape (the conversation is kept)
  useEffect(() => {
    if (!active) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setFocused(false);
        setPanelOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setFocused(false);
      setPanelOpen(false);
      inputRef.current?.blur();
    };
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [active]);

  // keep the newest message in view
  useEffect(() => {
    const log = logRef.current;
    if (log) log.scrollTop = log.scrollHeight;
  }, [messages]);

  const ask = useCallback(
    (question: string) => {
      const trimmed = question.trim();
      if (!trimmed || busy) return;
      setValue('');
      setBusy(true);
      setPanelOpen(true);
      const userId = nextId.current++;
      const replyId = nextId.current++;
      setMessages((current) => [...current, { id: userId, role: 'user', text: trimmed }]);

      const answer = answerQuestion(trimmed);
      const totalWords = answer.text.join(' ').split(/\s+/).length;
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      window.setTimeout(
        () => {
          setMessages((current) => [
            ...current,
            { id: replyId, role: 'assistant', ...answer, shownWords: reduceMotion ? totalWords : 0, totalWords },
          ]);
          if (reduceMotion) {
            setBusy(false);
            return;
          }
          // reveal the answer word by word, like a streamed reply
          const interval = window.setInterval(() => {
            setMessages((current) =>
              current.map((message) =>
                message.id === replyId && message.role === 'assistant'
                  ? { ...message, shownWords: Math.min(message.totalWords, message.shownWords + 1) }
                  : message
              )
            );
          }, WORD_MS);
          window.setTimeout(
            () => {
              window.clearInterval(interval);
              setMessages((current) =>
                current.map((message) =>
                  message.id === replyId && message.role === 'assistant'
                    ? { ...message, shownWords: message.totalWords }
                    : message
                )
              );
              setBusy(false);
            },
            totalWords * WORD_MS + 60
          );
        },
        reduceMotion ? 0 : THINKING_MS
      );
    },
    [busy]
  );

  const toggleListening = () => {
    if (listening) {
      recognitionRef.current?.stop();
      return;
    }
    const Recognition =
      (window as unknown as { SpeechRecognition?: SpeechRecognitionConstructor }).SpeechRecognition ??
      (window as unknown as { webkitSpeechRecognition?: SpeechRecognitionConstructor }).webkitSpeechRecognition;
    if (!Recognition) return;
    const recognition = new Recognition();
    recognition.lang = 'en-US';
    recognition.interimResults = true;
    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0].transcript)
        .join('');
      setValue(transcript);
    };
    recognition.onend = () => setListening(false);
    recognitionRef.current = recognition;
    setListening(true);
    recognition.start();
    inputRef.current?.focus();
  };

  const width = value || panelOpen ? 'w-[560px]' : focused ? 'w-[440px]' : 'w-[320px]';

  return (
    <div
      ref={rootRef}
      className="pointer-events-none fixed inset-x-0 bottom-4 z-[900] flex flex-col items-center gap-2 px-4 sm:bottom-6"
    >
      {/* conversation panel */}
      {panelOpen && hasConversation && (
        <section
          aria-label="Ask RCC conversation"
          className="pointer-events-auto flex max-h-[min(480px,62svh)] w-[560px] max-w-full origin-bottom flex-col overflow-hidden rounded-3xl bg-rcc-ink/85 text-white shadow-2xl shadow-rcc-ink/30 ring-1 ring-white/10 backdrop-blur-xl motion-safe:animate-in motion-safe:fade-in motion-safe:zoom-in-95 motion-safe:slide-in-from-bottom-4 motion-safe:duration-300"
        >
          <header className="flex items-center gap-2.5 px-4 pt-3.5 pb-2">
            <span aria-hidden className="grid size-6 grid-cols-2 gap-0.5 rounded-md bg-white/10 p-1">
              <span className="bg-[#f0479a]" />
              <span className="bg-white/80" />
              <span className="bg-white/80" />
              <span className="bg-[#9b6cf2]" />
            </span>
            <span className="text-sm font-semibold">RCC Assistant</span>
            <span className="rounded-full bg-white/10 px-2 py-0.5 font-mono text-[10px] tracking-widest text-white/70 uppercase">
              Preview
            </span>
            <span className="grow" />
            <button
              type="button"
              onClick={() => setMessages([])}
              disabled={busy}
              className="flex size-7 items-center justify-center rounded-full text-white/70 transition-colors outline-none hover:bg-white/10 hover:text-white focus-visible:ring-2 focus-visible:ring-white/50 disabled:opacity-40"
              aria-label="Start a new chat"
            >
              <RotateCcwIcon className="size-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setPanelOpen(false)}
              className="flex size-7 items-center justify-center rounded-full text-white/70 transition-colors outline-none hover:bg-white/10 hover:text-white focus-visible:ring-2 focus-visible:ring-white/50"
              aria-label="Minimize"
            >
              <ChevronDownIcon className="size-4" />
            </button>
          </header>

          <div
            ref={logRef}
            role="log"
            aria-live="polite"
            className="flex flex-col gap-4 overflow-y-auto px-4 pt-2 pb-4"
          >
            <span className="text-sm text-white/85">Hi! Ask me about events, joining RCC, or anything else.</span>
            {messages.map((message) =>
              message.role === 'user' ? (
                <span
                  key={message.id}
                  className="max-w-[85%] self-end rounded-2xl rounded-br-md bg-white/15 px-4 py-2.5 text-sm motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-1"
                >
                  {message.text}
                </span>
              ) : (
                <AssistantMessage key={message.id} message={message} />
              )
            )}
            {busy && messages[messages.length - 1]?.role === 'user' && (
              <span className="flex items-center gap-1.5 text-white/60" aria-label="Thinking">
                {[0, 1, 2].map((dot) => (
                  <span
                    key={dot}
                    className="size-1.5 bg-white/70 motion-safe:animate-pixel-wave"
                    style={{ animationDelay: `${dot * 150}ms` }}
                  />
                ))}
              </span>
            )}
          </div>
          <span className="border-t border-white/10 px-4 py-2 text-[11px] text-white/50">
            Answers come from the RCC site for now. Full AI answers are coming soon.
          </span>
        </section>
      )}

      {/* suggestions, shown when focused before the conversation panel opens */}
      {focused && !panelOpen && !value && (
        <ul className="pointer-events-auto flex w-[440px] max-w-full flex-col items-start gap-2">
          {(hasConversation ? ['Show my conversation', ...SUGGESTIONS] : SUGGESTIONS).map((suggestion, index) => (
            <li
              key={suggestion}
              className="motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-2 motion-safe:fill-mode-both"
              style={{ animationDelay: `${(SUGGESTIONS.length - index) * 50}ms` }}
            >
              <button
                type="button"
                onClick={() => (suggestion === 'Show my conversation' ? setPanelOpen(true) : ask(suggestion))}
                className="rounded-full bg-white/95 px-4 py-2 text-left text-sm text-rcc-ink shadow-lg shadow-rcc-ink/20 ring-1 ring-rcc-ink/10 backdrop-blur-md transition-colors outline-none hover:bg-[#f1eafb] hover:text-rcc-violet focus-visible:ring-3 focus-visible:ring-[#f0479a]/50"
              >
                {suggestion}
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* the input pill */}
      <form
        onSubmit={(event) => {
          event.preventDefault();
          ask(value);
        }}
        className={cn(
          'pointer-events-auto flex h-12 max-w-full items-center gap-1 rounded-full bg-white pr-1.5 pl-5 shadow-[0_10px_30px_-6px_rgb(16_42_67/0.28)] ring-1 ring-rcc-ink/10 transition-[width,box-shadow] duration-300 ease-cta',
          width,
          active && 'ring-rcc-violet/25'
        )}
      >
        <input
          ref={inputRef}
          value={value}
          onChange={(event) => setValue(event.target.value)}
          onFocus={() => {
            setFocused(true);
            if (hasConversation) setPanelOpen(true);
          }}
          placeholder={panelOpen ? 'Message…' : focused ? 'Ask anything…' : typedPlaceholder}
          aria-label="Ask RCC a question"
          autoComplete="off"
          className="h-full min-w-0 flex-1 bg-transparent text-[15px] text-rcc-ink outline-none placeholder:text-rcc-ink/50"
        />
        {active && speechSupported && !value && (
          <button
            type="button"
            onClick={toggleListening}
            className={cn(
              'flex size-9 shrink-0 items-center justify-center rounded-full transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50',
              listening ? 'bg-[#d00870]/10 text-[#d00870]' : 'text-rcc-ink/70 hover:bg-rcc-ink/5 hover:text-rcc-ink'
            )}
            aria-label={listening ? 'Stop dictation' : 'Ask with your voice'}
            aria-pressed={listening}
          >
            <MicIcon className={cn('size-4', listening && 'motion-safe:animate-pulse')} />
          </button>
        )}
        <button
          type="submit"
          disabled={!value.trim() || busy}
          className={cn(
            'flex size-9 shrink-0 items-center justify-center rounded-full transition-[background-color,color,scale] duration-200 outline-none focus-visible:ring-3 focus-visible:ring-ring/50 active:scale-90',
            value.trim() && !busy ? 'bg-[#d00870] text-white hover:bg-[#b0065e]' : 'bg-rcc-ink/8 text-rcc-ink/45'
          )}
          aria-label="Send"
        >
          <ArrowUpIcon className="size-4" />
        </button>
      </form>
    </div>
  );
}

function AssistantMessage({ message }: { message: Extract<Message, { role: 'assistant' }> }) {
  // show only the words revealed so far, keeping paragraph breaks
  const paragraphs = message.text.map((paragraph, index) => {
    const before = message.text.slice(0, index).reduce((sum, text) => sum + text.split(/\s+/).length, 0);
    return paragraph
      .split(/\s+/)
      .slice(0, Math.max(0, message.shownWords - before))
      .join(' ');
  });
  const done = message.shownWords >= message.totalWords;

  return (
    <div className="flex flex-col gap-3 text-sm leading-relaxed text-white/90">
      {paragraphs.map((paragraph, index) => (paragraph ? <span key={index}>{paragraph}</span> : null))}
      {done && message.links && (
        <div className="flex flex-wrap gap-2 motion-safe:animate-in motion-safe:fade-in">
          {message.links.map((link) => {
            const external = link.href.startsWith('http') || link.href.startsWith('mailto:');
            const className =
              'rounded-full bg-white px-3 py-1 text-xs font-semibold text-rcc-violet transition-colors hover:bg-[#f1eafb]';
            return external ? (
              <a
                key={link.href}
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className={className}
              >
                {link.label} ↗
              </a>
            ) : (
              <Link key={link.href} href={link.href} className={className}>
                {link.label} →
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
