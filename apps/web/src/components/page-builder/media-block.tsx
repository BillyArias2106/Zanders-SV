import type { CSSProperties } from 'react'

import type { MediaPageBlock } from '@/lib/cms'

import { MediaAssetView } from './media-asset'

const widthClassName = {
  custom: 'w-full',
  full: 'w-full',
  normal: 'w-full max-w-5xl',
  small: 'w-full max-w-3xl'
} satisfies Record<MediaPageBlock['width'], string>

const heightClassName = {
  auto: '',
  fixed: 'h-[420px]',
  viewport: 'min-h-[70svh]'
} satisfies Record<MediaPageBlock['height'], string>

const alignmentClassName = {
  center: 'mx-auto text-center',
  left: 'mr-auto text-left',
  right: 'ml-auto text-right'
} satisfies Record<MediaPageBlock['alignment'], string>

const radiusClassName = {
  lg: 'rounded-2xl',
  md: 'rounded-lg',
  none: 'rounded-none',
  sm: 'rounded',
  xl: 'rounded-[2rem]'
} satisfies Record<MediaPageBlock['borderRadius'], string>

const shadowClassName = {
  none: '',
  soft: 'shadow-panel',
  strong: 'shadow-[0_28px_110px_rgb(0_0_0/0.5)]'
} satisfies Record<MediaPageBlock['shadow'], string>

const cssSizePattern =
  /^(?:\d+(?:\.\d+)?)(?:px|rem|em|%|vw|vh|svh|dvh|lvh)$/

const resolveCssSize = (value?: string | null) =>
  value && cssSizePattern.test(value) ? value : undefined

export function MediaBlock({ block }: { block: MediaPageBlock }) {
  const customWidth = resolveCssSize(block.customWidth)
  const fixedHeight = resolveCssSize(block.fixedHeight)
  const wrapperStyle: CSSProperties =
    block.width === 'custom' && customWidth ? { maxWidth: customWidth } : {}
  const frameStyle: CSSProperties =
    block.height === 'fixed' && fixedHeight ? { height: fixedHeight } : {}
  const mediaClassName =
    block.height === 'auto' ? 'block h-auto w-full' : 'h-full w-full'

  return (
    <section className="bg-deep-950 py-16">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div
          className={`${widthClassName[block.width]} ${
            alignmentClassName[block.alignment]
          }`}
          style={wrapperStyle}
        >
          {block.title || block.description ? (
            <div className="mb-6 max-w-3xl">
              {block.title ? (
                <h2 className="font-heading text-4xl font-bold uppercase leading-none text-silver-50">
                  {block.title}
                </h2>
              ) : null}
              {block.description ? (
                <p className="mt-4 text-base leading-8 text-silver-300">
                  {block.description}
                </p>
              ) : null}
            </div>
          ) : null}
          <figure
            className={`overflow-hidden bg-deep-900 ${
              block.showBorder ? 'border border-cyan-200/18' : ''
            } ${radiusClassName[block.borderRadius]} ${
              shadowClassName[block.shadow]
            } ${heightClassName[block.height]}`}
            style={frameStyle}
          >
            <MediaAssetView
              alt={block.altText}
              autoPlay={block.autoplay}
              className={mediaClassName}
              controls={block.controls}
              loop={block.loop}
              media={block.media}
              muted={block.muted}
              objectFit={block.objectFit}
              poster={block.poster}
            />
          </figure>
        </div>
      </div>
    </section>
  )
}
