import { describe, expect, it } from "vitest";
import {
  citationsFor,
  formatKnowledgeContext,
  selectRelevantChunks,
  type KnowledgeChunk,
} from "../src/domain/knowledge";

const chunks: KnowledgeChunk[] = [
  {
    id: "low",
    content: "Not relevant enough.",
    score: 0.4,
    source: { id: "source-a", title: "Source A", url: "https://example.com/a" },
  },
  {
    id: "high-2",
    content: "Second approved chunk.",
    score: 0.9,
    source: { id: "source-a", title: "Source A", url: "https://example.com/a" },
  },
  {
    id: "high-1",
    content: "First approved chunk.",
    score: 0.95,
    source: { id: "source-b", title: "Source B" },
  },
];

describe("knowledge grounding", () => {
  it("filters, ranks, and limits chunks", () => {
    expect(selectRelevantChunks(chunks, 0.68, 2).map(chunk => chunk.id)).toEqual([
      "high-1",
      "high-2",
    ]);
  });

  it("deduplicates citations by source", () => {
    expect(citationsFor(selectRelevantChunks(chunks))).toHaveLength(2);
  });

  it("labels context for citation-aware prompting", () => {
    const context = formatKnowledgeContext(selectRelevantChunks(chunks));
    expect(context).toContain("[Source 1]");
    expect(context).toContain("Second approved chunk.");
  });
});
