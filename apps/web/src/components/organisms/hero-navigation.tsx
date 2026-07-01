import { NavLinkList } from '@/components/molecules/nav-link-list'
import type { CompanySettingsContent, NavigationItem } from '@/lib/cms'

type HeroNavigationProps = {
  companySettings: CompanySettingsContent
  navigationItems: NavigationItem[]
}

export function HeroNavigation({
  companySettings,
  navigationItems
}: HeroNavigationProps) {
  const logo = companySettings.logoPrimary ?? companySettings.logoSecondary

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-cyan-200/15 bg-deep-950/78 backdrop-blur-xl">
      <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-5 sm:px-8">
        <a href="/" className="flex items-center gap-3 text-silver-50">
          <span className="relative grid h-11 w-11 place-items-center border border-cyan-200/60 bg-cyan-200/10 text-cyan-200 shadow-cyan">
            {logo?.url ? (
              <img
                src={logo.url}
                alt={logo.alt ?? companySettings.commercialName}
                className="h-full w-full object-contain p-1.5"
              />
            ) : (
              <>
                <span className="absolute inset-1 rounded-full border border-cyan-200/40" />
                <span className="font-heading text-2xl font-bold leading-none">
                  Z
                </span>
              </>
            )}
          </span>
          <span className="font-heading text-lg font-bold uppercase tracking-[0]">
            {companySettings.commercialName}
          </span>
          <span className="hidden h-8 w-px bg-cyan-200/35 sm:block" />
          <span className="hidden font-heading text-sm font-semibold uppercase text-silver-200 sm:block">
            {companySettings.shortDescription}
          </span>
        </a>
        <NavLinkList items={navigationItems} />
      </div>
    </header>
  )
}
