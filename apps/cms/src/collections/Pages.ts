import type { CollectionConfig } from 'payload'

import { contentSlices } from '../blocks/ContentSlices'
import { adminGroups } from '../lib/admin-groups'
import { adminLabel, adminLabels } from '../lib/admin-i18n'
import { formatPageSlug } from '../lib/page-composer'

type PageData = {
  _status?: 'draft' | 'published'
  navigationLabel?: string | null
  pageType?: string | null
  sections?: unknown
  slug?: string | null
  title?: string | null
}

const getWebPublicUrl = () =>
  (process.env.WEB_PUBLIC_URL ?? 'http://localhost:3000').replace(/\/$/, '')

const getPagePath = (slug: unknown) => {
  const normalizedSlug = typeof slug === 'string' ? formatPageSlug(slug) : ''

  return normalizedSlug === 'home' || normalizedSlug === 'inicio'
    ? '/'
    : `/${normalizedSlug || 'vista-previa'}`
}

const getPublicPageUrl = (data: Record<string, unknown>) => {
  const previewUrl = new URL(getPagePath(data.slug), getWebPublicUrl())
  previewUrl.searchParams.set('cmsPreview', 'page')

  return previewUrl.toString()
}

const getSections = (value: unknown) =>
  Array.isArray(value) ? value.filter((section) => section && typeof section === 'object') : []

const hasEnabledSection = (value: unknown) =>
  getSections(value).some((section) => (section as { enabled?: unknown }).enabled !== false)

const validatePublishedPage = ({ data }: { data: unknown }) => {
  const page = data as PageData | undefined

  if (!page || page._status !== 'published') {
    return data
  }

  const missing = [
    !page.title?.trim() ? 'el nombre de la pagina' : null,
    !page.slug?.trim() ? 'la URL de la pagina' : null,
    !hasEnabledSection(page.sections) ? 'al menos una seccion activa' : null,
  ].filter((item): item is string => Boolean(item))

  if (missing.length > 0) {
    throw new Error(`Antes de publicar completa ${missing.join(', ')}.`)
  }

  return data
}

export const Pages: CollectionConfig = {
  slug: 'pages',
  access: {
    create: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
    read: ({ req }) =>
      req.user
        ? true
        : {
            _status: {
              equals: 'published',
            },
          },
    update: ({ req }) => Boolean(req.user),
  },
  admin: {
    defaultColumns: ['title', 'slug', 'showInNavigation', '_status', 'updatedAt'],
    description: adminLabel(
      'Crea paginas de forma simple: primero secciones, despues informacion de pagina, menu y publicacion.',
      'Create pages simply: sections first, then page info, menu and publishing.',
    ),
    group: adminGroups.website,
    livePreview: {
      breakpoints: [
        { height: 900, label: 'Desktop', name: 'desktop', width: 1440 },
        { height: 900, label: 'Tablet', name: 'tablet', width: 768 },
        { height: 844, label: 'Mobile', name: 'mobile', width: 390 },
      ],
      url: ({ data }) => getPublicPageUrl(data),
    },
    preview: (doc) => getPublicPageUrl(doc),
    useAsTitle: 'title',
  },
  labels: adminLabels('Pagina', 'Paginas', 'Page', 'Pages'),
  hooks: {
    beforeChange: [validatePublishedPage],
    beforeValidate: [({ data }) => {
      const page = data as PageData | undefined

      if (!page) {
        return data
      }

      if (page.slug?.trim()) {
        page.slug = formatPageSlug(page.slug)
      } else if (page.title?.trim()) {
        page.slug = formatPageSlug(page.title)
      }

      if (!page.navigationLabel?.trim() && page.title?.trim()) {
        page.navigationLabel = page.title
      }

      return page
    }],
  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: 'pagePreview',
      type: 'ui',
      admin: {
        position: 'sidebar',
        components: {
          Field: {
            path: '@/components/admin/PagePreviewPanel',
            exportName: 'PagePreviewPanel',
          },
        },
      },
    },
    {
      type: 'collapsible',
      label: adminLabel('1. Secciones de la pagina', '1. Page sections'),
      admin: { initCollapsed: false },
      fields: [
        {
          name: 'pageType',
          type: 'select',
          label: adminLabel('Tipo de pagina', 'Page type'),
          defaultValue: 'home',
          options: [
            { label: adminLabel('Inicio', 'Home'), value: 'home' },
            { label: 'Landing page', value: 'landing' },
            { label: adminLabel('Servicio', 'Service'), value: 'service' },
            { label: adminLabel('Producto', 'Product'), value: 'product' },
            { label: adminLabel('Institucional', 'Institutional'), value: 'institutional' },
            { label: adminLabel('Noticias', 'News'), value: 'news' },
            { label: adminLabel('Educacion', 'Education'), value: 'education' },
            { label: adminLabel('Evento', 'Event'), value: 'event' },
            { label: 'Contacto', value: 'contact' },
            { label: adminLabel('Pagina libre', 'Free page'), value: 'free' },
          ],
          admin: {
            description: adminLabel(
              'Define que recomendaciones veras abajo. No agrega secciones automaticamente.',
              'Defines the recommendations shown below. It does not add sections automatically.',
            ),
          },
        },
        {
          name: 'pageSectionGuide',
          type: 'ui',
          admin: {
            components: {
              Field: {
                path: '@/components/admin/PageSectionGuideField',
                exportName: 'PageSectionGuideField',
              },
            },
          },
        },
        {
          name: 'sections',
          type: 'blocks',
          label: adminLabel('Escribe las secciones de contenido', 'Write content sections'),
          localized: true,
          blocks: contentSlices,
          labels: adminLabels('Seccion', 'Secciones', 'Section', 'Sections'),
          admin: {
            description: adminLabel(
              'Agrega slices de contenido puro. No hay configuracion visual: el sitio decide el diseno automaticamente.',
              'Add pure content slices. There is no visual configuration: the site decides the design automatically.',
            ),
            initCollapsed: false,
          },
        },
      ],
    },
    {
      type: 'collapsible',
      label: adminLabel('2. Informacion de la pagina', '2. Page information'),
      admin: { initCollapsed: false },
      fields: [
        {
          name: 'title',
          type: 'text',
          label: adminLabel('Nombre de la pagina', 'Page name'),
          localized: true,
          required: true,
          admin: {
            description: adminLabel(
              'Este nombre tambien sirve como base para la URL si la dejas vacia.',
              'This name is also used as the URL base if you leave it empty.',
            ),
          },
        },
        {
          name: 'slug',
          type: 'text',
          label: adminLabel('URL de la pagina', 'Page URL'),
          unique: true,
          required: true,
          admin: {
            description: adminLabel(
              'Ejemplo: servicios/diseno-web. Para la pagina principal usa inicio.',
              'Example: services/web-design. For the home page use home.',
            ),
            placeholder: 'servicios/diseno-web',
          },
        },
      ],
    },
    {
      type: 'collapsible',
      label: adminLabel('3. Menu y ubicacion', '3. Menu and placement'),
      admin: { initCollapsed: false },
      fields: [
        {
          name: 'showInNavigation',
          type: 'checkbox',
          label: adminLabel('Mostrar en el menu del sitio', 'Show in site menu'),
          defaultValue: false,
          admin: {
            description: adminLabel(
              'Activalo si esta pagina debe aparecer en la barra principal.',
              'Enable this if the page should appear in the main navigation.',
            ),
          },
        },
        {
          name: 'parentPage',
          type: 'relationship',
          label: adminLabel('Pagina padre si sera subpagina', 'Parent page if this is a subpage'),
          relationTo: 'pages',
          admin: {
            description: adminLabel(
              'Dejalo vacio si sera una pagina principal. Elige una pagina padre si debe vivir dentro de otra.',
              'Leave empty for a main page. Choose a parent page if it should live inside another one.',
            ),
          },
          filterOptions: ({ id }) => ({
            id: {
              not_equals: id,
            },
          }),
        },
        {
          name: 'navigationLabel',
          type: 'text',
          label: adminLabel('Texto corto para el menu', 'Short menu text'),
          localized: true,
          admin: {
            description: adminLabel(
              'Si lo dejas vacio se usa el nombre de la pagina.',
              'If empty, the page name is used.',
            ),
          },
        },
        {
          name: 'navigationOrder',
          type: 'number',
          label: adminLabel('Orden en el menu', 'Menu order'),
          defaultValue: 0,
          admin: {
            description: adminLabel('Los numeros menores aparecen primero.', 'Lower numbers appear first.'),
          },
        },
      ],
    },
    {
      type: 'collapsible',
      label: adminLabel('Opcional: SEO y compartir', 'Optional: SEO and sharing'),
      admin: { initCollapsed: true },
      fields: [
        {
          name: 'seo',
          type: 'group',
          label: adminLabel('Configuracion SEO', 'SEO settings'),
          fields: [
            {
              name: 'metaTitle',
              type: 'text',
              label: adminLabel('Titulo SEO personalizado', 'Custom SEO title'),
              localized: true,
            },
            {
              name: 'metaDescription',
              type: 'textarea',
              label: adminLabel('Descripcion SEO personalizada', 'Custom SEO description'),
              localized: true,
              admin: { rows: 3 },
            },
            {
              name: 'ogImage',
              type: 'upload',
              label: adminLabel('Imagen al compartir', 'Sharing image'),
              relationTo: 'media',
              displayPreview: true,
              filterOptions: {
                mimeType: { contains: 'image/' },
              },
            },
            {
              name: 'noIndex',
              type: 'checkbox',
              label: adminLabel('No indexar en buscadores', 'Do not index in search engines'),
              defaultValue: false,
            },
          ],
        },
      ],
    },
  ],
}
