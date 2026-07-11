'use client'

import { useTranslation } from '@payloadcms/ui'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

import { AdminOnboardingGate } from './AdminOnboardingGate'
import './admin-navigation.css'

const navItems = [
  { href: '/admin', label: { en: 'Dashboard', es: 'Dashboard' } },
  {
    href: '/admin/collections/pages',
    label: { en: 'Website', es: 'Sitio web' }
  },
  {
    href: '/admin/collections/media',
    label: { en: 'Content', es: 'Contenido' }
  },
  {
    href: '/admin/globals/company-settings',
    label: { en: 'Site settings', es: 'Configuración' }
  },
  {
    href: '/admin/collections/contact-submissions',
    label: { en: 'Leads', es: 'Leads' }
  },
  {
    href: '/admin/collections/users',
    label: { en: 'Users', es: 'Usuarios' }
  }
]

const hiddenPathSegments = ['/create-first-user', '/forgot', '/login', '/reset']

export function AdminTopNavigation() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { i18n, switchLanguage } = useTranslation()
  const locale = searchParams.get('locale')
  const language = locale === 'en' || locale === 'es' ? locale : i18n.language
  const labelLanguage = language === 'en' ? 'en' : 'es'

  useEffect(() => {
    if ((locale === 'en' || locale === 'es') && locale !== i18n.language) {
      void switchLanguage?.(locale)
    }
  }, [i18n.language, locale, switchLanguage])

  if (hiddenPathSegments.some((segment) => pathname.includes(segment))) {
    return <AdminOnboardingGate />
  }

  return (
    <>
      <AdminOnboardingGate />
      <nav
        aria-label={
          labelLanguage === 'en' ? 'Main sections' : 'Secciones principales'
        }
        className="app-admin-top-nav"
      >
        <a className="app-admin-top-nav__brand" href="/admin">
          Site CMS
        </a>
        <div className="app-admin-top-nav__links">
          {navItems.map((item) => {
            const isActive =
              item.href === '/admin'
                ? pathname === '/admin'
                : pathname.startsWith(item.href)

            return item.href ? (
              <a
                aria-current={isActive ? 'page' : undefined}
                className={`app-admin-top-nav__link${
                  isActive ? ' app-admin-top-nav__link--active' : ''
                }`}
                href={item.href}
                key={item.href}
              >
                {item.label[labelLanguage]}
              </a>
            ) : (
              <span
                className="app-admin-top-nav__link app-admin-top-nav__link--muted"
                key={item.href}
              >
                {item.label[labelLanguage]}
              </span>
            )
          })}
        </div>
      </nav>
    </>
  )
}
