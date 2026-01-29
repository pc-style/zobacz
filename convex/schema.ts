import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  pages: defineTable({
    slug: v.string(),
    title: v.string(),
    description: v.optional(v.string()),
    gifUrl: v.optional(v.string()),
    gifKeywords: v.optional(v.string()),
    deeplink: v.optional(v.string()),
    deeplinkLabel: v.optional(v.string()),
    order: v.number(),
  }).index("by_slug", ["slug"]),
});
