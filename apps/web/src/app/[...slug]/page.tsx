import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { PageRenderer } from '@/components/page-builder/page-renderer'
import { getCompanySettings, getMainNavigation, getPageBySlug } from '@/lib/cms'

type DynamicPageProps = {
  params: Promise<{
    slug: string[]
  }>
}

const getSlugFromParams = async (params: DynamicPageProps['params']) => {
  const { slug } = await params

  return slug.join('/')
}

export async function generateMetadata({
  params
}: DynamicPageProps): Promise<Metadata> {
  const [slug, companySettings] = await Promise.all([
    getSlugFromParams(params),
    getCompanySettings()
  ])
  const page = await getPageBySlug(slug)

  if (!page) {
    return {
      title: companySettings.seo.title,
      description: companySettings.seo.description
    }
  }

  const title =
    page.seo.metaTitle ?? `${page.title} | ${companySettings.commercialName}`
  const description =
    page.seo.metaDescription ?? page.excerpt ?? companySettings.seo.description
  const ogImage =
    page.seo.ogImage ?? page.featuredImage ?? companySettings.ogImage

  return {
    title,
    description,
    keywords:
      page.seo.keywords.length > 0
        ? page.seo.keywords
        : companySettings.seo.keywords,
    openGraph: {
      title,
      description,
      images: ogImage?.url
        ? [
            {
              url: ogImage.url,
              alt: ogImage.alt ?? page.title
            }
          ]
        : undefined
    },
    twitter: {
      card: ogImage?.url ? 'summary_large_image' : 'summary',
      title,
      description,
      images: ogImage?.url ? [ogImage.url] : undefined
    }
  }
}

export default async function DynamicPage({ params }: DynamicPageProps) {
  const slug = await getSlugFromParams(params)
  const [page, companySettings, navigationItems] = await Promise.all([
    getPageBySlug(slug),
    getCompanySettings(),
    getMainNavigation()
  ])

  if (!page) {
    notFound()
  }

  return (
    <PageRenderer
      companySettings={companySettings}
      navigationItems={navigationItems}
      page={page}
    />
  )
}
