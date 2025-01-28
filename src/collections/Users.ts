import { admin, user, userSelf } from '@/access'
import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  access: {
    create: admin,
    read: user,
    update: userSelf,
    delete: admin,
  },
  auth: true,
  fields: [
    {
      name: 'role',
      type: 'select',
      options: [
        { label: 'admin', value: 'admin' },
        { label: 'editor', value: 'editor' },
      ],
      required: true,
    },
  ],
}
