// The list of fields every project file must have.
// If a project is missing one, the build stops and names the file.
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
  // One folder per project: src/content/projects/<folder>/index.md
  loader: glob({
    pattern: '*/index.md',
    base: './src/content/projects',
    generateId: ({ entry }) => entry.split('/')[0],
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      // One short line shown under the title.
      hook: z.string(),
      // "completed" shows under Projects, "in-progress" under Current projects.
      status: z.enum(['completed', 'in-progress']),
      // Lower numbers are listed first.
      order: z.number(),
      // Where and when, e.g. "EngiWorks · Summer 2026".
      context: z.string(),
      tools: z.array(z.string()).default([]),
      cover: image().optional(),
      coverAlt: z.string().optional(),
      gallery: z.array(z.object({ src: image(), alt: z.string() })).default([]),
    }),
});

export const collections = { projects };
