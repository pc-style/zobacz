import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { api } from "./_generated/api";

const http = httpRouter();

http.route({
  path: "/getSlugs",
  method: "GET",
  handler: httpAction(async (ctx, request) => {
    const runFrom = request.headers.get("runFrom");
    if (runFrom !== "apple-shortcuts") {
      return new Response("Unauthorized", { status: 401 });
    }

    const pages = await ctx.runQuery(api.pages.list);
    const slugs = pages.map((page) => page.slug).join("\n");

    return new Response(slugs, {
      headers: { "Content-Type": "text/plain" },
    });
  }),
});

export default http;
