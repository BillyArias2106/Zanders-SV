import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { buildConfig } from 'payload'
import sharp from 'sharp'

import { Media } from './src/collections/Media'
import { Pages } from './src/collections/Pages'
import { Users } from './src/collections/Users'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    theme: 'dark',
    meta: {
      titleSuffix: ' - Zanders CMS'
    }
  },
  collections: [Users, Media, Pages],
  cors: [process.env.WEB_PUBLIC_URL ?? 'http://localhost:3000'],
  csrf: [process.env.WEB_PUBLIC_URL ?? 'http://localhost:3000'],
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL ?? ''
    }
  }),
  editor: lexicalEditor(),
  graphQL: {
    disable: true
  },
  secret: process.env.PAYLOAD_SECRET ?? '',
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL ?? 'http://localhost:3001',
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'src/payload-types.ts')
  }
})
