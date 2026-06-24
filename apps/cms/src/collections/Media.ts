import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true
  },
  admin: {
    group: 'Content',
    useAsTitle: 'alt'
  },
  upload: {
    staticDir: 'media',
    mimeTypes: ['image/*', 'video/*']
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true
    }
  ]
}
