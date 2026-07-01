import { ArrowUpRight } from 'lucide-react'

import type { CardsPageBlock } from '@/lib/cms'

export function CardsBlock({ block }: { block: CardsPageBlock }) {
  return (
    <section className="border-y border-cyan-200/12 bg-deep-900/70 py-16">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {block.sectionTitle || block.sectionDescription ? (
          <div className="mb-9 max-w-3xl">
            {block.sectionTitle ? (
              <h2 className="font-heading text-4xl font-bold uppercase leading-none text-silver-50">
                {block.sectionTitle}
              </h2>
            ) : null}
            {block.sectionDescription ? (
              <p className="mt-4 text-base leading-8 text-silver-300">
                {block.sectionDescription}
              </p>
            ) : null}
          </div>
        ) : null}
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {block.cards.map((card) => {
            const content = (
              <article className="group h-full border border-cyan-200/14 bg-white/[0.035] p-5 transition hover:border-cyan-200/55">
                <div className="flex items-start gap-4">
                  {card.media?.url ? (
                    <img
                      alt={card.media.alt ?? card.title}
                      className="h-12 w-12 shrink-0 object-contain"
                      src={card.media.url}
                    />
                  ) : (
                    <span className="grid h-12 w-12 shrink-0 place-items-center border border-cyan-200/40 bg-cyan-200/10 text-cyan-200">
                      <ArrowUpRight
                        aria-hidden="true"
                        size={22}
                        strokeWidth={1.7}
                      />
                    </span>
                  )}
                  <div>
                    <h3 className="font-heading text-2xl font-bold uppercase text-silver-50">
                      {card.title}
                    </h3>
                    {card.description ? (
                      <p className="mt-2 text-sm leading-7 text-silver-300">
                        {card.description}
                      </p>
                    ) : null}
                  </div>
                </div>
              </article>
            )

            return card.url ? (
              <a href={card.url} key={card.title}>
                {content}
              </a>
            ) : (
              <div key={card.title}>{content}</div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
