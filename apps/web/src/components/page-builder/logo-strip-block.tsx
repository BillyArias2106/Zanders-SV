import { ArrowUpRight } from 'lucide-react'

import type { LogoStripItem, LogoStripPageBlock } from '@/lib/cms'

const gridClassName = {
  logos: 'grid-cols-2 md:grid-cols-3 xl:grid-cols-5',
  marquee: 'grid-cols-[repeat(auto-fit,minmax(10rem,1fr))]',
  tiles: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
} satisfies Record<LogoStripPageBlock['displayStyle'], string>

const getLinkProps = (item: LogoStripItem) => ({
  href: item.url ?? '#',
  rel: item.openInNewTab ? 'noopener noreferrer' : undefined,
  target: item.openInNewTab ? '_blank' : undefined
})

function LogoItem({ item }: { item: LogoStripItem }) {
  const content = (
    <div className="group flex min-h-28 items-center justify-center border border-[#07164b]/10 bg-white px-5 py-6 text-center transition hover:-translate-y-0.5 hover:border-[#07164b]/35">
      {item.image?.url ? (
        <img
          alt={item.image.alt ?? item.name}
          className="max-h-12 max-w-36 object-contain"
          src={item.image.url}
        />
      ) : (
        <span className="inline-flex items-center gap-2 font-heading text-xl font-bold uppercase leading-none text-[#07164b]">
          {item.name}
          {item.url ? (
            <ArrowUpRight
              aria-hidden="true"
              className="opacity-45 transition group-hover:opacity-100"
              size={16}
              strokeWidth={1.8}
            />
          ) : null}
        </span>
      )}
    </div>
  )

  return item.url ? (
    <a {...getLinkProps(item)}>{content}</a>
  ) : (
    <div>{content}</div>
  )
}

export function LogoStripBlock({ block }: { block: LogoStripPageBlock }) {
  if (block.items.length === 0) {
    return null
  }

  return (
    <section className="border-y border-[#07164b]/10 bg-[#eef3ff] py-12 text-[#07164b]">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {block.sectionTitle || block.sectionDescription ? (
          <div className="mb-7 grid gap-4 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            {block.sectionTitle ? (
              <h2 className="font-heading text-2xl font-bold uppercase leading-none sm:text-3xl">
                {block.sectionTitle}
              </h2>
            ) : null}
            {block.sectionDescription ? (
              <p className="max-w-3xl text-sm leading-7 text-[#07164b]/70 lg:ml-auto">
                {block.sectionDescription}
              </p>
            ) : null}
          </div>
        ) : null}
        <div className={`grid gap-3 ${gridClassName[block.displayStyle]}`}>
          {block.items.map((item) => (
            <LogoItem item={item} key={item.id ?? item.name} />
          ))}
        </div>
      </div>
    </section>
  )
}
