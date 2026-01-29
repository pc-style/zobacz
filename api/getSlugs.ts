import { ConvexHttpClient } from "convex/browser";
import { api } from "../convex/_generated/api";

const client = new ConvexHttpClient(process.env.VITE_CONVEX_URL!);

export async function GET(request: Request) {
  const runFrom = request.headers.get("runFrom");
  if (runFrom !== "apple-shortcuts") {
    return new Response("Unauthorized", { status: 401 });
  }

  const pages = await client.query(api.pages.list);
  const slugs = pages.map((page) => page.slug).join("\n");

  return new Response(slugs, {
    headers: { "Content-Type": "text/plain" },
  });
}
