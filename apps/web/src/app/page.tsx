import type { Metadata } from "next";

import { PageLivePreviewCanvas } from "@/components/page-builder/page-live-preview-canvas";
import { PageRenderer } from "@/components/page-builder/page-renderer";
import { LandingExperience } from "@/components/templates/landing-experience";
import {
  getCompanySettings,
  getMainNavigation,
  getPageBySlug,
  type PageBuilderPage,
} from "@/lib/cms";
import type { Locale } from "@/lib/i18n";
import { getServerLocale } from "@/lib/server-locale";

const getHomePage = async (locale: Locale): Promise<PageBuilderPage | null> =>
  (await getPageBySlug("home", locale)) ??
  (await getPageBySlug("inicio", locale));

type HomePageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

const isCanvasPreviewRequest = async (
  searchParams: HomePageProps["searchParams"],
) => {
  const params = searchParams ? await searchParams : {};
  const previewValue = params.cmsPreview;

  return Array.isArray(previewValue)
    ? previewValue.includes("page")
    : previewValue === "page";
};

const previewFallbackHomePage: PageBuilderPage = {
  content: [],
  excerpt: null,
  featuredImage: null,
  headerStyle: "inherit",
  hideFooter: false,
  isFeatured: false,
  pageTemplate: "landing",
  pageType: "landing",
  seo: {
    canonicalUrl: null,
    keywords: [],
    metaDescription: null,
    metaTitle: null,
    noFollow: false,
    noIndex: true,
    ogImage: null,
  },
  slug: "inicio",
  status: "draft",
  title: "Nueva página",
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const [companySettings, page] = await Promise.all([
    getCompanySettings(locale),
    getHomePage(locale),
  ]);

  if (!page) {
    return {
      title: companySettings.seo.title,
      description: companySettings.seo.description,
    };
  }

  const title =
    page.seo.metaTitle ?? `${page.title} | ${companySettings.commercialName}`;
  const description =
    page.seo.metaDescription ?? page.excerpt ?? companySettings.seo.description;
  const ogImage =
    page.seo.ogImage ?? page.featuredImage ?? companySettings.ogImage;

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
              alt: ogImage.alt ?? page.title,
            },
          ]
        : undefined,
    },
    robots: {
      follow: !page.seo.noFollow,
      index: !page.seo.noIndex,
    },
    twitter: {
      card: ogImage?.url ? "summary_large_image" : "summary",
      title,
      description,
      images: ogImage?.url ? [ogImage.url] : undefined,
    },
  };
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const locale = await getServerLocale();
  const isCanvasPreview = await isCanvasPreviewRequest(searchParams);
  const [companySettings, navigationItems, page] = await Promise.all([
    getCompanySettings(locale),
    getMainNavigation(locale),
    getHomePage(locale),
  ]);

  if (page) {
    return (
      <>
        {isCanvasPreview ? (
          <style>{`
            body:has([data-cms-preview-canvas="true"]) > section#contacto,
            body:has([data-cms-preview-canvas="true"]) > footer,
            body:has([data-cms-preview-canvas="true"]) > div.fixed.inset-0 {
              display: none !important;
            }
          `}</style>
        ) : null}
        {isCanvasPreview ? (
          <PageLivePreviewCanvas initialPage={page} />
        ) : (
          <PageRenderer
            companySettings={companySettings}
            locale={locale}
            navigationItems={navigationItems}
            page={page}
          />
        )}
      </>
    );
  }

  if (isCanvasPreview) {
    return (
      <>
        <style>{`
          body:has([data-cms-preview-canvas="true"]) > section#contacto,
          body:has([data-cms-preview-canvas="true"]) > footer,
          body:has([data-cms-preview-canvas="true"]) > div.fixed.inset-0 {
            display: none !important;
          }
        `}</style>
        <PageLivePreviewCanvas initialPage={previewFallbackHomePage} />
      </>
    );
  }

  return (
    <LandingExperience
      companySettings={companySettings}
      locale={locale}
      navigationItems={navigationItems}
    />
  );
}
