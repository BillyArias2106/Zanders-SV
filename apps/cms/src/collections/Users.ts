import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'email',
    group: 'Sistema'
  },
  labels: {
    singular: 'Usuario',
    plural: 'Usuarios'
  },
  fields: [
    {
      name: 'name',
      type: 'text'
    }
  ]
}
