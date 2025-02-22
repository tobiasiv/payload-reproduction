import type { CollectionConfig } from 'payload'

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    listSearchableFields: ['description'],
  },
  fields: [
    {
      name: 'description',
      label: { de: 'Beschreibung' },
      type: 'text',
      required: true,
    },
  ],
}
