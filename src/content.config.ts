import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const items = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/data/items" }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      thumbnail: image(),
      published: z.coerce.date(),
      updated: z.coerce.date().optional(),
      link: z.string().url(),
      status: z
        .enum(["draft", "published", "featured"])
        .optional()
        .default("draft"),
    }),
});

export const collections = { items };
