import { NextResponse, type NextRequest } from 'next/server'

const supportedLanguages = new Set(['en', 'es'])
const authAdminPaths = [
  '/admin/create-first-user',
  '/admin/forgot',
  '/admin/login',
  '/admin/reset'
]

const mergeLanguageCookie = (cookieHeader: string | null, language: string) => {
  const cookies = (cookieHeader ?? '')
    .split(';')
    .map((cookie) => cookie.trim())
    .filter((cookie) => cookie && !cookie.startsWith('lng='))

  return [...cookies, `lng=${language}`].join('; ')
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (
    !['GET', 'HEAD'].includes(request.method) ||
    authAdminPaths.some((path) => pathname.startsWith(path))
  ) {
    return NextResponse.next()
  }

  const locale = request.nextUrl.searchParams.get('locale')
  const cookieLanguage = request.cookies.get('lng')?.value
  const language = supportedLanguages.has(locale ?? '')
    ? locale
    : supportedLanguages.has(cookieLanguage ?? '')
      ? cookieLanguage
      : null

  if (!language) {
    return NextResponse.next()
  }

  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('Accept-Language', language)
  requestHeaders.set(
    'cookie',
    mergeLanguageCookie(requestHeaders.get('cookie'), language)
  )

  const response = NextResponse.next({
    request: {
      headers: requestHeaders
    }
  })

  if (cookieLanguage !== language) {
    response.cookies.set('lng', language, {
      maxAge: 60 * 60 * 24 * 365,
      path: '/',
      sameSite: 'lax'
    })
  }

  return response
}

export const config = {
  matcher: ['/admin/:path*']
}
