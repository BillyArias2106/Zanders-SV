import type { CollectionConfig } from 'payload'

import { adminGroups } from '../lib/admin-groups'
import { adminLabel, adminLabels } from '../lib/admin-i18n'

const canManage = ({ req }: { req: { user?: unknown } }) => Boolean(req.user)

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  access: {
    create: canManage,
    delete: canManage,
    read: ({ req }) =>
      req.user
        ? true
        : {
            _status: {
              equals: 'published',
            },
          },
    update: canManage,
  },
  admin: {
    defaultColumns: ['name', 'role', 'featured', '_status', 'updatedAt'],
    description: adminLabel(
      'Testimonios reutilizables para secciones de confianza y conversion.',
      'Reusable testimonials for trust and conversion sections.',
    ),
    group: adminGroups.content,
    useAsTitle: 'name',
  },
  labels: adminLabels('Testimonio', 'Testimonios', 'Testimonial', 'Testimonials'),
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: 'quote',
      type: 'textarea',
      label: adminLabel('Testimonio', 'Quote'),
      localized: true,
      required: true,
      admin: { rows: 4 },
    },
    {
      name: 'name',
      type: 'text',
      label: adminLabel('Nombre', 'Name'),
      localized: true,
      required: true,
    },
    {
      name: 'role',
      type: 'text',
      label: adminLabel('Cargo, empresa o contexto', 'Role, company or context'),
      localized: true,
    },
    {
      name: 'media',
      type: 'upload',
      label: adminLabel('Foto o logo', 'Photo or logo'),
      relationTo: 'media',
      displayPreview: true,
      filterOptions: {
        mimeType: {
          contains: 'image/',
        },
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      label: adminLabel('Destacado', 'Featured'),
      defaultValue: false,
    },
    {
      name: 'url',
      type: 'text',
      label: adminLabel('Enlace opcional', 'Optional link'),
    },
  ],
}
