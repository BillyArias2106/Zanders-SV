import type { CollectionConfig } from 'payload'

import { adminLabel, adminLabels } from '../lib/admin-i18n'

const allowedMimeTypes = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/svg+xml',
  'video/mp4',
  'video/webm',
  'video/quicktime'
]

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true
  },
  admin: {
    group: adminLabel('Contenido', 'Content'),
    useAsTitle: 'alt'
  },
  labels: adminLabels('Medio', 'Medios', 'Media item', 'Media'),
  upload: {
    staticDir: 'media',
    mimeTypes: allowedMimeTypes
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      label: adminLabel('Texto alternativo', 'Alternative text'),
      localized: true,
      required: true
    },
    {
      name: 'caption',
      type: 'text',
      label: adminLabel('Texto corto', 'Short text'),
      localized: true
    },
    {
      name: 'mediaType',
      type: 'select',
      label: adminLabel('Tipo de medio', 'Media type'),
      required: true,
      defaultValue: 'image',
      options: [
        { label: adminLabel('Imagen', 'Image'), value: 'image' },
        { label: 'Video', value: 'video' },
        { label: adminLabel('Otro', 'Other'), value: 'other' }
      ]
    },
    {
      name: 'poster',
      type: 'upload',
      label: adminLabel('Imagen de portada para video', 'Video poster image'),
      relationTo: 'media',
      displayPreview: true,
      filterOptions: {
        mimeType: {
          contains: 'image/'
        }
      },
      admin: {
        condition: (_, siblingData) =>
          (siblingData as { mediaType?: string }).mediaType === 'video'
      }
    },
    {
      name: 'description',
      type: 'textarea',
      label: adminLabel('Descripción', 'Description'),
      localized: true,
      admin: {
        rows: 3
      }
    }
  ]
}
