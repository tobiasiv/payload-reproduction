// storage-adapter-import-placeholder
import { postgresAdapter } from '@payloadcms/db-postgres'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

import { Children } from './collections/Children'
import { GrandChildren } from './collections/GrandChildren'
import { Users } from './collections/Users'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    autoLogin: {
      email: 'user@admin.com',
      password: 'password',
      prefillOnly: true,
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Children, GrandChildren],
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
    const admin = await payload.create({
      collection: 'users',
      data: {
        email: 'user@admin.com',
        password: 'password',
        role: 'admin',
      },
    })

    const editor = await payload.create({
      collection: 'users',
      data: {
        email: 'user@editor.com',
        password: 'password',
        role: 'editor',
      },
    })

    // Seed Children
    const child1 = await payload.create({
      collection: 'children',
      data: {
        name: 'Child 1',
        user: admin.id,
      },
    })

    const child2 = await payload.create({
      collection: 'children',
      data: {
        name: 'Child 2',
        user: editor.id,
      },
    })

    // Seed Grand Children

    await payload.create({
      collection: 'grand-children',
      data: {
        name: 'Grand Child 1',
        child: child1.id,
      },
    })

    await payload.create({
      collection: 'grand-children',
      data: {
        name: 'Grand Child 2',
        child: child2.id,
      },
    })
  },
})
