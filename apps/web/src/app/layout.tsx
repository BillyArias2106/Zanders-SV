import type { Metadata } from 'next'
import type { ReactNode } from 'react'

import { ProgressiveLoader } from '@/components/molecules/progressive-loader'
import { SmoothScrollProvider } from '@/components/organisms/smooth-scroll-provider'
import { SiteFooter } from '@/components/organisms/site-footer'
import {
  getCompanySettings,
  getCompanyThemeCSS,
  getFooterSettings,
  getMainNavigation,
  getPublishedPageLinks
} from '@/lib/cms'
import '@/styles/globals.css'

const createMetadataBase = (url: string) => {
  try {
    return new URL(url)
  } catch {
    return new URL('http://localhost:3000')
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const companySettings = await getCompanySettings()
  const ogImageUrl = companySettings.ogImage?.url ?? undefined

  return {
    title: companySettings.seo.title,
    description: companySettings.seo.description,
    metadataBase: createMetadataBase(companySettings.seo.canonicalBaseUrl),
    applicationName: companySettings.commercialName,
    keywords:
      companySettings.seo.keywords.length > 0
        ? companySettings.seo.keywords
        : undefined,
    alternates: {
      canonical: '/'
    },
    icons: companySettings.favicon?.url
      ? {
          icon: companySettings.favicon.url
        }
      : undefined,
    openGraph: {
      title: companySettings.seo.title,
      description: companySettings.seo.description,
      siteName: companySettings.commercialName,
      images: ogImageUrl
        ? [
            {
              url: ogImageUrl,
              alt:
                companySettings.ogImage?.alt ?? companySettings.commercialName
            }
          ]
        : undefined
    },
    twitter: {
      card: ogImageUrl ? 'summary_large_image' : 'summary',
      title: companySettings.seo.title,
      description: companySettings.seo.description,
      images: ogImageUrl ? [ogImageUrl] : undefined
    }
  }
}

type RootLayoutProps = {
  children: ReactNode
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const [
    companySettings,
    footerSettings,
    navigationItems,
    publishedPageLinks
  ] = await Promise.all([
    getCompanySettings(),
    getFooterSettings(),
    getMainNavigation(),
    getPublishedPageLinks()
  ])
  const themeCSS = getCompanyThemeCSS(companySettings)

  return (
    <html lang="es" className="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&family=Rajdhani:wght@600;700&display=swap"
          rel="stylesheet"
        />
        <style
          id="zanders-company-theme"
          dangerouslySetInnerHTML={{ __html: themeCSS }}
        />
      </head>
      <body
        className="bg-deep-950 text-silver-50 antialiased"
        suppressHydrationWarning
      >
        <SmoothScrollProvider>
          <ProgressiveLoader />
          {children}
          <SiteFooter
            companySettings={companySettings}
            footerSettings={footerSettings}
            navigationItems={navigationItems}
            publishedPageLinks={publishedPageLinks}
          />
        </SmoothScrollProvider>
      </body>
    </html>
  )
}
