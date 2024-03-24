import { z, defineCollection } from 'astro:content'

const activitiesCollection = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.date(),
      tags: z.array(z.string()),
      cover: image(),
    }),
})

export const collections = {
  activities: activitiesCollection,
}
