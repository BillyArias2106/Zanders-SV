import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { SliceRenderer } from '@/components/content-slices/SliceRenderer'
import { PageLivePreviewCanvas } from '@/components/page-composer/PageLivePreviewCanvas'
import {
  getCompanySettings,
  getPageBySlug,
  getSiteSettings,
  type SitePage,
} from '@/lib/cms'
import { getServerLocale } from '@/lib/server-locale'

type DynamicPageProps = {
  params: Promise<{ slug: string[] }>
  searchParams?: Promise<Record<string, string | string[] | undefined>>
}

const isPreviewRequest = async (searchParams: DynamicPageProps['searchParams']) => {
  const params = searchParams ? await searchParams : {}
  const preview = params.cmsPreview

  return Array.isArray(preview) ? preview.includes('page') : preview === 'page'
}

const createPreviewPage = (slug: string): SitePage => ({
  id: `preview-${slug}`,
  navigationLabel: null,
  parentPage: null,
  sections: [],
  seo: {
    metaDescription: null,
    metaTitle: null,
    noIndex: true,
    ogImage: null,
  },
  showInNavigation: false,
  slug,
  title: 'Nueva pagina',
})

const resolveSlug = async (params: DynamicPageProps['params']) => {
  const value = await params
  return value.slug.map((part) => decodeURIComponent(part)).join('/')
}

export async function generateMetadata({ params }: DynamicPageProps): Promise<Metadata> {
  const [locale, slug] = await Promise.all([getServerLocale(), resolveSlug(params)])
  const [company, page] = await Promise.all([
    getCompanySettings(locale),
    getPageBySlug(slug, locale),
  ])

  if (!page) {
    return {}
  }

  const title = page.seo.metaTitle ?? `${page.title} | ${company.commercialName}`
  const description = page.seo.metaDescription ?? company.seo.description
  const ogImage = page.seo.ogImage ?? company.ogImage

  return {
    title,
    description,
    keywords: company.seo.keywords,
    openGraph: {
      title,
      description,
      images: ogImage?.url
        ? [{ alt: ogImage.alt ?? page.title, url: ogImage.url }]
        : undefined,
    },
    robots: {
      index: !page.seo.noIndex,
    },
  }
}

export default async function DynamicPage({ params, searchParams }: DynamicPageProps) {
  const [locale, slug, isPreview] = await Promise.all([
    getServerLocale(),
    resolveSlug(params),
    isPreviewRequest(searchParams),
  ])
  const [page, siteSettings] = await Promise.all([
    getPageBySlug(slug, locale),
    getSiteSettings(locale),
  ])

  if (isPreview) {
    return (
      <PageLivePreviewCanvas
        initialPage={page ?? createPreviewPage(slug)}
        siteProfile={siteSettings.siteProfile}
      />
    )
  }

  if (!page) {
    notFound()
  }

  return <SliceRenderer page={page} siteProfile={siteSettings.siteProfile} />
}
