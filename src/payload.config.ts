// storage-adapter-import-placeholder
import { postgresAdapter } from '@payloadcms/db-postgres'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

import { Categories } from './collections/Categories'
import { Products } from './collections/Products'
import { Users } from './collections/Users'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    autoLogin: {
      email: 'user@admin.com',
      password: 'password',
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Categories, Products],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI,
    },
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    // storage-adapter-placeholder
  ],
  async onInit(payload) {
    // Seed Users
    await payload.create({
      collection: 'users',
      data: {
        email: 'user@admin.com',
        password: 'password',
      },
    })

    // Seed Categories
    const blue = await payload.create({
      collection: 'categories',
      data: {
        name: 'Blue',
      },
    })

    const green = await payload.create({
      collection: 'categories',
      data: {
        name: 'Green',
      },
    })

    const red = await payload.create({
      collection: 'categories',
      data: {
        name: 'Red',
      },
    })

    // Seed Products
    await payload.create({
      collection: 'products',
      data: {
        name: 'Product 1',
        categories: [blue.id, green.id, red.id],
      },
    })

    await payload.create({
      collection: 'products',
      data: {
        name: 'Product 2',
        categories: [blue.id, green.id, red.id],
      },
    })
  },
})
