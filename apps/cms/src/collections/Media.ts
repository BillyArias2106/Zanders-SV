import type { CollectionConfig } from 'payload'

import { adminGroups } from '../lib/admin-groups'
import { adminLabel, adminLabels } from '../lib/admin-i18n'

const allowedMimeTypes = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/svg+xml',
  'application/pdf',
  'video/mp4',
  'video/webm',
  'video/quicktime'
]

type MediaFieldSiblingData = {
  mediaType?: string
}

type MediaData = {
  mediaType?: string
  mimeType?: string
  usageType?: string
}

type MediaFieldValidationOptions = {
  siblingData: MediaFieldSiblingData
}

const validateVideoPoster = (
  _value: unknown,
  _options: MediaFieldValidationOptions
) => true as const

const inferMediaTypeFromMime = (mimeType: unknown) => {
  if (typeof mimeType !== 'string') {
    return null
  }

  if (mimeType.startsWith('image/')) {
    return 'image'
  }

  if (mimeType.startsWith('video/')) {
    return 'video'
  }

  if (mimeType === 'application/pdf') {
    return 'document'
  }

  return 'other'
}

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true
  },
  admin: {
    defaultColumns: ['alt', 'mediaType', 'usageType', 'folder', 'updatedAt'],
    description: adminLabel(
      'Biblioteca de imágenes, videos, SVGs y documentos descargables del sitio.',
      'Library for website images, videos, SVGs and downloadable documents.'
    ),
    group: adminGroups.content,
    useAsTitle: 'alt'
  },
  labels: adminLabels('Medio', 'Medios', 'Media item', 'Media'),
  hooks: {
    beforeValidate: [({ data, req }) => {
      const media = data as MediaData | undefined

      if (!media) {
        return data
      }

      const uploadedMimeType = (req as { file?: { mimetype?: string } }).file?.mimetype
      const inferredType = inferMediaTypeFromMime(uploadedMimeType ?? media.mimeType)

      if (inferredType) {
        media.mediaType = inferredType

        if (inferredType === 'video' && (!media.usageType || media.usageType === 'general')) {
          media.usageType = 'video'
        }
      }

      return media
    }],
  },
  upload: {
    adminThumbnail: 'thumbnail',
    focalPoint: true,
    imageSizes: [
      {
        name: 'thumbnail',
        width: 480,
        height: 320,
        fit: 'cover'
      },
      {
        name: 'card',
        width: 960,
        height: 640,
        fit: 'cover'
      },
      {
        name: 'hero',
        width: 1920,
        height: 1080,
        fit: 'cover'
      }
    ],
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
        { label: adminLabel('Documento', 'Document'), value: 'document' },
        { label: adminLabel('Otro', 'Other'), value: 'other' }
      ]
    },
    {
      name: 'usageType',
      type: 'select',
      label: adminLabel('Uso recomendado', 'Recommended use'),
      required: true,
      defaultValue: 'general',
      options: [
        { label: adminLabel('General', 'General'), value: 'general' },
        { label: 'Logo', value: 'logo' },
        { label: 'Hero', value: 'hero' },
        { label: adminLabel('Galería', 'Gallery'), value: 'gallery' },
        { label: 'Video', value: 'video' },
        { label: 'Favicon', value: 'favicon' },
        { label: 'Open Graph', value: 'ogImage' },
        {
          label: adminLabel('Documento descargable', 'Downloadable document'),
          value: 'download'
        }
      ],
      admin: {
        description: adminLabel(
          'Ayuda a encontrar el archivo correcto y a evitar usar logos o favicons como contenido normal.',
          'Helps find the right asset and avoid using logos or favicons as regular content.'
        )
      }
    },
    {
      name: 'folder',
      type: 'text',
      label: adminLabel('Carpeta / agrupación', 'Folder / grouping'),
      admin: {
        placeholder: 'home, servicios, marca, documentos'
      }
    },
    {
      name: 'tags',
      type: 'array',
      label: 'Tags',
      labels: adminLabels('Tag', 'Tags', 'Tag', 'Tags'),
      fields: [
        {
          name: 'value',
          type: 'text',
          label: 'Tag',
          required: true
        }
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
      },
      validate: validateVideoPoster
    },
    {
      name: 'description',
      type: 'textarea',
      label: adminLabel('Descripción', 'Description'),
      localized: true,
      admin: {
        rows: 3
      }
    },
    {
      name: 'credits',
      type: 'text',
      label: adminLabel('Créditos', 'Credits')
    },
    {
      name: 'copyright',
      type: 'text',
      label: 'Copyright'
    },
    {
      name: 'sourceUrl',
      type: 'text',
      label: adminLabel('URL de origen', 'Source URL'),
      admin: {
        placeholder: 'https://...'
      }
    }
  ]
}
