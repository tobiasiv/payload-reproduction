import type { CollectionConfig } from 'payload'

export const Pages: CollectionConfig = {
  slug: 'pages',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'post',
      type: 'relationship',
      relationTo: 'posts',
      hasMany: false,
    },
  ],
}
