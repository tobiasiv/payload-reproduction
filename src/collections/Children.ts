import { admin, user, userSelf } from '@/access'
import type { CollectionConfig } from 'payload'

export const Children: CollectionConfig = {
  slug: 'children',
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
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      hasMany: false,
      required: true,
    },
  ],
}
