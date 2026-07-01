'use client'

import { useFormFields, useTranslation } from '@payloadcms/ui'

import './snap-layout-preview.css'

type FormFieldState = {
  value?: unknown
}

type FormFieldsState = Record<string, FormFieldState | undefined>

const snapLayouts = [
  'oneColumn',
  'twoColumns',
  'twoColumnsWideLeft',
  'twoColumnsWideRight',
  'threeColumns',
  'fourColumns',
  'featureLeft',
  'featureRight',
  'bentoGrid',
  'serviceCards',
  'textMedia',
  'mediaText',
  'contact',
  'mosaicGallery',
  'splitHero'
] as const

type SnapLayout = (typeof snapLayouts)[number]

const layoutLabels = {
  bentoGrid: { en: 'Bento grid', es: 'Cuadrícula tipo bento' },
  contact: { en: 'Contact', es: 'Contacto' },
  featureLeft: { en: 'Large left + two right', es: 'Grande izquierda + dos derecha' },
  featureRight: { en: 'Two left + large right', es: 'Dos izquierda + grande derecha' },
  fourColumns: { en: 'Four columns', es: 'Cuatro columnas' },
  mediaText: { en: 'Media left + text right', es: 'Medio izquierda + texto derecha' },
  mosaicGallery: { en: 'Mosaic gallery', es: 'Galería en mosaico' },
  oneColumn: { en: 'One full column', es: 'Una columna completa' },
  serviceCards: { en: 'Service cards', es: 'Tarjetas de servicios' },
  splitHero: { en: 'Split hero', es: 'Portada dividida' },
  textMedia: { en: 'Text left + media right', es: 'Texto izquierda + medio derecha' },
  threeColumns: { en: 'Three columns', es: 'Tres columnas' },
  twoColumns: { en: 'Two columns 50/50', es: 'Dos columnas 50/50' },
  twoColumnsWideLeft: { en: 'Two columns 70/30', es: 'Dos columnas 70/30' },
  twoColumnsWideRight: { en: 'Two columns 30/70', es: 'Dos columnas 30/70' }
} satisfies Record<SnapLayout, { en: string; es: string }>

const cellCounts = {
  bentoGrid: 6,
  contact: 2,
  featureLeft: 3,
  featureRight: 3,
  fourColumns: 4,
  mediaText: 2,
  mosaicGallery: 7,
  oneColumn: 1,
  serviceCards: 3,
  splitHero: 2,
  textMedia: 2,
  threeColumns: 3,
  twoColumns: 2,
  twoColumnsWideLeft: 2,
  twoColumnsWideRight: 2
} satisfies Record<SnapLayout, number>

const isSnapLayout = (value: string): value is SnapLayout =>
  snapLayouts.includes(value as SnapLayout)

const getSiblingLayoutPath = (path: string | undefined) => {
  if (!path) {
    return 'layout'
  }

  const pathParts = path.split('.')
  pathParts.pop()

  return [...pathParts, 'layout'].join('.')
}

export function SnapLayoutPreview({ path }: { path?: string }) {
  const { i18n } = useTranslation()
  const language = i18n.language === 'en' ? 'en' : 'es'
  const layoutPath = getSiblingLayoutPath(path)
  const selectedLayout = useFormFields(([fields]) => {
    const formFields = fields as FormFieldsState
    const layoutValue =
      formFields[layoutPath]?.value ?? formFields.layout?.value

    return typeof layoutValue === 'string' ? layoutValue : 'oneColumn'
  })
  const layout = isSnapLayout(selectedLayout) ? selectedLayout : 'oneColumn'

  return (
    <div className="app-snap-preview">
      <div className="app-snap-preview__header">
        <span className="app-snap-preview__eyebrow">
          {language === 'en' ? 'Preview' : 'Vista previa'}
        </span>
        <span className="app-snap-preview__title">
          {layoutLabels[layout][language]}
        </span>
      </div>
      <div className="app-snap-preview__canvas">
        <div className="app-snap-preview__grid" data-layout={layout}>
          {Array.from({ length: cellCounts[layout] }).map((_, index) => (
            <span
              aria-hidden="true"
              className="app-snap-preview__cell"
              key={`${layout}-${index}`}
            >
              {index + 1}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
