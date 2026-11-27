import {
  DEFAULT_MIN_RELEVANCE_SCORE,
  DEFAULT_TOP_K,
  selectRelevantChunks,
  type KnowledgeChunk,
} from "../domain/knowledge";

export interface RetrievalOptions {
  minScore?: number;
  topK?: number;
}

export interface Retriever {
  search(query: string, options?: RetrievalOptions): Promise<KnowledgeChunk[]>;
}

export interface RetrievalEnv {
  RAG_RETRIEVAL_URL?: string;
  RAG_RETRIEVAL_TOKEN?: string;
  RAG_MIN_SCORE?: string;
  RAG_TOP_K?: string;

  // Use only for local testing.
  RAG_MODE?: "fixture" | "remote" | "empty";
}

interface RetrievalResponse {
  matches?: Array<{
    id: string;
    content: string;
    score: number;
    source: {
      id: string;
      title: string;
      url?: string;
    };
  }>;
}

const LOCAL_RAG_TEST_CHUNK: KnowledgeChunk = {
  id: "local-rag-test-chunk",
  content:
    "TEST ONLY: This synthetic document is being used to validate the RCC chatbot retrieval pipeline. The test answer is: the retrieval pipeline successfully found this source.",
  score: 0.99,
  source: {
    id: "local-rag-test-source",
    title: "Local RAG test fixture (TEST ONLY)",
  },
};

/**
 * The bot only depends on this small retrieval interface.
 * The implementation can later be replaced with Supabase.
 */
export function createRetriever(env: RetrievalEnv, fetcher = fetch): Retriever {
  if (env.RAG_MODE === "fixture") {
    return createFixtureRetriever();
  }

  if (!env.RAG_RETRIEVAL_URL) {
    return {
      async search() {
        return [];
      },
    };
  }

  return {
    async search(query, options = {}) {
      const minScore =
        options.minScore ??
        parseNumber(env.RAG_MIN_SCORE, DEFAULT_MIN_RELEVANCE_SCORE);

      const topK =
        options.topK ?? parseNumber(env.RAG_TOP_K, DEFAULT_TOP_K);

      const response = await fetcher(env.RAG_RETRIEVAL_URL!, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          ...(env.RAG_RETRIEVAL_TOKEN
            ? { authorization: `Bearer ${env.RAG_RETRIEVAL_TOKEN}` }
            : {}),
        },
        body: JSON.stringify({ query, topK }),
      });

      if (!response.ok) {
        throw new Error(`Retrieval service returned HTTP ${response.status}`);
      }

      const payload = (await response.json()) as RetrievalResponse;

      return selectRelevantChunks(
        payload.matches ?? [],
        minScore,
        topK,
      );
    },
  };
}

function createFixtureRetriever(): Retriever {
  return {
    async search(query, options = {}) {
      const normalizedQuery = query.toLowerCase();

      const isFixtureQuestion =
        normalizedQuery.includes("test source") ||
        normalizedQuery.includes("rag fixture") ||
        normalizedQuery.includes("retrieval test") ||
        normalizedQuery.includes("demo source");

      if (!isFixtureQuestion) {
        return [];
      }

      return selectRelevantChunks(
        [LOCAL_RAG_TEST_CHUNK],
        options.minScore ?? DEFAULT_MIN_RELEVANCE_SCORE,
        options.topK ?? DEFAULT_TOP_K,
      );
    },
  };
}

function parseNumber(
  value: string | undefined,
  fallback: number,
): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}