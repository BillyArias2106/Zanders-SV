'use client'

import { twMerge } from 'tailwind-merge'

import { VisualEditWrapper } from '@/components/page-composer/VisualEditWrapper'

import type { SliceComponentProps, FeatureGridSliceSection } from './types'
import { getMediaAlt, getMediaUrl, getSafeFeatureItems } from './types'

type FeatureGridProps = SliceComponentProps<FeatureGridSliceSection>

const getProfileCopy = (siteProfile: FeatureGridProps['siteProfile']) => {
  if (siteProfile === 'government') {
    return {
      eyebrow: 'text-blue-900',
      intro: 'text-[#1f2f52]',
      shell: 'bg-[#f7f9fc] text-[#07164b]',
      title: 'text-[#07164b]',
    }
  }

  if (siteProfile === 'saas-apple') {
    return {
      eyebrow: 'text-cyan-100/78',
      intro: 'text-slate-300',
      shell: 'bg-[radial-gradient(circle_at_18%_12%,rgba(141,225,232,0.18),transparent_28%),radial-gradient(circle_at_85%_22%,rgba(255,255,255,0.12),transparent_22%),#02080c] text-white',
      title: 'bg-gradient-to-r from-white via-white to-gray-400 bg-clip-text text-transparent',
    }
  }

  return {
    eyebrow: 'text-cyan-100/80',
    intro: 'text-silver-300',
    shell: 'bg-[radial-gradient(circle_at_12%_8%,rgba(141,225,232,0.16),transparent_30%),radial-gradient(circle_at_90%_20%,rgba(69,172,191,0.12),transparent_26%),#02080c] text-silver-50',
    title: 'bg-gradient-to-r from-white via-silver-100 to-silver-500 bg-clip-text text-transparent',
  }
}

const getCardClassName = ({
  index,
  isBento,
  siteProfile,
}: {
  index: number
  isBento: boolean
  siteProfile: FeatureGridProps['siteProfile']
}) => {
  if (siteProfile === 'government') {
    return twMerge(
      'border-2 border-blue-900 bg-white p-6 text-[#07164b] shadow-none rounded-none',
      'transition-colors hover:bg-blue-50',
      isBento && index === 0 ? 'md:col-span-2' : '',
    )
  }

  if ((siteProfile === 'saas-apple' || siteProfile === 'agency') && isBento) {
    return twMerge(
      'group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 text-white shadow-[0_24px_80px_rgba(0,0,0,0.25)] backdrop-blur-md',
      'transition-all duration-300 before:pointer-events-none before:absolute before:inset-0 before:bg-[linear-gradient(135deg,rgba(255,255,255,0.18),transparent_38%)] before:opacity-0 before:transition-opacity before:duration-300 hover:-translate-y-1 hover:border-white/22 hover:bg-white/[0.075] hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:before:opacity-100',
      index === 0 ? 'md:col-span-2 md:row-span-2 md:p-8' : '',
    )
  }

  return twMerge(
    'rounded-[1.25rem] border border-cyan-200/14 bg-white/[0.045] p-6 text-silver-50 shadow-panel backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-cyan-200/26 hover:shadow-[0_0_30px_rgba(141,225,232,0.12)]',
    siteProfile === 'saas-apple' ? 'rounded-2xl' : 'rounded-[1.25rem]',
  )
}

export function FeatureGrid({
  isPreview = false,
  section,
  sectionIndex,
  siteProfile,
  visualOverrides,
}: FeatureGridProps) {
  const items = getSafeFeatureItems(section.items)
  const purpose = section.purpose ?? 'simple-grid'
  const isBento = purpose === 'bento-showcase'
  const copy = getProfileCopy(siteProfile)

  if (!section.title?.trim() && items.length === 0) {
    return null
  }

  return (
    <section
      className={twMerge('relative overflow-hidden py-20 sm:py-28', copy.shell)}
      data-visual-slice-root
    >
      {siteProfile === 'saas-apple' || siteProfile === 'agency' ? (
        <>
          <div className="pointer-events-none absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-cyan-200/16 blur-3xl" />
          <div className="pointer-events-none absolute right-0 top-32 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        </>
      ) : null}

      <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-8">
        <div className="max-w-3xl">
          {section.eyebrow ? (
            <p className={twMerge('w-fit rounded-full border border-white/10 bg-white/5 px-4 py-2 font-heading text-xs font-bold uppercase tracking-[0.2em] backdrop-blur-md', copy.eyebrow)}>
              {section.eyebrow}
            </p>
          ) : null}
          {section.title ? (
            <VisualEditWrapper
              className="mt-6 max-w-3xl"
              fieldPath="title"
              isPreview={isPreview}
              label="Titulo"
              maxWidth="52rem"
              sectionIndex={sectionIndex}
              visualOverrides={visualOverrides}
            >
              <h2 className={twMerge('text-4xl font-black leading-[1.05] tracking-[-0.04em] sm:text-6xl', copy.title)}>
                {section.title}
              </h2>
            </VisualEditWrapper>
          ) : null}
          {section.intro ? (
            <VisualEditWrapper
              className="mt-6 max-w-2xl"
              fieldPath="intro"
              isPreview={isPreview}
              label="Intro"
              maxWidth="42rem"
              sectionIndex={sectionIndex}
              visualOverrides={visualOverrides}
            >
              <p className={twMerge('text-base font-medium leading-8 sm:text-lg', copy.intro)}>
                {section.intro}
              </p>
            </VisualEditWrapper>
          ) : null}
        </div>

        {items.length > 0 ? (
          <VisualEditWrapper
            className="mt-12"
            fieldPath="items"
            isPreview={isPreview}
            label="Tarjetas"
            maxWidth="76rem"
            sectionIndex={sectionIndex}
            visualOverrides={visualOverrides}
          >
            <div
              className={twMerge(
                'grid gap-5',
                isBento ? 'md:auto-rows-[minmax(220px,auto)] md:grid-cols-3' : 'sm:grid-cols-2 lg:grid-cols-3',
              )}
            >
              {items.map((item, index) => {
                const mediaUrl = getMediaUrl(item.media)
                const mediaAlt = getMediaAlt(item.media, item.title ?? '')

                return (
                  <article
                    className={getCardClassName({ index, isBento, siteProfile })}
                    key={item.id ?? `${item.title}-${index}`}
                  >
                    {mediaUrl ? (
                      <div
                        className={twMerge(
                          'mb-6 overflow-hidden',
                          siteProfile === 'government' ? 'border-2 border-blue-900' : 'rounded-2xl border border-white/10',
                        )}
                      >
                        <img alt={mediaAlt} className="h-48 w-full object-cover" src={mediaUrl} />
                      </div>
                    ) : null}

                    {item.icon ? (
                      <div
                        className={twMerge(
                          'mb-5 grid h-12 w-12 place-items-center text-xl font-black',
                          siteProfile === 'government'
                            ? 'border-2 border-blue-900 bg-blue-900 text-white'
                            : 'rounded-2xl border border-white/10 bg-white/10 text-cyan-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.18)] backdrop-blur-md',
                        )}
                      >
                        {item.icon}
                      </div>
                    ) : null}

                    <h3
                      className={twMerge(
                        'font-heading text-2xl font-black leading-tight',
                        siteProfile === 'government' ? 'text-[#07164b]' : 'text-white',
                      )}
                    >
                      {item.title}
                    </h3>
                    {item.description ? (
                      <p
                        className={twMerge(
                          'mt-4 text-sm font-medium leading-7',
                          siteProfile === 'government' ? 'text-[#1f2f52]' : 'text-white/68',
                        )}
                      >
                        {item.description}
                      </p>
                    ) : null}
                    {item.link?.label && item.link.url ? (
                      <a
                        className={twMerge(
                          'mt-7 inline-flex font-heading text-sm font-black uppercase tracking-[0.12em]',
                          siteProfile === 'government'
                            ? 'border-b-4 border-blue-900 text-blue-900'
                            : 'rounded-full border border-white/10 bg-white/5 px-4 py-2 text-cyan-100 shadow-[0_0_24px_rgba(141,225,232,0.1)] backdrop-blur transition-all duration-300 hover:border-cyan-100/40 hover:bg-white/10 hover:shadow-[0_0_30px_rgba(141,225,232,0.18)]',
                        )}
                        href={item.link.url}
                        rel={item.link.openInNewTab ? 'noreferrer' : undefined}
                        target={item.link.openInNewTab ? '_blank' : undefined}
                      >
                        {item.link.label}
                      </a>
                    ) : null}
                  </article>
                )
              })}
            </div>
          </VisualEditWrapper>
        ) : null}
      </div>
    </section>
  )
}
