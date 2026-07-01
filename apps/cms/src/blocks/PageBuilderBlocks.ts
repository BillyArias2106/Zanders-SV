import type { Block, Field, TextFieldSingleValidation } from 'payload'

const hexColorPattern = /^#(?:[0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/
const safeClassNamePattern = /^[A-Za-z0-9_:\-./\s[\]]*$/

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
  label: string,
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
    description: 'Formato HEX. Ejemplo: #0F172A.',
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
  { label: 'Izquierda', value: 'left' },
  { label: 'Centro', value: 'center' },
  { label: 'Derecha', value: 'right' }
]

const borderRadiusOptions = [
  { label: 'Sin radius', value: 'none' },
  { label: 'Pequeño', value: 'sm' },
  { label: 'Medio', value: 'md' },
  { label: 'Grande', value: 'lg' },
  { label: 'Extra grande', value: 'xl' }
]

const shadowOptions = [
  { label: 'Sin sombra', value: 'none' },
  { label: 'Suave', value: 'soft' },
  { label: 'Fuerte', value: 'strong' }
]

const paddingOptions = [
  { label: 'Sin padding', value: 'none' },
  { label: 'Pequeño', value: 'sm' },
  { label: 'Medio', value: 'md' },
  { label: 'Grande', value: 'lg' },
  { label: 'Extra grande', value: 'xl' }
]

const linkFields = [
  {
    name: 'primaryButtonLabel',
    type: 'text',
    label: 'Texto del botón principal'
  },
  {
    name: 'primaryButtonUrl',
    type: 'text',
    label: 'URL del botón principal',
    admin: {
      placeholder: '/contacto'
    }
  },
  {
    name: 'secondaryButtonLabel',
    type: 'text',
    label: 'Texto del botón secundario'
  },
  {
    name: 'secondaryButtonUrl',
    type: 'text',
    label: 'URL del botón secundario',
    admin: {
      placeholder: '/servicios'
    }
  }
] satisfies Block['fields']

const snapLayoutItemFields: Field[] = [
  {
    name: 'contentType',
    type: 'select',
    label: 'Tipo de contenido',
    required: true,
    defaultValue: 'text',
    options: [
      { label: 'Texto simple', value: 'text' },
      { label: 'Rich text', value: 'richText' },
      { label: 'Imagen', value: 'image' },
      { label: 'Video', value: 'video' },
      { label: 'Card', value: 'card' },
      { label: 'Ícono + texto', value: 'iconText' },
      { label: 'Media + texto', value: 'mediaText' },
      { label: 'Botón', value: 'button' },
      { label: 'Lista', value: 'list' },
      { label: 'CTA', value: 'cta' }
    ]
  },
  {
    name: 'title',
    type: 'text',
    label: 'Título'
  },
  {
    name: 'subtitle',
    type: 'text',
    label: 'Subtítulo'
  },
  {
    name: 'description',
    type: 'textarea',
    label: 'Descripción',
    admin: {
      rows: 4
    }
  },
  {
    name: 'richText',
    type: 'richText',
    label: 'Rich text opcional'
  },
  {
    name: 'image',
    type: 'upload',
    label: 'Imagen',
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
    label: 'Ícono',
    admin: {
      description:
        'Nombre sugerido: sparkles, plane, printer, camera, phone, mail, map, wrench.'
    }
  },
  {
    name: 'linkLabel',
    type: 'text',
    label: 'Label del link'
  },
  {
    name: 'linkUrl',
    type: 'text',
    label: 'URL del link'
  },
  {
    name: 'linkOpenInNewTab',
    type: 'checkbox',
    label: 'Abrir link en nueva pestaña',
    defaultValue: false
  },
  {
    name: 'buttonLabel',
    type: 'text',
    label: 'Texto del botón'
  },
  {
    name: 'buttonUrl',
    type: 'text',
    label: 'URL del botón'
  },
  {
    name: 'buttonOpenInNewTab',
    type: 'checkbox',
    label: 'Abrir botón en nueva pestaña',
    defaultValue: false
  },
  {
    name: 'listItems',
    type: 'array',
    label: 'Lista',
    labels: {
      singular: 'Ítem',
      plural: 'Ítems'
    },
    fields: [
      {
        name: 'text',
        type: 'text',
        label: 'Texto'
      }
    ]
  },
  colorField('backgroundColor', 'Color de fondo'),
  colorField('textColor', 'Color de texto'),
  {
    name: 'borderRadius',
    type: 'select',
    label: 'Border radius',
    defaultValue: 'md',
    options: borderRadiusOptions
  },
  {
    name: 'shadow',
    type: 'select',
    label: 'Sombra',
    defaultValue: 'none',
    options: shadowOptions
  },
  {
    name: 'showBorder',
    type: 'checkbox',
    label: 'Mostrar borde',
    defaultValue: true
  },
  {
    name: 'padding',
    type: 'select',
    label: 'Padding interno',
    defaultValue: 'md',
    options: paddingOptions
  },
  {
    name: 'alignment',
    type: 'select',
    label: 'Alineación',
    defaultValue: 'left',
    options: alignmentOptions
  },
  {
    name: 'responsiveOrder',
    type: 'number',
    label: 'Orden responsive',
    admin: {
      description: 'Número opcional para ordenar esta caja en pantallas pequeñas.'
    }
  },
  {
    name: 'isActive',
    type: 'checkbox',
    label: 'Activo',
    defaultValue: true
  }
]

export const HeroBlock: Block = {
  slug: 'hero',
  labels: {
    singular: 'Hero',
    plural: 'Heroes'
  },
  admin: {
    group: 'Diseño / Layouts'
  },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      label: 'Texto pequeño superior'
    },
    {
      name: 'title',
      type: 'text',
      label: 'Título',
      required: true
    },
    {
      name: 'subtitle',
      type: 'text',
      label: 'Subtítulo'
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Descripción',
      admin: {
        rows: 4
      }
    },
    {
      name: 'backgroundMedia',
      type: 'upload',
      label: 'Imagen o video de fondo',
      relationTo: 'media'
    },
    ...linkFields
  ]
}

export const RichTextBlock: Block = {
  slug: 'richText',
  labels: {
    singular: 'Texto enriquecido',
    plural: 'Textos enriquecidos'
  },
  admin: {
    group: 'Contenido'
  },
  fields: [
    {
      name: 'content',
      type: 'richText',
      label: 'Contenido',
      required: true
    },
    {
      name: 'alignment',
      type: 'select',
      label: 'Alineación',
      defaultValue: 'left',
      options: [
        { label: 'Izquierda', value: 'left' },
        { label: 'Centro', value: 'center' },
        { label: 'Derecha', value: 'right' }
      ]
    },
    {
      name: 'width',
      type: 'select',
      label: 'Ancho del contenido',
      defaultValue: 'normal',
      options: [
        { label: 'Normal', value: 'normal' },
        { label: 'Amplio', value: 'wide' },
        { label: 'Estrecho', value: 'narrow' }
      ]
    }
  ]
}

export const ImageTextBlock: Block = {
  slug: 'imageText',
  labels: {
    singular: 'Imagen + Texto',
    plural: 'Imagen + Texto'
  },
  admin: {
    group: 'Diseño / Layouts'
  },
  fields: [
    {
      name: 'image',
      type: 'upload',
      label: 'Imagen',
      relationTo: 'media'
    },
    {
      name: 'title',
      type: 'text',
      label: 'Título',
      required: true
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Descripción',
      admin: {
        rows: 5
      }
    },
    {
      name: 'imagePosition',
      type: 'select',
      label: 'Posición de imagen',
      defaultValue: 'left',
      options: [
        { label: 'Izquierda', value: 'left' },
        { label: 'Derecha', value: 'right' }
      ]
    },
    {
      name: 'buttonLabel',
      type: 'text',
      label: 'Texto de botón'
    },
    {
      name: 'buttonUrl',
      type: 'text',
      label: 'URL de botón'
    }
  ]
}

export const CardsBlock: Block = {
  slug: 'cards',
  labels: {
    singular: 'Cards / Servicios',
    plural: 'Cards / Servicios'
  },
  admin: {
    group: 'Diseño / Layouts'
  },
  fields: [
    {
      name: 'sectionTitle',
      type: 'text',
      label: 'Título de sección'
    },
    {
      name: 'sectionDescription',
      type: 'textarea',
      label: 'Descripción de sección',
      admin: {
        rows: 3
      }
    },
    {
      name: 'cards',
      type: 'array',
      label: 'Cards',
      labels: {
        singular: 'Card',
        plural: 'Cards'
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Título',
          required: true
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Descripción',
          admin: {
            rows: 3
          }
        },
        {
          name: 'media',
          type: 'upload',
          label: 'Ícono o imagen',
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
  labels: {
    singular: 'Galería',
    plural: 'Galerías'
  },
  admin: {
    group: 'Multimedia'
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Título'
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Descripción',
      admin: {
        rows: 3
      }
    },
    {
      name: 'images',
      type: 'array',
      label: 'Imágenes',
      fields: [
        {
          name: 'image',
          type: 'upload',
          label: 'Imagen',
          relationTo: 'media',
          required: true
        },
        {
          name: 'caption',
          type: 'text',
          label: 'Texto alternativo o caption'
        }
      ]
    }
  ]
}

export const MediaBlock: Block = {
  slug: 'mediaBlock',
  labels: {
    singular: 'Multimedia',
    plural: 'Multimedia'
  },
  admin: {
    group: 'Multimedia'
  },
  fields: [
    {
      name: 'media',
      type: 'upload',
      label: 'Imagen o video',
      relationTo: 'media',
      required: true,
      displayPreview: true
    },
    {
      name: 'mediaKind',
      type: 'select',
      label: 'Tipo de media',
      required: true,
      defaultValue: 'image',
      options: [
        { label: 'Imagen', value: 'image' },
        { label: 'Video', value: 'video' }
      ]
    },
    {
      name: 'title',
      type: 'text',
      label: 'Título opcional'
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Descripción opcional',
      admin: {
        rows: 3
      }
    },
    {
      name: 'altText',
      type: 'text',
      label: 'Texto alternativo'
    },
    {
      name: 'width',
      type: 'select',
      label: 'Ancho',
      required: true,
      defaultValue: 'normal',
      options: [
        { label: 'Completo', value: 'full' },
        { label: 'Contenido normal', value: 'normal' },
        { label: 'Pequeño', value: 'small' },
        { label: 'Personalizado', value: 'custom' }
      ]
    },
    {
      name: 'customWidth',
      type: 'text',
      label: 'Ancho personalizado',
      admin: {
        condition: (_, siblingData) =>
          (siblingData as { width?: string }).width === 'custom',
        placeholder: '960px, 72rem o 80%'
      }
    },
    {
      name: 'height',
      type: 'select',
      label: 'Alto',
      required: true,
      defaultValue: 'auto',
      options: [
        { label: 'Automático', value: 'auto' },
        { label: 'Fijo', value: 'fixed' },
        { label: 'Viewport', value: 'viewport' }
      ]
    },
    {
      name: 'fixedHeight',
      type: 'text',
      label: 'Alto fijo',
      admin: {
        condition: (_, siblingData) =>
          (siblingData as { height?: string }).height === 'fixed',
        placeholder: '420px, 32rem'
      }
    },
    {
      name: 'alignment',
      type: 'select',
      label: 'Alineación',
      required: true,
      defaultValue: 'center',
      options: alignmentOptions
    },
    {
      name: 'borderRadius',
      type: 'select',
      label: 'Border radius',
      defaultValue: 'md',
      options: borderRadiusOptions
    },
    {
      name: 'shadow',
      type: 'select',
      label: 'Sombra',
      defaultValue: 'soft',
      options: shadowOptions
    },
    {
      name: 'showBorder',
      type: 'checkbox',
      label: 'Mostrar borde',
      defaultValue: false
    },
    {
      name: 'objectFit',
      type: 'select',
      label: 'Object fit',
      defaultValue: 'cover',
      options: [
        { label: 'Cover', value: 'cover' },
        { label: 'Contain', value: 'contain' }
      ]
    },
    {
      name: 'autoplay',
      type: 'checkbox',
      label: 'Autoplay',
      defaultValue: false,
      admin: {
        condition: (_, siblingData) =>
          (siblingData as { mediaKind?: string }).mediaKind === 'video'
      }
    },
    {
      name: 'muted',
      type: 'checkbox',
      label: 'Muted',
      defaultValue: true,
      admin: {
        condition: (_, siblingData) =>
          (siblingData as { mediaKind?: string }).mediaKind === 'video'
      }
    },
    {
      name: 'loop',
      type: 'checkbox',
      label: 'Loop',
      defaultValue: false,
      admin: {
        condition: (_, siblingData) =>
          (siblingData as { mediaKind?: string }).mediaKind === 'video'
      }
    },
    {
      name: 'controls',
      type: 'checkbox',
      label: 'Controls',
      defaultValue: true,
      admin: {
        condition: (_, siblingData) =>
          (siblingData as { mediaKind?: string }).mediaKind === 'video'
      }
    },
    {
      name: 'poster',
      type: 'upload',
      label: 'Poster',
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
  labels: {
    singular: 'Video',
    plural: 'Videos'
  },
  admin: {
    group: 'Multimedia'
  },
  fields: [
    {
      name: 'videoSource',
      type: 'select',
      label: 'Fuente del video',
      required: true,
      defaultValue: 'internal',
      options: [
        { label: 'Video interno', value: 'internal' },
        { label: 'URL externa', value: 'external' }
      ]
    },
    {
      name: 'internalVideo',
      type: 'upload',
      label: 'Video interno',
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
      label: 'URL externa',
      admin: {
        condition: (_, siblingData) =>
          (siblingData as { videoSource?: string }).videoSource === 'external',
        placeholder: 'YouTube, Vimeo o enlace directo .mp4/.webm'
      }
    },
    {
      name: 'externalProvider',
      type: 'select',
      label: 'Proveedor externo',
      defaultValue: 'auto',
      options: [
        { label: 'Detectar automáticamente', value: 'auto' },
        { label: 'YouTube', value: 'youtube' },
        { label: 'Vimeo', value: 'vimeo' },
        { label: 'Enlace directo', value: 'direct' }
      ],
      admin: {
        condition: (_, siblingData) =>
          (siblingData as { videoSource?: string }).videoSource === 'external'
      }
    },
    {
      name: 'title',
      type: 'text',
      label: 'Título'
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Descripción',
      admin: {
        rows: 3
      }
    },
    {
      name: 'poster',
      type: 'upload',
      label: 'Poster / thumbnail',
      relationTo: 'media',
      displayPreview: true,
      filterOptions: imageFilter
    },
    {
      name: 'autoplay',
      type: 'checkbox',
      label: 'Autoplay',
      defaultValue: false
    },
    {
      name: 'muted',
      type: 'checkbox',
      label: 'Muted',
      defaultValue: true
    },
    {
      name: 'loop',
      type: 'checkbox',
      label: 'Loop',
      defaultValue: false
    },
    {
      name: 'controls',
      type: 'checkbox',
      label: 'Controls',
      defaultValue: true
    },
    {
      name: 'aspectRatio',
      type: 'select',
      label: 'Aspecto',
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
  labels: {
    singular: 'Layout Personalizado',
    plural: 'Layouts Personalizados'
  },
  admin: {
    group: 'Diseño / Layouts'
  },
  fields: [
    {
      name: 'isActive',
      type: 'checkbox',
      label: 'Sección activa',
      defaultValue: true
    },
    {
      name: 'sectionId',
      type: 'text',
      label: 'Section ID / ancla',
      admin: {
        placeholder: 'servicios'
      }
    },
    {
      name: 'sectionTitle',
      type: 'text',
      label: 'Título de sección'
    },
    {
      name: 'sectionSubtitle',
      type: 'text',
      label: 'Subtítulo'
    },
    {
      name: 'sectionDescription',
      type: 'textarea',
      label: 'Descripción',
      admin: {
        rows: 4
      }
    },
    colorField('backgroundColor', 'Color de fondo de sección'),
    {
      name: 'backgroundImage',
      type: 'upload',
      label: 'Imagen de fondo',
      relationTo: 'media',
      displayPreview: true,
      filterOptions: imageFilter
    },
    {
      name: 'backgroundVideo',
      type: 'upload',
      label: 'Video de fondo',
      relationTo: 'media',
      filterOptions: videoFilter
    },
    colorField('textColor', 'Color de texto de sección'),
    {
      name: 'maxWidth',
      type: 'select',
      label: 'Ancho máximo del contenido',
      required: true,
      defaultValue: 'wide',
      options: [
        { label: 'Estrecho', value: 'narrow' },
        { label: 'Normal', value: 'normal' },
        { label: 'Amplio', value: 'wide' },
        { label: 'Completo', value: 'full' }
      ]
    },
    {
      name: 'paddingTop',
      type: 'select',
      label: 'Padding superior',
      defaultValue: 'lg',
      options: paddingOptions
    },
    {
      name: 'paddingBottom',
      type: 'select',
      label: 'Padding inferior',
      defaultValue: 'lg',
      options: paddingOptions
    },
    {
      name: 'gap',
      type: 'select',
      label: 'Gap entre cajas',
      defaultValue: 'md',
      options: [
        { label: 'Sin gap', value: 'none' },
        { label: 'Pequeño', value: 'sm' },
        { label: 'Medio', value: 'md' },
        { label: 'Grande', value: 'lg' },
        { label: 'Extra grande', value: 'xl' }
      ]
    },
    {
      name: 'alignment',
      type: 'select',
      label: 'Alineación general',
      defaultValue: 'left',
      options: alignmentOptions
    },
    {
      name: 'layout',
      type: 'select',
      label: 'Layout seleccionado',
      required: true,
      defaultValue: 'oneColumn',
      options: [
        { label: 'Una columna completa', value: 'oneColumn' },
        { label: 'Dos columnas 50/50', value: 'twoColumns' },
        { label: 'Dos columnas 70/30', value: 'twoColumnsWideLeft' },
        { label: 'Dos columnas 30/70', value: 'twoColumnsWideRight' },
        { label: 'Tres columnas iguales', value: 'threeColumns' },
        { label: 'Cuatro columnas iguales', value: 'fourColumns' },
        {
          label: 'Caja grande izquierda + dos pequeñas derecha',
          value: 'featureLeft'
        },
        {
          label: 'Dos pequeñas izquierda + caja grande derecha',
          value: 'featureRight'
        },
        { label: 'Bento Grid', value: 'bentoGrid' },
        { label: 'Cards de servicios', value: 'serviceCards' },
        { label: 'Texto izquierda + media derecha', value: 'textMedia' },
        { label: 'Media izquierda + texto derecha', value: 'mediaText' },
        { label: 'Contacto: datos + formulario/tarjeta', value: 'contact' },
        { label: 'Galería en mosaico', value: 'mosaicGallery' },
        { label: 'Hero dividido', value: 'splitHero' }
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
      label: 'Clase CSS adicional',
      admin: {
        description:
          'Opcional. Usa solo clases conocidas y simples; no acepta CSS libre.'
      },
      validate: validateSafeClassName
    },
    {
      name: 'items',
      type: 'array',
      label: 'Cajitas / cards',
      labels: {
        singular: 'Caja',
        plural: 'Cajas'
      },
      fields: snapLayoutItemFields
    }
  ]
}

export const CTABlock: Block = {
  slug: 'cta',
  labels: {
    singular: 'CTA',
    plural: 'CTAs'
  },
  admin: {
    group: 'Interacción'
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Título',
      required: true
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Descripción',
      admin: {
        rows: 3
      }
    },
    {
      name: 'buttonLabel',
      type: 'text',
      label: 'Texto de botón'
    },
    {
      name: 'buttonUrl',
      type: 'text',
      label: 'URL de botón'
    },
    {
      name: 'variant',
      type: 'select',
      label: 'Variante visual',
      defaultValue: 'solid',
      options: [
        { label: 'Sólida', value: 'solid' },
        { label: 'Contorno', value: 'outline' },
        { label: 'Minimal', value: 'minimal' }
      ]
    }
  ]
}

export const FAQBlock: Block = {
  slug: 'faq',
  labels: {
    singular: 'FAQ',
    plural: 'FAQs'
  },
  admin: {
    group: 'Contenido'
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Título de sección'
    },
    {
      name: 'items',
      type: 'array',
      label: 'Preguntas',
      labels: {
        singular: 'Pregunta',
        plural: 'Preguntas'
      },
      fields: [
        {
          name: 'question',
          type: 'text',
          label: 'Pregunta',
          required: true
        },
        {
          name: 'answer',
          type: 'textarea',
          label: 'Respuesta',
          required: true,
          admin: {
            rows: 4
          }
        }
      ]
    }
  ]
}

export const pageBuilderBlocks = [
  HeroBlock,
  RichTextBlock,
  ImageTextBlock,
  CardsBlock,
  GalleryBlock,
  MediaBlock,
  VideoBlock,
  SnapLayoutBlock,
  CTABlock,
  FAQBlock
]
