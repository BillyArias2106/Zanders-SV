import type { Field, GlobalConfig } from 'payload'

import { adminLabel } from '../lib/admin-i18n'

type FooterColumnSiblingData = {
  contentType?:
    | 'contact'
    | 'customText'
    | 'mainNavigation'
    | 'manualLinks'
    | 'publishedPages'
    | 'socialLinks'
}

const imageFilter = {
  mimeType: {
    contains: 'image/'
  }
}

const manualLinkFields: Field[] = [
  {
    name: 'label',
    type: 'text',
    label: 'Texto visible',
    localized: true,
    required: true
  },
  {
    name: 'url',
    type: 'text',
    label: 'URL',
    required: true
  },
  {
    name: 'openInNewTab',
    type: 'checkbox',
    label: 'Abrir en nueva pestaña',
    defaultValue: false
  },
  {
    name: 'isActive',
    type: 'checkbox',
    label: 'Activo',
    defaultValue: true
  },
  {
    name: 'order',
    type: 'number',
    label: 'Orden',
    defaultValue: 0
  }
]

const showForColumnType =
  (contentType: FooterColumnSiblingData['contentType']) =>
  (_: unknown, siblingData: unknown) =>
    (siblingData as FooterColumnSiblingData).contentType === contentType

export const FooterSettings: GlobalConfig = {
  slug: 'footer-settings',
  label: adminLabel('Pie de página (legado)', 'Footer (legacy)'),
  access: {
    read: () => true,
    update: ({ req }) => Boolean(req.user)
  },
  admin: {
    group: false,
    hidden: true,
    description: adminLabel(
      'Compatibilidad con la configuración anterior del pie de página. El footer operativo ahora se administra desde Configuración del sitio.',
      'Compatibility with the previous footer settings. The active footer is now managed from Site Settings.'
    )
  },
  typescript: {
    interface: 'FooterSettings'
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Información general',
          fields: [
            {
              name: 'isEnabled',
              type: 'checkbox',
              label: 'Mostrar pie de página',
              defaultValue: true
            },
            {
              name: 'showLogo',
              type: 'checkbox',
              label: 'Mostrar logo',
              defaultValue: true
            },
            {
              name: 'logo',
              type: 'upload',
              label: 'Logo del pie de página',
              relationTo: 'media',
              displayPreview: true,
              filterOptions: imageFilter
            },
            {
              name: 'showCompanyName',
              type: 'checkbox',
              label: 'Mostrar nombre de empresa',
              defaultValue: true
            },
            {
              name: 'companyNameOverride',
              type: 'text',
              label: 'Nombre de empresa alternativo',
              localized: true
            },
            {
              name: 'shortDescription',
              type: 'textarea',
              label: 'Descripción corta',
              localized: true,
              admin: {
                rows: 3
              }
            },
            {
              name: 'additionalText',
              type: 'textarea',
              label: 'Texto adicional',
              localized: true,
              admin: {
                rows: 4
              }
            }
          ]
        },
        {
          label: 'Columnas',
          fields: [
            {
              name: 'columns',
              type: 'array',
              label: 'Columnas del pie de página',
              labels: {
                singular: 'Columna',
                plural: 'Columnas'
              },
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  label: 'Título',
                  localized: true,
                  required: true
                },
                {
                  name: 'contentType',
                  type: 'select',
                  label: 'Tipo de contenido',
                  required: true,
                  defaultValue: 'manualLinks',
                  options: [
                    {
                      label: 'Páginas publicadas automáticamente',
                      value: 'publishedPages'
                    },
                    { label: 'Menú principal', value: 'mainNavigation' },
                    { label: 'Enlaces manuales', value: 'manualLinks' },
                    { label: 'Redes sociales', value: 'socialLinks' },
                    { label: 'Contacto', value: 'contact' },
                    { label: 'Texto personalizado', value: 'customText' }
                  ]
                },
                {
                  name: 'customText',
                  type: 'textarea',
                  label: 'Texto personalizado',
                  localized: true,
                  admin: {
                    condition: showForColumnType('customText'),
                    rows: 5
                  }
                },
                {
                  name: 'links',
                  type: 'array',
                  label: 'Enlaces manuales',
                  labels: {
                    singular: 'Enlace',
                    plural: 'Enlaces'
                  },
                  admin: {
                    condition: showForColumnType('manualLinks')
                  },
                  fields: manualLinkFields
                },
                {
                  name: 'order',
                  type: 'number',
                  label: 'Orden',
                  defaultValue: 0
                },
                {
                  name: 'isActive',
                  type: 'checkbox',
                  label: 'Activo',
                  defaultValue: true
                }
              ]
            }
          ]
        },
        {
          label: 'Redes sociales',
          fields: [
            {
              name: 'socialLinks',
              type: 'array',
              label: 'Redes sociales visibles en pie de página',
              admin: {
                description:
                  'Opcional. Si no agregas redes aquí, el sitio usa las redes principales de Configuración General.'
              },
              labels: {
                singular: 'Red social',
                plural: 'Redes sociales'
              },
              fields: [
                {
                  name: 'name',
                  type: 'text',
                  label: 'Nombre',
                  localized: true,
                  required: true
                },
                {
                  name: 'type',
                  type: 'select',
                  label: 'Tipo',
                  required: true,
                  defaultValue: 'other',
                  options: [
                    { label: 'Facebook', value: 'facebook' },
                    { label: 'Instagram', value: 'instagram' },
                    { label: 'TikTok', value: 'tiktok' },
                    { label: 'LinkedIn', value: 'linkedin' },
                    { label: 'YouTube', value: 'youtube' },
                    { label: 'X / Twitter', value: 'twitter' },
                    { label: 'WhatsApp', value: 'whatsapp' },
                    { label: 'Sitio web', value: 'website' },
                    { label: 'Otro', value: 'other' }
                  ]
                },
                {
                  name: 'url',
                  type: 'text',
                  label: 'URL',
                  required: true
                },
                {
                  name: 'iconName',
                  type: 'text',
                  label: 'Ícono o nombre de ícono'
                },
                {
                  name: 'showInFooter',
                  type: 'checkbox',
                  label: 'Mostrar en pie de página',
                  defaultValue: true
                },
                {
                  name: 'showInHeader',
                  type: 'checkbox',
                  label: 'Mostrar en header',
                  defaultValue: false
                },
                {
                  name: 'openInNewTab',
                  type: 'checkbox',
                  label: 'Abrir en nueva pestaña',
                  defaultValue: true
                },
                {
                  name: 'isActive',
                  type: 'checkbox',
                  label: 'Activo',
                  defaultValue: true
                },
                {
                  name: 'order',
                  type: 'number',
                  label: 'Orden',
                  defaultValue: 0
                }
              ]
            }
          ]
        },
        {
          label: 'Contacto',
          fields: [
            {
              name: 'useCompanySettings',
              type: 'checkbox',
              label: 'Usar datos desde Configuración General',
              defaultValue: true
            },
            {
              name: 'email',
              type: 'email',
              label: 'Correo'
            },
            {
              name: 'phone',
              type: 'text',
              label: 'Teléfono'
            },
            {
              name: 'whatsapp',
              type: 'text',
              label: 'WhatsApp'
            },
            {
              name: 'address',
              type: 'textarea',
              label: 'Dirección',
              admin: {
                rows: 3
              }
            },
            {
              name: 'businessHours',
              type: 'textarea',
              label: 'Horarios',
              admin: {
                rows: 3
              }
            },
            {
              name: 'country',
              type: 'text',
              label: 'País'
            },
            {
              name: 'city',
              type: 'text',
              label: 'Ciudad'
            }
          ]
        },
        {
          label: 'Legal',
          fields: [
            {
              name: 'copyrightText',
              type: 'text',
              label: 'Copyright',
              localized: true
            },
            {
              name: 'privacyPage',
              type: 'relationship',
              label: 'Página de políticas de privacidad',
              relationTo: 'pages'
            },
            {
              name: 'termsPage',
              type: 'relationship',
              label: 'Página de términos y condiciones',
              relationTo: 'pages'
            },
            {
              name: 'legalText',
              type: 'textarea',
              label: 'Texto legal personalizado',
              localized: true,
              admin: {
                rows: 4
              }
            }
          ]
        }
      ]
    }
  ]
}
