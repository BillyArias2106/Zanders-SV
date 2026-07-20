import type { Metadata } from "next";

import { SliceRenderer } from "@/components/content-slices/SliceRenderer";
import { PageLivePreviewCanvas } from "@/components/page-composer/PageLivePreviewCanvas";
import {
  getCompanySettings,
  getHomePage,
  getSiteSettings,
  type SitePage,
} from "@/lib/cms";
import { getServerLocale } from "@/lib/server-locale";

type HomePageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

const previewHomePage: SitePage = {
  id: "preview-home",
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
  slug: "inicio",
  title: "Nueva pagina de inicio",
};

const isPreviewRequest = async (searchParams: HomePageProps["searchParams"]) => {
  const params = searchParams ? await searchParams : {};
  const preview = params.cmsPreview;

  return Array.isArray(preview) ? preview.includes("page") : preview === "page";
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const [companySettings, page] = await Promise.all([
    getCompanySettings(locale),
    getHomePage(locale),
  ]);
  const title = page?.seo.metaTitle ?? page?.title ?? companySettings.seo.title;
  const description =
    page?.seo.metaDescription ?? companySettings.seo.description;
  const ogImage = page?.seo.ogImage ?? companySettings.ogImage;

  return {
    title,
    description,
    keywords: companySettings.seo.keywords,
    openGraph: {
      title,
      description,
      images: ogImage?.url
        ? [{ alt: ogImage.alt ?? title, url: ogImage.url }]
        : undefined,
    },
  };
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const locale = await getServerLocale();
  const [page, isPreview, siteSettings] = await Promise.all([
    getHomePage(locale),
    isPreviewRequest(searchParams),
    getSiteSettings(locale),
  ]);

  if (isPreview) {
    return (
      <PageLivePreviewCanvas
        initialPage={page ?? previewHomePage}
        siteProfile={siteSettings.siteProfile}
      />
    );
  }

  return (
    <SliceRenderer
      page={page ?? previewHomePage}
      siteProfile={siteSettings.siteProfile}
    />
  );
}
