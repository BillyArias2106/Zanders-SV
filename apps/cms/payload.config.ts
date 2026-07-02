import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { en } from '@payloadcms/translations/languages/en'
import { es } from '@payloadcms/translations/languages/es'
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
      beforeLogin: [
        {
          path: '@/components/admin/AdminLoginActions',
          exportName: 'AdminLoginActions'
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
      titleSuffix: ' - CMS'
    }
  },
  collections: [Pages, Media, ContactSubmissions, Users],
  globals: [MainNavigation, FooterSettings, CompanySettings],
  i18n: {
    fallbackLanguage: 'es',
    supportedLanguages: {
      en,
      es
    }
  },
  localization: {
    defaultLocale: 'es',
    fallback: true,
    locales: [
      {
        code: 'es',
        label: {
          en: 'Spanish',
          es: 'Español'
        }
      },
      {
        code: 'en',
        fallbackLocale: 'es',
        label: {
          en: 'English',
          es: 'Inglés'
        }
      }
    ]
  },
  cors: [process.env.WEB_PUBLIC_URL ?? 'http://localhost:3000'],
  csrf: [process.env.WEB_PUBLIC_URL ?? 'http://localhost:3000'],
  db: postgresAdapter({
    blocksAsJSON: true,
    pool: {
      connectionString: process.env.DATABASE_URL ?? ''
    },
    push: process.env.PAYLOAD_DB_PUSH === 'true'
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
