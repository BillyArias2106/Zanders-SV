import { ChevronDown, Menu } from 'lucide-react'

import type { NavigationItem } from '@/lib/cms'

type NavLinkListProps = {
  items: NavigationItem[]
}

function NavItemLink({
  className,
  item
}: {
  className: string
  item: NavigationItem
}) {
  if (!item.href) {
    return <span className={className}>{item.label}</span>
  }

  return (
    <a
      className={className}
      href={item.href}
      rel={item.openInNewTab ? 'noopener noreferrer' : undefined}
      target={item.openInNewTab ? '_blank' : undefined}
    >
      {item.label}
    </a>
  )
}

function DesktopNavItem({ item }: { item: NavigationItem }) {
  const hasChildren = Boolean(item.children?.length)
  const baseClass =
    'inline-flex items-center gap-1 px-4 py-2 font-heading text-sm font-semibold uppercase text-silver-300 transition hover:bg-white/5 hover:text-cyan-200'

  if (!hasChildren) {
    return <NavItemLink className={baseClass} item={item} />
  }

  return (
    <div className="group relative">
      <NavItemLink className={baseClass} item={item} />
      <ChevronDown
        aria-hidden="true"
        className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 text-cyan-200 transition group-hover:rotate-180"
        size={14}
        strokeWidth={1.7}
      />
      <div className="invisible absolute right-0 top-full min-w-56 border border-cyan-200/16 bg-deep-950/95 p-2 opacity-0 shadow-panel backdrop-blur-xl transition group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
        {item.children?.map((child) => (
          <NavItemLink
            className="block px-4 py-3 font-heading text-sm font-semibold uppercase text-silver-300 transition hover:bg-cyan-200/10 hover:text-cyan-200"
            item={child}
            key={`${child.label}-${child.href}`}
          />
        ))}
      </div>
    </div>
  )
}

function MobileNavItem({ item }: { item: NavigationItem }) {
  if (!item.children?.length) {
    return (
      <NavItemLink
        className="block border-t border-cyan-200/10 px-4 py-3 font-heading text-sm font-semibold uppercase text-silver-200"
        item={item}
      />
    )
  }

  return (
    <details className="border-t border-cyan-200/10">
      <summary className="cursor-pointer px-4 py-3 font-heading text-sm font-semibold uppercase text-silver-200">
        {item.label}
      </summary>
      <div className="pb-2 pl-4">
        {item.children.map((child) => (
          <NavItemLink
            className="block px-4 py-2 font-heading text-sm font-semibold uppercase text-silver-300"
            item={child}
            key={`${child.label}-${child.href}`}
          />
        ))}
      </div>
    </details>
  )
}

export function NavLinkList({ items }: NavLinkListProps) {
  return (
    <>
      <nav aria-label="Principal" className="hidden items-center gap-2 md:flex">
        {items.map((item) => (
          <DesktopNavItem item={item} key={`${item.label}-${item.href}`} />
        ))}
      </nav>

      <details className="relative md:hidden">
        <summary className="grid h-11 w-11 cursor-pointer list-none place-items-center border border-cyan-200/40 bg-cyan-200/10 text-cyan-200 [&::-webkit-details-marker]:hidden">
          <Menu aria-hidden="true" size={21} strokeWidth={1.7} />
          <span className="sr-only">Abrir menú</span>
        </summary>
        <nav
          aria-label="Principal móvil"
          className="absolute right-0 top-[calc(100%+0.75rem)] w-72 border border-cyan-200/16 bg-deep-950/95 shadow-panel backdrop-blur-xl"
        >
          {items.map((item) => (
            <MobileNavItem item={item} key={`${item.label}-${item.href}`} />
          ))}
        </nav>
      </details>
    </>
  )
}
