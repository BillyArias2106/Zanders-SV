import type {
  Field,
  GlobalConfig,
  RelationshipFieldSingleValidation,
  TextFieldSingleValidation
} from 'payload'

type NavigationSiblingData = {
  linkType?: 'anchor' | 'container' | 'external' | 'page'
}

const validateManualUrl: TextFieldSingleValidation = (
  value,
  { siblingData }
) => {
  const { linkType } = siblingData as NavigationSiblingData

  if (!value) {
    return linkType === 'external' || linkType === 'anchor'
      ? 'Este tipo de enlace necesita una URL o ancla.'
      : true
  }

  if (linkType === 'external') {
    return (
      /^https?:\/\//.test(value) ||
      'Usa una URL externa válida con http:// o https://.'
    )
  }

  if (linkType === 'anchor') {
    return (
      value.startsWith('#') ||
      value.includes('#') ||
      'Usa un ancla válida, por ejemplo #contacto o /servicios#contacto.'
    )
  }

  return true
}

const validatePageRelationship: RelationshipFieldSingleValidation = (
  value,
  { siblingData }
) => {
  const { linkType } = siblingData as NavigationSiblingData

  return linkType === 'page' && !value
    ? 'Selecciona una página publicada.'
    : true
}

const linkTypeField: Field = {
  name: 'linkType',
  type: 'select',
  label: 'Tipo de enlace',
  required: true,
  defaultValue: 'page',
  options: [
    { label: 'Página interna', value: 'page' },
    { label: 'URL externa', value: 'external' },
    { label: 'Ancla dentro de página', value: 'anchor' },
    { label: 'Solo contenedor', value: 'container' }
  ]
}

const baseNavigationItemFields: Field[] = [
  {
    name: 'label',
    type: 'text',
    label: 'Label visible',
    required: true
  },
  linkTypeField,
  {
    name: 'page',
    type: 'relationship',
    label: 'Página interna',
    relationTo: 'pages',
    filterOptions: {
      status: {
        equals: 'published'
      }
    },
    admin: {
      condition: (_, siblingData) =>
        (siblingData as NavigationSiblingData).linkType === 'page',
      description: 'Solo se pueden seleccionar páginas publicadas.'
    },
    validate: validatePageRelationship
  },
  {
    name: 'manualUrl',
    type: 'text',
    label: 'URL manual / ancla',
    admin: {
      condition: (_, siblingData) => {
        const { linkType } = siblingData as NavigationSiblingData

        return linkType === 'external' || linkType === 'anchor'
      },
      placeholder: 'https://example.com o #contacto'
    },
    validate: validateManualUrl
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
    defaultValue: 0,
    admin: {
      description:
        'También puedes reordenar arrastrando. Este número ayuda a ordenar de forma explícita.'
    }
  }
]

export const MainNavigation: GlobalConfig = {
  slug: 'main-navigation',
  label: 'Menú Principal',
  access: {
    read: () => true,
    update: ({ req }) => Boolean(req.user)
  },
  admin: {
    group: false,
    hidden: true,
    description:
      'Compatibilidad para menús manuales anteriores. El menú principal ahora se administra desde Páginas.'
  },
  typescript: {
    interface: 'MainNavigation'
  },
  fields: [
    {
      name: 'items',
      type: 'array',
      label: 'Elementos del menú',
      labels: {
        singular: 'Elemento',
        plural: 'Elementos'
      },
      fields: [
        ...baseNavigationItemFields,
        {
          name: 'children',
          type: 'array',
          label: 'Submenú',
          labels: {
            singular: 'Submenú',
            plural: 'Submenús'
          },
          fields: baseNavigationItemFields
        }
      ]
    }
  ]
}
