import type { ImageTextPageBlock } from '@/lib/cms'

export function ImageTextBlock({ block }: { block: ImageTextPageBlock }) {
  const imageFirst = block.imagePosition === 'left'

  return (
    <section className="bg-deep-950 py-20">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 sm:px-8 lg:grid-cols-2 lg:items-center">
        <figure
          className={`${imageFirst ? '' : 'lg:order-2'} min-h-[360px] overflow-hidden border border-cyan-200/18 bg-deep-900`}
        >
          {block.image?.url ? (
            <img
              alt={block.image.alt ?? block.title}
              className="h-full min-h-[360px] w-full object-cover"
              src={block.image.url}
            />
          ) : null}
        </figure>
        <div className={imageFirst ? '' : 'lg:order-1'}>
          <h2 className="font-heading text-4xl font-bold uppercase leading-none text-silver-50 sm:text-5xl">
            {block.title}
          </h2>
          {block.description ? (
            <p className="mt-5 text-base leading-8 text-silver-300">
              {block.description}
            </p>
          ) : null}
          {block.button ? (
            <a
              className="mt-8 inline-flex border border-cyan-200 px-5 py-3 font-heading text-sm font-bold uppercase text-cyan-200 transition hover:bg-cyan-200 hover:text-deep-950"
              href={block.button.href}
            >
              {block.button.label}
            </a>
          ) : null}
        </div>
      </div>
    </section>
  )
}
