'use client'

import { twMerge } from 'tailwind-merge'

import { VisualEditWrapper } from '@/components/page-composer/VisualEditWrapper'

import type { CTASliceSection, SliceComponentProps } from './types'
import { getSafeActions } from './types'

type CTASliceProps = SliceComponentProps<CTASliceSection>

export function CTASlice({
  isPreview = false,
  section,
  sectionIndex,
  siteProfile,
  visualOverrides,
}: CTASliceProps) {
  const actions = getSafeActions(section.actions)
  const isGovernment = siteProfile === 'government'
  const isSaas = siteProfile === 'saas-apple'

  return (
    <section
      className={twMerge(
        'relative overflow-hidden px-5 py-20 sm:px-8',
        isGovernment ? 'bg-blue-900 text-white' : 'bg-deep-950 text-silver-50',
      )}
      data-visual-slice-root
    >
      <div
        className={twMerge(
          'mx-auto max-w-6xl px-6 py-12 text-center sm:px-10 sm:py-16',
          isGovernment
            ? 'border-4 border-white'
            : isSaas
              ? 'rounded-[2rem] border border-white/15 bg-white/10 shadow-[0_28px_100px_rgba(141,225,232,0.12)] backdrop-blur-xl'
              : 'app-hud-frame border border-cyan-200/16 bg-white/[0.045]',
        )}
      >
        {section.eyebrow ? (
          <p className="font-heading text-sm font-black uppercase tracking-[0.2em] opacity-75">
            {section.eyebrow}
          </p>
        ) : null}
        {section.title ? (
          <VisualEditWrapper
            className="mx-auto mt-5 max-w-4xl"
            fieldPath="title"
            isPreview={isPreview}
            label="Titulo"
            maxWidth="58rem"
            sectionIndex={sectionIndex}
            visualOverrides={visualOverrides}
          >
            <h2 className="text-4xl font-black leading-[1.05] tracking-[-0.04em] sm:text-6xl">
              {section.title}
            </h2>
          </VisualEditWrapper>
        ) : null}
        {section.description ? (
          <VisualEditWrapper
            className="mx-auto mt-6 max-w-2xl"
            fieldPath="description"
            isPreview={isPreview}
            label="Descripcion"
            maxWidth="42rem"
            sectionIndex={sectionIndex}
            visualOverrides={visualOverrides}
          >
            <p className="text-base font-medium leading-8 opacity-80">
              {section.description}
            </p>
          </VisualEditWrapper>
        ) : null}
        {actions.length > 0 ? (
          <VisualEditWrapper
            className="mx-auto mt-9 max-w-3xl"
            displayBlock={false}
            fieldPath="buttons"
            isPreview={isPreview}
            label="Botones"
            maxWidth="48rem"
            sectionIndex={sectionIndex}
            visualOverrides={visualOverrides}
          >
            <div className="flex flex-wrap justify-center gap-3">
              {actions.map((action, index) => (
                <a
                  className={twMerge(
                    'inline-flex min-h-12 items-center px-6 font-heading text-sm font-black uppercase tracking-[0.1em] transition',
                    isGovernment
                      ? index === 0
                        ? 'rounded-none bg-white text-blue-900 hover:bg-blue-50'
                        : 'rounded-none border-2 border-white text-white hover:bg-white/10'
                      : isSaas
                        ? 'rounded-full bg-white px-7 text-slate-950 hover:-translate-y-0.5'
                        : 'bg-cyan-200 text-deep-950 hover:bg-white',
                  )}
                  href={action.url}
                  key={action.id ?? action.url}
                  rel={action.openInNewTab ? 'noreferrer' : undefined}
                  target={action.openInNewTab ? '_blank' : undefined}
                >
                  {action.label}
                </a>
              ))}
            </div>
          </VisualEditWrapper>
        ) : null}
        {section.finePrint ? (
          <VisualEditWrapper
            className="mx-auto mt-7 max-w-xl"
            fieldPath="finePrint"
            isPreview={isPreview}
            label="Nota"
            maxWidth="38rem"
            sectionIndex={sectionIndex}
            visualOverrides={visualOverrides}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.12em] opacity-60">
              {section.finePrint}
            </p>
          </VisualEditWrapper>
        ) : null}
      </div>
    </section>
  )
}
