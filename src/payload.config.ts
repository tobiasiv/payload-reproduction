// storage-adapter-import-placeholder
import { postgresAdapter } from '@payloadcms/db-postgres'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

import { Categories } from './collections/Categories'
import { Media } from './collections/Media'
import { Posts } from './collections/Posts'
import { Users } from './collections/Users'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    autoLogin: { email: 'admin@example.com', password: 'password' },
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Categories, Posts],
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
    // Seed User
    await payload.create({
      collection: 'users',
      data: { email: 'admin@example.com', password: 'password' },
    })

    // Seed Categories
    const parentCategory = await payload.create({
      collection: 'categories',
      data: { name: 'Parent' },
    })

    const childCategory = await payload.create({
      collection: 'categories',
      data: { name: 'Child', parent: parentCategory.id },
    })

    for (let index = 0; index < 20; index++) {
      await payload.create({
        collection: 'categories',
        data: { name: `Grandchild ${index + 1}`, parent: childCategory.id },
      })
    }

    // Seed Posts
    for (let index = 0; index < 5; index++) {
      await payload.create({
        collection: 'posts',
        data: { name: `Post ${index + 1}`, category: parentCategory.id },
      })
    }
  },
})
