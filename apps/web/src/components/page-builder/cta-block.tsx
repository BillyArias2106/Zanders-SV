import type { CTAPageBlock } from '@/lib/cms'

const variantClassName = {
  minimal: 'bg-deep-950',
  outline: 'border-y border-cyan-200/20 bg-deep-950',
  solid: 'bg-deep-900'
} satisfies Record<CTAPageBlock['variant'], string>

export function CTABlock({ block }: { block: CTAPageBlock }) {
  return (
    <section className={`py-16 ${variantClassName[block.variant]}`}>
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 sm:px-8 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="font-heading text-4xl font-bold uppercase leading-none text-silver-50">
            {block.title}
          </h2>
          {block.description ? (
            <p className="mt-4 max-w-2xl text-base leading-8 text-silver-300">
              {block.description}
            </p>
          ) : null}
        </div>
        {block.button ? (
          <a
            className="inline-flex shrink-0 justify-center border border-cyan-200 bg-cyan-200 px-6 py-3 font-heading text-sm font-bold uppercase text-deep-950 transition hover:bg-transparent hover:text-cyan-200"
            href={block.button.href}
          >
            {block.button.label}
          </a>
        ) : null}
      </div>
    </section>
  )
}
