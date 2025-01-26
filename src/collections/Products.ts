import type { CollectionConfig } from 'payload'

export const Products: CollectionConfig = {
  slug: 'products',
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'categories',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: true,
    },
  ],
}
