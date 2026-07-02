import { cookies } from 'next/headers'

import { getDefaultLanguage } from '@/lib/cms'
import {
  defaultLocale,
  languageCookieName,
  normalizeLocale,
  type Locale
} from '@/lib/i18n'

export async function getServerLocale(): Promise<Locale> {
  const cookieStore = await cookies()
  const cookieLocale = normalizeLocale(cookieStore.get(languageCookieName)?.value)

  if (cookieLocale) {
    return cookieLocale
  }

  return getDefaultLanguage().catch(() => defaultLocale)
}
