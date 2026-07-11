import { Star } from 'lucide-react'

import type { TestimonialItem, TestimonialsPageBlock } from '@/lib/cms'

const getInitials = (name: string) =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join('')

function Rating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1 text-cyan-200" aria-label={`${rating} de 5`}>
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          aria-hidden="true"
          fill={index < rating ? 'currentColor' : 'none'}
          key={index}
          size={16}
          strokeWidth={1.8}
        />
      ))}
    </div>
  )
}

function TestimonialCard({ item }: { item: TestimonialItem }) {
  return (
    <article className="flex min-h-72 flex-col justify-between border border-cyan-200/14 bg-white/[0.035] p-6">
      <div>
        <Rating rating={item.rating} />
        <blockquote className="mt-5 text-base leading-8 text-silver-200">
          "{item.quote}"
        </blockquote>
      </div>
      <div className="mt-8 flex items-center gap-4">
        {item.avatar?.url ? (
          <img
            alt={item.avatar.alt ?? item.name}
            className="h-12 w-12 object-cover"
            src={item.avatar.url}
          />
        ) : (
          <span className="grid h-12 w-12 place-items-center border border-cyan-200/35 bg-cyan-200/10 font-heading text-sm font-bold text-cyan-200">
            {getInitials(item.name)}
          </span>
        )}
        <div>
          <p className="font-heading text-lg font-bold uppercase text-silver-50">
            {item.name}
          </p>
          {item.role ? (
            <p className="mt-1 text-sm leading-6 text-silver-300">
              {item.role}
            </p>
          ) : null}
        </div>
      </div>
    </article>
  )
}

export function TestimonialsBlock({
  block
}: {
  block: TestimonialsPageBlock
}) {
  if (block.items.length === 0) {
    return null
  }

  return (
    <section className="border-y border-cyan-200/12 bg-deep-950 py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {block.sectionTitle || block.sectionDescription ? (
          <div className="mb-10 grid gap-5 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            {block.sectionTitle ? (
              <h2 className="font-heading text-4xl font-bold uppercase leading-none text-silver-50 sm:text-5xl">
                {block.sectionTitle}
              </h2>
            ) : null}
            {block.sectionDescription ? (
              <p className="max-w-3xl text-base leading-8 text-silver-300 lg:ml-auto">
                {block.sectionDescription}
              </p>
            ) : null}
          </div>
        ) : null}
        <div className="grid gap-4 md:grid-cols-3">
          {block.items.map((item) => (
            <TestimonialCard item={item} key={item.id ?? item.name} />
          ))}
        </div>
      </div>
    </section>
  )
}
