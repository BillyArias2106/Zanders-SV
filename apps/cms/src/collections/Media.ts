import type { CollectionConfig } from 'payload'

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
    group: 'Contenido',
    useAsTitle: 'alt'
  },
  labels: {
    singular: 'Medio',
    plural: 'Medios'
  },
  upload: {
    staticDir: 'media',
    mimeTypes: allowedMimeTypes
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      label: 'Texto alternativo',
      required: true
    },
    {
      name: 'caption',
      type: 'text',
      label: 'Caption'
    },
    {
      name: 'mediaType',
      type: 'select',
      label: 'Tipo de media',
      required: true,
      defaultValue: 'image',
      options: [
        { label: 'Imagen', value: 'image' },
        { label: 'Video', value: 'video' },
        { label: 'Otro', value: 'other' }
      ]
    },
    {
      name: 'poster',
      type: 'upload',
      label: 'Poster / thumbnail para video',
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
      label: 'Descripción',
      admin: {
        rows: 3
      }
    }
  ]
}
