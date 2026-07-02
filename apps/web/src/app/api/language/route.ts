import { cookies } from 'next/headers'

import { languageCookieName, normalizeLocale } from '@/lib/i18n'

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as {
    locale?: unknown
  }
  const locale = normalizeLocale(body.locale)

  if (!locale) {
    return Response.json(
      {
        ok: false
      },
      {
        status: 400
      }
    )
  }

  const cookieStore = await cookies()

  cookieStore.set(languageCookieName, locale, {
    httpOnly: false,
    maxAge: 60 * 60 * 24 * 365,
    path: '/',
    sameSite: 'lax'
  })

  return Response.json({
    locale,
    ok: true
  })
}
