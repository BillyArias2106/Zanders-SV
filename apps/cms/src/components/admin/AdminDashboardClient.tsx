'use client'

import { useTranslation } from '@payloadcms/ui'

import './admin-dashboard.css'

const quickActions = [
  {
    description: {
      en: 'Create public pages, assign type/template and control menu/footer visibility.',
      es: 'Crear páginas públicas, asignar tipo/plantilla y controlar menú/footer.'
    },
    href: '/admin/collections/pages',
    label: { en: 'Website pages', es: 'Páginas del sitio' }
  },
  {
    description: {
      en: 'Upload images, SVGs, videos and PDFs with usage, folders and tags.',
      es: 'Subir imágenes, SVGs, videos y PDFs con uso, carpetas y tags.'
    },
    href: '/admin/collections/media',
    label: { en: 'Media library', es: 'Biblioteca de medios' }
  },
  {
    description: {
      en: 'Company, brand, footer, contact, social links, SEO and legal text.',
      es: 'Empresa, marca, footer, contacto, redes, SEO y textos legales.'
    },
    href: '/admin/globals/company-settings',
    label: { en: 'Site settings', es: 'Configuración del sitio' }
  },
  {
    description: {
      en: 'Review, prioritize, assign and follow up messages from the website.',
      es: 'Revisar, priorizar, asignar y dar seguimiento a mensajes del sitio.'
    },
    href: '/admin/collections/contact-submissions',
    label: { en: 'Leads inbox', es: 'Bandeja de leads' }
  },
  {
    description: {
      en: 'Manage internal users and prepare role-based permissions.',
      es: 'Gestionar usuarios internos y preparar permisos por rol.'
    },
    href: '/admin/collections/users',
    label: { en: 'Users and roles', es: 'Usuarios y roles' }
  }
]

const contentFlow = {
  en: [
    'Complete Site Settings first: company, contact, brand, SEO and legal basics.',
    'Create or edit a page and define its page type and suggested template.',
    'Use the Menu tab only for simple automatic navigation and footer placement.',
    'Build the content with specific blocks before using Custom layout.',
    'Publish only when SEO, media alt text and contact recipients are ready.'
  ],
  es: [
    'Completar primero Configuración del sitio: empresa, contacto, marca, SEO y legales.',
    'Crear o editar una página y definir su tipo de página y plantilla sugerida.',
    'Usar la pestaña Menú solo para navegación automática simple y ubicación en footer.',
    'Construir el contenido con bloques específicos antes de usar Diseño personalizado.',
    'Publicar solo cuando SEO, alt de medios y destinatarios de contacto estén listos.'
  ]
}

const adminMap = {
  en: [
    'Website: pages, slugs, page presentation and automatic menu/footer placement.',
    'Content: media library with folders, tags, usage and video posters.',
    'Site Settings: company, brand, footer, contact, SEO, social links and legal text.',
    'Leads: inbox, lead status, priority, owners, notes and next actions.',
    'System: users and role metadata ready for granular permissions.'
  ],
  es: [
    'Sitio web: páginas, slugs, presentación y ubicación automática en menú/footer.',
    'Contenido: biblioteca de medios con carpetas, tags, uso y posters de video.',
    'Configuración: empresa, marca, footer, contacto, SEO, redes y legales.',
    'Leads: bandeja, estado, prioridad, responsables, notas y próximas acciones.',
    'Sistema: usuarios y metadatos de rol listos para permisos granulares.'
  ]
}

export function AdminDashboardClient() {
  const { i18n } = useTranslation()
  const language = i18n.language === 'en' ? 'en' : 'es'

  return (
    <main className="app-admin-dashboard">
      <section className="app-admin-dashboard__hero">
        <p className="app-admin-dashboard__eyebrow">
          {language === 'en' ? 'Website operations' : 'Operación del sitio'}
        </p>
        <h1>Site CMS</h1>
        <p>
          {language === 'en'
            ? 'Custom administration panel for publishing corporate websites, maintaining brand settings and following up leads without touching code.'
            : 'Panel administrativo personalizado para publicar sitios corporativos, mantener marca y dar seguimiento a leads sin tocar código.'}
        </p>
      </section>

      <section
        aria-labelledby="quick-actions-title"
        className="app-admin-dashboard__section"
      >
        <div className="app-admin-dashboard__section-heading">
          <p className="app-admin-dashboard__eyebrow">
            {language === 'en' ? 'Quick access' : 'Accesos rápidos'}
          </p>
          <h2 id="quick-actions-title">
            {language === 'en'
              ? 'Main administration'
              : 'Administración principal'}
          </h2>
        </div>
        <div className="app-admin-dashboard__grid">
          {quickActions.map((action) => (
            <a
              className="app-admin-dashboard__card"
              href={action.href}
              key={action.href}
            >
              <span>{action.label[language]}</span>
              <p>{action.description[language]}</p>
            </a>
          ))}
        </div>
      </section>

      <section className="app-admin-dashboard__split">
        <div>
          <p className="app-admin-dashboard__eyebrow">
            {language === 'en' ? 'Visual builder' : 'Constructor visual'}
          </p>
          <h2>
            {language === 'en'
              ? 'Recommended publishing flow'
              : 'Flujo recomendado de publicación'}
          </h2>
          <ol>
            {contentFlow[language].map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </div>
        <div>
          <p className="app-admin-dashboard__eyebrow">
            {language === 'en' ? 'Structure' : 'Estructura'}
          </p>
          <h2>{language === 'en' ? 'Admin map' : 'Mapa del admin'}</h2>
          <ul>
            {adminMap[language].map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  )
}
