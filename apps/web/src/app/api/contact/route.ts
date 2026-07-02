import { defaultLocale, getUIText, normalizeLocale } from '@/lib/i18n'

const getCmsBaseUrl = () =>
  process.env.CMS_INTERNAL_URL ??
  process.env.NEXT_PUBLIC_CMS_URL ??
  'http://localhost:3001'

const resolveLocaleFromBody = (body: string) => {
  try {
    const parsedBody = JSON.parse(body) as { locale?: unknown }

    return normalizeLocale(parsedBody.locale) ?? defaultLocale
  } catch {
    return defaultLocale
  }
}

export async function POST(request: Request) {
  const body = await request.text()
  const text = getUIText(resolveLocaleFromBody(body))

  try {
    const response = await fetch(`${getCmsBaseUrl()}/contact`, {
      body,
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': request.headers.get('user-agent') ?? ''
      },
      method: 'POST'
    })
    const data = await response.json().catch(() => ({
      ok: false,
      message: text.contact.invalidServerResponse
    }))

    return Response.json(data, {
      status: response.status
    })
  } catch {
    return Response.json(
      {
        message: text.contact.unableToConnect,
        ok: false
      },
      {
        status: 502
      }
    )
  }
}
