import type { CollectionConfig } from 'payload'

export const Pages: CollectionConfig = {
  slug: 'pages',
  access: {
    read: () => true
  },
  admin: {
    defaultColumns: ['heroTitle', 'updatedAt'],
    group: 'Content',
    useAsTitle: 'heroTitle'
  },
  labels: {
    singular: 'Page',
    plural: 'Pages'
  },
  versions: {
    drafts: true
  },
  fields: [
    {
      name: 'heroTitle',
      type: 'text',
      label: 'HeroTitle',
      required: true
    },
    {
      name: 'heroSubtitle',
      type: 'textarea',
      label: 'HeroSubtitle',
      required: true
    },
    {
      name: 'videoBackground',
      type: 'upload',
      label: 'VideoBackground',
      relationTo: 'media'
    },
    {
      name: 'navbarLinks',
      type: 'array',
      label: 'NavbarLinks',
      labels: {
        singular: 'Navbar Link',
        plural: 'Navbar Links'
      },
      minRows: 1,
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true
        },
        {
          name: 'href',
          type: 'text',
          required: true
        },
        {
          name: 'openInNewTab',
          type: 'checkbox',
          defaultValue: false
        }
      ]
    }
  ]
}
