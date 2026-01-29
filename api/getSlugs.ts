export async function GET(request: Request) {
  const runFrom = request.headers.get("runFrom");
  if (runFrom !== "apple-shortcuts") {
    return new Response("Unauthorized", { status: 401 });
  }

  const response = await fetch(
    "https://qualified-orca-884.convex.site/getSlugs",
    { headers: { runFrom: "apple-shortcuts" } }
  );

  const slugs = await response.text();

  return new Response(slugs, {
    headers: { "Content-Type": "text/plain" },
  });
}
