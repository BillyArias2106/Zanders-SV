'use client'

import { useFormFields } from '@payloadcms/ui'

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
  bentoGrid: 'Bento Grid',
  contact: 'Contacto',
  featureLeft: 'Grande izquierda + dos derecha',
  featureRight: 'Dos izquierda + grande derecha',
  fourColumns: 'Cuatro columnas',
  mediaText: 'Media izquierda + texto derecha',
  mosaicGallery: 'Galería en mosaico',
  oneColumn: 'Una columna completa',
  serviceCards: 'Cards de servicios',
  splitHero: 'Hero dividido',
  textMedia: 'Texto izquierda + media derecha',
  threeColumns: 'Tres columnas',
  twoColumns: 'Dos columnas 50/50',
  twoColumnsWideLeft: 'Dos columnas 70/30',
  twoColumnsWideRight: 'Dos columnas 30/70'
} satisfies Record<SnapLayout, string>

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
  const layoutPath = getSiblingLayoutPath(path)
  const selectedLayout = useFormFields(([fields]) => {
    const formFields = fields as FormFieldsState
    const layoutValue =
      formFields[layoutPath]?.value ?? formFields.layout?.value

    return typeof layoutValue === 'string' ? layoutValue : 'oneColumn'
  })
  const layout = isSnapLayout(selectedLayout) ? selectedLayout : 'oneColumn'

  return (
    <div className="zanders-snap-preview">
      <div className="zanders-snap-preview__header">
        <span className="zanders-snap-preview__eyebrow">Vista previa</span>
        <span className="zanders-snap-preview__title">
          {layoutLabels[layout]}
        </span>
      </div>
      <div className="zanders-snap-preview__canvas">
        <div className="zanders-snap-preview__grid" data-layout={layout}>
          {Array.from({ length: cellCounts[layout] }).map((_, index) => (
            <span
              aria-hidden="true"
              className="zanders-snap-preview__cell"
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
