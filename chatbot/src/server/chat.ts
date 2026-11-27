import { createAI, type CloudflareLanguageModelId } from "agents/models/ai-sdk";
import { convertToModelMessages, type UIMessage, streamText } from "ai";
import { citationsFor, selectRelevantChunks } from "../domain/knowledge";
import { buildSystemPrompt } from "../domain/prompt";
import { addSourcesToResponse, createUnsupportedResponse } from "./stream";
import { createRetriever, type RetrievalEnv } from "./retrieval";

export interface ChatEnv extends RetrievalEnv {
  AI: Ai;
  MODEL_ID?: string;
  ALLOWED_ORIGIN?: string;
}

export async function handleChat(request: Request, env: ChatEnv): Promise<Response> {
  const body = (await request.json()) as { messages?: UIMessage[] };
  const messages = Array.isArray(body.messages) ? body.messages : [];
  const query = extractLatestUserText(messages);

  if (!query) {
    return Response.json({ error: "A user message is required." }, { status: 400 });
  }

  const retriever = createRetriever(env);
  const retrieved = await retriever.search(query);
  const chunks = selectRelevantChunks(
    retrieved,
    parseNumber(env.RAG_MIN_SCORE, 0.68),
    parseNumber(env.RAG_TOP_K, 5),
  );

  // Refuse before model generation when there is no approved evidence. This is
  // the hard safety boundary for unsupported questions.
  if (chunks.length === 0) {
    return createUnsupportedResponse(messages);
  }

  const ai = createAI({ binding: env.AI });
  const result = streamText({
    model: ai((env.MODEL_ID ?? "@cf/zai-org/glm-4.7-flash") as CloudflareLanguageModelId),
    system: buildSystemPrompt(chunks),
    messages: await convertToModelMessages(messages),
    temperature: 0.1,
    maxRetries: 2,
    timeout: { totalMs: 30_000, chunkMs: 10_000 },
    onError({ error }) {
      console.error("RCC chatbot generation error", error);
    },
  });

  return addSourcesToResponse(result, messages, citationsFor(chunks));
}

export function extractLatestUserText(messages: UIMessage[]): string {
  const latestUserMessage = [...messages].reverse().find(message => message.role === "user");
  if (!latestUserMessage) return "";

  return latestUserMessage.parts
    .filter(part => part.type === "text")
    .map(part => part.text)
    .join("\n")
    .trim();
}

function parseNumber(value: string | undefined, fallback: number): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}
