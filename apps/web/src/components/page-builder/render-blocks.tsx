import type { PageBlock } from '@/lib/cms'

import { CardsBlock } from './cards-block'
import { CTABlock } from './cta-block'
import { FAQBlock } from './faq-block'
import { GalleryBlock } from './gallery-block'
import { HeroBlock } from './hero-block'
import { ImageTextBlock } from './image-text-block'
import { MediaBlock } from './media-block'
import { RichTextBlock } from './rich-text-block'
import { SnapLayoutBlock } from './snap-layout-block'
import { VideoBlock } from './video-block'

type RenderBlocksProps = {
  blocks: PageBlock[]
}

export function RenderBlocks({ blocks }: RenderBlocksProps) {
  return (
    <>
      {blocks.map((block, index) => {
        const key = block.id ?? `${block.type}-${index}`

        switch (block.type) {
          case 'hero':
            return <HeroBlock block={block} key={key} />
          case 'richText':
            return <RichTextBlock block={block} key={key} />
          case 'imageText':
            return <ImageTextBlock block={block} key={key} />
          case 'cards':
            return <CardsBlock block={block} key={key} />
          case 'gallery':
            return <GalleryBlock block={block} key={key} />
          case 'mediaBlock':
            return <MediaBlock block={block} key={key} />
          case 'videoBlock':
            return <VideoBlock block={block} key={key} />
          case 'snapLayoutBlock':
            return <SnapLayoutBlock block={block} key={key} />
          case 'cta':
            return <CTABlock block={block} key={key} />
          case 'faq':
            return <FAQBlock block={block} key={key} />
          default:
            return process.env.NODE_ENV === 'development' ? (
              <pre
                className="mx-auto max-w-7xl px-5 py-8 text-xs text-silver-300 sm:px-8"
                key={key}
              >
                Bloque no soportado
              </pre>
            ) : null
        }
      })}
    </>
  )
}
