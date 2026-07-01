import type { RichTextPageBlock } from '@/lib/cms'

import { RichTextRenderer } from './rich-text-renderer'

const widthClassName = {
  narrow: 'max-w-3xl',
  normal: 'max-w-4xl',
  wide: 'max-w-6xl'
} satisfies Record<RichTextPageBlock['width'], string>

const alignmentClassName = {
  center: 'text-center',
  left: 'text-left',
  right: 'text-right'
} satisfies Record<RichTextPageBlock['alignment'], string>

export function RichTextBlock({ block }: { block: RichTextPageBlock }) {
  return (
    <section className="bg-deep-950 py-16">
      <div
        className={`mx-auto px-5 sm:px-8 ${widthClassName[block.width]} ${
          alignmentClassName[block.alignment]
        }`}
      >
        <RichTextRenderer content={block.content} />
      </div>
    </section>
  )
}
