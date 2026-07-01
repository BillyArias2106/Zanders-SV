import type { HeroPageBlock } from '@/lib/cms'

export function HeroBlock({ block }: { block: HeroPageBlock }) {
  const media = block.backgroundMedia
  const videoUrl = media?.mimeType?.startsWith('video/') ? media.url : null
  const imageUrl = media?.mimeType?.startsWith('image/') ? media.url : null

  return (
    <section className="relative min-h-[72svh] overflow-hidden pt-28">
      {videoUrl ? (
        <video
          aria-hidden="true"
          autoPlay
          className="absolute inset-0 h-full w-full object-cover opacity-[0.36]"
          loop
          muted
          playsInline
          src={videoUrl}
        />
      ) : imageUrl ? (
        <img
          alt={media?.alt ?? ''}
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover opacity-[0.34]"
          src={imageUrl}
        />
      ) : null}
      <div className="zanders-hero-shade-x absolute inset-0 z-10" />
      <div className="zanders-hero-shade-y absolute inset-0 z-10" />
      <div className="relative z-20 mx-auto flex min-h-[72svh] max-w-7xl items-center px-5 py-16 sm:px-8">
        <div className="max-w-3xl">
          {block.eyebrow ? (
            <p className="font-heading text-sm font-bold uppercase text-cyan-200">
              {block.eyebrow}
            </p>
          ) : null}
          <h1 className="mt-5 font-heading text-5xl font-bold uppercase leading-[0.94] text-silver-50 sm:text-7xl">
            {block.title}
          </h1>
          {block.subtitle ? (
            <p className="mt-5 font-heading text-2xl font-semibold uppercase text-silver-100">
              {block.subtitle}
            </p>
          ) : null}
          {block.description ? (
            <p className="mt-6 max-w-2xl text-base leading-8 text-silver-200">
              {block.description}
            </p>
          ) : null}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            {block.primaryButton ? (
              <a
                className="inline-flex items-center justify-center border border-cyan-200 bg-cyan-200 px-5 py-3 font-heading text-sm font-bold uppercase text-deep-950 transition hover:bg-transparent hover:text-cyan-200"
                href={block.primaryButton.href}
              >
                {block.primaryButton.label}
              </a>
            ) : null}
            {block.secondaryButton ? (
              <a
                className="inline-flex items-center justify-center border border-cyan-200/45 px-5 py-3 font-heading text-sm font-bold uppercase text-cyan-200 transition hover:bg-cyan-200/10"
                href={block.secondaryButton.href}
              >
                {block.secondaryButton.label}
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}
