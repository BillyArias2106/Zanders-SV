import type { CSSProperties } from 'react'
import {
  ArrowUpRight,
  Camera,
  CheckCircle2,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Plane,
  Printer,
  Sparkles,
  Wrench
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

import type { LinkTarget, SnapLayoutItem, SnapLayoutPageBlock } from '@/lib/cms'

import { MediaAssetView } from './media-asset'
import { RichTextRenderer } from './rich-text-renderer'

const maxWidthClassName = {
  full: 'max-w-none',
  narrow: 'max-w-4xl',
  normal: 'max-w-6xl',
  wide: 'max-w-7xl'
} satisfies Record<SnapLayoutPageBlock['maxWidth'], string>

const paddingTopClassName = {
  lg: 'pt-20',
  md: 'pt-14',
  none: 'pt-0',
  sm: 'pt-8',
  xl: 'pt-28'
} satisfies Record<SnapLayoutPageBlock['paddingTop'], string>

const paddingBottomClassName = {
  lg: 'pb-20',
  md: 'pb-14',
  none: 'pb-0',
  sm: 'pb-8',
  xl: 'pb-28'
} satisfies Record<SnapLayoutPageBlock['paddingBottom'], string>

const gapClassName = {
  lg: 'gap-8',
  md: 'gap-5',
  none: 'gap-0',
  sm: 'gap-3',
  xl: 'gap-10'
} satisfies Record<SnapLayoutPageBlock['gap'], string>

const alignmentClassName = {
  center: 'text-center',
  left: 'text-left',
  right: 'text-right'
} satisfies Record<SnapLayoutPageBlock['alignment'], string>

const itemAlignmentClassName = {
  center: 'items-center text-center',
  left: 'items-start text-left',
  right: 'items-end text-right'
} satisfies Record<SnapLayoutItem['alignment'], string>

const itemPaddingClassName = {
  lg: 'p-8',
  md: 'p-6',
  none: 'p-0',
  sm: 'p-4',
  xl: 'p-10'
} satisfies Record<SnapLayoutItem['padding'], string>

const radiusClassName = {
  lg: 'rounded-2xl',
  md: 'rounded-lg',
  none: 'rounded-none',
  sm: 'rounded',
  xl: 'rounded-[2rem]'
} satisfies Record<SnapLayoutItem['borderRadius'], string>

const shadowClassName = {
  none: '',
  soft: 'shadow-panel',
  strong: 'shadow-[0_26px_95px_rgb(0_0_0/0.48)]'
} satisfies Record<SnapLayoutItem['shadow'], string>

const gridClassName = {
  bentoGrid: 'md:grid-cols-4 md:auto-rows-[minmax(12rem,auto)]',
  contact: 'lg:grid-cols-2 lg:items-start',
  featureLeft: 'lg:grid-cols-3 lg:auto-rows-fr',
  featureRight: 'lg:grid-cols-3 lg:auto-rows-fr',
  fourColumns: 'sm:grid-cols-2 xl:grid-cols-4',
  mediaText: 'lg:grid-cols-2 lg:items-center',
  mosaicGallery: 'sm:grid-cols-2 lg:grid-cols-4 lg:auto-rows-[minmax(11rem,auto)]',
  oneColumn: 'grid-cols-1',
  serviceCards: 'md:grid-cols-3',
  splitHero: 'lg:grid-cols-2 lg:items-center',
  textMedia: 'lg:grid-cols-2 lg:items-center',
  threeColumns: 'md:grid-cols-3',
  twoColumns: 'lg:grid-cols-2',
  twoColumnsWideLeft: 'lg:grid-cols-[minmax(0,7fr)_minmax(0,3fr)]',
  twoColumnsWideRight: 'lg:grid-cols-[minmax(0,3fr)_minmax(0,7fr)]'
} satisfies Record<SnapLayoutPageBlock['layout'], string>

const iconMap: Record<string, LucideIcon> = {
  camera: Camera,
  mail: Mail,
  map: MapPin,
  message: MessageCircle,
  phone: Phone,
  plane: Plane,
  printer: Printer,
  sparkles: Sparkles,
  tool: Wrench,
  wrench: Wrench
}

const getItemSpanClassName = (
  layout: SnapLayoutPageBlock['layout'],
  index: number
) => {
  if (layout === 'featureLeft' && index === 0) {
    return 'lg:col-span-2 lg:row-span-2'
  }

  if (layout === 'featureRight' && index === 2) {
    return 'lg:col-span-2 lg:row-span-2'
  }

  if (layout === 'bentoGrid') {
    if (index === 0) {
      return 'md:col-span-2 md:row-span-2'
    }

    if (index === 3 || index === 5) {
      return 'md:col-span-2'
    }
  }

  if (layout === 'mosaicGallery') {
    if (index === 0) {
      return 'lg:col-span-2 lg:row-span-2'
    }

    if (index === 4) {
      return 'lg:col-span-2'
    }
  }

  return ''
}

const getIcon = (iconName?: string | null) => {
  const key = iconName?.trim().toLowerCase() ?? ''

  return iconMap[key] ?? Sparkles
}

const getLinkProps = (link: LinkTarget) => ({
  href: link.href,
  rel: link.openInNewTab ? 'noopener noreferrer' : undefined,
  target: link.openInNewTab ? '_blank' : undefined
})

function SnapButton({ link }: { link: LinkTarget }) {
  return (
    <a
      {...getLinkProps(link)}
      className="inline-flex items-center justify-center gap-2 border border-cyan-200 bg-cyan-200 px-5 py-3 font-heading text-sm font-bold uppercase text-deep-950 transition hover:bg-transparent hover:text-cyan-200"
    >
      {link.label}
      <ArrowUpRight aria-hidden="true" size={16} strokeWidth={1.8} />
    </a>
  )
}

function SnapLayoutItemContent({ item }: { item: SnapLayoutItem }) {
  const Icon = getIcon(item.iconName)
  const media = item.image ?? item.video

  if (item.contentType === 'image') {
    return (
      <MediaAssetView
        className="h-full min-h-64 w-full"
        media={item.image}
        objectFit="cover"
      />
    )
  }

  if (item.contentType === 'video') {
    return (
      <MediaAssetView
        className="h-full min-h-64 w-full"
        controls
        media={item.video}
        muted
        objectFit="cover"
      />
    )
  }

  if (item.contentType === 'button') {
    return item.button ? <SnapButton link={item.button} /> : null
  }

  if (item.contentType === 'richText') {
    return <RichTextRenderer content={item.richText} />
  }

  if (item.contentType === 'list') {
    return (
      <div>
        {item.title ? (
          <h3 className="font-heading text-3xl font-bold uppercase leading-none text-silver-50">
            {item.title}
          </h3>
        ) : null}
        {item.description ? (
          <p className="mt-4 text-sm leading-7 text-silver-300">
            {item.description}
          </p>
        ) : null}
        <ul className="mt-5 space-y-3 text-left text-sm leading-7 text-silver-200">
          {item.listItems.map((listItem) => (
            <li className="flex gap-3" key={listItem}>
              <CheckCircle2
                aria-hidden="true"
                className="mt-1 shrink-0 text-cyan-200"
                size={18}
                strokeWidth={1.8}
              />
              <span>{listItem}</span>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  if (item.contentType === 'mediaText') {
    return (
      <div className="grid gap-5 md:grid-cols-[0.9fr_1.1fr] md:items-center">
        {media?.url ? (
          <figure className="min-h-56 overflow-hidden border border-cyan-200/14 bg-deep-950">
            <MediaAssetView
              className="h-full min-h-56 w-full"
              media={media}
              objectFit="cover"
            />
          </figure>
        ) : null}
        <div>
          {item.subtitle ? (
            <p className="font-heading text-sm font-bold uppercase text-cyan-200">
              {item.subtitle}
            </p>
          ) : null}
          {item.title ? (
            <h3 className="mt-2 font-heading text-3xl font-bold uppercase leading-none text-silver-50">
              {item.title}
            </h3>
          ) : null}
          {item.description ? (
            <p className="mt-4 text-sm leading-7 text-silver-300">
              {item.description}
            </p>
          ) : null}
          {item.button ? (
            <div className="mt-5">
              <SnapButton link={item.button} />
            </div>
          ) : null}
        </div>
      </div>
    )
  }

  if (item.contentType === 'iconText') {
    return (
      <div>
        <span className="grid h-12 w-12 place-items-center border border-cyan-200/40 bg-cyan-200/10 text-cyan-200">
          <Icon aria-hidden="true" size={24} strokeWidth={1.7} />
        </span>
        {item.title ? (
          <h3 className="mt-6 font-heading text-3xl font-bold uppercase leading-none text-silver-50">
            {item.title}
          </h3>
        ) : null}
        {item.description ? (
          <p className="mt-4 text-sm leading-7 text-silver-300">
            {item.description}
          </p>
        ) : null}
      </div>
    )
  }

  return (
    <div>
      {item.subtitle ? (
        <p className="font-heading text-sm font-bold uppercase text-cyan-200">
          {item.subtitle}
        </p>
      ) : null}
      {item.title ? (
        <h3 className="mt-2 font-heading text-3xl font-bold uppercase leading-none text-silver-50">
          {item.title}
        </h3>
      ) : null}
      {item.description ? (
        <p className="mt-4 text-sm leading-7 text-silver-300">
          {item.description}
        </p>
      ) : null}
      {item.button || item.link ? (
        <div className="mt-6">
          {item.button ? (
            <SnapButton link={item.button} />
          ) : item.link ? (
            <a
              {...getLinkProps(item.link)}
              className="inline-flex items-center gap-2 font-heading text-sm font-bold uppercase text-cyan-200 transition hover:text-silver-50"
            >
              {item.link.label}
              <ArrowUpRight aria-hidden="true" size={16} strokeWidth={1.8} />
            </a>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}

function SnapLayoutCell({
  index,
  item,
  layout
}: {
  index: number
  item: SnapLayoutItem
  layout: SnapLayoutPageBlock['layout']
}) {
  const style: CSSProperties = {
    backgroundColor: item.backgroundColor ?? undefined,
    color: item.textColor ?? undefined,
    order: item.responsiveOrder ?? undefined
  }
  const content = <SnapLayoutItemContent item={item} />
  const className = `flex min-h-48 flex-col justify-between overflow-hidden bg-white/[0.035] ${
    item.showBorder ? 'border border-cyan-200/14' : ''
  } ${itemPaddingClassName[item.padding]} ${
    itemAlignmentClassName[item.alignment]
  } ${radiusClassName[item.borderRadius]} ${shadowClassName[item.shadow]}`

  if (item.link && item.contentType !== 'button' && !item.button) {
    return (
      <a
        {...getLinkProps(item.link)}
        className={`${className} transition hover:border-cyan-200/55 ${getItemSpanClassName(
          layout,
          index
        )}`}
        style={style}
      >
        {content}
      </a>
    )
  }

  return (
    <article
      className={`${className} ${getItemSpanClassName(layout, index)}`}
      style={style}
    >
      {content}
    </article>
  )
}

const normalizeSectionId = (sectionId?: string | null) =>
  sectionId?.replace(/^#/, '').replace(/\s+/g, '-')

export function SnapLayoutBlock({ block }: { block: SnapLayoutPageBlock }) {
  const sectionStyle: CSSProperties = {
    backgroundColor: block.backgroundColor ?? undefined,
    color: block.textColor ?? undefined
  }

  return (
    <section
      className={`relative overflow-hidden bg-deep-950 ${
        paddingTopClassName[block.paddingTop]
      } ${
        paddingBottomClassName[block.paddingBottom]
      } ${block.className ?? ''}`}
      id={normalizeSectionId(block.sectionId)}
      style={sectionStyle}
    >
      {block.backgroundVideo?.url ? (
        <video
          aria-hidden="true"
          autoPlay
          className="absolute inset-0 h-full w-full object-cover opacity-20"
          loop
          muted
          playsInline
          src={block.backgroundVideo.url}
        />
      ) : block.backgroundImage?.url ? (
        <img
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover opacity-20"
          src={block.backgroundImage.url}
        />
      ) : null}
      {block.backgroundImage?.url || block.backgroundVideo?.url ? (
        <div className="absolute inset-0 bg-deep-950/72" />
      ) : null}
      <div
        className={`relative z-10 mx-auto px-5 sm:px-8 ${maxWidthClassName[block.maxWidth]}`}
      >
        {block.sectionTitle ||
        block.sectionSubtitle ||
        block.sectionDescription ? (
          <div
            className={`mb-10 max-w-3xl ${alignmentClassName[block.alignment]} ${
              block.alignment === 'center'
                ? 'mx-auto'
                : block.alignment === 'right'
                  ? 'ml-auto'
                  : ''
            }`}
          >
            {block.sectionSubtitle ? (
              <p className="font-heading text-sm font-bold uppercase text-cyan-200">
                {block.sectionSubtitle}
              </p>
            ) : null}
            {block.sectionTitle ? (
              <h2 className="mt-3 font-heading text-4xl font-bold uppercase leading-none text-silver-50 sm:text-5xl">
                {block.sectionTitle}
              </h2>
            ) : null}
            {block.sectionDescription ? (
              <p className="mt-5 text-base leading-8 text-silver-300">
                {block.sectionDescription}
              </p>
            ) : null}
          </div>
        ) : null}
        <div
          className={`grid ${gapClassName[block.gap]} ${gridClassName[block.layout]}`}
        >
          {block.items.map((item, index) => (
            <SnapLayoutCell
              index={index}
              item={item}
              key={item.id ?? `${block.id ?? block.layout}-${index}`}
              layout={block.layout}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
