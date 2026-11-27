import {
  createUIMessageStream,
  createUIMessageStreamResponse,
  type UIMessage,
  type UIMessageChunk,
} from "ai";
import type { Citation } from "../domain/knowledge";
import { UNSUPPORTED_MESSAGE } from "../domain/prompt";

export function createUnsupportedResponse(messages: UIMessage[]): Response {
  const stream = createUIMessageStream({
    originalMessages: messages,
    execute({ writer }) {
      const textId = "rcc-limitation";
      writer.write({ type: "text-start", id: textId });
      writer.write({ type: "text-delta", id: textId, delta: UNSUPPORTED_MESSAGE });
      writer.write({ type: "text-end", id: textId });
    },
  });

  return createUIMessageStreamResponse({ stream });
}

export function addSourcesToResponse(
  result: { toUIMessageStream: () => ReadableStream<UIMessageChunk> },
  messages: UIMessage[],
  citations: Citation[],
): Response {
  const stream = createUIMessageStream({
    originalMessages: messages,
    execute({ writer }) {
      for (const citation of citations) {
        if (!citation.url) continue;
        writer.write({
          type: "source-url",
          sourceId: citation.id,
          url: citation.url,
          title: citation.title,
        });
      }
      writer.merge(result.toUIMessageStream());
    },
  });

  return createUIMessageStreamResponse({ stream });
}
