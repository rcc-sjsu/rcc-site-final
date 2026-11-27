# Retrieval service contract

The chatbot backend deliberately does not assume whether the approved source chunks live in Supabase, Cloudflare Vectorize, or another vectorization service. The database/vectorization work can satisfy this HTTP contract and remain independently deployable.

Set `RAG_RETRIEVAL_URL` to a `POST` endpoint. The request body is:

```json
{
  "query": "What events are coming up?",
  "topK": 5
}
```

The response must contain only approved-source matches:

```json
{
  "matches": [
    {
      "id": "chunk-123",
      "content": "Approved chunk text...",
      "score": 0.91,
      "source": {
        "id": "source-events",
        "title": "Official RCC events page",
        "url": "https://example.org/rcc/events"
      }
    }
  ]
}
```

Requirements:

- `content` must be derived from an approved source document.
- `source.id` must be stable across chunks from the same source.
- `source.url` should be the official source link when one exists.
- `score` must be comparable to the configured `RAG_MIN_SCORE` threshold.
- The service must not return private or unapproved content.

The bot refuses before model generation when no result meets the threshold. This makes retrieval quality and unsupported-question behavior testable without relying on model behavior.
