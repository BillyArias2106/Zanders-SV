import type { Block, Field } from 'payload'

import {
  getSectionBuilderGroup,
  sectionCategories,
  sectionTemplates,
  type SectionSchema,
  type SectionTemplate,
} from '@starter/page-sections'

import { adminLabel, adminLabels } from '../lib/admin-i18n'
import { formatPageSlug } from '../lib/page-composer'

const safeUrlPattern = /^(#|\/|https?:\/\/|mailto:|tel:)/i

const validateSafeUrl = (value: unknown) => {
  if (!value || typeof value !== 'string') {
    return true
  }

  return safeUrlPattern.test(value.trim())
    ? true
    : 'Usa enlaces internos, anclas, http(s), mailto o tel. No se permite JavaScript.'
}

const validateAnchorId = (value: unknown) => {
  if (!value || typeof value !== 'string') {
    return true
  }

  return formatPageSlug(value) === value.trim()
    ? true
    : 'Usa solo letras, numeros y guiones. Ejemplo: servicios-principales.'
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

const numberField = (
  name: string,
  label: string,
  options: Record<string, unknown> = {},
): Field => ({
  name,
  type: 'number',
  label: adminLabel(label, label),
  ...options,
}) as Field

const mediaField = (
  name: string,
  label: string,
  mimeType?: string,
): Field => ({
  name,
  type: 'upload',
  label: adminLabel(label, label),
  relationTo: 'media',
  displayPreview: true,
  filterOptions: mimeType ? { mimeType: { contains: mimeType } } : undefined,
})

const linkFields: Field[] = [
  textField('label', 'Texto del boton', { required: true }),
  {
    name: 'url',
    type: 'text',
    label: adminLabel('Destino', 'Destination'),
    required: true,
    validate: validateSafeUrl,
    admin: { placeholder: '#contacto, /servicios o https://...' },
  },
  {
    name: 'style',
    type: 'select',
    label: adminLabel('Estilo', 'Style'),
    defaultValue: 'primary',
    options: [
      { label: adminLabel('Principal', 'Primary'), value: 'primary' },
      { label: adminLabel('Secundario', 'Secondary'), value: 'secondary' },
      { label: adminLabel('Solo texto', 'Text only'), value: 'text' },
    ],
  },
  {
    name: 'shape',
    type: 'select',
    label: adminLabel('Forma', 'Shape'),
    defaultValue: 'rounded',
    options: [
      { label: adminLabel('Cuadrado', 'Square'), value: 'square' },
      { label: adminLabel('Rectangular suave', 'Soft rectangle'), value: 'rounded' },
      { label: adminLabel('Circular / pastilla', 'Pill'), value: 'pill' },
    ],
  },
  {
    name: 'backgroundColor',
    type: 'text',
    label: adminLabel('Color de fondo', 'Background color'),
    admin: { placeholder: '#07164b, transparent' },
  },
  {
    name: 'textColor',
    type: 'text',
    label: adminLabel('Color del texto', 'Text color'),
    admin: { placeholder: '#ffffff' },
  },
  textField('ariaLabel', 'Etiqueta accesible'),
  {
    name: 'openInNewTab',
    type: 'checkbox',
    label: adminLabel('Abrir en otra pestana', 'Open in a new tab'),
    defaultValue: false,
  },
]

const itemFields = (schema: SectionSchema): Field[] => {
  const common: Field[] = [
    textField('title', 'Titulo'),
    textareaField('description', 'Descripcion'),
    textField('category', 'Categoria'),
    {
      name: 'url',
      type: 'text',
      label: adminLabel('Enlace', 'Link'),
      validate: validateSafeUrl,
    },
    mediaField('media', 'Imagen, video o archivo'),
  ]

  if (schema === 'logos') {
    return [
      textField('name', 'Nombre accesible', { required: true }),
      mediaField('logo', 'Logo', 'image/'),
      textField('category', 'Categoria'),
      {
        name: 'url',
        type: 'text',
        label: adminLabel('Enlace', 'Link'),
        validate: validateSafeUrl,
      },
    ]
  }

  if (schema === 'metrics') {
    return [
      {
        name: 'value',
        type: 'text',
        label: adminLabel('Valor', 'Value'),
        required: true,
      },
      textField('prefix', 'Prefijo'),
      textField('suffix', 'Sufijo'),
      textField('label', 'Etiqueta', { required: true }),
      textareaField('description', 'Descripcion'),
      textField('source', 'Fuente o aclaracion'),
    ]
  }

  if (schema === 'faq') {
    return [
      textField('question', 'Pregunta', { required: true }),
      textareaField('answer', 'Respuesta', { required: true }),
      textField('category', 'Categoria'),
      {
        name: 'url',
        type: 'text',
        label: adminLabel('Enlace opcional', 'Optional link'),
        validate: validateSafeUrl,
      },
    ]
  }

  if (schema === 'pricing') {
    return [
      textField('name', 'Nombre del plan', { required: true }),
      {
        name: 'price',
        type: 'text',
        label: adminLabel('Precio', 'Price'),
      },
      textField('period', 'Periodicidad'),
      textareaField('description', 'Descripcion'),
      {
        name: 'features',
        type: 'array',
        label: adminLabel('Caracteristicas', 'Features'),
        labels: adminLabels('Caracteristica', 'Caracteristicas', 'Feature', 'Features'),
        fields: [textField('label', 'Caracteristica', { required: true })],
      },
      {
        name: 'featured',
        type: 'checkbox',
        label: adminLabel('Destacado', 'Featured'),
        defaultValue: false,
      },
    ]
  }

  if (schema === 'scoreboard') {
    return [
      textField('competition', 'Competicion o grupo'),
      textField('home', 'Participante local'),
      textField('away', 'Participante visitante'),
      {
        name: 'score',
        type: 'text',
        label: adminLabel('Marcador o resultado', 'Score or result'),
      },
      textField('date', 'Fecha'),
      textField('status', 'Estado'),
      textField('venue', 'Lugar'),
    ]
  }

  if (schema === 'documents') {
    return [
      textField('title', 'Nombre del documento', { required: true }),
      textareaField('description', 'Descripcion'),
      textField('category', 'Categoria'),
      mediaField('file', 'Archivo'),
      textField('version', 'Version'),
      textField('language', 'Idioma'),
    ]
  }

  if (schema === 'contact') {
    return [
      textField('title', 'Canal', { required: true }),
      textareaField('description', 'Descripcion'),
      textField('type', 'Tipo'),
      textField('phone', 'Telefono'),
      textField('email', 'Correo'),
      textField('address', 'Direccion'),
      textField('hours', 'Horario'),
      {
        name: 'url',
        type: 'text',
        label: adminLabel('Enlace', 'Link'),
        validate: validateSafeUrl,
      },
    ]
  }

  if (schema === 'timeline' || schema === 'event') {
    return [
      textField('date', 'Fecha'),
      textField('title', 'Titulo', { required: true }),
      textareaField('description', 'Descripcion'),
      textField('category', 'Categoria'),
      mediaField('media', 'Imagen'),
      {
        name: 'url',
        type: 'text',
        label: adminLabel('Enlace', 'Link'),
        validate: validateSafeUrl,
      },
    ]
  }

  if (schema === 'custom') {
    return [
      {
        name: 'type',
        type: 'select',
        label: adminLabel('Tipo de elemento', 'Element type'),
        defaultValue: 'text',
        options: [
          { label: adminLabel('Encabezado', 'Heading'), value: 'title' },
          { label: adminLabel('Parrafo', 'Paragraph'), value: 'text' },
          { label: adminLabel('Lista', 'List'), value: 'list' },
          { label: adminLabel('Cita', 'Quote'), value: 'quote' },
          { label: adminLabel('Boton', 'Button'), value: 'button' },
          { label: adminLabel('Imagen o video', 'Image or video'), value: 'media' },
          { label: adminLabel('Separador', 'Separator'), value: 'separator' },
          { label: adminLabel('Espaciador', 'Spacer'), value: 'spacer' },
          { label: adminLabel('Cuadro / tarjeta', 'Box / card'), value: 'card' },
          { label: adminLabel('Columnas', 'Columns'), value: 'columns' },
        ],
      },
      textareaField('content', 'Texto o contenido', {
        admin: {
          description: adminLabel(
            'Para listas o columnas escribe cada elemento en una linea.',
            'For lists or columns, write each item on a new line.',
          ),
          rows: 4,
        },
      }),
      {
        name: 'url',
        type: 'text',
        label: adminLabel('Destino si es boton', 'Destination if button'),
        validate: validateSafeUrl,
      },
      mediaField('media', 'Imagen o video'),
      {
        name: 'positionX',
        type: 'number',
        label: adminLabel('Posicion horizontal (%)', 'Horizontal position (%)'),
        defaultValue: 50,
        min: 0,
        max: 100,
      },
      {
        name: 'positionY',
        type: 'number',
        label: adminLabel('Posicion vertical (%)', 'Vertical position (%)'),
        defaultValue: 50,
        min: 0,
        max: 100,
      },
      {
        name: 'width',
        type: 'number',
        label: adminLabel('Ancho (%)', 'Width (%)'),
        defaultValue: 50,
        min: 10,
        max: 100,
      },
      {
        name: 'textAlign',
        type: 'select',
        label: adminLabel('Alineacion del texto', 'Text alignment'),
        defaultValue: 'center',
        options: [
          { label: adminLabel('Izquierda', 'Left'), value: 'left' },
          { label: adminLabel('Centro', 'Center'), value: 'center' },
          { label: adminLabel('Derecha', 'Right'), value: 'right' },
        ],
      },
      {
        name: 'backgroundColor',
        type: 'text',
        label: adminLabel('Color de fondo', 'Background color'),
        admin: { placeholder: '#07164b, transparent' },
      },
      {
        name: 'textColor',
        type: 'text',
        label: adminLabel('Color del texto', 'Text color'),
        admin: { placeholder: '#ffffff' },
      },
      {
        name: 'shape',
        type: 'select',
        label: adminLabel('Forma del boton', 'Button shape'),
        defaultValue: 'rounded',
        options: [
          { label: adminLabel('Cuadrado', 'Square'), value: 'square' },
          { label: adminLabel('Rectangular suave', 'Soft rectangle'), value: 'rounded' },
          { label: adminLabel('Circular / pastilla', 'Pill'), value: 'pill' },
        ],
      },
    ]
  }

  return common
}

const arrayDefaults = (value: unknown) =>
  Array.isArray(value) ? value : undefined

const createThumbnail = (template: SectionTemplate) => {
  const hue = (template.sortOrder * 37) % 360
  const title = template.name.replace(/&/g, 'y')
  const label = sectionCategories[template.category]
  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400" role="img" aria-label="${title}">
  <defs>
    <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0" stop-color="hsl(${hue} 76% 56%)"/>
      <stop offset="1" stop-color="hsl(${(hue + 70) % 360} 72% 34%)"/>
    </linearGradient>
  </defs>
  <rect width="600" height="400" rx="28" fill="#07151b"/>
  <rect x="24" y="24" width="552" height="352" rx="24" fill="url(#g)" opacity=".22"/>
  <rect x="54" y="58" width="210" height="18" rx="9" fill="#8de1e8" opacity=".9"/>
  <rect x="54" y="102" width="360" height="36" rx="10" fill="#f8fafc" opacity=".92"/>
  <rect x="54" y="154" width="292" height="16" rx="8" fill="#f8fafc" opacity=".46"/>
  <rect x="54" y="186" width="235" height="16" rx="8" fill="#f8fafc" opacity=".36"/>
  <rect x="54" y="260" width="136" height="42" rx="21" fill="#8de1e8"/>
  <rect x="330" y="104" width="190" height="164" rx="22" fill="#f8fafc" opacity=".15"/>
  <circle cx="492" cy="268" r="44" fill="#f8fafc" opacity=".18"/>
  <text x="54" y="338" fill="#f8fafc" font-family="Arial, sans-serif" font-size="22" font-weight="700">${title}</text>
  <text x="54" y="366" fill="#d7f8fb" font-family="Arial, sans-serif" font-size="14">${label}</text>
</svg>`.trim()

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
}

const createContentFields = (template: SectionTemplate): Field[] => [
  {
    name: 'templateKey',
    type: 'text',
    defaultValue: template.key,
    admin: { hidden: true },
  },
  {
    name: 'templateVersion',
    type: 'number',
    defaultValue: template.version,
    admin: { hidden: true },
  },
  textField('eyebrow', 'Etiqueta superior', {
    defaultValue: typeof template.defaultData.eyebrow === 'string' ? template.defaultData.eyebrow : undefined,
  }),
  textField('title', 'Titulo', {
    defaultValue: typeof template.defaultData.title === 'string' ? template.defaultData.title : undefined,
    required: template.schema !== 'logos',
  }),
  textField('subtitle', 'Subtitulo', {
    defaultValue: typeof template.defaultData.subtitle === 'string' ? template.defaultData.subtitle : undefined,
  }),
  textareaField('description', 'Descripcion', {
    defaultValue: typeof template.defaultData.description === 'string' ? template.defaultData.description : undefined,
  }),
  textField('note', 'Nota pequena'),
  {
    name: 'buttons',
    type: 'array',
    label: adminLabel('Botones', 'Buttons'),
    labels: adminLabels('Boton', 'Botones', 'Button', 'Buttons'),
    maxRows: 2,
    defaultValue: arrayDefaults(template.defaultData.buttons),
    fields: linkFields,
  },
  {
    name: 'mediaKind',
    type: 'select',
    label: adminLabel('Tipo de multimedia', 'Media type'),
    defaultValue: 'image',
    options: [
      { label: adminLabel('Imagen', 'Image'), value: 'image' },
      { label: 'Video', value: 'video' },
      { label: adminLabel('Documento', 'Document'), value: 'document' },
    ],
  },
  mediaField('media', 'Multimedia principal'),
  mediaField('mobileMedia', 'Multimedia movil opcional'),
  mediaField('backgroundMedia', 'Fondo visual opcional'),
  {
    name: 'items',
    type: 'array',
    label: adminLabel('Elementos', 'Items'),
    labels: adminLabels('Elemento', 'Elementos', 'Item', 'Items'),
    minRows: template.schema === 'logos' ? 2 : 0,
    maxRows: template.schema === 'logos' ? 16 : 12,
    defaultValue: arrayDefaults(template.defaultData.items),
    fields: itemFields(template.schema),
  },
  ...(template.key === 'case_study_featured' || template.key === 'case_study_grid'
    ? [
        {
          name: 'caseStudies',
          type: 'relationship',
          label: adminLabel('Casos de exito relacionados', 'Related case studies'),
          relationTo: 'case-studies',
          hasMany: true,
          admin: {
            description: adminLabel(
              'Selecciona casos publicados para alimentar esta seccion sin duplicar contenido.',
              'Select published case studies to feed this section without duplicating content.',
            ),
          },
        } as Field,
      ]
    : []),
  ...(template.key === 'testimonials'
    ? [
        {
          name: 'testimonials',
          type: 'relationship',
          label: adminLabel('Testimonios relacionados', 'Related testimonials'),
          relationTo: 'testimonials',
          hasMany: true,
          admin: {
            description: adminLabel(
              'Selecciona testimonios publicados para mantener la prueba social reusable.',
              'Select published testimonials to keep social proof reusable.',
            ),
          },
        } as Field,
      ]
    : []),
  {
    name: 'code',
    type: 'array',
    label: adminLabel('Lineas de codigo o comandos', 'Code or command lines'),
    labels: adminLabels('Linea', 'Lineas', 'Line', 'Lines'),
    admin: {
      condition: () => template.schema === 'terminal',
    },
    defaultValue: arrayDefaults(template.defaultData.code)?.map((line) => ({ line })),
    fields: [
      {
        name: 'line',
        type: 'text',
        label: adminLabel('Linea segura', 'Safe line'),
      },
    ],
  },
]

const baseHiddenTemplateFields = (template: SectionTemplate): Field[] => [
  {
    name: 'templateKey',
    type: 'text',
    defaultValue: template.key,
    admin: { hidden: true },
  },
  {
    name: 'templateVersion',
    type: 'number',
    defaultValue: template.version,
    admin: { hidden: true },
  },
]

const mediaTypeField = (label = 'Tipo de fondo visual'): Field => ({
  name: 'mediaKind',
  type: 'select',
  label: adminLabel(label, label),
  defaultValue: 'image',
  options: [
    { label: adminLabel('Imagen', 'Image'), value: 'image' },
    { label: 'Video', value: 'video' },
  ],
})

const simpleHeroFields = (template: SectionTemplate): Field[] => [
  ...baseHiddenTemplateFields(template),
  textField('title', 'Titulo principal', {
    defaultValue: typeof template.defaultData.title === 'string' ? template.defaultData.title : undefined,
    required: true,
  }),
  textareaField('description', 'Descripcion', {
    defaultValue: typeof template.defaultData.description === 'string' ? template.defaultData.description : undefined,
  }),
  mediaTypeField(),
  mediaField('backgroundMedia', 'Imagen o video de fondo'),
  {
    name: 'buttons',
    type: 'array',
    label: adminLabel('Botones opcionales', 'Optional buttons'),
    labels: adminLabels('Boton', 'Botones', 'Button', 'Buttons'),
    maxRows: 2,
    defaultValue: arrayDefaults(template.defaultData.buttons),
    admin: {
      description: adminLabel(
        'Puedes agregar hasta dos botones y cambiar color, forma y destino.',
        'You can add up to two buttons and change color, shape and destination.',
      ),
    },
    fields: linkFields,
  },
  {
    name: 'settings',
    type: 'group',
    label: adminLabel('Ajustes simples', 'Simple settings'),
    fields: [
      {
        name: 'alignment',
        type: 'select',
        label: adminLabel('Alineacion del contenido', 'Content alignment'),
        defaultValue: template.defaultSettings.alignment ?? 'left',
        options: [
          { label: adminLabel('Izquierda', 'Left'), value: 'left' },
          { label: adminLabel('Centro', 'Center'), value: 'center' },
          { label: adminLabel('Derecha', 'Right'), value: 'right' },
        ],
      },
      {
        name: 'overlay',
        type: 'select',
        label: adminLabel('Oscurecer fondo para leer mejor', 'Darken background for readability'),
        defaultValue: 'soft',
        options: [
          { label: adminLabel('Suave', 'Soft'), value: 'soft' },
          { label: adminLabel('Medio', 'Medium'), value: 'medium' },
          { label: adminLabel('Fuerte', 'Strong'), value: 'strong' },
        ],
      },
    ],
  },
  {
    name: 'enabled',
    type: 'checkbox',
    label: adminLabel('Seccion activa', 'Section enabled'),
    defaultValue: true,
  },
]

const customCanvasFields = (template: SectionTemplate): Field[] => [
  ...baseHiddenTemplateFields(template),
  textField('title', 'Titulo principal', {
    defaultValue: template.defaultData.title,
    required: true,
  }),
  textareaField('description', 'Descripcion', {
    defaultValue: template.defaultData.description,
  }),
  mediaTypeField(),
  mediaField('backgroundMedia', 'Imagen o video de fondo'),
  {
    name: 'canvas',
    type: 'json',
    label: adminLabel('Datos del lienzo visual', 'Visual canvas data'),
    defaultValue: template.defaultData.canvas as Record<string, unknown>,
    admin: {
      hidden: true,
      description: adminLabel(
        'Guarda elementos, posiciones, estilos, capas e historial base del editor visual. Normalmente se edita desde la vista previa.',
        'Stores elements, positions, styles, layers and base data for the visual editor. Usually edited from the preview.',
      ),
    },
  } as Field,
  {
    name: 'buttons',
    type: 'array',
    label: adminLabel('Botones opcionales', 'Optional buttons'),
    labels: adminLabels('Boton', 'Botones', 'Button', 'Buttons'),
    maxRows: 2,
    defaultValue: arrayDefaults(template.defaultData.buttons),
    admin: {
      description: adminLabel(
        'Puedes mover el grupo de botones desde la vista previa y cambiar sus colores aqui o visualmente.',
        'You can move the button group from the preview and change colors here or visually.',
      ),
    },
    fields: linkFields,
  },
  {
    name: 'layoutControls',
    type: 'group',
    label: adminLabel('Posicion y estilo visual', 'Visual position and style'),
    admin: {
      description: adminLabel(
        'Estos valores tambien se actualizan al mover y ajustar elementos desde la vista previa.',
        'These values are also updated when moving and adjusting elements from the preview.',
      ),
    },
    fields: [
      numberField('titleX', 'Titulo: posicion horizontal', { defaultValue: 34, max: 95, min: 5 }),
      numberField('titleY', 'Titulo: posicion vertical', { defaultValue: 42, max: 95, min: 5 }),
      numberField('titleSize', 'Titulo: tamano', { defaultValue: 4.6, max: 8, min: 1.5 }),
      textField('titleColor', 'Titulo: color', { defaultValue: '#07164b', localized: false }),
      textField('titleFont', 'Titulo: tipo de letra', { defaultValue: 'rajdhani', localized: false }),
      textField('titleAlign', 'Titulo: alineacion', { defaultValue: 'left', localized: false }),
      numberField('descriptionX', 'Descripcion: posicion horizontal', { defaultValue: 34, max: 95, min: 5 }),
      numberField('descriptionY', 'Descripcion: posicion vertical', { defaultValue: 58, max: 95, min: 5 }),
      numberField('descriptionSize', 'Descripcion: tamano', { defaultValue: 1.15, max: 3, min: 0.8 }),
      textField('descriptionColor', 'Descripcion: color', { defaultValue: '#42517e', localized: false }),
      textField('descriptionFont', 'Descripcion: tipo de letra', { defaultValue: 'montserrat', localized: false }),
      textField('descriptionAlign', 'Descripcion: alineacion', { defaultValue: 'left', localized: false }),
      numberField('buttonsX', 'Botones: posicion horizontal', { defaultValue: 34, max: 95, min: 5 }),
      numberField('buttonsY', 'Botones: posicion vertical', { defaultValue: 72, max: 95, min: 5 }),
      numberField('buttonsScale', 'Botones: tamano', { defaultValue: 100, max: 160, min: 70 }),
    ],
  },
  {
    name: 'settings',
    type: 'group',
    label: adminLabel('Ajustes simples', 'Simple settings'),
    fields: [
      {
        name: 'overlay',
        type: 'select',
        label: adminLabel('Oscurecer fondo para leer mejor', 'Darken background for readability'),
        defaultValue: 'soft',
        options: [
          { label: adminLabel('Ninguno', 'None'), value: 'none' },
          { label: adminLabel('Suave', 'Soft'), value: 'soft' },
          { label: adminLabel('Medio', 'Medium'), value: 'medium' },
          { label: adminLabel('Fuerte', 'Strong'), value: 'strong' },
        ],
      },
      {
        name: 'height',
        type: 'select',
        label: adminLabel('Altura de la seccion', 'Section height'),
        defaultValue: 'large',
        options: [
          { label: adminLabel('Normal', 'Normal'), value: 'normal' },
          { label: adminLabel('Grande', 'Large'), value: 'large' },
          { label: adminLabel('Pantalla completa', 'Fullscreen'), value: 'fullscreen' },
        ],
      },
    ],
  },
  {
    name: 'enabled',
    type: 'checkbox',
    label: adminLabel('Seccion activa', 'Section enabled'),
    defaultValue: true,
  },
]

const createBlockFields = (template: SectionTemplate): Field[] => {
  if (template.key === 'hero_split') {
    return simpleHeroFields(template)
  }

  if (template.key === 'custom_canvas') {
    return customCanvasFields(template)
  }

  return [
    {
      type: 'tabs',
      tabs: [
      {
        label: adminLabel('Contenido', 'Content'),
        fields: createContentFields(template),
      },
      {
        label: adminLabel('Diseno', 'Design'),
        fields: [
          {
            name: 'settings',
            type: 'group',
            label: adminLabel('Ajustes visuales', 'Visual settings'),
            fields: [
              {
                name: 'variant',
                type: 'select',
                label: adminLabel('Variante', 'Variant'),
                defaultValue: template.defaultSettings.variant ?? 'default',
                options: [
                  { label: adminLabel('Predeterminada', 'Default'), value: 'default' },
                  { label: adminLabel('Dividida', 'Split'), value: 'split' },
                  { label: adminLabel('Centrada', 'Centered'), value: 'centered' },
                  { label: adminLabel('Carrusel', 'Carousel'), value: 'carousel' },
                  { label: adminLabel('Cuadricula', 'Grid'), value: 'grid' },
                  { label: adminLabel('Banda', 'Band'), value: 'band' },
                  { label: adminLabel('Tarjetas', 'Cards'), value: 'cards' },
                  { label: adminLabel('Linea de tiempo', 'Timeline'), value: 'timeline' },
                  { label: adminLabel('Tabla', 'Table'), value: 'table' },
                ],
              },
              {
                name: 'theme',
                type: 'select',
                label: adminLabel('Tema', 'Theme'),
                defaultValue: template.defaultSettings.theme ?? 'auto',
                options: [
                  { label: adminLabel('Automatico', 'Auto'), value: 'auto' },
                  { label: adminLabel('Claro', 'Light'), value: 'light' },
                  { label: adminLabel('Oscuro', 'Dark'), value: 'dark' },
                ],
              },
              {
                name: 'alignment',
                type: 'select',
                label: adminLabel('Alineacion', 'Alignment'),
                defaultValue: template.defaultSettings.alignment ?? 'left',
                options: [
                  { label: adminLabel('Izquierda', 'Left'), value: 'left' },
                  { label: adminLabel('Centro', 'Center'), value: 'center' },
                  { label: adminLabel('Derecha', 'Right'), value: 'right' },
                ],
              },
              {
                name: 'containerWidth',
                type: 'select',
                label: adminLabel('Ancho del contenido', 'Content width'),
                defaultValue: template.defaultSettings.containerWidth ?? 'normal',
                options: [
                  { label: adminLabel('Estrecho', 'Narrow'), value: 'narrow' },
                  { label: adminLabel('Normal', 'Normal'), value: 'normal' },
                  { label: adminLabel('Amplio', 'Wide'), value: 'wide' },
                  { label: adminLabel('Completo', 'Full'), value: 'full' },
                ],
              },
              {
                name: 'background',
                type: 'select',
                label: adminLabel('Fondo', 'Background'),
                defaultValue: template.defaultSettings.background ?? 'default',
                options: [
                  { label: adminLabel('Predeterminado', 'Default'), value: 'default' },
                  { label: adminLabel('Solido', 'Solid'), value: 'solid' },
                  { label: adminLabel('Degradado', 'Gradient'), value: 'gradient' },
                  { label: adminLabel('Visual', 'Visual'), value: 'media' },
                ],
              },
              {
                name: 'spacingTop',
                type: 'select',
                label: adminLabel('Espaciado superior', 'Top spacing'),
                defaultValue: template.defaultSettings.spacingTop ?? 'normal',
                options: [
                  { label: adminLabel('Compacto', 'Compact'), value: 'compact' },
                  { label: adminLabel('Normal', 'Normal'), value: 'normal' },
                  { label: adminLabel('Amplio', 'Spacious'), value: 'spacious' },
                ],
              },
              {
                name: 'spacingBottom',
                type: 'select',
                label: adminLabel('Espaciado inferior', 'Bottom spacing'),
                defaultValue: template.defaultSettings.spacingBottom ?? 'normal',
                options: [
                  { label: adminLabel('Compacto', 'Compact'), value: 'compact' },
                  { label: adminLabel('Normal', 'Normal'), value: 'normal' },
                  { label: adminLabel('Amplio', 'Spacious'), value: 'spacious' },
                ],
              },
            ],
          },
        ],
      },
      {
        label: adminLabel('Comportamiento', 'Behavior'),
        fields: [
          {
            name: 'enabled',
            type: 'checkbox',
            label: adminLabel('Seccion activa', 'Section enabled'),
            defaultValue: true,
          },
          {
            name: 'anchorId',
            type: 'text',
            label: adminLabel('ID de ancla', 'Anchor ID'),
            validate: validateAnchorId,
            admin: { placeholder: 'servicios-principales' },
          },
          {
            name: 'behavior',
            type: 'group',
            label: adminLabel('Ajustes de interaccion', 'Interaction settings'),
            fields: [
              {
                name: 'autoplay',
                type: 'checkbox',
                label: adminLabel('Carrusel automatico', 'Autoplay carousel'),
                defaultValue: Boolean(template.defaultSettings.autoplay),
              },
              {
                name: 'intervalMs',
                type: 'number',
                label: adminLabel('Intervalo del carrusel en ms', 'Carousel interval in ms'),
                defaultValue: template.defaultSettings.intervalMs ?? 6500,
                min: 2500,
                max: 20000,
              },
              {
                name: 'pauseOnHover',
                type: 'checkbox',
                label: adminLabel('Pausar al pasar el cursor', 'Pause on hover'),
                defaultValue: true,
              },
              {
                name: 'loopVideo',
                type: 'checkbox',
                label: adminLabel('Repetir video', 'Loop video'),
                defaultValue: true,
              },
              {
                name: 'muteVideo',
                type: 'checkbox',
                label: adminLabel('Silenciar video', 'Mute video'),
                defaultValue: true,
              },
              {
                name: 'showControls',
                type: 'checkbox',
                label: adminLabel('Mostrar controles', 'Show controls'),
                defaultValue: false,
              },
              {
                name: 'maxItems',
                type: 'number',
                label: adminLabel('Maximo de elementos visibles', 'Maximum visible items'),
                min: 1,
                max: 24,
              },
            ],
          },
        ],
      },
      {
        label: 'Responsive',
        fields: [
          {
            name: 'responsiveSettings',
            type: 'group',
            label: 'Responsive',
            fields: [
              {
                name: 'hideOnDesktop',
                type: 'checkbox',
                label: adminLabel('Ocultar en escritorio', 'Hide on desktop'),
                defaultValue: false,
              },
              {
                name: 'hideOnTablet',
                type: 'checkbox',
                label: adminLabel('Ocultar en tablet', 'Hide on tablet'),
                defaultValue: false,
              },
              {
                name: 'hideOnMobile',
                type: 'checkbox',
                label: adminLabel('Ocultar en movil', 'Hide on mobile'),
                defaultValue: false,
              },
              {
                name: 'columnsDesktop',
                type: 'number',
                label: adminLabel('Columnas escritorio', 'Desktop columns'),
                defaultValue: template.defaultSettings.columnsDesktop ?? 3,
                min: 1,
                max: 4,
              },
              {
                name: 'columnsTablet',
                type: 'number',
                label: adminLabel('Columnas tablet', 'Tablet columns'),
                defaultValue: 2,
                min: 1,
                max: 3,
              },
              {
                name: 'columnsMobile',
                type: 'number',
                label: adminLabel('Columnas movil', 'Mobile columns'),
                defaultValue: 1,
                min: 1,
                max: 2,
              },
              {
                name: 'reverseOnMobile',
                type: 'checkbox',
                label: adminLabel('Invertir orden en movil', 'Reverse order on mobile'),
                defaultValue: false,
              },
            ],
          },
        ],
      },
      {
        label: adminLabel('Accesibilidad', 'Accessibility'),
        fields: [
          textField('ariaLabel', 'Etiqueta accesible de la seccion'),
          {
            name: 'decorativeMedia',
            type: 'checkbox',
            label: adminLabel('La multimedia es decorativa', 'Media is decorative'),
            defaultValue: false,
          },
          textareaField('transcript', 'Transcripcion o descripcion extendida'),
        ],
      },
      {
        label: adminLabel('Avanzado', 'Advanced'),
        fields: [
          {
            name: 'contentSource',
            type: 'select',
            label: adminLabel('Fuente de contenido', 'Content source'),
            defaultValue: 'manual',
            options: [
              { label: adminLabel('Manual', 'Manual'), value: 'manual' },
              { label: adminLabel('Dinamica preparada', 'Prepared dynamic'), value: 'dynamic' },
            ],
          },
          {
            name: 'dynamicSettings',
            type: 'group',
            label: adminLabel('Consulta dinamica', 'Dynamic query'),
            admin: {
              condition: (_, siblingData) => siblingData?.contentSource === 'dynamic',
            },
            fields: [
              {
                name: 'collection',
                type: 'select',
                label: adminLabel('Coleccion', 'Collection'),
                options: [
                  { label: adminLabel('Paginas publicadas', 'Published pages'), value: 'pages' },
                  { label: adminLabel('Casos de exito', 'Case studies'), value: 'case-studies' },
                  { label: adminLabel('Testimonios', 'Testimonials'), value: 'testimonials' },
                  { label: adminLabel('Medios', 'Media'), value: 'media' },
                ],
              },
              {
                name: 'limit',
                type: 'number',
                label: adminLabel('Limite', 'Limit'),
                defaultValue: 6,
                min: 1,
                max: 24,
              },
              {
                name: 'sort',
                type: 'select',
                label: adminLabel('Orden', 'Sort'),
                defaultValue: '-updatedAt',
                options: [
                  { label: adminLabel('Mas recientes', 'Newest'), value: '-updatedAt' },
                  { label: adminLabel('Mas antiguos', 'Oldest'), value: 'updatedAt' },
                  { label: adminLabel('Titulo', 'Title'), value: 'title' },
                ],
              },
            ],
          },
        ],
      },
      ],
    },
  ]
}

const legacyActionFields: Field[] = [
  textField('primaryActionLabel', 'Texto del boton principal'),
  {
    name: 'primaryActionUrl',
    type: 'text',
    label: adminLabel('Destino del boton principal', 'Primary button destination'),
    validate: validateSafeUrl,
  },
]

const legacyHeadingFields: Field[] = [
  textField('eyebrow', 'Etiqueta pequena'),
  textField('title', 'Titulo', { required: true }),
  textareaField('description', 'Descripcion'),
]

const legacyBlocks: Block[] = [
  {
    slug: 'heroSection',
    labels: adminLabels('Portada antigua', 'Portadas antiguas', 'Legacy hero', 'Legacy heroes'),
    admin: { group: 'Compatibilidad', images: { thumbnail: createThumbnail(sectionTemplates[0]) } },
    fields: [
      textField('eyebrow', 'Etiqueta pequena'),
      textField('headline', 'Titular principal', { required: true }),
      textareaField('description', 'Descripcion breve'),
      ...legacyActionFields,
      textField('secondaryActionLabel', 'Segundo boton opcional'),
      {
        name: 'secondaryActionUrl',
        type: 'text',
        label: adminLabel('Destino del segundo boton', 'Second button destination'),
        validate: validateSafeUrl,
      },
      {
        name: 'mediaKind',
        type: 'select',
        label: adminLabel('Tipo de visual', 'Visual type'),
        defaultValue: 'image',
        options: [
          { label: adminLabel('Imagen', 'Image'), value: 'image' },
          { label: 'Video', value: 'video' },
        ],
      },
      mediaField('media', 'Imagen o video principal'),
      {
        name: 'layout',
        type: 'select',
        label: adminLabel('Composicion', 'Composition'),
        defaultValue: 'split',
        options: [
          { label: adminLabel('Texto e imagen', 'Text and image'), value: 'split' },
          { label: adminLabel('Texto centrado', 'Centered text'), value: 'centered' },
          { label: adminLabel('Imagen protagonista', 'Media led'), value: 'mediaLed' },
        ],
      },
    ],
  },
  {
    slug: 'providerCarouselSection',
    labels: adminLabels('Proveedores antiguos', 'Proveedores antiguos', 'Legacy providers', 'Legacy providers'),
    admin: { group: 'Compatibilidad', images: { thumbnail: createThumbnail(sectionTemplates[5]) } },
    fields: [
      ...legacyHeadingFields,
      {
        name: 'displayMode',
        type: 'select',
        label: adminLabel('Movimiento', 'Motion'),
        defaultValue: 'carousel',
        options: [
          { label: adminLabel('Carrusel automatico', 'Automatic carousel'), value: 'carousel' },
          { label: adminLabel('Sin movimiento', 'Static'), value: 'static' },
        ],
      },
      {
        name: 'speed',
        type: 'select',
        label: adminLabel('Velocidad del carrusel', 'Carousel speed'),
        defaultValue: 'normal',
        options: [
          { label: adminLabel('Lenta', 'Slow'), value: 'slow' },
          { label: adminLabel('Normal', 'Normal'), value: 'normal' },
          { label: adminLabel('Rapida', 'Fast'), value: 'fast' },
        ],
      },
      {
        name: 'items',
        type: 'array',
        label: adminLabel('Proveedores, marcas o aliados', 'Providers, brands or partners'),
        fields: [textField('name', 'Nombre visible', { required: true }), mediaField('logo', 'Logo opcional'), { name: 'url', type: 'text', label: adminLabel('Enlace opcional', 'Optional link'), validate: validateSafeUrl }],
      },
    ],
  },
  {
    slug: 'trustSection',
    labels: adminLabels('Confianza antigua', 'Confianza antigua', 'Legacy trust', 'Legacy trust'),
    admin: { group: 'Compatibilidad', images: { thumbnail: createThumbnail(sectionTemplates[7]) } },
    fields: [
      ...legacyHeadingFields,
      {
        name: 'items',
        type: 'array',
        label: adminLabel('Clientes, sellos o aliados', 'Clients, badges or partners'),
        fields: [textField('name', 'Nombre visible', { required: true }), mediaField('logo', 'Logo opcional')],
      },
    ],
  },
  {
    slug: 'featureGridSection',
    labels: adminLabels('Beneficios antiguos', 'Beneficios antiguos', 'Legacy benefits', 'Legacy benefits'),
    admin: { group: 'Compatibilidad', images: { thumbnail: createThumbnail(sectionTemplates[11]) } },
    fields: [
      ...legacyHeadingFields,
      {
        name: 'items',
        type: 'array',
        label: adminLabel('Beneficios', 'Benefits'),
        fields: [textField('title', 'Titulo', { required: true }), textareaField('description', 'Explicacion', { required: true }), mediaField('media', 'Imagen opcional')],
      },
      {
        name: 'layout',
        type: 'select',
        label: adminLabel('Estilo de tarjetas', 'Card style'),
        defaultValue: 'cards',
        options: [
          { label: adminLabel('Tarjetas sobrias', 'Quiet cards'), value: 'cards' },
          { label: adminLabel('Listado editorial', 'Editorial list'), value: 'list' },
        ],
      },
    ],
  },
  {
    slug: 'storySection',
    labels: adminLabels('Historia antigua', 'Historias antiguas', 'Legacy story', 'Legacy stories'),
    admin: { group: 'Compatibilidad', images: { thumbnail: createThumbnail(sectionTemplates[10]) } },
    fields: [
      ...legacyHeadingFields,
      mediaField('media', 'Imagen'),
      {
        name: 'imagePosition',
        type: 'select',
        label: adminLabel('Posicion de imagen', 'Image position'),
        defaultValue: 'right',
        options: [
          { label: adminLabel('Izquierda', 'Left'), value: 'left' },
          { label: adminLabel('Derecha', 'Right'), value: 'right' },
        ],
      },
      ...legacyActionFields,
    ],
  },
  {
    slug: 'metricsSection',
    labels: adminLabels('Metricas antiguas', 'Metricas antiguas', 'Legacy metrics', 'Legacy metrics'),
    admin: { group: 'Compatibilidad', images: { thumbnail: createThumbnail(sectionTemplates[6]) } },
    fields: [
      ...legacyHeadingFields,
      {
        name: 'items',
        type: 'array',
        label: adminLabel('Metricas', 'Metrics'),
        fields: [{ name: 'value', type: 'text', label: adminLabel('Numero o resultado', 'Number or result'), required: true }, textField('label', 'Que representa', { required: true }), textField('description', 'Contexto opcional')],
      },
    ],
  },
  {
    slug: 'processSection',
    labels: adminLabels('Proceso antiguo', 'Procesos antiguos', 'Legacy process', 'Legacy processes'),
    admin: { group: 'Compatibilidad', images: { thumbnail: createThumbnail(sectionTemplates[16]) } },
    fields: [
      ...legacyHeadingFields,
      {
        name: 'steps',
        type: 'array',
        label: adminLabel('Pasos', 'Steps'),
        fields: [textField('title', 'Titulo del paso', { required: true }), textareaField('description', 'Explicacion', { required: true })],
      },
    ],
  },
  {
    slug: 'caseStudySection',
    labels: adminLabels('Caso antiguo', 'Casos antiguos', 'Legacy case', 'Legacy cases'),
    admin: { group: 'Compatibilidad', images: { thumbnail: createThumbnail(sectionTemplates[19]) } },
    fields: [...legacyHeadingFields, textField('client', 'Cliente o contexto'), textField('result', 'Resultado principal'), mediaField('media', 'Imagen del caso'), ...legacyActionFields],
  },
  {
    slug: 'testimonialSection',
    labels: adminLabels('Testimonios antiguos', 'Testimonios antiguos', 'Legacy testimonials', 'Legacy testimonials'),
    admin: { group: 'Compatibilidad', images: { thumbnail: createThumbnail(sectionTemplates[21]) } },
    fields: [
      ...legacyHeadingFields,
      {
        name: 'items',
        type: 'array',
        label: adminLabel('Testimonios', 'Testimonials'),
        fields: [textareaField('quote', 'Cita real', { required: true }), textField('name', 'Nombre', { required: true }), textField('role', 'Cargo o empresa')],
      },
    ],
  },
  {
    slug: 'faqSection',
    labels: adminLabels('FAQ antiguo', 'FAQ antiguo', 'Legacy FAQ', 'Legacy FAQ'),
    admin: { group: 'Compatibilidad', images: { thumbnail: createThumbnail(sectionTemplates[32]) } },
    fields: [
      ...legacyHeadingFields,
      {
        name: 'items',
        type: 'array',
        label: adminLabel('Preguntas', 'Questions'),
        fields: [textField('question', 'Pregunta', { required: true }), textareaField('answer', 'Respuesta', { required: true })],
      },
    ],
  },
  {
    slug: 'ctaSection',
    labels: adminLabels('CTA antiguo', 'CTA antiguo', 'Legacy CTA', 'Legacy CTA'),
    admin: { group: 'Compatibilidad', images: { thumbnail: createThumbnail(sectionTemplates[33]) } },
    fields: [
      ...legacyHeadingFields,
      textField('actionLabel', 'Texto del boton', { required: true }),
      { name: 'actionUrl', type: 'text', label: adminLabel('Destino del boton', 'Button destination'), required: true, validate: validateSafeUrl },
      textField('secondaryActionLabel', 'Segundo boton opcional'),
      { name: 'secondaryActionUrl', type: 'text', label: adminLabel('Destino del segundo boton', 'Second button destination'), validate: validateSafeUrl },
    ],
  },
]

export const pageComposerBlocks: Block[] = [
  ...sectionTemplates.map((template) => ({
  slug: template.key,
  labels: adminLabels(template.name, template.name, template.name, template.name),
  admin: {
    custom: {
      category: template.category,
      description: template.description,
      recommendedFor: template.recommendedFor,
      schema: template.schema,
      status: template.status,
      tags: template.tags,
      version: template.version,
    },
    group: getSectionBuilderGroup(template.category),
    images: {
      thumbnail: {
        alt: template.name,
        url: createThumbnail(template),
      },
    },
  },
  fields: createBlockFields(template),
  })),
  ...legacyBlocks,
]
