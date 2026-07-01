'use client'

import { usePathname } from 'next/navigation'

import './admin-navigation.css'

const navItems = [
  { href: '/admin/collections/pages', label: 'Páginas / Menú' },
  { href: '/admin/collections/media', label: 'Medios' },
  { href: '/admin/globals/footer-settings', label: 'Footer' },
  { href: '/admin/globals/company-settings', label: 'Empresa' },
  { href: '/admin/collections/contact-submissions', label: 'CRM' },
  { href: '/admin/collections/users', label: 'Sistema' }
]

const hiddenPathSegments = [
  '/create-first-user',
  '/forgot',
  '/login',
  '/reset'
]

export function AdminTopNavigation() {
  const pathname = usePathname()

  if (hiddenPathSegments.some((segment) => pathname.includes(segment))) {
    return null
  }

  return (
    <nav aria-label="Secciones principales" className="zanders-admin-top-nav">
      <a className="zanders-admin-top-nav__brand" href="/admin">
        Zanders CMS
      </a>
      <div className="zanders-admin-top-nav__links">
        {navItems.map((item) =>
          item.href ? (
            <a
              className="zanders-admin-top-nav__link"
              href={item.href}
              key={item.label}
            >
              {item.label}
            </a>
          ) : (
            <span
              className="zanders-admin-top-nav__link zanders-admin-top-nav__link--muted"
              key={item.label}
            >
              {item.label}
            </span>
          )
        )}
      </div>
    </nav>
  )
}
