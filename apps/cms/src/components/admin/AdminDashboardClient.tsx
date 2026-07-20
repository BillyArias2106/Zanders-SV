'use client'

import { useTranslation } from '@payloadcms/ui'

import './admin-dashboard.css'

const quickActions = [
  {
    description: {
      en: 'Choose a goal, apply a guided recipe and publish pages that keep the brand consistent.',
      es: 'Elegir un objetivo, aplicar una receta guiada y publicar páginas consistentes con la marca.'
    },
    href: '/admin/collections/pages',
    label: { en: 'Create pages', es: 'Crear páginas' }
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
    'Organize the media library so the new admin has approved assets from day one.',
    'Create a page from a goal and recipe, then use the quality guide before publishing.',
    'Review incoming leads and improve pages from what real customers ask for.'
  ],
  es: [
    'Completar primero Configuración del sitio: empresa, contacto, marca, SEO y legales.',
    'Organizar la biblioteca de medios para que el nuevo admin arranque con recursos aprobados.',
    'Crear una página desde un objetivo y una receta, luego usar la guía de calidad antes de publicar.',
    'Revisar los leads entrantes y mejorar las páginas según lo que preguntan los clientes.'
  ]
}

const adminMap = {
  en: [
    'Pages: guided recipes, safe sections, visual direction, quality checks and preview.',
    'Content: media library with folders, tags, usage and video posters.',
    'Site Settings: company, brand, contact, SEO, social links and legal text.',
    'Leads: inbox, lead status, priority, owners, notes and next actions.',
    'System: users and role metadata ready for granular permissions.'
  ],
  es: [
    'Páginas: recetas guiadas, secciones seguras, estilo visual, calidad y vista previa.',
    'Contenido: biblioteca de medios con carpetas, tags, uso y posters de video.',
    'Configuración: empresa, marca, contacto, SEO, redes y legales.',
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
          {language === 'en' ? 'Guided publishing' : 'Publicación guiada'}
        </p>
        <h1>Site CMS</h1>
        <p>
          {language === 'en'
            ? 'Create polished pages from a business goal, not from an empty canvas. The system protects clarity, brand consistency and conversion.'
            : 'Crea páginas profesionales desde un objetivo de negocio, no desde un lienzo vacío. El sistema protege claridad, consistencia de marca y conversión.'}
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
            {language === 'en' ? 'Fresh start' : 'Nuevo comienzo'}
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
