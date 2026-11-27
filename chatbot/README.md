# RCC Chatbot starter

This is the first bot implementation for the RCC project. It is intentionally a narrow TypeScript/Cloudflare Worker backend plus a reusable React chat component.

## What is implemented

- AI SDK streaming chat through `useChat` and `streamText`.
- Cloudflare Workers AI through Cloudflare's current `createAI` provider.
- A retrieval adapter that can connect to the separate Supabase/vectorization work through a small HTTP contract.
- A hard pre-generation refusal when no approved source chunk is relevant enough.
- Inline citation instructions plus source URL parts that the UI can render.
- AI SDK retries (`maxRetries: 2`), request timeouts, stop, and retry UI.
- No RCC facts are bundled into the app because the PDF says source approval is still an open project question.

## Local setup

Requires Node.js 22+.

```sh
npm install
cp .dev.vars.example .dev.vars
npm run typecheck
npm run dev
```

Until `RAG_RETRIEVAL_URL` is connected, the bot safely refuses questions because it has no approved source context.

## Environment and deployment

`wrangler.jsonc` configures the Cloudflare `AI` binding and a default Workers AI model. `.dev.vars` supplies the retrieval endpoint and token locally. Keep retrieval credentials server-side; do not expose them to the React client.

Deploy with:

```sh
npm run deploy
```

## Project alignment

The attached Week 1 plan distinguishes project requirements from implementation details. The implementation follows the requirements that are already clear: approved-source answers, useful citations, safe abstention, and chat-style interaction. Form purpose, required fields, submission destination, and the approved source inventory are still marked TBD in the plan, so this starter does not invent those decisions.

See [docs/retrieval-contract.md](docs/retrieval-contract.md) for the handoff to the database/vectorization owners.
