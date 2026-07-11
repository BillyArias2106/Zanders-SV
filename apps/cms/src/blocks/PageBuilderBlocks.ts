import type { Block, Field, StaticLabel, TextFieldSingleValidation } from 'payload'

import { adminLabel, adminLabels } from '../lib/admin-i18n'

const hexColorPattern = /^#(?:[0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/
const safeClassNamePattern = /^[A-Za-z0-9_:\-./\s[\]]*$/
const sectionBuilderGroup = adminLabel('Secciones de página', 'Page sections')

const validateHexColor: TextFieldSingleValidation = (value) => {
  if (!value) {
    return true
  }

  return (
    hexColorPattern.test(value) ||
    'Usa un color HEX válido, por ejemplo #0F172A.'
  )
}

const validateSafeClassName: TextFieldSingleValidation = (value) => {
  if (!value) {
    return true
  }

  return (
    safeClassNamePattern.test(value) ||
    'Usa solo clases CSS simples, separadas por espacios.'
  )
}

const colorField = (
  name: string,
  label: StaticLabel,
  defaultValue?: string
): Field => ({
  name,
  type: 'text',
  label,
  defaultValue,
  admin: {
    components: {
      Field: {
        path: '@/components/ColorPickerField',
        exportName: 'ColorPickerField'
      }
    },
    description: adminLabel('Formato HEX. Ejemplo: #0F172A.', 'HEX format. Example: #0F172A.'),
    placeholder: defaultValue ?? '#0F172A'
  },
  validate: validateHexColor
})

const imageFilter = {
  mimeType: {
    contains: 'image/'
  }
}

const videoFilter = {
  mimeType: {
    contains: 'video/'
  }
}

const alignmentOptions = [
  { label: adminLabel('Izquierda', 'Left'), value: 'left' },
  { label: adminLabel('Centro', 'Center'), value: 'center' },
  { label: adminLabel('Derecha', 'Right'), value: 'right' }
]

const borderRadiusOptions = [
  { label: adminLabel('Sin bordes redondeados', 'No rounded corners'), value: 'none' },
  { label: adminLabel('Pequeño', 'Small'), value: 'sm' },
  { label: adminLabel('Medio', 'Medium'), value: 'md' },
  { label: adminLabel('Grande', 'Large'), value: 'lg' },
  { label: adminLabel('Extra grande', 'Extra large'), value: 'xl' }
]

const shadowOptions = [
  { label: adminLabel('Sin sombra', 'No shadow'), value: 'none' },
  { label: adminLabel('Suave', 'Soft'), value: 'soft' },
  { label: adminLabel('Fuerte', 'Strong'), value: 'strong' }
]

const paddingOptions = [
  { label: adminLabel('Sin espacio interno', 'No padding'), value: 'none' },
  { label: adminLabel('Pequeño', 'Small'), value: 'sm' },
  { label: adminLabel('Medio', 'Medium'), value: 'md' },
  { label: adminLabel('Grande', 'Large'), value: 'lg' },
  { label: adminLabel('Extra grande', 'Extra large'), value: 'xl' }
]

const linkFields = [
  {
    name: 'primaryButtonLabel',
    type: 'text',
    label: adminLabel('Texto del botón principal', 'Primary button text')
  },
  {
    name: 'primaryButtonUrl',
    type: 'text',
    label: adminLabel('URL del botón principal', 'Primary button URL'),
    admin: {
      placeholder: '/contacto'
    }
  },
  {
    name: 'secondaryButtonLabel',
    type: 'text',
    label: adminLabel('Texto del botón secundario', 'Secondary button text')
  },
  {
    name: 'secondaryButtonUrl',
    type: 'text',
    label: adminLabel('URL del botón secundario', 'Secondary button URL'),
    admin: {
      placeholder: '/servicios'
    }
  }
] satisfies Block['fields']

const snapLayoutItemFields: Field[] = [
  {
    name: 'contentType',
    type: 'select',
    label: adminLabel('Tipo de contenido', 'Content type'),
    required: true,
    defaultValue: 'text',
    options: [
      { label: adminLabel('Texto simple', 'Simple text'), value: 'text' },
      { label: adminLabel('Texto con formato', 'Rich text'), value: 'richText' },
      { label: adminLabel('Imagen', 'Image'), value: 'image' },
      { label: 'Video', value: 'video' },
      { label: adminLabel('Tarjeta', 'Card'), value: 'card' },
      { label: adminLabel('Ícono + texto', 'Icon + text'), value: 'iconText' },
      { label: adminLabel('Medio + texto', 'Media + text'), value: 'mediaText' },
      { label: adminLabel('Botón', 'Button'), value: 'button' },
      { label: adminLabel('Lista', 'List'), value: 'list' },
      { label: 'CTA', value: 'cta' }
    ]
  },
  {
    name: 'title',
    type: 'text',
    label: adminLabel('Título', 'Title')
  },
  {
    name: 'subtitle',
    type: 'text',
    label: adminLabel('Subtítulo', 'Subtitle')
  },
  {
    name: 'description',
    type: 'textarea',
    label: adminLabel('Descripción', 'Description'),
    admin: {
      rows: 4
    }
  },
  {
    name: 'richText',
    type: 'richText',
    label: adminLabel('Texto con formato opcional', 'Optional rich text')
  },
  {
    name: 'image',
    type: 'upload',
    label: adminLabel('Imagen', 'Image'),
    relationTo: 'media',
    displayPreview: true,
    filterOptions: imageFilter
  },
  {
    name: 'video',
    type: 'upload',
    label: 'Video',
    relationTo: 'media',
    filterOptions: videoFilter
  },
  {
    name: 'iconName',
    type: 'text',
    label: adminLabel('Ícono', 'Icon'),
    admin: {
      description: adminLabel(
        'Nombre sugerido: sparkles, plane, printer, camera, phone, mail, map, wrench.',
        'Suggested name: sparkles, plane, printer, camera, phone, mail, map, wrench.'
      )
    }
  },
  {
    name: 'linkLabel',
    type: 'text',
    label: adminLabel('Texto del enlace', 'Link text')
  },
  {
    name: 'linkUrl',
    type: 'text',
    label: adminLabel('URL del enlace', 'Link URL')
  },
  {
    name: 'linkOpenInNewTab',
    type: 'checkbox',
    label: adminLabel('Abrir enlace en nueva pestaña', 'Open link in new tab'),
    defaultValue: false
  },
  {
    name: 'buttonLabel',
    type: 'text',
    label: adminLabel('Texto del botón', 'Button text')
  },
  {
    name: 'buttonUrl',
    type: 'text',
    label: adminLabel('URL del botón', 'Button URL')
  },
  {
    name: 'buttonOpenInNewTab',
    type: 'checkbox',
    label: adminLabel('Abrir botón en nueva pestaña', 'Open button in new tab'),
    defaultValue: false
  },
  {
    name: 'listItems',
    type: 'array',
    label: adminLabel('Lista', 'List'),
    labels: adminLabels('Ítem', 'Ítems', 'Item', 'Items'),
    fields: [
      {
        name: 'text',
        type: 'text',
        label: adminLabel('Texto', 'Text')
      }
    ]
  },
  colorField('backgroundColor', adminLabel('Color de fondo', 'Background color')),
  colorField('textColor', adminLabel('Color de texto', 'Text color')),
  {
    name: 'borderRadius',
    type: 'select',
    label: adminLabel('Bordes redondeados', 'Rounded corners'),
    defaultValue: 'md',
    options: borderRadiusOptions
  },
  {
    name: 'shadow',
    type: 'select',
    label: adminLabel('Sombra', 'Shadow'),
    defaultValue: 'none',
    options: shadowOptions
  },
  {
    name: 'showBorder',
    type: 'checkbox',
    label: adminLabel('Mostrar borde', 'Show border'),
    defaultValue: true
  },
  {
    name: 'padding',
    type: 'select',
    label: adminLabel('Espacio interno', 'Padding'),
    defaultValue: 'md',
    options: paddingOptions
  },
  {
    name: 'alignment',
    type: 'select',
    label: adminLabel('Alineación', 'Alignment'),
    defaultValue: 'left',
    options: alignmentOptions
  },
  {
    name: 'responsiveOrder',
    type: 'number',
    label: adminLabel('Orden en pantallas pequeñas', 'Small-screen order'),
    admin: {
      description: adminLabel(
        'Número opcional para ordenar esta caja en pantallas pequeñas.',
        'Optional number to order this box on small screens.'
      )
    }
  },
  {
    name: 'isActive',
    type: 'checkbox',
    label: adminLabel('Activo', 'Active'),
    defaultValue: true
  }
]

export const HeroBlock: Block = {
  slug: 'hero',
  labels: adminLabels('Portada principal', 'Portadas principales', 'Hero', 'Heroes'),
  admin: {
    group: sectionBuilderGroup
  },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      label: adminLabel('Texto pequeño superior', 'Small top text')
    },
    {
      name: 'title',
      type: 'text',
      label: adminLabel('Título', 'Title'),
      required: true
    },
    {
      name: 'subtitle',
      type: 'text',
      label: adminLabel('Subtítulo', 'Subtitle')
    },
    {
      name: 'description',
      type: 'textarea',
      label: adminLabel('Descripción', 'Description'),
      admin: {
        rows: 4
      }
    },
    {
      name: 'backgroundMedia',
      type: 'upload',
      label: adminLabel('Imagen o video de fondo', 'Background image or video'),
      relationTo: 'media'
    },
    ...linkFields
  ]
}

export const RichTextBlock: Block = {
  slug: 'richText',
  labels: adminLabels('Texto', 'Textos', 'Text', 'Text'),
  admin: {
    group: sectionBuilderGroup
  },
  fields: [
    {
      name: 'content',
      type: 'richText',
      label: adminLabel('Texto', 'Text'),
      required: true
    },
    {
      name: 'alignment',
      type: 'select',
      label: adminLabel('Alineación', 'Alignment'),
      defaultValue: 'left',
      options: [
        { label: adminLabel('Izquierda', 'Left'), value: 'left' },
        { label: adminLabel('Centro', 'Center'), value: 'center' },
        { label: adminLabel('Derecha', 'Right'), value: 'right' }
      ]
    },
    {
      name: 'width',
      type: 'select',
      label: adminLabel('Ancho del contenido', 'Content width'),
      defaultValue: 'normal',
      options: [
        { label: 'Normal', value: 'normal' },
        { label: adminLabel('Amplio', 'Wide'), value: 'wide' },
        { label: adminLabel('Estrecho', 'Narrow'), value: 'narrow' }
      ]
    }
  ]
}

export const ImageTextBlock: Block = {
  slug: 'imageText',
  labels: adminLabels('Imagen + texto', 'Imagen + texto', 'Image + text', 'Image + text'),
  admin: {
    group: sectionBuilderGroup
  },
  fields: [
    {
      name: 'image',
      type: 'upload',
      label: adminLabel('Imagen', 'Image'),
      relationTo: 'media'
    },
    {
      name: 'title',
      type: 'text',
      label: adminLabel('Título', 'Title'),
      required: true
    },
    {
      name: 'description',
      type: 'textarea',
      label: adminLabel('Descripción', 'Description'),
      admin: {
        rows: 5
      }
    },
    {
      name: 'imagePosition',
      type: 'select',
      label: adminLabel('Posición de imagen', 'Image position'),
      defaultValue: 'left',
      options: [
        { label: adminLabel('Izquierda', 'Left'), value: 'left' },
        { label: adminLabel('Derecha', 'Right'), value: 'right' }
      ]
    },
    {
      name: 'buttonLabel',
      type: 'text',
      label: adminLabel('Texto de botón', 'Button text')
    },
    {
      name: 'buttonUrl',
      type: 'text',
      label: adminLabel('URL de botón', 'Button URL')
    }
  ]
}

export const CardsBlock: Block = {
  slug: 'cards',
  labels: adminLabels('Tarjetas / Servicios', 'Tarjetas / Servicios', 'Cards / Services', 'Cards / Services'),
  admin: {
    group: sectionBuilderGroup
  },
  fields: [
    {
      name: 'sectionTitle',
      type: 'text',
      label: adminLabel('Título de sección', 'Section title')
    },
    {
      name: 'sectionDescription',
      type: 'textarea',
      label: adminLabel('Descripción de sección', 'Section description'),
      admin: {
        rows: 3
      }
    },
    {
      name: 'cards',
      type: 'array',
      label: adminLabel('Tarjetas', 'Cards'),
      labels: adminLabels('Tarjeta', 'Tarjetas', 'Card', 'Cards'),
      fields: [
        {
          name: 'title',
          type: 'text',
          label: adminLabel('Título', 'Title'),
          required: true
        },
        {
          name: 'description',
          type: 'textarea',
          label: adminLabel('Descripción', 'Description'),
          admin: {
            rows: 3
          }
        },
        {
          name: 'media',
          type: 'upload',
          label: adminLabel('Ícono o imagen', 'Icon or image'),
          relationTo: 'media'
        },
        {
          name: 'url',
          type: 'text',
          label: 'URL'
        }
      ]
    }
  ]
}

export const GalleryBlock: Block = {
  slug: 'gallery',
  labels: adminLabels('Galería', 'Galerías', 'Gallery', 'Galleries'),
  admin: {
    group: sectionBuilderGroup
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: adminLabel('Título', 'Title')
    },
    {
      name: 'description',
      type: 'textarea',
      label: adminLabel('Descripción', 'Description'),
      admin: {
        rows: 3
      }
    },
    {
      name: 'images',
      type: 'array',
      label: adminLabel('Imágenes', 'Images'),
      fields: [
        {
          name: 'image',
          type: 'upload',
          label: adminLabel('Imagen', 'Image'),
          relationTo: 'media',
          required: true
        },
        {
          name: 'caption',
          type: 'text',
          label: adminLabel(
            'Texto alternativo o descripción corta',
            'Alternative text or short description'
          )
        }
      ]
    }
  ]
}

export const MediaBlock: Block = {
  slug: 'mediaBlock',
  labels: adminLabels('Multimedia', 'Multimedia', 'Media', 'Media'),
  admin: {
    group: sectionBuilderGroup
  },
  fields: [
    {
      name: 'media',
      type: 'upload',
      label: adminLabel('Imagen o video', 'Image or video'),
      relationTo: 'media',
      required: true,
      displayPreview: true
    },
    {
      name: 'mediaKind',
      type: 'select',
      label: adminLabel('Tipo de medio', 'Media type'),
      required: true,
      defaultValue: 'image',
      options: [
        { label: adminLabel('Imagen', 'Image'), value: 'image' },
        { label: 'Video', value: 'video' }
      ]
    },
    {
      name: 'title',
      type: 'text',
      label: adminLabel('Título opcional', 'Optional title')
    },
    {
      name: 'description',
      type: 'textarea',
      label: adminLabel('Descripción opcional', 'Optional description'),
      admin: {
        rows: 3
      }
    },
    {
      name: 'altText',
      type: 'text',
      label: adminLabel('Texto alternativo', 'Alternative text')
    },
    {
      name: 'width',
      type: 'select',
      label: adminLabel('Ancho', 'Width'),
      required: true,
      defaultValue: 'normal',
      options: [
        { label: adminLabel('Completo', 'Full'), value: 'full' },
        { label: adminLabel('Ancho normal', 'Normal width'), value: 'normal' },
        { label: adminLabel('Pequeño', 'Small'), value: 'small' },
        { label: adminLabel('Personalizado', 'Custom'), value: 'custom' }
      ]
    },
    {
      name: 'customWidth',
      type: 'text',
      label: adminLabel('Ancho personalizado', 'Custom width'),
      admin: {
        condition: (_, siblingData) =>
          (siblingData as { width?: string }).width === 'custom',
        placeholder: '960px, 72rem o 80%'
      }
    },
    {
      name: 'height',
      type: 'select',
      label: adminLabel('Alto', 'Height'),
      required: true,
      defaultValue: 'auto',
      options: [
        { label: adminLabel('Automático', 'Automatic'), value: 'auto' },
        { label: adminLabel('Fijo', 'Fixed'), value: 'fixed' },
        { label: adminLabel('Alto de pantalla', 'Viewport height'), value: 'viewport' }
      ]
    },
    {
      name: 'fixedHeight',
      type: 'text',
      label: adminLabel('Alto fijo', 'Fixed height'),
      admin: {
        condition: (_, siblingData) =>
          (siblingData as { height?: string }).height === 'fixed',
        placeholder: '420px, 32rem'
      }
    },
    {
    name: 'alignment',
    type: 'select',
    label: adminLabel('Alineación', 'Alignment'),
      required: true,
      defaultValue: 'center',
      options: alignmentOptions
    },
    {
    name: 'borderRadius',
    type: 'select',
    label: adminLabel('Bordes redondeados', 'Rounded corners'),
      defaultValue: 'md',
      options: borderRadiusOptions
    },
    {
    name: 'shadow',
    type: 'select',
    label: adminLabel('Sombra', 'Shadow'),
      defaultValue: 'soft',
      options: shadowOptions
    },
    {
    name: 'showBorder',
    type: 'checkbox',
    label: adminLabel('Mostrar borde', 'Show border'),
      defaultValue: false
    },
    {
    name: 'objectFit',
    type: 'select',
    label: adminLabel('Ajuste de imagen/video', 'Image/video fit'),
      defaultValue: 'cover',
      options: [
        { label: adminLabel('Cubrir el espacio', 'Cover the space'), value: 'cover' },
        { label: adminLabel('Mostrar completo', 'Show complete'), value: 'contain' }
      ]
    },
    {
    name: 'autoplay',
    type: 'checkbox',
    label: adminLabel('Reproducir automáticamente', 'Autoplay'),
      defaultValue: false,
      admin: {
        condition: (_, siblingData) =>
          (siblingData as { mediaKind?: string }).mediaKind === 'video'
      }
    },
    {
    name: 'muted',
    type: 'checkbox',
    label: adminLabel('Sin sonido', 'Muted'),
      defaultValue: true,
      admin: {
        condition: (_, siblingData) =>
          (siblingData as { mediaKind?: string }).mediaKind === 'video'
      }
    },
    {
    name: 'loop',
    type: 'checkbox',
    label: adminLabel('Repetir al terminar', 'Loop'),
      defaultValue: false,
      admin: {
        condition: (_, siblingData) =>
          (siblingData as { mediaKind?: string }).mediaKind === 'video'
      }
    },
    {
    name: 'controls',
    type: 'checkbox',
    label: adminLabel('Mostrar controles', 'Show controls'),
      defaultValue: true,
      admin: {
        condition: (_, siblingData) =>
          (siblingData as { mediaKind?: string }).mediaKind === 'video'
      }
    },
    {
    name: 'poster',
    type: 'upload',
    label: adminLabel('Imagen de portada', 'Poster image'),
      relationTo: 'media',
      displayPreview: true,
      filterOptions: imageFilter,
      admin: {
        condition: (_, siblingData) =>
          (siblingData as { mediaKind?: string }).mediaKind === 'video'
      }
    }
  ]
}

export const VideoBlock: Block = {
  slug: 'videoBlock',
  labels: adminLabels('Video', 'Videos', 'Video', 'Videos'),
  admin: {
    group: sectionBuilderGroup
  },
  fields: [
    {
      name: 'videoSource',
      type: 'select',
      label: adminLabel('Fuente del video', 'Video source'),
      required: true,
      defaultValue: 'internal',
      options: [
        { label: adminLabel('Video interno', 'Internal video'), value: 'internal' },
        { label: adminLabel('URL externa', 'External URL'), value: 'external' }
      ]
    },
    {
      name: 'internalVideo',
      type: 'upload',
      label: adminLabel('Video interno', 'Internal video'),
      relationTo: 'media',
      filterOptions: videoFilter,
      admin: {
        condition: (_, siblingData) =>
          (siblingData as { videoSource?: string }).videoSource !== 'external'
      }
    },
    {
      name: 'externalUrl',
      type: 'text',
      label: adminLabel('URL externa', 'External URL'),
      admin: {
        condition: (_, siblingData) =>
          (siblingData as { videoSource?: string }).videoSource === 'external',
        placeholder: 'YouTube, Vimeo o enlace directo .mp4/.webm'
      }
    },
    {
      name: 'externalProvider',
      type: 'select',
      label: adminLabel('Proveedor externo', 'External provider'),
      defaultValue: 'auto',
      options: [
        { label: adminLabel('Detectar automáticamente', 'Auto-detect'), value: 'auto' },
        { label: 'YouTube', value: 'youtube' },
        { label: 'Vimeo', value: 'vimeo' },
        { label: adminLabel('Enlace directo', 'Direct link'), value: 'direct' }
      ],
      admin: {
        condition: (_, siblingData) =>
          (siblingData as { videoSource?: string }).videoSource === 'external'
      }
    },
    {
      name: 'title',
      type: 'text',
      label: adminLabel('Título', 'Title')
    },
    {
      name: 'description',
      type: 'textarea',
      label: adminLabel('Descripción', 'Description'),
      admin: {
        rows: 3
      }
    },
    {
      name: 'poster',
      type: 'upload',
      label: adminLabel('Imagen de portada', 'Poster image'),
      relationTo: 'media',
      displayPreview: true,
      filterOptions: imageFilter
    },
    {
      name: 'autoplay',
      type: 'checkbox',
      label: adminLabel('Reproducir automáticamente', 'Autoplay'),
      defaultValue: false
    },
    {
      name: 'muted',
      type: 'checkbox',
      label: adminLabel('Sin sonido', 'Muted'),
      defaultValue: true
    },
    {
      name: 'loop',
      type: 'checkbox',
      label: adminLabel('Repetir al terminar', 'Loop'),
      defaultValue: false
    },
    {
      name: 'controls',
      type: 'checkbox',
      label: adminLabel('Mostrar controles', 'Show controls'),
      defaultValue: true
    },
    {
      name: 'aspectRatio',
      type: 'select',
      label: adminLabel('Aspecto', 'Aspect ratio'),
      required: true,
      defaultValue: '16:9',
      options: [
        { label: '16:9', value: '16:9' },
        { label: '4:3', value: '4:3' },
        { label: '1:1', value: '1:1' },
        { label: 'Vertical', value: 'vertical' }
      ]
    }
  ]
}

export const SnapLayoutBlock: Block = {
  slug: 'snapLayoutBlock',
  labels: adminLabels('Sección personalizada', 'Secciones personalizadas', 'Custom section', 'Custom sections'),
  admin: {
    group: sectionBuilderGroup
  },
  fields: [
    {
      name: 'isActive',
      type: 'checkbox',
      label: adminLabel('Sección activa', 'Active section'),
      defaultValue: true
    },
    {
      name: 'sectionId',
      type: 'text',
      label: adminLabel('ID de sección / ancla', 'Section ID / anchor'),
      admin: {
        placeholder: 'servicios'
      }
    },
    {
      name: 'sectionTitle',
      type: 'text',
      label: adminLabel('Título de sección', 'Section title')
    },
    {
      name: 'sectionSubtitle',
      type: 'text',
      label: adminLabel('Subtítulo', 'Subtitle')
    },
    {
      name: 'sectionDescription',
      type: 'textarea',
      label: adminLabel('Descripción', 'Description'),
      admin: {
        rows: 4
      }
    },
    colorField('backgroundColor', adminLabel('Color de fondo de sección', 'Section background color')),
    {
      name: 'backgroundImage',
      type: 'upload',
      label: adminLabel('Imagen de fondo', 'Background image'),
      relationTo: 'media',
      displayPreview: true,
      filterOptions: imageFilter
    },
    {
      name: 'backgroundVideo',
      type: 'upload',
      label: adminLabel('Video de fondo', 'Background video'),
      relationTo: 'media',
      filterOptions: videoFilter
    },
    colorField('textColor', adminLabel('Color de texto de sección', 'Section text color')),
    {
      name: 'maxWidth',
      type: 'select',
      label: adminLabel('Ancho máximo del contenido', 'Maximum content width'),
      required: true,
      defaultValue: 'wide',
      options: [
        { label: adminLabel('Estrecho', 'Narrow'), value: 'narrow' },
        { label: 'Normal', value: 'normal' },
        { label: adminLabel('Amplio', 'Wide'), value: 'wide' },
        { label: adminLabel('Completo', 'Full'), value: 'full' }
      ]
    },
    {
      name: 'paddingTop',
      type: 'select',
      label: adminLabel('Espacio superior', 'Top spacing'),
      defaultValue: 'lg',
      options: paddingOptions
    },
    {
      name: 'paddingBottom',
      type: 'select',
      label: adminLabel('Espacio inferior', 'Bottom spacing'),
      defaultValue: 'lg',
      options: paddingOptions
    },
    {
      name: 'gap',
      type: 'select',
      label: adminLabel('Separación entre cajas', 'Gap between boxes'),
      defaultValue: 'md',
      options: [
        { label: adminLabel('Sin separación', 'No gap'), value: 'none' },
        { label: adminLabel('Pequeño', 'Small'), value: 'sm' },
        { label: adminLabel('Medio', 'Medium'), value: 'md' },
        { label: adminLabel('Grande', 'Large'), value: 'lg' },
        { label: adminLabel('Extra grande', 'Extra large'), value: 'xl' }
      ]
    },
    {
      name: 'alignment',
      type: 'select',
      label: adminLabel('Alineación general', 'General alignment'),
      defaultValue: 'left',
      options: alignmentOptions
    },
    {
      name: 'layout',
      type: 'select',
      label: adminLabel('Estructura de la sección', 'Section structure'),
      required: true,
      defaultValue: 'oneColumn',
      options: [
        { label: adminLabel('Una columna completa', 'One full column'), value: 'oneColumn' },
        { label: adminLabel('Dos columnas 50/50', 'Two columns 50/50'), value: 'twoColumns' },
        { label: adminLabel('Dos columnas 70/30', 'Two columns 70/30'), value: 'twoColumnsWideLeft' },
        { label: adminLabel('Dos columnas 30/70', 'Two columns 30/70'), value: 'twoColumnsWideRight' },
        { label: adminLabel('Tres columnas iguales', 'Three equal columns'), value: 'threeColumns' },
        { label: adminLabel('Cuatro columnas iguales', 'Four equal columns'), value: 'fourColumns' },
        {
          label: adminLabel(
            'Caja grande izquierda + dos pequeñas derecha',
            'Large box left + two small right'
          ),
          value: 'featureLeft'
        },
        {
          label: adminLabel(
            'Dos pequeñas izquierda + caja grande derecha',
            'Two small left + large box right'
          ),
          value: 'featureRight'
        },
        { label: adminLabel('Cuadrícula tipo bento', 'Bento grid'), value: 'bentoGrid' },
        { label: adminLabel('Tarjetas de servicios', 'Service cards'), value: 'serviceCards' },
        { label: adminLabel('Texto izquierda + medio derecha', 'Text left + media right'), value: 'textMedia' },
        { label: adminLabel('Medio izquierda + texto derecha', 'Media left + text right'), value: 'mediaText' },
        { label: adminLabel('Contacto: datos + formulario/tarjeta', 'Contact: details + form/card'), value: 'contact' },
        { label: adminLabel('Galería en mosaico', 'Mosaic gallery'), value: 'mosaicGallery' },
        { label: adminLabel('Portada dividida', 'Split hero'), value: 'splitHero' }
      ]
    },
    {
      name: 'layoutPreview',
      type: 'ui',
      admin: {
        components: {
          Field: {
            path: '@/components/admin/SnapLayoutPreview',
            exportName: 'SnapLayoutPreview'
          }
        }
      }
    },
    {
      name: 'className',
      type: 'text',
      label: adminLabel('Clase CSS adicional', 'Additional CSS class'),
      admin: {
        description: adminLabel(
          'Opcional. Usa solo clases conocidas y simples; no acepta CSS libre.',
          'Optional. Use only known simple classes; free CSS is not accepted.'
        )
      },
      validate: validateSafeClassName
    },
    {
      name: 'items',
      type: 'array',
      label: adminLabel('Cajas / tarjetas', 'Boxes / cards'),
      labels: adminLabels('Caja', 'Cajas', 'Box', 'Boxes'),
      fields: snapLayoutItemFields
    }
  ]
}

export const CTABlock: Block = {
  slug: 'cta',
  labels: adminLabels('Llamado a la acción', 'Llamados a la acción', 'Call to action', 'Calls to action'),
  admin: {
    group: sectionBuilderGroup
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: adminLabel('Título', 'Title'),
      required: true
    },
    {
      name: 'description',
      type: 'textarea',
      label: adminLabel('Descripción', 'Description'),
      admin: {
        rows: 3
      }
    },
    {
      name: 'buttonLabel',
      type: 'text',
      label: adminLabel('Texto de botón', 'Button text')
    },
    {
      name: 'buttonUrl',
      type: 'text',
      label: adminLabel('URL de botón', 'Button URL')
    },
    {
      name: 'variant',
      type: 'select',
      label: adminLabel('Variante visual', 'Visual variant'),
      defaultValue: 'solid',
      options: [
        { label: adminLabel('Sólida', 'Solid'), value: 'solid' },
        { label: adminLabel('Contorno', 'Outline'), value: 'outline' },
        { label: adminLabel('Simple', 'Minimal'), value: 'minimal' }
      ]
    }
  ]
}

export const FAQBlock: Block = {
  slug: 'faq',
  labels: adminLabels('Preguntas frecuentes', 'Preguntas frecuentes', 'FAQ', 'FAQ'),
  admin: {
    group: sectionBuilderGroup
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: adminLabel('Título de sección', 'Section title')
    },
    {
      name: 'items',
      type: 'array',
      label: adminLabel('Preguntas', 'Questions'),
      labels: adminLabels('Pregunta', 'Preguntas', 'Question', 'Questions'),
      fields: [
        {
          name: 'question',
          type: 'text',
          label: adminLabel('Pregunta', 'Question'),
          required: true
        },
        {
          name: 'answer',
          type: 'textarea',
          label: adminLabel('Respuesta', 'Answer'),
          required: true,
          admin: {
            rows: 4
          }
        }
      ]
    }
  ]
}

export const LogoStripBlock: Block = {
  slug: 'logoStrip',
  labels: adminLabels('Logos de clientes', 'Logos de clientes', 'Client logos', 'Client logos'),
  admin: {
    group: sectionBuilderGroup
  },
  fields: [
    {
      name: 'sectionTitle',
      type: 'text',
      label: adminLabel('Título corto', 'Short title')
    },
    {
      name: 'sectionDescription',
      type: 'textarea',
      label: adminLabel('Descripción corta', 'Short description'),
      admin: {
        rows: 2
      }
    },
    {
      name: 'displayStyle',
      type: 'select',
      label: adminLabel('Estilo visual', 'Visual style'),
      defaultValue: 'logos',
      options: [
        { label: adminLabel('Logos / nombres en fila', 'Logos / names in a row'), value: 'logos' },
        { label: adminLabel('Marquesina horizontal', 'Horizontal marquee'), value: 'marquee' },
        { label: adminLabel('Bloques compactos', 'Compact tiles'), value: 'tiles' }
      ]
    },
    {
      name: 'items',
      type: 'array',
      label: adminLabel('Clientes o marcas', 'Clients or brands'),
      labels: adminLabels('Marca', 'Marcas', 'Brand', 'Brands'),
      minRows: 1,
      fields: [
        {
          name: 'name',
          type: 'text',
          label: adminLabel('Nombre', 'Name'),
          required: true
        },
        {
          name: 'image',
          type: 'upload',
          label: 'Logo',
          relationTo: 'media',
          displayPreview: true,
          filterOptions: imageFilter
        },
        {
          name: 'url',
          type: 'text',
          label: 'URL'
        },
        {
          name: 'openInNewTab',
          type: 'checkbox',
          label: adminLabel('Abrir enlace en nueva pestaña', 'Open link in new tab'),
          defaultValue: true
        }
      ]
    }
  ]
}

export const StatsBlock: Block = {
  slug: 'stats',
  labels: adminLabels('Métricas destacadas', 'Métricas destacadas', 'Featured stats', 'Featured stats'),
  admin: {
    group: sectionBuilderGroup
  },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      label: adminLabel('Texto pequeño superior', 'Small top text')
    },
    {
      name: 'title',
      type: 'text',
      label: adminLabel('Título', 'Title')
    },
    {
      name: 'description',
      type: 'textarea',
      label: adminLabel('Descripción', 'Description'),
      admin: {
        rows: 3
      }
    },
    {
      name: 'variant',
      type: 'select',
      label: adminLabel('Variante visual', 'Visual variant'),
      defaultValue: 'editorial',
      options: [
        { label: adminLabel('Editorial', 'Editorial'), value: 'editorial' },
        { label: adminLabel('Compacta', 'Compact'), value: 'compact' },
        { label: adminLabel('Oscura', 'Dark'), value: 'dark' }
      ]
    },
    {
      name: 'items',
      type: 'array',
      label: adminLabel('Métricas', 'Stats'),
      labels: adminLabels('Métrica', 'Métricas', 'Stat', 'Stats'),
      minRows: 1,
      fields: [
        {
          name: 'value',
          type: 'text',
          label: adminLabel('Número o dato', 'Number or value'),
          required: true,
          admin: {
            placeholder: '+120'
          }
        },
        {
          name: 'label',
          type: 'text',
          label: adminLabel('Etiqueta', 'Label'),
          required: true
        },
        {
          name: 'description',
          type: 'textarea',
          label: adminLabel('Detalle opcional', 'Optional detail'),
          admin: {
            rows: 2
          }
        }
      ]
    }
  ]
}

export const TestimonialsBlock: Block = {
  slug: 'testimonials',
  labels: adminLabels('Testimonios', 'Testimonios', 'Testimonials', 'Testimonials'),
  admin: {
    group: sectionBuilderGroup
  },
  fields: [
    {
      name: 'sectionTitle',
      type: 'text',
      label: adminLabel('Título de sección', 'Section title')
    },
    {
      name: 'sectionDescription',
      type: 'textarea',
      label: adminLabel('Descripción de sección', 'Section description'),
      admin: {
        rows: 3
      }
    },
    {
      name: 'items',
      type: 'array',
      label: adminLabel('Testimonios', 'Testimonials'),
      labels: adminLabels('Testimonio', 'Testimonios', 'Testimonial', 'Testimonials'),
      minRows: 1,
      fields: [
        {
          name: 'quote',
          type: 'textarea',
          label: adminLabel('Comentario', 'Quote'),
          required: true,
          admin: {
            rows: 4
          }
        },
        {
          name: 'name',
          type: 'text',
          label: adminLabel('Nombre', 'Name'),
          required: true
        },
        {
          name: 'role',
          type: 'text',
          label: adminLabel('Cargo o empresa', 'Role or company')
        },
        {
          name: 'rating',
          type: 'number',
          label: adminLabel('Calificación', 'Rating'),
          min: 1,
          max: 5,
          defaultValue: 5
        },
        {
          name: 'avatar',
          type: 'upload',
          label: adminLabel('Foto opcional', 'Optional photo'),
          relationTo: 'media',
          displayPreview: true,
          filterOptions: imageFilter
        }
      ]
    }
  ]
}

export const pageBuilderBlocks = [
  HeroBlock,
  LogoStripBlock,
  StatsBlock,
  RichTextBlock,
  ImageTextBlock,
  CardsBlock,
  GalleryBlock,
  MediaBlock,
  VideoBlock,
  SnapLayoutBlock,
  TestimonialsBlock,
  CTABlock,
  FAQBlock
]
