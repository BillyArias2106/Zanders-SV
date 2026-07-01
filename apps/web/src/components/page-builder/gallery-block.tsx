import type { GalleryPageBlock } from '@/lib/cms'

export function GalleryBlock({ block }: { block: GalleryPageBlock }) {
  return (
    <section className="bg-deep-950 py-16">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {block.title || block.description ? (
          <div className="mb-9 max-w-3xl">
            {block.title ? (
              <h2 className="font-heading text-4xl font-bold uppercase text-silver-50">
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
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {block.images.map((item, index) =>
            item.image?.url ? (
              <figure
                className="relative aspect-[4/3] overflow-hidden border border-cyan-200/14 bg-deep-900"
                key={`${item.image.url}-${index}`}
              >
                <img
                  alt={item.image.alt ?? item.caption ?? ''}
                  className="h-full w-full object-cover transition duration-500 hover:scale-105"
                  src={item.image.url}
                />
                {item.caption ? (
                  <figcaption className="absolute inset-x-0 bottom-0 bg-deep-950/80 px-4 py-3 text-sm text-silver-200 backdrop-blur">
                    {item.caption}
                  </figcaption>
                ) : null}
              </figure>
            ) : null
          )}
        </div>
      </div>
    </section>
  )
}
