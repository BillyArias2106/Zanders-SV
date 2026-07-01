import type { ReactNode } from 'react'

type RichTextNode = {
  children?: RichTextNode[]
  format?: number
  tag?: string
  text?: string
  type?: string
}

const isRichTextNode = (value: unknown): value is RichTextNode =>
  typeof value === 'object' && value !== null

const getChildren = (node: RichTextNode) =>
  Array.isArray(node.children) ? node.children : []

function renderChildren(
  children: RichTextNode[],
  keyPrefix: string
): ReactNode {
  return children.map((child, index) =>
    renderNode(child, `${keyPrefix}-${index}`)
  )
}

function renderTextNode(node: RichTextNode, key: string) {
  let content: ReactNode = node.text ?? ''

  if (node.format && (node.format & 1) === 1) {
    content = <strong>{content}</strong>
  }

  if (node.format && (node.format & 2) === 2) {
    content = <em>{content}</em>
  }

  return <span key={key}>{content}</span>
}

function renderNode(node: RichTextNode, key: string): ReactNode {
  if (node.type === 'text') {
    return renderTextNode(node, key)
  }

  const children = renderChildren(getChildren(node), key)

  switch (node.type) {
    case 'heading':
      if (node.tag === 'h3') {
        return (
          <h3
            className="font-heading text-2xl font-bold uppercase text-silver-50"
            key={key}
          >
            {children}
          </h3>
        )
      }

      return (
        <h2
          className="font-heading text-3xl font-bold uppercase text-silver-50"
          key={key}
        >
          {children}
        </h2>
      )
    case 'list':
      if (node.tag === 'ol') {
        return (
          <ol className="list-decimal space-y-2 pl-6" key={key}>
            {children}
          </ol>
        )
      }

      return (
        <ul className="list-disc space-y-2 pl-6" key={key}>
          {children}
        </ul>
      )
    case 'listitem':
      return <li key={key}>{children}</li>
    case 'quote':
      return (
        <blockquote
          className="border-l border-cyan-200/45 pl-5 text-silver-200"
          key={key}
        >
          {children}
        </blockquote>
      )
    case 'paragraph':
      return (
        <p className="text-base leading-8 text-silver-300" key={key}>
          {children}
        </p>
      )
    default:
      return <div key={key}>{children}</div>
  }
}

export function RichTextRenderer({ content }: { content: unknown }) {
  if (!isRichTextNode(content)) {
    return null
  }

  const root = isRichTextNode((content as { root?: unknown }).root)
    ? (content as { root: RichTextNode }).root
    : content

  return (
    <div className="space-y-5">
      {renderChildren(getChildren(root), 'rich-text')}
    </div>
  )
}
