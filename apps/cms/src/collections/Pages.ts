import type { CollectionConfig } from 'payload'

import { pageBuilderBlocks } from '../blocks/PageBuilderBlocks'

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
    group: 'Contenido',
    useAsTitle: 'title'
  },
  labels: {
    singular: 'Página',
    plural: 'Páginas'
  },
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
          label: 'Contenido',
          fields: [
            {
              name: 'title',
              type: 'text',
              label: 'Título interno',
              required: true
            },
            {
              name: 'excerpt',
              type: 'textarea',
              label: 'Resumen corto',
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
                description:
                  'Sin slash inicial. Ejemplos: impresiones, drones, servicios/diseno-web.',
                placeholder: 'servicios/diseno-web'
              }
            },
            {
              name: 'status',
              type: 'select',
              label: 'Estado de publicación',
              required: true,
              defaultValue: 'draft',
              options: [
                { label: 'Borrador', value: 'draft' },
                { label: 'Publicado', value: 'published' }
              ]
            },
            {
              name: 'featuredImage',
              type: 'upload',
              label: 'Imagen principal',
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
          label: 'Diseño / Layouts',
          fields: [
            {
              name: 'content',
              type: 'blocks',
              label: 'Constructor de página',
              blocks: pageBuilderBlocks,
              labels: {
                singular: 'Bloque',
                plural: 'Bloques'
              },
              admin: {
                description:
                  'Aquí se agregan los bloques visuales. SnapLayout aparece como "Layout Personalizado" dentro de Agregar bloque; no pertenece al Menú Principal.'
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
                  label: 'Meta title'
                },
                {
                  name: 'metaDescription',
                  type: 'textarea',
                  label: 'Meta description',
                  admin: {
                    rows: 3
                  }
                },
                {
                  name: 'keywords',
                  type: 'textarea',
                  label: 'Keywords',
                  admin: {
                    description: 'Separar palabras clave con comas.',
                    rows: 3
                  }
                },
                {
                  name: 'ogImage',
                  type: 'upload',
                  label: 'Imagen OG',
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
          label: 'Menú',
          fields: [
            {
              name: 'showInMainNavigation',
              type: 'checkbox',
              label: 'Mostrar en menú principal',
              defaultValue: false,
              admin: {
                description:
                  'Actívalo para que esta página aparezca en el header del sitio público.'
              }
            },
            {
              name: 'navigationLabel',
              type: 'text',
              label: 'Texto visible en el menú',
              admin: {
                condition: (_, siblingData) =>
                  Boolean(siblingData.showInMainNavigation),
                description:
                  'Opcional. Si queda vacío, se usará el título interno de la página.'
              }
            },
            {
              name: 'parentPage',
              type: 'relationship',
              label: 'Página padre / submenú de',
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
                description:
                  'Déjalo vacío para un elemento principal. Selecciona una página padre para convertir esta página en submenú.'
              }
            },
            {
              name: 'showInFooter',
              type: 'checkbox',
              label: 'Mostrar en footer automático',
              defaultValue: true,
              admin: {
                description:
                  'Si el footer usa "páginas publicadas automáticamente", esta página aparecerá cuando esté publicada.'
              }
            },
            {
              name: 'navigationOrder',
              type: 'number',
              label: 'Orden en menú y footer',
              defaultValue: 0,
              admin: {
                description:
                  'Número menor aparece primero. Aplica para menú principal, submenús y footer automático.'
              }
            }
          ]
        }
      ]
    },
    {
      name: 'heroTitle',
      type: 'text',
      label: 'Legacy hero title',
      admin: {
        hidden: true
      }
    },
    {
      name: 'heroSubtitle',
      type: 'textarea',
      label: 'Legacy hero subtitle',
      admin: {
        hidden: true
      }
    },
    {
      name: 'videoBackground',
      type: 'upload',
      label: 'Legacy video background',
      relationTo: 'media',
      admin: {
        hidden: true
      }
    },
    {
      name: 'navbarLinks',
      type: 'array',
      label: 'Legacy navbar links',
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
