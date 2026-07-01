import type { StaticLabel } from 'payload'

export const adminLabel = (es: string, en: string): StaticLabel => ({
  en,
  es
})

export const adminLabels = (
  singularEs: string,
  pluralEs: string,
  singularEn: string,
  pluralEn: string
) => ({
  plural: adminLabel(pluralEs, pluralEn),
  singular: adminLabel(singularEs, singularEn)
})
