'use client'

import { useTranslation } from '@payloadcms/ui'

import './admin-dashboard.css'

const quickActions = [
  {
    description: {
      en: 'Create public pages and decide if they appear in the menu or submenu.',
      es: 'Crear páginas públicas y decidir si van en menú o submenú.'
    },
    href: '/admin/collections/pages',
    label: { en: 'Pages and menu', es: 'Páginas y menú' }
  },
  {
    description: {
      en: 'Upload images, SVGs and videos for visual blocks.',
      es: 'Subir imágenes, SVGs y videos para bloques visuales.'
    },
    href: '/admin/collections/media',
    label: { en: 'Media', es: 'Medios' }
  },
  {
    description: {
      en: 'Brand, footer, social links, contact, SEO and general details.',
      es: 'Marca, pie de página, redes sociales, contacto, SEO y datos generales.'
    },
    href: '/admin/globals/company-settings',
    label: { en: 'General settings', es: 'Configuración general' }
  },
  {
    description: {
      en: 'Review messages received from the site form.',
      es: 'Revisar mensajes recibidos desde el formulario del sitio.'
    },
    href: '/admin/collections/contact-submissions',
    label: { en: 'Contact messages', es: 'Mensajes de contacto' }
  },
  {
    description: {
      en: 'Internal users with access to the admin panel.',
      es: 'Usuarios internos con acceso al panel administrativo.'
    },
    href: '/admin/collections/users',
    label: { en: 'Users', es: 'Usuarios' }
  }
]

const contentFlow = {
  en: [
    'Create or edit a page.',
    'Open the Menu tab and enable it if it appears in the top navigation.',
    'Choose a parent page if it belongs inside a submenu.',
    'Open Design / Sections.',
    'Add the Custom layout block.',
    'Choose a layout, complete the boxes and publish.'
  ],
  es: [
    'Crear o editar una página.',
    'Entrar a la pestaña Menú y activar si aparece en la navegación superior.',
    'Elegir una página padre si será parte de un submenú.',
    'Entrar a Diseño / Secciones.',
    'Agregar el bloque Diseño personalizado.',
    'Elegir un diseño, completar cajas y publicar.'
  ]
}

export function AdminDashboardClient() {
  const { i18n } = useTranslation()
  const language = i18n.language === 'en' ? 'en' : 'es'

  return (
    <main className="app-admin-dashboard">
      <section className="app-admin-dashboard__hero">
        <p className="app-admin-dashboard__eyebrow">
          {language === 'en' ? 'Content / Messages' : 'Contenido / Mensajes'}
        </p>
        <h1>New Site</h1>
        <p>
          {language === 'en'
            ? 'Operational panel for public content, navigation, brand and a structure ready to grow with customer follow-up.'
            : 'Panel operativo para contenido público, navegación, marca y estructura preparada para crecer con seguimiento de clientes.'}
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
              ? 'Flow for using Custom layout'
              : 'Flujo para usar Diseño personalizado'}
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
          <h2>{language === 'en' ? 'Admin groups' : 'Grupos del admin'}</h2>
          <ul>
            <li>
              {language === 'en'
                ? 'Content: Pages, main menu and Media.'
                : 'Contenido: Páginas, menú principal y Medios.'}
            </li>
            <li>
              {language === 'en'
                ? 'Company: General Settings and Footer.'
                : 'Empresa: Configuración General y Pie de página.'}
            </li>
            <li>
              {language === 'en'
                ? 'Messages: Received contact forms.'
                : 'Mensajes: Formularios de contacto recibidos.'}
            </li>
            <li>
              {language === 'en' ? 'System: Users.' : 'Sistema: Usuarios.'}
            </li>
          </ul>
        </div>
      </section>
    </main>
  )
}
