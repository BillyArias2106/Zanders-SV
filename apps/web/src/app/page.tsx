import { LandingExperience } from '@/components/templates/landing-experience'
import { getCompanySettings, getMainNavigation } from '@/lib/cms'

export default async function HomePage() {
  const [companySettings, navigationItems] = await Promise.all([
    getCompanySettings(),
    getMainNavigation()
  ])

  return (
    <LandingExperience
      companySettings={companySettings}
      navigationItems={navigationItems}
    />
  )
}
