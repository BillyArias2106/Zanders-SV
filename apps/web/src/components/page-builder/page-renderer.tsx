import { HeroNavigation } from '@/components/organisms/hero-navigation'
import type {
  CompanySettingsContent,
  NavigationItem,
  PageBuilderPage
} from '@/lib/cms'

import { RenderBlocks } from './render-blocks'

type PageRendererProps = {
  companySettings: CompanySettingsContent
  navigationItems: NavigationItem[]
  page: PageBuilderPage
}

export function PageRenderer({
  companySettings,
  navigationItems,
  page
}: PageRendererProps) {
  return (
    <main className="min-h-screen bg-deep-950 text-silver-50">
      <HeroNavigation
        companySettings={companySettings}
        navigationItems={navigationItems}
      />
      {page.content.length > 0 ? (
        <RenderBlocks blocks={page.content} />
      ) : (
        <section className="mx-auto max-w-4xl px-5 pb-20 pt-36 sm:px-8">
          <p className="font-heading text-sm font-bold uppercase text-cyan-200">
            {page.slug}
          </p>
          <h1 className="mt-5 font-heading text-5xl font-bold uppercase leading-none text-silver-50">
            {page.title}
          </h1>
          {page.excerpt ? (
            <p className="mt-6 text-base leading-8 text-silver-300">
              {page.excerpt}
            </p>
          ) : null}
        </section>
      )}
    </main>
  )
}
