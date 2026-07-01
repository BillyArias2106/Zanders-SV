import type { Field, GlobalConfig, TextFieldSingleValidation } from 'payload'

const hexColorPattern = /^#(?:[0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/

const validateHexColor: TextFieldSingleValidation = (value) => {
  if (!value) {
    return true
  }

  return (
    hexColorPattern.test(value) ||
    'Usa un color HEX válido, por ejemplo #0F172A.'
  )
}

const colorField = (
  name: string,
  label: string,
  defaultValue: string
): Field => ({
  name,
  type: 'text',
  label,
  required: true,
  defaultValue,
  admin: {
    components: {
      Field: {
        path: '@/components/ColorPickerField',
        exportName: 'ColorPickerField'
      }
    },
    description: 'Formato HEX. Ejemplo: #0F172A.',
    placeholder: defaultValue
  },
  validate: validateHexColor
})

const imageUploadField = (
  name: string,
  label: string,
  required = false
): Field => ({
  name,
  type: 'upload',
  label,
  relationTo: 'media',
  required,
  displayPreview: true,
  filterOptions: {
    mimeType: {
      contains: 'image/'
    }
  }
})

export const CompanySettings: GlobalConfig = {
  slug: 'company-settings',
  label: 'Configuración General',
  access: {
    read: () => true,
    update: ({ req }) => Boolean(req.user)
  },
  admin: {
    group: 'Empresa',
    description:
      'Información global de la empresa, branding, redes sociales, SEO y textos legales.'
  },
  typescript: {
    interface: 'CompanySettings'
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Información General',
          fields: [
            {
              name: 'commercialName',
              type: 'text',
              label: 'Nombre comercial',
              required: true,
              defaultValue: 'Zanders SV'
            },
            {
              name: 'legalName',
              type: 'text',
              label: 'Razón social'
            },
            {
              name: 'slogan',
              type: 'text',
              label: 'Eslogan',
              defaultValue: 'Ideas que toman forma. Tecnología que despega.'
            },
            {
              name: 'shortDescription',
              type: 'textarea',
              label: 'Descripción corta',
              admin: {
                rows: 3
              },
              defaultValue:
                'Fabricación, personalización, impresión profesional y soluciones aéreas con drones.'
            },
            {
              name: 'longDescription',
              type: 'textarea',
              label: 'Descripción larga',
              admin: {
                rows: 7
              }
            },
            {
              name: 'mainEmail',
              type: 'email',
              label: 'Correo principal'
            },
            {
              name: 'mainPhone',
              type: 'text',
              label: 'Teléfono principal',
              defaultValue: '+503 7934 7603'
            },
            {
              name: 'whatsapp',
              type: 'text',
              label: 'WhatsApp',
              defaultValue: '+503 7934 7603'
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
              name: 'countryCity',
              type: 'text',
              label: 'País / ciudad',
              defaultValue: 'El Salvador'
            },
            {
              name: 'businessHours',
              type: 'textarea',
              label: 'Horarios de atención',
              admin: {
                rows: 3
              }
            }
          ]
        },
        {
          label: 'Branding',
          fields: [
            imageUploadField('logoPrimary', 'Logo principal'),
            imageUploadField('logoSecondary', 'Logo secundario o alternativo'),
            imageUploadField('favicon', 'Favicon'),
            imageUploadField('ogImage', 'Imagen OG para redes sociales'),
            colorField('colorPrimary', 'Color primario', '#8DE1E8'),
            colorField('colorSecondary', 'Color secundario', '#1A6B80'),
            colorField('colorAccent', 'Color de acento', '#45ACBF'),
            colorField('colorBackground', 'Color de fondo', '#02080C'),
            colorField(
              'colorTextPrimary',
              'Color de texto principal',
              '#F8FAFC'
            ),
            colorField(
              'colorTextSecondary',
              'Color de texto secundario',
              '#C7D1D6'
            )
          ]
        },
        {
          label: 'Redes Sociales',
          fields: [
            {
              name: 'facebookUrl',
              type: 'text',
              label: 'Facebook'
            },
            {
              name: 'instagramUrl',
              type: 'text',
              label: 'Instagram'
            },
            {
              name: 'tiktokUrl',
              type: 'text',
              label: 'TikTok'
            },
            {
              name: 'linkedinUrl',
              type: 'text',
              label: 'LinkedIn'
            },
            {
              name: 'youtubeUrl',
              type: 'text',
              label: 'YouTube'
            },
            {
              name: 'twitterUrl',
              type: 'text',
              label: 'X / Twitter'
            },
            {
              name: 'whatsappUrl',
              type: 'text',
              label: 'WhatsApp link'
            }
          ]
        },
        {
          label: 'Contacto',
          fields: [
            {
              name: 'contactEyebrow',
              type: 'text',
              label: 'Texto pequeño',
              defaultValue: 'Pongámonos en contacto'
            },
            {
              name: 'contactHeadline',
              type: 'textarea',
              label: 'Título del contacto',
              defaultValue: '¡Trabajemos en una nueva visión de tu negocio!',
              admin: {
                rows: 3
              }
            },
            {
              name: 'contactIntro',
              type: 'textarea',
              label: 'Texto de apoyo',
              admin: {
                rows: 3
              }
            },
            {
              name: 'contactRecipients',
              type: 'array',
              label: 'Correos que reciben formularios',
              labels: {
                singular: 'Correo destinatario',
                plural: 'Correos destinatarios'
              },
              admin: {
                description:
                  'Puedes agregar varios correos. Cada mensaje del formulario se guardará en el admin y se enviará a estos correos.'
              },
              fields: [
                {
                  name: 'email',
                  type: 'email',
                  label: 'Correo',
                  required: true
                }
              ]
            }
          ]
        },
        {
          label: 'SEO',
          fields: [
            {
              name: 'defaultMetaTitle',
              type: 'text',
              label: 'Meta title por defecto',
              required: true,
              defaultValue: 'Zanders SV | Aero Solutions'
            },
            {
              name: 'defaultMetaDescription',
              type: 'textarea',
              label: 'Meta description por defecto',
              required: true,
              admin: {
                rows: 3
              },
              defaultValue:
                'Plataforma digital para Zanders SV y Zanders Aero Solutions: fabricación, personalización y soluciones aéreas con drones.'
            },
            {
              name: 'globalKeywords',
              type: 'textarea',
              label: 'Keywords globales',
              admin: {
                rows: 3,
                description: 'Separar palabras clave con comas.'
              }
            },
            {
              name: 'canonicalBaseUrl',
              type: 'text',
              label: 'URL canónica base',
              defaultValue: 'http://localhost:3000'
            }
          ]
        },
        {
          label: 'Legal',
          fields: [
            {
              name: 'copyrightText',
              type: 'text',
              label: 'Texto de copyright',
              defaultValue: '© Zanders SV. Todos los derechos reservados.'
            },
            {
              name: 'privacyPolicy',
              type: 'textarea',
              label: 'Políticas de privacidad',
              admin: {
                rows: 8
              }
            },
            {
              name: 'termsAndConditions',
              type: 'textarea',
              label: 'Términos y condiciones',
              admin: {
                rows: 8
              }
            },
            {
              name: 'footerLegalText',
              type: 'textarea',
              label: 'Texto legal del footer',
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
