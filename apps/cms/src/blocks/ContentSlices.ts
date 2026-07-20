import type { Block, Field } from 'payload'

import { adminLabel, adminLabels } from '../lib/admin-i18n'

const safeUrlPattern = /^(#|\/|https?:\/\/|mailto:|tel:)/i

const validateSafeUrl = (value: unknown) => {
  if (!value || typeof value !== 'string') {
    return true
  }

  return safeUrlPattern.test(value.trim())
    ? true
    : 'Usa enlaces internos, anclas, http(s), mailto o tel. No se permite JavaScript.'
}

const textField = (
  name: string,
  label: string,
  options: Record<string, unknown> = {},
): Field => ({
  name,
  type: 'text',
  label: adminLabel(label, label),
  localized: true,
  ...options,
}) as Field

const textareaField = (
  name: string,
  label: string,
  options: Record<string, unknown> = {},
): Field => ({
  name,
  type: 'textarea',
  label: adminLabel(label, label),
  localized: true,
  admin: { rows: 3, ...((options.admin as Record<string, unknown> | undefined) ?? {}) },
  ...options,
}) as Field

const mediaField = (name: string, label: string): Field => ({
  name,
  type: 'upload',
  label: adminLabel(label, label),
  relationTo: 'media',
  displayPreview: true,
})

const visualOverridesField = (): Field => ({
  name: 'visualOverrides',
  type: 'json',
  label: adminLabel('Ajustes visuales avanzados', 'Advanced visual overrides'),
  admin: {
    hidden: true,
    description: adminLabel(
      'Reservado para el Hybrid Visual Builder: coordenadas, escala, capas y overrides responsivos enviados desde la vista previa.',
      'Reserved for the Hybrid Visual Builder: coordinates, scale, layers and responsive overrides sent from preview.',
    ),
  },
})

const defaultCanvasData = {
  background: { overlay: 'soft', type: 'media' },
  breakpoints: {
    desktop: { height: 720, width: 1180 },
    mobile: { height: 720, width: 390 },
    tablet: { height: 760, width: 768 },
  },
  elements: [],
  grid: { enabled: false, size: 20, snap: true, tolerance: 8 },
  schemaVersion: 2,
}

const actionFields: Field[] = [
  textField('label', 'Texto visible', { required: true }),
  {
    name: 'url',
    type: 'text',
    label: 'URL',
    required: true,
    validate: validateSafeUrl,
    admin: {
      placeholder: '#contacto, /servicios o https://...',
    },
  },
  {
    name: 'openInNewTab',
    type: 'checkbox',
    label: adminLabel('Abrir en otra pestana', 'Open in a new tab'),
    defaultValue: false,
  },
]

const optionalActionFields: Field[] = [
  textField('label', 'Texto visible'),
  {
    name: 'url',
    type: 'text',
    label: 'URL',
    validate: validateSafeUrl,
    admin: {
      placeholder: '/servicios o https://...',
    },
  },
  {
    name: 'openInNewTab',
    type: 'checkbox',
    label: adminLabel('Abrir en otra pestana', 'Open in a new tab'),
    defaultValue: false,
  },
]

export const HeroSlice: Block = {
  slug: 'heroSlice',
  interfaceName: 'HeroSlice',
  labels: adminLabels('Portada', 'Portadas', 'Hero', 'Heroes'),
  admin: {
    group: adminLabel('Slices esenciales', 'Essential slices'),
    disableBlockName: true,
  },
  fields: [
    {
      name: 'purpose',
      type: 'select',
      label: adminLabel('Proposito de la seccion', 'Section purpose'),
      defaultValue: 'clear-intro',
      required: true,
      options: [
        { label: adminLabel('Presentar la pagina', 'Introduce the page'), value: 'clear-intro' },
        { label: adminLabel('Destacar producto o servicio', 'Highlight product or service'), value: 'product-focus' },
        { label: adminLabel('Anunciar campana o evento', 'Announce campaign or event'), value: 'campaign' },
        { label: adminLabel('Mensaje institucional', 'Institutional message'), value: 'institutional' },
      ],
      admin: {
        description: adminLabel(
          'Describe la intencion. El frontend decide el layout final.',
          'Describes intent. The frontend decides the final layout.',
        ),
      },
    },
    textField('eyebrow', 'Etiqueta superior'),
    textField('title', 'Titulo principal', { required: true }),
    textareaField('description', 'Descripcion breve'),
    mediaField('backgroundMedia', 'Imagen o video de fondo'),
    mediaField('media', 'Imagen destacada (Opcional, aparece al lado del texto)'),
    {
      name: 'actions',
      type: 'array',
      label: adminLabel('Acciones', 'Actions'),
      labels: adminLabels('Accion', 'Acciones', 'Action', 'Actions'),
      maxRows: 2,
      fields: actionFields,
    },
    visualOverridesField(),
  ],
}

export const FeatureGridSlice: Block = {
  slug: 'featureGridSlice',
  interfaceName: 'FeatureGridSlice',
  labels: adminLabels('Lista de beneficios', 'Listas de beneficios', 'Feature grid', 'Feature grids'),
  admin: {
    group: adminLabel('Slices esenciales', 'Essential slices'),
    disableBlockName: true,
  },
  fields: [
    {
      name: 'purpose',
      type: 'select',
      label: adminLabel('Proposito de la seccion', 'Section purpose'),
      defaultValue: 'simple-grid',
      required: true,
      options: [
        { label: adminLabel('Listar rapido', 'Quick list'), value: 'simple-grid' },
        { label: adminLabel('Destacar lo mas importante', 'Highlight key items'), value: 'bento-showcase' },
        { label: adminLabel('Leer con calma', 'Editorial reading'), value: 'editorial' },
      ],
      admin: {
        description: adminLabel(
          'Elige la intencion editorial, no el diseno.',
          'Choose editorial intent, not design.',
        ),
      },
    },
    textField('eyebrow', 'Etiqueta superior'),
    textField('title', 'Titulo', { required: true }),
    textareaField('intro', 'Introduccion'),
    {
      name: 'items',
      type: 'array',
      label: adminLabel('Elementos', 'Items'),
      labels: adminLabels('Elemento', 'Elementos', 'Item', 'Items'),
      minRows: 1,
      maxRows: 12,
      fields: [
        textField('title', 'Titulo', { required: true }),
        textareaField('description', 'Descripcion'),
        textField('icon', 'Icono semantico'),
        mediaField('media', 'Imagen opcional'),
        {
          name: 'link',
          type: 'group',
          label: adminLabel('Enlace opcional', 'Optional link'),
          fields: optionalActionFields,
        },
      ],
    },
    visualOverridesField(),
  ],
}

export const CTASlice: Block = {
  slug: 'ctaSlice',
  interfaceName: 'CTASlice',
  labels: adminLabels('Llamado a la accion', 'Llamados a la accion', 'Call to action', 'Calls to action'),
  admin: {
    group: adminLabel('Slices esenciales', 'Essential slices'),
    disableBlockName: true,
  },
  fields: [
    {
      name: 'purpose',
      type: 'select',
      label: adminLabel('Proposito de la seccion', 'Section purpose'),
      defaultValue: 'contact',
      required: true,
      options: [
        { label: adminLabel('Pedir contacto', 'Request contact'), value: 'contact' },
        { label: adminLabel('Generar conversion', 'Drive conversion'), value: 'conversion' },
        { label: adminLabel('Invitar a suscripcion', 'Invite subscription'), value: 'subscription' },
        { label: adminLabel('Guiar a otra pagina', 'Guide to another page'), value: 'navigation' },
      ],
    },
    textField('eyebrow', 'Etiqueta superior'),
    textField('title', 'Titulo', { required: true }),
    textareaField('description', 'Descripcion'),
    {
      name: 'actions',
      type: 'array',
      label: adminLabel('Acciones', 'Actions'),
      labels: adminLabels('Accion', 'Acciones', 'Action', 'Actions'),
      minRows: 1,
      maxRows: 2,
      fields: actionFields,
    },
    textareaField('finePrint', 'Texto pequeno opcional'),
    visualOverridesField(),
  ],
}

export const CanvasSlice: Block = {
  slug: 'canvasSlice',
  interfaceName: 'CanvasSlice',
  labels: adminLabels('Lienzo libre', 'Lienzos libres', 'Free canvas', 'Free canvases'),
  admin: {
    group: adminLabel('Lienzo Libre / Framer Mode', 'Free Canvas / Framer Mode'),
    disableBlockName: true,
  },
  fields: [
    textField('title', 'Titulo principal', {
      defaultValue: 'Titulo personalizable',
      required: true,
    }),
    mediaField('backgroundMedia', 'Imagen o video de fondo'),
    {
      name: 'canvas',
      type: 'json',
      label: adminLabel('Datos del lienzo visual', 'Visual canvas data'),
      defaultValue: defaultCanvasData,
      admin: {
        hidden: true,
        description: adminLabel(
          'Guarda elementos, posiciones, estilos, capas y breakpoints del editor visual.',
          'Stores elements, positions, styles, layers and breakpoints for the visual editor.',
        ),
      },
    },
  ],
}

export const contentSlices: Block[] = [HeroSlice, FeatureGridSlice, CTASlice, CanvasSlice]

export const contentSliceSlugs = contentSlices.map((slice) => slice.slug)
