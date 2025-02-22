import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'firstName',
  },
  auth: true,
  fields: [
    {
      name: 'firstName',
      label: { de: 'Vorname' },
      type: 'text',
      required: true,
    },
    {
      name: 'lastName',
      label: { de: 'Nachname' },
      type: 'text',
      required: true,
    },
  ],
}
