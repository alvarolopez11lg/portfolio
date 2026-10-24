// The list of fields every project file must have.
// If a project is missing one, the build stops and names the file.
import { defineCollection, reference } from 'astro:content';
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
      // completed   -> listed under Projects
      // in-progress -> listed under Current projects
      // part        -> not listed on its own; shown inside a group (see `members`)
      status: z.enum(['completed', 'in-progress', 'part']),
      // Lower numbers are listed first.
      order: z.number(),
      // Where and when, e.g. "Independent project · Summer 2024".
      context: z.string(),
      tools: z.array(z.string()).default([]),
      cover: image().optional(),
      coverAlt: z.string().optional(),
      gallery: z
        .array(
          z.object({
            src: image(),
            alt: z.string(),
            // Optional line under the image, e.g. to credit someone else's work.
            caption: z.string().optional(),
            link: z.string().url().optional(),
            // Span the full width instead of half.
            wide: z.boolean().default(false),
          }),
        )
        .default([]),
      // For a group page: the folders of the projects shown on it, in order.
      members: z.array(reference('projects')).default([]),
    }),
});

export const collections = { projects };
