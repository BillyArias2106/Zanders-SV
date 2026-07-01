import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { buildConfig } from 'payload'
import sharp from 'sharp'

import { ContactSubmissions } from './src/collections/ContactSubmissions'
import { Media } from './src/collections/Media'
import { Pages } from './src/collections/Pages'
import { Users } from './src/collections/Users'
import { CompanySettings } from './src/globals/CompanySettings'
import { FooterSettings } from './src/globals/FooterSettings'
import { MainNavigation } from './src/globals/MainNavigation'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    components: {
      header: [
        {
          path: '@/components/admin/AdminTopNavigation',
          exportName: 'AdminTopNavigation'
        }
      ],
      views: {
        dashboard: {
          Component: {
            path: '@/components/admin/AdminDashboard',
            exportName: 'AdminDashboard'
          }
        }
      }
    },
    theme: 'dark',
    meta: {
      titleSuffix: ' - Zanders CMS'
    }
  },
  collections: [Pages, Media, ContactSubmissions, Users],
  globals: [MainNavigation, FooterSettings, CompanySettings],
  cors: [process.env.WEB_PUBLIC_URL ?? 'http://localhost:3000'],
  csrf: [process.env.WEB_PUBLIC_URL ?? 'http://localhost:3000'],
  db: postgresAdapter({
    blocksAsJSON: true,
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
