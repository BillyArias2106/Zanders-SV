import type { CollectionConfig } from 'payload'

import { adminLabel, adminLabels } from '../lib/admin-i18n'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: {
    lockTime: 10 * 60 * 1000,
    maxLoginAttempts: 5,
    tokenExpiration: 60 * 60,
    useSessions: true
  },
  admin: {
    useAsTitle: 'email',
    group: adminLabel('Sistema', 'System')
  },
  labels: adminLabels('Usuario', 'Usuarios', 'User', 'Users'),
  fields: [
    {
      name: 'name',
      type: 'text',
      label: adminLabel('Nombre', 'Name')
    }
  ]
}
