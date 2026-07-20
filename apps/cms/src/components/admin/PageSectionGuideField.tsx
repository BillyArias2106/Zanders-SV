'use client'

import { useForm, useFormFields } from '@payloadcms/ui'
import { reduceFieldsToValues } from 'payload/shared'

import {
  pageSectionGuides,
  type PageTypeRecommendation,
} from '@starter/page-sections'

import './page-section-guide-field.css'

type PageValues = {
  pageType?: unknown
}

const isPageType = (value: unknown): value is PageTypeRecommendation =>
  typeof value === 'string' && value in pageSectionGuides

export function PageSectionGuideField() {
  const { addFieldRow, getDataByPath } = useForm()
  const values = useFormFields(([fields]) =>
    reduceFieldsToValues(fields, true),
  ) as PageValues
  const pageType = isPageType(values.pageType) ? values.pageType : 'free'
  const guide = pageSectionGuides[pageType]

  const addSection = (blockType: string) => {
    const sections = getDataByPath<unknown[]>('sections')

    addFieldRow({
      blockType,
      path: 'sections',
      rowIndex: Array.isArray(sections) ? sections.length : undefined,
      schemaPath: 'sections',
    })
  }

  return (
    <section className="app-page-section-guide">
      <div className="app-page-section-guide__header">
        <div>
          <p className="app-page-section-guide__eyebrow">Caja de herramientas</p>
          <h2>{guide.label}</h2>
          <p>{guide.description}</p>
        </div>
        <span>Quick add</span>
      </div>
      <div className="app-page-section-guide__actions" aria-label="Atajos de secciones recomendadas">
        {guide.recommendedSteps.map((step) => (
          <button
            className="app-page-section-guide__action"
            key={`${step.blockType}-${step.label}`}
            onClick={() => addSection(step.blockType)}
            type="button"
          >
            {step.category ? <em>{step.category}</em> : null}
            <strong>{step.label}</strong>
            <span>{step.description}</span>
          </button>
        ))}
      </div>
    </section>
  )
}
