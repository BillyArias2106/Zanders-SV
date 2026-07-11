import type { CollectionConfig } from 'payload'

import { adminGroups } from '../lib/admin-groups'
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
    defaultColumns: ['email', 'name', 'role', 'updatedAt'],
    description: adminLabel(
      'Usuarios internos y roles de acceso al panel administrativo.',
      'Internal users and admin panel access roles.'
    ),
    group: adminGroups.system
  },
  labels: adminLabels('Usuario', 'Usuarios', 'User', 'Users'),
  fields: [
    {
      name: 'name',
      type: 'text',
      label: adminLabel('Nombre', 'Name')
    },
    {
      name: 'role',
      type: 'select',
      label: adminLabel('Rol', 'Role'),
      required: true,
      defaultValue: 'editor',
      options: [
        { label: 'Super Admin', value: 'superAdmin' },
        { label: 'Admin', value: 'admin' },
        { label: 'Editor', value: 'editor' },
        { label: 'Marketing', value: 'marketing' },
        { label: adminLabel('Solo lectura', 'Viewer'), value: 'viewer' },
        { label: adminLabel('Cliente', 'Client'), value: 'client' }
      ],
      admin: {
        description: adminLabel(
          'Base para permisos granulares. La aplicación conserva permisos amplios hasta implementar la fase de seguridad.',
          'Foundation for granular permissions. The app keeps broad permissions until the security phase is implemented.'
        )
      }
    }
  ]
}
