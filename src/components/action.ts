'use server'

import config from '@payload-config'
import { getPayload } from 'payload'

export async function getAction() {
  const payload = await getPayload({ config })
  const categories = [1, 2, 3]
  return payload.find({
    collection: 'products',
    where: {
      or: categories.map((category) => ({
        categories: {
          equals: category,
        },
      })),
    },
  })
}
