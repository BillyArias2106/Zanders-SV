import './admin-dashboard.css'

const quickActions = [
  {
    description: 'Crear páginas públicas y decidir si van en menú o submenú.',
    href: '/admin/collections/pages',
    label: 'Páginas y menú'
  },
  {
    description: 'Subir imágenes, SVGs y videos para bloques visuales.',
    href: '/admin/collections/media',
    label: 'Medios'
  },
  {
    description: 'Configurar columnas, links, contacto y textos legales.',
    href: '/admin/globals/footer-settings',
    label: 'Footer del sitio'
  },
  {
    description: 'Branding, redes sociales, contacto, SEO y datos generales.',
    href: '/admin/globals/company-settings',
    label: 'Configuración general'
  },
  {
    description: 'Revisar mensajes recibidos desde el formulario del sitio.',
    href: '/admin/collections/contact-submissions',
    label: 'Mensajes de contacto'
  },
  {
    description: 'Usuarios internos con acceso al panel administrativo.',
    href: '/admin/collections/users',
    label: 'Usuarios'
  }
]

const contentFlow = [
  'Crear o editar una página.',
  'Entrar al tab Menú y activar si aparece en el header.',
  'Elegir una página padre si será parte de un submenú.',
  'Entrar a Diseño / Layouts.',
  'Agregar el bloque Layout Personalizado.',
  'Elegir un layout, completar cajitas y publicar.'
]

export function AdminDashboard() {
  return (
    <main className="zanders-admin-dashboard">
      <section className="zanders-admin-dashboard__hero">
        <p className="zanders-admin-dashboard__eyebrow">CMS / CRM</p>
        <h1>Zanders SV</h1>
        <p>
          Panel operativo para contenido público, navegación, marca y
          estructura preparada para crecer hacia CRM.
        </p>
      </section>

      <section
        aria-labelledby="quick-actions-title"
        className="zanders-admin-dashboard__section"
      >
        <div className="zanders-admin-dashboard__section-heading">
          <p className="zanders-admin-dashboard__eyebrow">Accesos rápidos</p>
          <h2 id="quick-actions-title">Administración principal</h2>
        </div>
        <div className="zanders-admin-dashboard__grid">
          {quickActions.map((action) => (
            <a
              className="zanders-admin-dashboard__card"
              href={action.href}
              key={action.href}
            >
              <span>{action.label}</span>
              <p>{action.description}</p>
            </a>
          ))}
        </div>
      </section>

      <section className="zanders-admin-dashboard__split">
        <div>
          <p className="zanders-admin-dashboard__eyebrow">Page Builder</p>
          <h2>Flujo para usar Layout Personalizado</h2>
          <ol>
            {contentFlow.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </div>
        <div>
          <p className="zanders-admin-dashboard__eyebrow">Estructura</p>
          <h2>Grupos del admin</h2>
          <ul>
            <li>Contenido: Páginas, menú principal y Medios.</li>
            <li>Navegación: Footer del Sitio.</li>
            <li>Empresa: Configuración General.</li>
            <li>CRM: Mensajes de contacto.</li>
            <li>Sistema: Usuarios.</li>
          </ul>
        </div>
      </section>
    </main>
  )
}
