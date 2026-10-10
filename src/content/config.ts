import { z, defineCollection } from 'astro:content';

const projectsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    techs: z.array(z.string()),
    stack: z.string(),
    category: z.enum(['robotics-cv', 'data-engineering', 'data-science', 'computer-vision']).optional(),
    categoryLabel: z.string().optional(),
    oneLinerImpact: z.string().optional(),
    hardwareBadges: z.array(z.string()).optional(),
    technicalHighlights: z.array(z.string()).optional(),
    architectureDiagram: z.string().optional(),
    metrics: z.record(z.string(), z.string()).optional(),
    featured: z.boolean().optional(),
    order: z.number().optional(),
    images: z.array(z.string()).optional(),
    videos: z.array(z.string()).optional(),
    github: z.string().optional(),
    live: z.string().optional(),
  }),
});

export const collections = {
  'projects': projectsCollection,
};
