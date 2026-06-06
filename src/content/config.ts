import { z, defineCollection } from 'astro:content';

const projectsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    techs: z.array(z.string()),
    images: z.array(z.string()).optional(),
    videos: z.array(z.string()).optional(),
    github: z.string().optional(),
    live: z.string().optional(),
  }),
});

export const collections = {
  'projects': projectsCollection,
};
