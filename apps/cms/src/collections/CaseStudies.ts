import type { CollectionConfig } from 'payload'

import { adminGroups } from '../lib/admin-groups'
import { adminLabel, adminLabels } from '../lib/admin-i18n'
import { formatPageSlug } from '../lib/page-composer'

type CaseStudyData = {
  client?: string | null
  slug?: string | null
  title?: string | null
}

const canManage = ({ req }: { req: { user?: unknown } }) => Boolean(req.user)

export const CaseStudies: CollectionConfig = {
  slug: 'case-studies',
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
    defaultColumns: ['title', 'client', '_status', 'updatedAt'],
    description: adminLabel(
      'Casos de exito reutilizables para alimentar secciones de prueba social.',
      'Reusable case studies for social proof sections.',
    ),
    group: adminGroups.content,
    useAsTitle: 'title',
  },
  labels: adminLabels('Caso de exito', 'Casos de exito', 'Case study', 'Case studies'),
  hooks: {
    beforeValidate: [({ data }) => {
      const caseStudy = data as CaseStudyData | undefined

      if (!caseStudy) {
        return data
      }

      if (caseStudy.slug?.trim()) {
        caseStudy.slug = formatPageSlug(caseStudy.slug)
      } else if (caseStudy.title?.trim()) {
        caseStudy.slug = formatPageSlug(caseStudy.title)
      }

      return caseStudy
    }],
  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: adminLabel('Titulo del caso', 'Case title'),
      localized: true,
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      label: 'Slug',
      unique: true,
      required: true,
    },
    {
      name: 'client',
      type: 'text',
      label: adminLabel('Cliente o proyecto', 'Client or project'),
      localized: true,
    },
    {
      name: 'summary',
      type: 'textarea',
      label: adminLabel('Resumen', 'Summary'),
      localized: true,
      admin: { rows: 3 },
    },
    {
      name: 'challenge',
      type: 'textarea',
      label: adminLabel('Reto', 'Challenge'),
      localized: true,
      admin: { rows: 3 },
    },
    {
      name: 'solution',
      type: 'textarea',
      label: adminLabel('Solucion', 'Solution'),
      localized: true,
      admin: { rows: 3 },
    },
    {
      name: 'result',
      type: 'text',
      label: adminLabel('Resultado destacado', 'Highlighted result'),
      localized: true,
    },
    {
      name: 'media',
      type: 'upload',
      label: adminLabel('Imagen principal', 'Main image'),
      relationTo: 'media',
      displayPreview: true,
      filterOptions: {
        mimeType: {
          contains: 'image/',
        },
      },
    },
    {
      name: 'url',
      type: 'text',
      label: adminLabel('Enlace publico opcional', 'Optional public link'),
    },
  ],
}
