import { defineCollection, reference } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const CATEGORIES = ["footwear", "tools"] as const;

const items = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/data/items" }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      thumbnail: image(),
      published: z.coerce.date(),
      updated: z.coerce.date().optional(),
      link: z.string().url(),
      category: z.enum(CATEGORIES).optional(),
    }),
});

const issues = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/data/issues" }),
  schema: () =>
    z.object({
      status: z.enum(["published", "draft"]).default("draft"),
      published: z.coerce.date(),
      items: z.array(reference("items")),
    }),
});

const posts = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/data/posts" }),
  schema: () =>
    z.object({
      title: z.string(),
      description: z.string().optional(),
      image: z.string().optional(),
      published: z.coerce.date(),
      items: z.array(reference("items")),
    }),
});

export const collections = { items, issues, posts };
