import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("pages").order("asc").collect();
  },
});

export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("pages")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();
  },
});

export const create = mutation({
  args: {
    slug: v.string(),
    title: v.string(),
    description: v.optional(v.string()),
    gifUrl: v.optional(v.string()),
    gifKeywords: v.optional(v.string()),
    deeplink: v.optional(v.string()),
    deeplinkLabel: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db.query("pages").collect();
    const order = existing.length;
    return await ctx.db.insert("pages", { ...args, order });
  },
});

export const update = mutation({
  args: {
    id: v.id("pages"),
    slug: v.optional(v.string()),
    title: v.string(),
    description: v.optional(v.string()),
    gifUrl: v.optional(v.string()),
    gifKeywords: v.optional(v.string()),
    deeplink: v.optional(v.string()),
    deeplinkLabel: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, slug: _slug, ...data } = args;
    await ctx.db.patch(id, data);
  },
});

export const remove = mutation({
  args: { id: v.id("pages") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

export const seed = mutation({
  args: {},
  handler: async (ctx) => {
    const existing = await ctx.db.query("pages").collect();
    if (existing.length > 0) return;

    await ctx.db.insert("pages", {
      slug: "poranne-leki",
      title: "CZAS NA PORANNE LEKI",
      gifUrl: "https://media.tenor.com/l7fmznCvanIAAAAC/love-you.gif",
      order: 0,
    });

    await ctx.db.insert("pages", {
      slug: "wieczorne-leki",
      title: "czas na wieczorne leki",
      gifUrl: "https://media.tenor.com/CNUJ4TmQiKAAAAAC/mitau-mitao.gif",
      order: 1,
    });

    await ctx.db.insert("pages", {
      slug: "odpisz",
      title: "NO ODPISZ MI NOO :<<<",
      deeplink: "fb-messenger://",
      deeplinkLabel: "Otworz Messenger",
      order: 2,
    });
  },
});
