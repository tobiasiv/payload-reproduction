import { admin, user, userSelf } from '@/access'
import type { CollectionConfig } from 'payload'

export const GrandChildren: CollectionConfig = {
  slug: 'grand-children',
  access: {
    create: admin,
    read: user,
    update: userSelf,
    delete: admin,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'child',
      type: 'relationship',
      relationTo: 'children',
      hasMany: false,
      required: true,
    },
  ],
}
