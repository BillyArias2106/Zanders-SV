import type { FAQPageBlock } from '@/lib/cms'

export function FAQBlock({ block }: { block: FAQPageBlock }) {
  return (
    <section className="bg-deep-950 py-16">
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        {block.title ? (
          <h2 className="mb-8 font-heading text-4xl font-bold uppercase text-silver-50">
            {block.title}
          </h2>
        ) : null}
        <div className="space-y-3">
          {block.items.map((item) => (
            <details
              className="border border-cyan-200/14 bg-white/[0.035] p-5"
              key={item.question}
            >
              <summary className="cursor-pointer font-heading text-xl font-bold uppercase text-silver-50">
                {item.question}
              </summary>
              <p className="mt-4 text-sm leading-7 text-silver-300">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
