import { defineCollection, z } from 'astro:content';
import { glob, file } from 'astro/loaders';

// Blog: one Markdown file per post in src/content/blog/.
const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    description: z.string(),
    draft: z.boolean().default(false),
    tags: z.array(z.string()).default([]),
  }),
});

// Projects: a single hand-authored data file, rendered as a summary page.
const projects = defineCollection({
  loader: file('src/data/projects.json'),
  schema: z.object({
    name: z.string(),
    context: z.string().optional(),
    blurb: z.string(),
    tech: z.array(z.string()).default([]),
    link: z.string().url().optional(),
    order: z.number().default(0),
  }),
});

// Gallery: photo metadata; `src` paths (relative to this data file) are
// validated and optimized at build via the image() helper.
const gallery = defineCollection({
  loader: file('src/data/gallery.json'),
  schema: ({ image }) =>
    z.object({
      src: image(),
      alt: z.string(),
      caption: z.string().optional(),
      order: z.number().default(0),
    }),
});

export const collections = { blog, projects, gallery };
