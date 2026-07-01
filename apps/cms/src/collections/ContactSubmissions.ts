import type { CollectionConfig } from 'payload'

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
    group: 'CRM',
    useAsTitle: 'fullName'
  },
  labels: {
    singular: 'Mensaje de Contacto',
    plural: 'Mensajes de Contacto'
  },
  fields: [
    {
      name: 'firstName',
      type: 'text',
      label: 'Nombre',
      required: true
    },
    {
      name: 'lastName',
      type: 'text',
      label: 'Apellido'
    },
    {
      name: 'fullName',
      type: 'text',
      label: 'Nombre completo',
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
      label: 'Teléfono',
      required: true
    },
    {
      name: 'email',
      type: 'email',
      label: 'Correo',
      required: true
    },
    {
      name: 'subject',
      type: 'text',
      label: 'Asunto',
      required: true
    },
    {
      name: 'message',
      type: 'textarea',
      label: 'Mensaje',
      required: true,
      admin: {
        rows: 8
      }
    },
    {
      name: 'status',
      type: 'select',
      label: 'Estado',
      defaultValue: 'new',
      required: true,
      options: [
        { label: 'Nuevo', value: 'new' },
        { label: 'En proceso', value: 'inProgress' },
        { label: 'Respondido', value: 'replied' },
        { label: 'Archivado', value: 'archived' }
      ]
    },
    {
      name: 'emailSent',
      type: 'checkbox',
      label: 'Correo enviado',
      defaultValue: false,
      admin: {
        readOnly: true
      }
    },
    {
      name: 'emailRecipients',
      type: 'array',
      label: 'Destinatarios notificados',
      admin: {
        readOnly: true
      },
      fields: [
        {
          name: 'email',
          type: 'email',
          label: 'Correo'
        }
      ]
    },
    {
      name: 'emailError',
      type: 'textarea',
      label: 'Error de envío',
      admin: {
        readOnly: true,
        rows: 4
      }
    },
    {
      name: 'source',
      type: 'text',
      label: 'Origen',
      admin: {
        readOnly: true
      }
    },
    {
      name: 'userAgent',
      type: 'textarea',
      label: 'Navegador',
      admin: {
        readOnly: true,
        rows: 3
      }
    }
  ]
}
