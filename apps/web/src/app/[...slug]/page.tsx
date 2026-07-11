import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageLivePreviewCanvas } from "@/components/page-builder/page-live-preview-canvas";
import { PageRenderer } from "@/components/page-builder/page-renderer";
import {
  getCompanySettings,
  getMainNavigation,
  getPageBySlug,
  type PageBuilderPage,
} from "@/lib/cms";
import { getServerLocale } from "@/lib/server-locale";

type DynamicPageProps = {
  params: Promise<{
    slug: string[];
  }>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

const getSlugFromParams = async (params: DynamicPageProps["params"]) => {
  const { slug } = await params;

  return slug.join("/");
};

const isCanvasPreviewRequest = async (
  searchParams: DynamicPageProps["searchParams"],
) => {
  const params = searchParams ? await searchParams : {};
  const previewValue = params.cmsPreview;

  return Array.isArray(previewValue)
    ? previewValue.includes("page")
    : previewValue === "page";
};

const createPreviewFallbackPage = (slug: string): PageBuilderPage => {
  const lastSlugSegment = slug.split("/").filter(Boolean).at(-1) ?? "pagina";
  const fallbackTitle = lastSlugSegment
    .replace(/-/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());

  return {
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
    slug,
    status: "draft",
    title: fallbackTitle,
  };
};

export async function generateMetadata({
  params,
}: DynamicPageProps): Promise<Metadata> {
  const [slug, locale] = await Promise.all([
    getSlugFromParams(params),
    getServerLocale(),
  ]);
  const [companySettings, page] = await Promise.all([
    getCompanySettings(locale),
    getPageBySlug(slug, locale),
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
    alternates: page.seo.canonicalUrl
      ? {
          canonical: page.seo.canonicalUrl,
        }
      : undefined,
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
    twitter: {
      card: ogImage?.url ? "summary_large_image" : "summary",
      title,
      description,
      images: ogImage?.url ? [ogImage.url] : undefined,
    },
    robots: {
      follow: !page.seo.noFollow,
      index: !page.seo.noIndex,
    },
  };
}

export default async function DynamicPage({
  params,
  searchParams,
}: DynamicPageProps) {
  const locale = await getServerLocale();
  const [slug, isCanvasPreview] = await Promise.all([
    getSlugFromParams(params),
    isCanvasPreviewRequest(searchParams),
  ]);
  const [page, companySettings, navigationItems] = await Promise.all([
    getPageBySlug(slug, locale),
    getCompanySettings(locale),
    getMainNavigation(locale),
  ]);

  if (!page) {
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
          <PageLivePreviewCanvas initialPage={createPreviewFallbackPage(slug)} />
        </>
      );
    }

    notFound();
  }

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
