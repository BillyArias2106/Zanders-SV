import { LandingExperience } from '@/components/templates/landing-experience'
import { getCompanySettings, getMainNavigation } from '@/lib/cms'
import { getServerLocale } from '@/lib/server-locale'

export default async function HomePage() {
  const locale = await getServerLocale()
  const [companySettings, navigationItems] = await Promise.all([
    getCompanySettings(locale),
    getMainNavigation(locale)
  ])

  return (
    <LandingExperience
      companySettings={companySettings}
      locale={locale}
      navigationItems={navigationItems}
    />
  )
}
