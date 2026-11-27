export interface ApprovedSource {
  id: string;
  title: string;
  url?: string;
}

export interface KnowledgeChunk {
  id: string;
  content: string;
  score: number;
  source: ApprovedSource;
}

export interface Citation {
  id: string;
  title: string;
  url?: string;
}

export const DEFAULT_MIN_RELEVANCE_SCORE = 0.68;
export const DEFAULT_TOP_K = 5;

export function selectRelevantChunks(
  chunks: KnowledgeChunk[],
  minScore = DEFAULT_MIN_RELEVANCE_SCORE,
  topK = DEFAULT_TOP_K,
): KnowledgeChunk[] {
  const seen = new Set<string>();

  return [...chunks]
    .filter(chunk => chunk.content.trim().length > 0 && chunk.score >= minScore)
    .sort((a, b) => b.score - a.score)
    .filter(chunk => {
      if (seen.has(chunk.id)) return false;
      seen.add(chunk.id);
      return true;
    })
    .slice(0, topK);
}

export function citationsFor(chunks: KnowledgeChunk[]): Citation[] {
  const seen = new Set<string>();

  return chunks.flatMap(chunk => {
    if (seen.has(chunk.source.id)) return [];
    seen.add(chunk.source.id);
    return [{
      id: chunk.source.id,
      title: chunk.source.title,
      url: chunk.source.url,
    }];
  });
}

export function formatKnowledgeContext(chunks: KnowledgeChunk[]): string {
  return chunks
    .map((chunk, index) => {
      const source = chunk.source.url
        ? `${chunk.source.title} (${chunk.source.url})`
        : chunk.source.title;

      return `[Source ${index + 1}] ${source}\n${chunk.content}`;
    })
    .join("\n\n");
}
