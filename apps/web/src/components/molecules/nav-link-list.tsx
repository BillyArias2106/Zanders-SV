import type { NavbarLink } from '@/lib/cms'

type NavLinkListProps = {
  links: NavbarLink[]
}

export function NavLinkList({ links }: NavLinkListProps) {
  return (
    <nav aria-label="Principal" className="hidden items-center gap-2 md:flex">
      {links.map((link) => (
        <a
          key={`${link.label}-${link.href}`}
          href={link.href}
          target={link.openInNewTab ? '_blank' : undefined}
          rel={link.openInNewTab ? 'noreferrer' : undefined}
          className="px-4 py-2 font-heading text-sm font-semibold uppercase text-silver-300 transition hover:bg-white/5 hover:text-cyan-200"
        >
          {link.label}
        </a>
      ))}
    </nav>
  )
}
