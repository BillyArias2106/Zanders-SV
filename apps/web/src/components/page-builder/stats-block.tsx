import type { StatsPageBlock } from '@/lib/cms'

const sectionClassName = {
  compact: 'border-y border-cyan-200/12 bg-deep-900/70 text-silver-50',
  dark: 'border-y border-cyan-200/12 bg-deep-950 text-silver-50',
  editorial: 'border-y border-[#07164b]/10 bg-[#f7f8fb] text-[#07164b]'
} satisfies Record<StatsPageBlock['variant'], string>

const mutedTextClassName = {
  compact: 'text-silver-300',
  dark: 'text-silver-300',
  editorial: 'text-[#07164b]/70'
} satisfies Record<StatsPageBlock['variant'], string>

const cardClassName = {
  compact: 'border-cyan-200/14 bg-white/[0.035]',
  dark: 'border-cyan-200/14 bg-white/[0.035]',
  editorial: 'border-[#07164b]/10 bg-white'
} satisfies Record<StatsPageBlock['variant'], string>

export function StatsBlock({ block }: { block: StatsPageBlock }) {
  if (block.items.length === 0) {
    return null
  }

  const isEditorial = block.variant === 'editorial'

  return (
    <section className={`${sectionClassName[block.variant]} py-16`}>
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.25fr] lg:items-end">
          <div>
            {block.eyebrow ? (
              <p
                className={`font-heading text-sm font-bold uppercase ${
                  isEditorial ? 'text-[#07164b]' : 'text-cyan-200'
                }`}
              >
                {block.eyebrow}
              </p>
            ) : null}
            {block.title ? (
              <h2 className="mt-4 font-heading text-4xl font-bold uppercase leading-none sm:text-5xl">
                {block.title}
              </h2>
            ) : null}
            {block.description ? (
              <p
                className={`mt-5 max-w-2xl text-base leading-8 ${mutedTextClassName[block.variant]}`}
              >
                {block.description}
              </p>
            ) : null}
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {block.items.map((item) => (
              <article
                className={`min-h-48 border p-5 ${cardClassName[block.variant]}`}
                key={item.id ?? `${item.value}-${item.label}`}
              >
                <p
                  className={`font-heading text-5xl font-bold uppercase leading-none ${
                    isEditorial ? 'text-[#07164b]' : 'text-cyan-200'
                  }`}
                >
                  {item.value}
                </p>
                <h3 className="mt-4 font-heading text-xl font-bold uppercase leading-none">
                  {item.label}
                </h3>
                {item.description ? (
                  <p
                    className={`mt-4 text-sm leading-7 ${mutedTextClassName[block.variant]}`}
                  >
                    {item.description}
                  </p>
                ) : null}
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
