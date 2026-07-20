'use client'

import { useTranslation } from '@payloadcms/ui'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'

type OnboardingStatus = {
  authenticated: boolean
  companyComplete?: boolean
  missingCompanyFields?: string[]
  nextPath?: null | string
  step?: 'company' | 'complete'
}

const authPathSegments = [
  '/create-first-user',
  '/forgot',
  '/login',
  '/register',
  '/reset'
]

const companyAllowedPaths = [
  '/admin/account',
  '/admin/collections/users',
  '/admin/globals/company-settings'
]

const isAllowedPath = (pathname: string, allowedPaths: string[]) =>
  allowedPaths.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`)
  )

const getRedirectPath = (pathname: string, status: OnboardingStatus) => {
  if (!status.authenticated || status.step === 'complete') {
    return null
  }

  if (status.step === 'company') {
    return isAllowedPath(pathname, companyAllowedPaths)
      ? null
      : (status.nextPath ??
          '/admin/globals/company-settings?onboarding=company')
  }

  return null
}

export function AdminOnboardingGate() {
  const pathname = usePathname()
  const router = useRouter()
  const { i18n } = useTranslation()
  const language = i18n.language === 'en' ? 'en' : 'es'
  const [status, setStatus] = useState<OnboardingStatus | null>(null)

  const shouldSkip = useMemo(
    () =>
      !pathname.startsWith('/admin') ||
      authPathSegments.some((segment) => pathname.includes(segment)),
    [pathname]
  )

  useEffect(() => {
    if (shouldSkip) {
      setStatus(null)
      return
    }

    const controller = new AbortController()

    fetch('/admin-onboarding/status', {
      cache: 'no-store',
      credentials: 'include',
      signal: controller.signal
    })
      .then(async (response) => {
        if (response.status === 401) {
          return { authenticated: false } satisfies OnboardingStatus
        }

        if (!response.ok) {
          throw new Error('Unable to load onboarding status.')
        }

        return (await response.json()) as OnboardingStatus
      })
      .then((nextStatus) => {
        setStatus(nextStatus)
      })
      .catch((error: unknown) => {
        if (!(error instanceof DOMException && error.name === 'AbortError')) {
          console.error(error)
        }
      })

    return () => {
      controller.abort()
    }
  }, [pathname, shouldSkip])

  useEffect(() => {
    if (!status || shouldSkip) {
      return
    }

    const redirectPath = getRedirectPath(pathname, status)

    if (redirectPath) {
      router.replace(redirectPath as Parameters<typeof router.replace>[0])
    }
  }, [pathname, router, shouldSkip, status])

  if (!status || shouldSkip || status.step === 'complete') {
    return null
  }

  if (status.step === 'company') {
    return (
      <div className="app-admin-onboarding-banner">
        <strong>
          {language === 'en'
            ? 'Complete Site Settings'
            : 'Completa Configuración del sitio'}
        </strong>
        <span>
          {language === 'en'
            ? 'Add the commercial name, a contact method and the default SEO title before creating the visual site.'
            : 'Agrega el nombre comercial, un método de contacto y el título SEO por defecto antes de crear la parte visual.'}
        </span>
      </div>
    )
  }

  return null
}
