import type { CollectionConfig } from 'payload'

export const Categories: CollectionConfig = {
  slug: 'categories',
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'parent',
      type: 'relationship',
      relationTo: 'categories',
    },
    {
      name: 'children',
      type: 'join',
      collection: 'categories',
      on: 'parent',
    },
    {
      name: 'posts',
      type: 'join',
      collection: 'posts',
      on: 'category',
    },
  ],
}
