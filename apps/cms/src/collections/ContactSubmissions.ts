import type { CollectionConfig } from 'payload'

import { adminLabel, adminLabels } from '../lib/admin-i18n'

export const ContactSubmissions: CollectionConfig = {
  slug: 'contact-submissions',
  access: {
    create: () => true,
    read: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user)
  },
  admin: {
    defaultColumns: ['fullName', 'email', 'phone', 'subject', 'status', 'createdAt'],
    group: adminLabel('Mensajes', 'Messages'),
    useAsTitle: 'fullName'
  },
  labels: adminLabels(
    'Mensaje de Contacto',
    'Mensajes de Contacto',
    'Contact Message',
    'Contact Messages'
  ),
  fields: [
    {
      name: 'firstName',
      type: 'text',
      label: adminLabel('Nombre', 'First name'),
      required: true
    },
    {
      name: 'lastName',
      type: 'text',
      label: adminLabel('Apellido', 'Last name')
    },
    {
      name: 'fullName',
      type: 'text',
      label: adminLabel('Nombre completo', 'Full name'),
      admin: {
        readOnly: true
      },
      hooks: {
        beforeValidate: [
          ({ siblingData }) =>
            [siblingData.firstName, siblingData.lastName]
              .filter(Boolean)
              .join(' ')
              .trim()
        ]
      }
    },
    {
      name: 'phone',
      type: 'text',
      label: adminLabel('Teléfono', 'Phone'),
      required: true
    },
    {
      name: 'email',
      type: 'email',
      label: adminLabel('Correo', 'Email'),
      required: true
    },
    {
      name: 'subject',
      type: 'text',
      label: adminLabel('Asunto', 'Subject'),
      required: true
    },
    {
      name: 'message',
      type: 'textarea',
      label: adminLabel('Mensaje', 'Message'),
      required: true,
      admin: {
        rows: 8
      }
    },
    {
      name: 'status',
      type: 'select',
      label: adminLabel('Estado', 'Status'),
      defaultValue: 'new',
      required: true,
      options: [
        { label: adminLabel('Nuevo', 'New'), value: 'new' },
        { label: adminLabel('En proceso', 'In progress'), value: 'inProgress' },
        { label: adminLabel('Respondido', 'Replied'), value: 'replied' },
        { label: adminLabel('Archivado', 'Archived'), value: 'archived' }
      ]
    },
    {
      name: 'emailSent',
      type: 'checkbox',
      label: adminLabel('Correo enviado', 'Email sent'),
      defaultValue: false,
      admin: {
        readOnly: true
      }
    },
    {
      name: 'emailRecipients',
      type: 'array',
      label: adminLabel('Destinatarios notificados', 'Notified recipients'),
      admin: {
        readOnly: true
      },
      fields: [
        {
          name: 'email',
          type: 'email',
          label: adminLabel('Correo', 'Email')
        }
      ]
    },
    {
      name: 'emailError',
      type: 'textarea',
      label: adminLabel('Error de envío', 'Send error'),
      admin: {
        readOnly: true,
        rows: 4
      }
    },
    {
      name: 'source',
      type: 'text',
      label: adminLabel('Origen', 'Source'),
      admin: {
        readOnly: true
      }
    },
    {
      name: 'userAgent',
      type: 'textarea',
      label: adminLabel('Navegador', 'Browser'),
      admin: {
        readOnly: true,
        rows: 3
      }
    }
  ]
}
