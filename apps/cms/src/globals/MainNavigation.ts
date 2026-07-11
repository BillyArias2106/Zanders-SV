import type {
  Field,
  GlobalConfig,
  RelationshipFieldSingleValidation,
  TextFieldSingleValidation
} from 'payload'

import { adminLabel, adminLabels } from '../lib/admin-i18n'

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
  label: adminLabel('Tipo de enlace', 'Link type'),
  required: true,
  defaultValue: 'page',
  options: [
    { label: adminLabel('Página interna', 'Internal page'), value: 'page' },
    { label: adminLabel('URL externa', 'External URL'), value: 'external' },
    {
      label: adminLabel('Ancla dentro de página', 'Page anchor'),
      value: 'anchor'
    },
    {
      label: adminLabel('Solo contenedor', 'Container only'),
      value: 'container'
    }
  ]
}

const baseNavigationItemFields: Field[] = [
  {
    name: 'label',
    type: 'text',
    label: adminLabel('Texto visible', 'Visible text'),
    localized: true,
    required: true
  },
  linkTypeField,
  {
    name: 'page',
    type: 'relationship',
    label: adminLabel('Página interna', 'Internal page'),
    relationTo: 'pages',
    filterOptions: {
      status: {
        equals: 'published'
      }
    },
    admin: {
      condition: (_, siblingData) =>
        (siblingData as NavigationSiblingData).linkType === 'page',
      description: adminLabel(
        'Solo se pueden seleccionar páginas publicadas.',
        'Only published pages can be selected.'
      )
    },
    validate: validatePageRelationship
  },
  {
    name: 'manualUrl',
    type: 'text',
    label: adminLabel('URL manual / ancla', 'Manual URL / anchor'),
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
    label: adminLabel('Abrir en nueva pestaña', 'Open in new tab'),
    defaultValue: false
  },
  {
    name: 'isActive',
    type: 'checkbox',
    label: adminLabel('Activo', 'Active'),
    defaultValue: true
  },
  {
    name: 'order',
    type: 'number',
    label: adminLabel('Orden', 'Order'),
    defaultValue: 0,
    admin: {
      description: adminLabel(
        'También puedes reordenar arrastrando. Este número ayuda a ordenar de forma explícita.',
        'You can also reorder by dragging. This number helps set an explicit order.'
      )
    }
  }
]

export const MainNavigation: GlobalConfig = {
  slug: 'main-navigation',
  label: adminLabel('Menú principal (legado)', 'Main menu (legacy)'),
  access: {
    read: () => true,
    update: ({ req }) => Boolean(req.user)
  },
  admin: {
    group: false,
    hidden: true,
    description: adminLabel(
      'Compatibilidad para menús manuales anteriores. El menú principal operativo ahora se administra desde Páginas.',
      'Compatibility with previous manual menus. The active main menu is now managed from Pages.'
    )
  },
  typescript: {
    interface: 'MainNavigation'
  },
  fields: [
    {
      name: 'items',
      type: 'array',
      label: adminLabel('Elementos del menú', 'Menu items'),
      labels: adminLabels('Elemento', 'Elementos', 'Item', 'Items'),
      fields: [
        ...baseNavigationItemFields,
        {
          name: 'children',
          type: 'array',
          label: adminLabel('Submenú', 'Submenu'),
          labels: adminLabels('Submenú', 'Submenús', 'Submenu', 'Submenus'),
          fields: baseNavigationItemFields
        }
      ]
    }
  ]
}
