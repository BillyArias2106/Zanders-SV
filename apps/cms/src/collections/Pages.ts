import type { CollectionConfig } from 'payload'

import { pageBuilderBlocks } from '../blocks/PageBuilderBlocks'
import { adminLabel, adminLabels } from '../lib/admin-i18n'

type PageSlugData = {
  slug?: string | null
  title?: string | null
}

const formatSlug = (value: string) =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/^\/+|\/+$/g, '')
    .replace(/[^a-z0-9/]+/g, '-')
    .replace(/\/+/g, '/')
    .replace(/-+/g, '-')
    .replace(/(^-|-$)/g, '')

export const Pages: CollectionConfig = {
  slug: 'pages',
  access: {
    read: ({ req }) =>
      req.user
        ? true
        : {
            status: {
              equals: 'published'
            }
          },
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user)
  },
  admin: {
    defaultColumns: [
      'title',
      'slug',
      'status',
      'showInMainNavigation',
      'navigationOrder',
      'updatedAt'
    ],
    group: adminLabel('Contenido', 'Content'),
    useAsTitle: 'title'
  },
  labels: adminLabels('Página', 'Páginas', 'Page', 'Pages'),
  hooks: {
    beforeValidate: [
      ({ data }) => {
        const pageData = data as PageSlugData | undefined

        if (!pageData) {
          return data
        }

        if (pageData.slug) {
          pageData.slug = formatSlug(pageData.slug)
          return pageData
        }

        if (pageData.title) {
          pageData.slug = formatSlug(pageData.title)
        }

        return pageData
      }
    ]
  },
  versions: {
    drafts: true
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: adminLabel('Contenido', 'Content'),
          fields: [
            {
              name: 'title',
              type: 'text',
              label: adminLabel('Título interno', 'Internal title'),
              localized: true,
              required: true
            },
            {
              name: 'excerpt',
              type: 'textarea',
              label: adminLabel('Resumen corto', 'Short summary'),
              localized: true,
              admin: {
                rows: 3
              }
            },
            {
              name: 'slug',
              type: 'text',
              label: 'Slug / URL',
              required: true,
              unique: true,
              admin: {
                description: adminLabel(
                  'Sin slash inicial. Ejemplos: servicios, proyectos, servicios/diseno-web.',
                  'Without initial slash. Examples: services, projects, services/web-design.'
                ),
                placeholder: 'servicios/diseno-web'
              }
            },
            {
              name: 'status',
              type: 'select',
              label: adminLabel('Estado de publicación', 'Publishing status'),
              required: true,
              defaultValue: 'draft',
              options: [
                { label: adminLabel('Borrador', 'Draft'), value: 'draft' },
                { label: adminLabel('Publicado', 'Published'), value: 'published' }
              ]
            },
            {
              name: 'featuredImage',
              type: 'upload',
              label: adminLabel('Imagen principal', 'Featured image'),
              relationTo: 'media',
              filterOptions: {
                mimeType: {
                  contains: 'image/'
                }
              }
            }
          ]
        },
        {
          label: adminLabel('Diseño / Secciones', 'Design / Sections'),
          fields: [
            {
              name: 'content',
              type: 'blocks',
              label: adminLabel('Constructor de página', 'Page builder'),
              localized: true,
              blocks: pageBuilderBlocks,
              labels: adminLabels('Bloque', 'Bloques', 'Block', 'Blocks'),
              admin: {
                description: adminLabel(
                  'Aquí se agregan los bloques visuales. "Diseño personalizado" aparece dentro de Agregar bloque; no pertenece al Menú Principal.',
                  'Add visual blocks here. "Custom layout" appears inside Add block; it is not part of the Main Menu.'
                )
              }
            }
          ]
        },
        {
          label: 'SEO',
          fields: [
            {
              name: 'seo',
              type: 'group',
              label: 'SEO',
              fields: [
                {
                  name: 'metaTitle',
                  type: 'text',
                  label: adminLabel('Título SEO', 'SEO title'),
                  localized: true
                },
                {
                  name: 'metaDescription',
                  type: 'textarea',
                  label: adminLabel('Descripción SEO', 'SEO description'),
                  localized: true,
                  admin: {
                    rows: 3
                  }
                },
                {
                  name: 'keywords',
                  type: 'textarea',
                  label: adminLabel('Palabras clave', 'Keywords'),
                  localized: true,
                  admin: {
                    description: adminLabel('Separar palabras clave con comas.', 'Separate keywords with commas.'),
                    rows: 3
                  }
                },
                {
                  name: 'ogImage',
                  type: 'upload',
                  label: adminLabel('Imagen OG', 'OG image'),
                  relationTo: 'media',
                  filterOptions: {
                    mimeType: {
                      contains: 'image/'
                    }
                  }
                }
              ]
            }
          ]
        },
        {
          label: adminLabel('Menú', 'Menu'),
          fields: [
            {
              name: 'showInMainNavigation',
              type: 'checkbox',
              label: adminLabel('Mostrar en menú principal', 'Show in main menu'),
              defaultValue: false,
              admin: {
                description: adminLabel(
                  'Actívalo para que esta página aparezca en el encabezado del sitio público.',
                  'Enable it so this page appears in the public site header.'
                )
              }
            },
            {
              name: 'navigationLabel',
              type: 'text',
              label: adminLabel('Texto visible en el menú', 'Visible menu text'),
              localized: true,
              admin: {
                condition: (_, siblingData) =>
                  Boolean(siblingData.showInMainNavigation),
                description: adminLabel(
                  'Opcional. Si queda vacío, se usará el título interno de la página.',
                  'Optional. If empty, the internal page title will be used.'
                )
              }
            },
            {
              name: 'parentPage',
              type: 'relationship',
              label: adminLabel(
                'Página padre / submenú de',
                'Parent page / submenu of'
              ),
              relationTo: 'pages',
              filterOptions: {
                showInMainNavigation: {
                  equals: true
                },
                status: {
                  equals: 'published'
                }
              },
              admin: {
                condition: (_, siblingData) =>
                  Boolean(siblingData.showInMainNavigation),
                description: adminLabel(
                  'Déjalo vacío para un elemento principal. Selecciona una página padre para convertir esta página en submenú.',
                  'Leave empty for a top-level item. Select a parent page to turn this page into a submenu.'
                )
              }
            },
            {
              name: 'showInFooter',
              type: 'checkbox',
              label: adminLabel(
                'Mostrar en pie de página automático',
                'Show in automatic footer'
              ),
              defaultValue: true,
              admin: {
                description: adminLabel(
                  'Si el pie de página usa "páginas publicadas automáticamente", esta página aparecerá cuando esté publicada.',
                  'If the footer uses "published pages automatically", this page will appear when published.'
                )
              }
            },
            {
              name: 'navigationOrder',
              type: 'number',
              label: adminLabel('Orden en menú y pie de página', 'Menu and footer order'),
              defaultValue: 0,
              admin: {
                description: adminLabel(
                  'Número menor aparece primero. Aplica para menú principal, submenús y pie de página automático.',
                  'Lower numbers appear first. Applies to main menu, submenus and automatic footer.'
                )
              }
            }
          ]
        }
      ]
    },
    {
      name: 'heroTitle',
      type: 'text',
      label: adminLabel('Título anterior de la portada', 'Previous hero title'),
      admin: {
        hidden: true
      }
    },
    {
      name: 'heroSubtitle',
      type: 'textarea',
      label: adminLabel('Subtítulo anterior de la portada', 'Previous hero subtitle'),
      admin: {
        hidden: true
      }
    },
    {
      name: 'videoBackground',
      type: 'upload',
      label: adminLabel('Video de fondo anterior', 'Previous background video'),
      relationTo: 'media',
      admin: {
        hidden: true
      }
    },
    {
      name: 'navbarLinks',
      type: 'array',
      label: adminLabel('Enlaces anteriores del menú', 'Previous menu links'),
      admin: {
        hidden: true
      },
      fields: [
        {
          name: 'label',
          type: 'text'
        },
        {
          name: 'href',
          type: 'text'
        },
        {
          name: 'openInNewTab',
          type: 'checkbox',
          defaultValue: false
        }
      ]
    }
  ]
}
