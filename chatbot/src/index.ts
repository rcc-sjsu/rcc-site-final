import { handleChat, type ChatEnv } from "./server/chat";

export default {
  async fetch(request: Request, env: ChatEnv): Promise<Response> {
    const url = new URL(request.url);

    if (request.method === "OPTIONS") {
      return withCors(new Response(null, { status: 204 }), env);
    }

    if (url.pathname === "/api/health" && request.method === "GET") {
      return withCors(Response.json({ ok: true, service: "rcc-chatbot" }), env);
    }

    if (url.pathname === "/api/chat" && request.method === "POST") {
      try {
        return withCors(await handleChat(request, env), env);
      } catch (error) {
        console.error("RCC chatbot request error", error);
        return withCors(
          Response.json(
            { error: "The chatbot could not complete that request. Please try again." },
            { status: 503 },
          ),
          env,
        );
      }
    }

    return withCors(new Response("Not found", { status: 404 }), env);
  },
} satisfies ExportedHandler<ChatEnv>;

function withCors(response: Response, env: ChatEnv): Response {
  const headers = new Headers(response.headers);
  headers.set("access-control-allow-methods", "GET,POST,OPTIONS");
  headers.set("access-control-allow-headers", "content-type");
  if (env.ALLOWED_ORIGIN) headers.set("access-control-allow-origin", env.ALLOWED_ORIGIN);

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}
