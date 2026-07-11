import type { CollectionConfig } from 'payload'

import { adminGroups } from '../lib/admin-groups'
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
    defaultColumns: [
      'fullName',
      'email',
      'phone',
      'status',
      'priority',
      'assignedTo',
      'nextActionAt',
      'createdAt'
    ],
    description: adminLabel(
      'Mini CRM para revisar, asignar y dar seguimiento a los mensajes recibidos desde el sitio.',
      'Mini CRM to review, assign and follow up website messages.'
    ),
    group: adminGroups.leads,
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
        { label: adminLabel('Contactado', 'Contacted'), value: 'contacted' },
        { label: adminLabel('En seguimiento', 'Follow-up'), value: 'followUp' },
        { label: adminLabel('En proceso', 'In progress'), value: 'inProgress' },
        { label: adminLabel('Respondido', 'Replied'), value: 'replied' },
        { label: adminLabel('Ganado', 'Won'), value: 'won' },
        { label: adminLabel('Perdido', 'Lost'), value: 'lost' },
        { label: adminLabel('Archivado', 'Archived'), value: 'archived' }
      ]
    },
    {
      name: 'priority',
      type: 'select',
      label: adminLabel('Prioridad', 'Priority'),
      defaultValue: 'normal',
      required: true,
      options: [
        { label: adminLabel('Baja', 'Low'), value: 'low' },
        { label: adminLabel('Normal', 'Normal'), value: 'normal' },
        { label: adminLabel('Alta', 'High'), value: 'high' },
        { label: adminLabel('Urgente', 'Urgent'), value: 'urgent' }
      ]
    },
    {
      name: 'assignedTo',
      type: 'relationship',
      label: adminLabel('Responsable', 'Owner'),
      relationTo: 'users'
    },
    {
      name: 'leadTags',
      type: 'array',
      label: adminLabel('Etiquetas del lead', 'Lead tags'),
      labels: adminLabels('Etiqueta', 'Etiquetas', 'Tag', 'Tags'),
      fields: [
        {
          name: 'value',
          type: 'text',
          label: adminLabel('Etiqueta', 'Tag'),
          required: true
        }
      ]
    },
    {
      name: 'internalNotes',
      type: 'textarea',
      label: adminLabel('Notas internas', 'Internal notes'),
      admin: {
        rows: 5
      }
    },
    {
      name: 'followUpHistory',
      type: 'array',
      label: adminLabel('Historial de seguimiento', 'Follow-up history'),
      labels: adminLabels(
        'Seguimiento',
        'Seguimientos',
        'Follow-up',
        'Follow-ups'
      ),
      fields: [
        {
          name: 'date',
          type: 'date',
          label: adminLabel('Fecha', 'Date')
        },
        {
          name: 'note',
          type: 'textarea',
          label: adminLabel('Nota', 'Note'),
          required: true,
          admin: {
            rows: 3
          }
        },
        {
          name: 'nextActionAt',
          type: 'date',
          label: adminLabel('Próxima acción', 'Next action')
        }
      ]
    },
    {
      name: 'lastResponseAt',
      type: 'date',
      label: adminLabel('Última respuesta', 'Last response')
    },
    {
      name: 'nextActionAt',
      type: 'date',
      label: adminLabel('Próxima acción', 'Next action')
    },
    {
      name: 'lostReason',
      type: 'textarea',
      label: adminLabel('Motivo de pérdida', 'Lost reason'),
      admin: {
        condition: (_, siblingData) =>
          (siblingData as { status?: string }).status === 'lost',
        rows: 3
      }
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
