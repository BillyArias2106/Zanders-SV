import { adminLabel } from './admin-i18n'

export const adminGroups = {
  content: adminLabel('Contenido', 'Content'),
  leads: adminLabel('Leads y contacto', 'Leads & contact'),
  marketing: adminLabel('SEO y marketing', 'SEO & marketing'),
  settings: adminLabel('Configuración', 'Settings'),
  system: adminLabel('Sistema', 'System'),
  website: adminLabel('Sitio web', 'Website')
} as const
