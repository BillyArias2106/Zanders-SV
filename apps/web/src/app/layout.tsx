import type { Metadata } from "next";
import Script from "next/script";
import type { ReactNode } from "react";

import { HeroNavigation } from "@/components/organisms/hero-navigation";
import { SiteContactSection } from "@/components/organisms/site-contact-section";
import { SiteFooter } from "@/components/organisms/site-footer";
import {
  getCompanySettings,
  getCompanyThemeCSS,
  getFooterSettings,
  getMainNavigation,
} from "@/lib/cms";
import { getServerLocale } from "@/lib/server-locale";
import "@/components/page-composer/page-composer.css";
import "@/styles/globals.css";

const performanceMeasureGuardScript =
  process.env.NODE_ENV === "development"
    ? `
(() => {
  if (
    typeof performance === "undefined" ||
    typeof performance.measure !== "function" ||
    performance.__zanderMeasureGuard
  ) {
    return;
  }

  const originalMeasure = performance.measure.bind(performance);

  Object.defineProperty(performance, "__zanderMeasureGuard", {
    configurable: false,
    enumerable: false,
    value: true,
  });

  performance.measure = function guardedMeasure(name, startOrOptions, endMark) {
    try {
      return originalMeasure(name, startOrOptions, endMark);
    } catch (error) {
      const message =
        error && typeof error === "object" && "message" in error
          ? String(error.message)
          : "";

      if (message.includes("cannot have a negative time stamp")) {
        return undefined;
      }

      throw error;
    }
  };
})();
`
    : null;

const createMetadataBase = (url: string) => {
  try {
    return new URL(url);
  } catch {
    return new URL("http://localhost:3000");
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const companySettings = await getCompanySettings(locale);
  const ogImageUrl = companySettings.ogImage?.url ?? undefined;

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
      canonical: "/",
    },
    icons: companySettings.favicon?.url
      ? {
          icon: companySettings.favicon.url,
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
                companySettings.ogImage?.alt ?? companySettings.commercialName,
            },
          ]
        : undefined,
    },
    twitter: {
      card: ogImageUrl ? "summary_large_image" : "summary",
      title: companySettings.seo.title,
      description: companySettings.seo.description,
      images: ogImageUrl ? [ogImageUrl] : undefined,
    },
  };
}

type RootLayoutProps = {
  children: ReactNode;
};

export default async function RootLayout({ children }: RootLayoutProps) {
  const locale = await getServerLocale();
  const [companySettings, footerSettings, navigationItems] = await Promise.all([
    getCompanySettings(locale),
    getFooterSettings(locale),
    getMainNavigation(locale),
  ]);
  const themeCSS = getCompanyThemeCSS(companySettings);

  return (
    <html lang={locale} className="dark" suppressHydrationWarning>
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
          id="app-company-theme"
          dangerouslySetInnerHTML={{ __html: themeCSS }}
        />
        {performanceMeasureGuardScript ? (
          <Script
            dangerouslySetInnerHTML={{ __html: performanceMeasureGuardScript }}
            id="zander-performance-measure-guard"
            strategy="beforeInteractive"
          />
        ) : null}
      </head>
      <body
        className="bg-deep-950 text-silver-50 antialiased"
        suppressHydrationWarning
      >
        <HeroNavigation
          companySettings={companySettings}
          locale={locale}
          navigationItems={navigationItems}
        />
        {children}
        <SiteContactSection
          companySettings={companySettings}
          locale={locale}
        />
        <SiteFooter
          companySettings={companySettings}
          footerSettings={footerSettings}
          legalPageLinks={[]}
          locale={locale}
          navigationItems={navigationItems}
        />
      </body>
    </html>
  );
}
