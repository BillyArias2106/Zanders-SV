import { LandingExperience } from '@/components/templates/landing-experience'
import { getHomePage } from '@/lib/cms'

export default async function HomePage() {
  const page = await getHomePage()

  return <LandingExperience content={page} />
}
