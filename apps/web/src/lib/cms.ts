import { defaultLocale, type Locale } from "@/lib/i18n";

const cmsBaseUrl =
  process.env.CMS_INTERNAL_URL ??
  process.env.NEXT_PUBLIC_CMS_URL ??
  "http://localhost:3001";

export type MediaAsset = {
  alt?: string | null;
  mediaType?: string | null;
  mimeType?: string | null;
  poster?: MediaAsset | null;
  url?: string | null;
};

export type LinkTarget = {
  href: string;
  label: string;
  openInNewTab?: boolean;
};

export type NavigationItem = LinkTarget & {
  children?: NavigationItem[];
};

export type PageSection = {
  pageAnchor?: string;
  blockType: string;
  id?: string | null;
  [key: string]: unknown;
};

export type SiteProfile =
  | "agency"
  | "ecommerce"
  | "education"
  | "government"
  | "saas-apple";

export type SiteSettingsContent = {
  siteProfile: SiteProfile;
};

export type SitePage = {
  id: number | string;
  navigationLabel: string | null;
  parentPage:
    | number
    | string
    | {
        id?: number | string | null;
        navigationLabel?: string | null;
        slug?: string | null;
        title?: string | null;
      }
    | null;
  sections: PageSection[];
  seo: {
    metaDescription: string | null;
    metaTitle: string | null;
    noIndex: boolean;
    ogImage: MediaAsset | null;
  };
  showInNavigation: boolean;
  slug: string;
  title: string;
};

export type FooterSocialType =
  | "facebook"
  | "instagram"
  | "linkedin"
  | "other"
  | "tiktok"
  | "twitter"
  | "website"
  | "whatsapp"
  | "youtube";

export type CompanySettingsContent = {
  address: string | null;
  businessHours: string | null;
  commercialName: string;
  contact: {
    eyebrow: string;
    headline: string;
    intro: string | null;
    recipients: string[];
  };
  countryCity: string | null;
  defaultLanguage: Locale;
  favicon: MediaAsset | null;
  logoPrimary: MediaAsset | null;
  logoSecondary: MediaAsset | null;
  mainEmail: string | null;
  mainPhone: string | null;
  ogImage: MediaAsset | null;
  seo: {
    canonicalBaseUrl: string;
    description: string;
    keywords: string[];
    title: string;
  };
  shortDescription: string | null;
  siteProfile: SiteProfile;
  social: Record<FooterSocialType, string | null>;
  theme: {
    accent: string;
    background: string;
    foreground: string;
    muted: string;
  };
  whatsapp: string | null;
};

export type FooterSettingsContent = {
  additionalText: string | null;
  columns: Array<{
    contentType: "contact" | "customText" | "manualLinks" | "socialLinks";
    customText?: string | null;
    id?: string | null;
    isActive: boolean;
    links: LinkTarget[];
    title: string;
  }>;
  companyNameOverride: string | null;
  contact: {
    address: string | null;
    businessHours: string | null;
    city: string | null;
    country: string | null;
    email: string | null;
    phone: string | null;
    useCompanySettings: boolean;
    whatsapp: string | null;
  };
  isEnabled: boolean;
  legal: {
    copyrightText: string | null;
    legalText: string | null;
    privacyUrl: string | null;
    termsUrl: string | null;
  };
  logo: MediaAsset | null;
  shortDescription: string | null;
  showCompanyName: boolean;
  showLogo: boolean;
  socialLinks: Array<{
    iconName?: string | null;
    isActive: boolean;
    name: string;
    openInNewTab: boolean;
    showInFooter: boolean;
    type: FooterSocialType;
    url: string;
  }>;
};

type CompanySettingsResponse = {
  address?: string | null;
  brand?: {
    logoPrimary?: MediaAsset | null;
    logoSecondary?: MediaAsset | null;
  } | null;
  businessHours?: string | null;
  commercialName?: string | null;
  contact?: {
    eyebrow?: string | null;
    headline?: string | null;
    intro?: string | null;
    recipients?: string[] | null;
  } | null;
  countryCity?: string | null;
  defaultLanguage?: string | null;
  favicon?: MediaAsset | null;
  footerAddress?: string | null;
  footerAdditionalText?: string | null;
  footerBusinessHours?: string | null;
  footerCity?: string | null;
  footerColumns?:
    | Array<{
        contentType?: "contact" | "customText" | "manualLinks" | "socialLinks" | null;
        customText?: string | null;
        id?: string | null;
        isActive?: boolean | null;
        links?:
          | Array<{
              label?: string | null;
              openInNewTab?: boolean | null;
              url?: string | null;
            }>
          | null;
        title?: string | null;
      }>
    | null;
  footerCompanyNameOverride?: string | null;
  footerCountry?: string | null;
  footerCopyrightText?: string | null;
  footerEmail?: string | null;
  footerIsEnabled?: boolean | null;
  footerLegalTextOverride?: string | null;
  footerLogo?: MediaAsset | null;
  footerPhone?: string | null;
  footerPrivacyUrl?: string | null;
  footerShowCompanyName?: boolean | null;
  footerShowLogo?: boolean | null;
  footerShortDescription?: string | null;
  footerSocialLinks?:
    | Array<{
        iconName?: string | null;
        isActive?: boolean | null;
        name?: string | null;
        openInNewTab?: boolean | null;
        showInFooter?: boolean | null;
        type?: FooterSocialType | null;
        url?: string | null;
      }>
    | null;
  footerTermsUrl?: string | null;
  footerUseCompanySettings?: boolean | null;
  footerWhatsapp?: string | null;
  logoPrimary?: MediaAsset | null;
  logoSecondary?: MediaAsset | null;
  mainEmail?: string | null;
  mainPhone?: string | null;
  ogImage?: MediaAsset | null;
  seo?: {
    canonicalBaseUrl?: string | null;
    defaultMetaDescription?: string | null;
    defaultMetaTitle?: string | null;
    keywords?: string | string[] | null;
  } | null;
  shortDescription?: string | null;
  siteProfile?: string | null;
  social?: Partial<Record<FooterSocialType, string | null>> | null;
  theme?: {
    accent?: string | null;
    background?: string | null;
    foreground?: string | null;
    muted?: string | null;
  } | null;
  whatsapp?: string | null;
};

type PayloadPage = {
  id?: number | string | null;
  navigationLabel?: string | null;
  parentPage?:
    | number
    | string
    | {
        id?: number | string | null;
        navigationLabel?: string | null;
        slug?: string | null;
        title?: string | null;
      }
    | null;
  sections?: PageSection[] | null;
  seo?: {
    metaDescription?: string | null;
    metaTitle?: string | null;
    noIndex?: boolean | null;
    ogImage?: MediaAsset | null;
  } | null;
  showInNavigation?: boolean | null;
  slug?: string | null;
  title?: string | null;
};

type PagesResponse = {
  docs?: PayloadPage[];
};

const fallbackCompanySettings: CompanySettingsContent = {
  address: null,
  businessHours: null,
  commercialName: "New Site",
  contact: {
    eyebrow: "Contacto",
    headline: "Estamos preparando una nueva experiencia.",
    intro: null,
    recipients: [],
  },
  countryCity: null,
  defaultLanguage: defaultLocale,
  favicon: null,
  logoPrimary: null,
  logoSecondary: null,
  mainEmail: null,
  mainPhone: null,
  ogImage: null,
  seo: {
    canonicalBaseUrl: "http://localhost:3000",
    description: "Sitio en reconstruccion.",
    keywords: [],
    title: "New Site",
  },
  shortDescription: null,
  siteProfile: "agency",
  social: {
    facebook: null,
    instagram: null,
    linkedin: null,
    other: null,
    tiktok: null,
    twitter: null,
    website: null,
    whatsapp: null,
    youtube: null,
  },
  theme: {
    accent: "#8de1e8",
    background: "#02080c",
    foreground: "#f8fafc",
    muted: "#10242c",
  },
  whatsapp: null,
};

const fallbackFooterSettings: FooterSettingsContent = {
  additionalText: null,
  columns: [],
  companyNameOverride: null,
  contact: {
    address: null,
    businessHours: null,
    city: null,
    country: null,
    email: null,
    phone: null,
    useCompanySettings: true,
    whatsapp: null,
  },
  isEnabled: true,
  legal: {
    copyrightText: null,
    legalText: null,
    privacyUrl: null,
    termsUrl: null,
  },
  logo: null,
  shortDescription: null,
  showCompanyName: true,
  showLogo: true,
  socialLinks: [],
};

const fallbackSiteSettings: SiteSettingsContent = {
  siteProfile: "agency",
};

const siteProfiles = new Set<SiteProfile>([
  "agency",
  "ecommerce",
  "education",
  "government",
  "saas-apple",
]);

const normalizeLocale = (value: unknown): Locale =>
  value === "en" || value === "es" ? value : defaultLocale;

const normalizeSiteProfile = (value: unknown): SiteProfile =>
  typeof value === "string" && siteProfiles.has(value as SiteProfile)
    ? (value as SiteProfile)
    : fallbackSiteSettings.siteProfile;

const normalizePageSections = (value: unknown): PageSection[] =>
  Array.isArray(value)
    ? value.filter(
        (section): section is PageSection =>
          Boolean(
            section &&
              typeof section === "object" &&
              "blockType" in section &&
              typeof section.blockType === "string",
          ),
      )
    : [];

const normalizePage = (page: PayloadPage): SitePage | null => {
  const title = page.title?.trim();
  const slug = page.slug?.trim();

  if (!title || !slug) {
    return null;
  }

  return {
    id: page.id ?? slug,
    navigationLabel: page.navigationLabel?.trim() || null,
    parentPage: page.parentPage ?? null,
    sections: normalizePageSections(page.sections),
    seo: {
      metaDescription: page.seo?.metaDescription?.trim() || null,
      metaTitle: page.seo?.metaTitle?.trim() || null,
      noIndex: page.seo?.noIndex ?? false,
      ogImage: page.seo?.ogImage ?? null,
    },
    showInNavigation: page.showInNavigation ?? false,
    slug,
    title,
  };
};

const normalizeKeywords = (value: unknown): string[] => {
  if (Array.isArray(value)) {
    return value.filter((item): item is string => typeof item === "string");
  }

  if (typeof value === "string") {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
};

const normalizeSocial = (
  social: CompanySettingsResponse["social"],
): CompanySettingsContent["social"] => ({
  facebook: social?.facebook ?? null,
  instagram: social?.instagram ?? null,
  linkedin: social?.linkedin ?? null,
  other: social?.other ?? null,
  tiktok: social?.tiktok ?? null,
  twitter: social?.twitter ?? null,
  website: social?.website ?? null,
  whatsapp: social?.whatsapp ?? null,
  youtube: social?.youtube ?? null,
});

const normalizeCompanySettings = (
  settings: CompanySettingsResponse,
): CompanySettingsContent => ({
  address: settings.address ?? null,
  businessHours: settings.businessHours ?? null,
  commercialName:
    settings.commercialName?.trim() || fallbackCompanySettings.commercialName,
  contact: {
    eyebrow:
      settings.contact?.eyebrow?.trim() ||
      fallbackCompanySettings.contact.eyebrow,
    headline:
      settings.contact?.headline?.trim() ||
      fallbackCompanySettings.contact.headline,
    intro: settings.contact?.intro?.trim() || null,
    recipients: Array.isArray(settings.contact?.recipients)
      ? settings.contact.recipients.filter(
          (item): item is string => typeof item === "string" && item.length > 0,
        )
      : [],
  },
  countryCity: settings.countryCity ?? null,
  defaultLanguage: normalizeLocale(settings.defaultLanguage),
  favicon: settings.favicon ?? null,
  logoPrimary:
    settings.logoPrimary ?? settings.brand?.logoPrimary ?? null,
  logoSecondary:
    settings.logoSecondary ?? settings.brand?.logoSecondary ?? null,
  mainEmail: settings.mainEmail ?? null,
  mainPhone: settings.mainPhone ?? null,
  ogImage: settings.ogImage ?? null,
  seo: {
    canonicalBaseUrl:
      settings.seo?.canonicalBaseUrl?.trim() ||
      fallbackCompanySettings.seo.canonicalBaseUrl,
    description:
      settings.seo?.defaultMetaDescription?.trim() ||
      fallbackCompanySettings.seo.description,
    keywords: normalizeKeywords(settings.seo?.keywords),
    title:
      settings.seo?.defaultMetaTitle?.trim() ||
      settings.commercialName?.trim() ||
      fallbackCompanySettings.seo.title,
  },
  shortDescription: settings.shortDescription?.trim() || null,
  siteProfile: normalizeSiteProfile(settings.siteProfile),
  social: normalizeSocial(settings.social),
  theme: {
    accent: settings.theme?.accent?.trim() || fallbackCompanySettings.theme.accent,
    background:
      settings.theme?.background?.trim() ||
      fallbackCompanySettings.theme.background,
    foreground:
      settings.theme?.foreground?.trim() ||
      fallbackCompanySettings.theme.foreground,
    muted: settings.theme?.muted?.trim() || fallbackCompanySettings.theme.muted,
  },
  whatsapp: settings.whatsapp ?? null,
});

const normalizeSiteSettings = (
  settings: CompanySettingsResponse,
): SiteSettingsContent => ({
  siteProfile: normalizeSiteProfile(settings.siteProfile),
});

const normalizeFooterSettings = (
  settings: CompanySettingsResponse,
): FooterSettingsContent => ({
  additionalText: settings.footerAdditionalText ?? null,
  columns: (() => {
    const columns: FooterSettingsContent["columns"] = [];

    for (const column of settings.footerColumns ?? []) {
      if (!column?.title || !column?.contentType || column.isActive === false) {
        continue;
      }

      const links: LinkTarget[] = [];

      for (const link of column.links ?? []) {
        if (link?.label && link.url) {
          links.push({
            href: link.url,
            label: link.label,
            openInNewTab: link.openInNewTab ?? false,
          });
        }
      }

      columns.push({
        contentType: column.contentType,
        customText: column.customText ?? null,
        id: column.id ?? null,
        isActive: column.isActive ?? true,
        links,
        title: column.title,
      });
    }

    return columns;
  })(),
  companyNameOverride: settings.footerCompanyNameOverride ?? null,
  contact: {
    address: settings.footerAddress ?? null,
    businessHours: settings.footerBusinessHours ?? null,
    city: settings.footerCity ?? null,
    country: settings.footerCountry ?? null,
    email: settings.footerEmail ?? null,
    phone: settings.footerPhone ?? null,
    useCompanySettings: settings.footerUseCompanySettings ?? true,
    whatsapp: settings.footerWhatsapp ?? null,
  },
  isEnabled: settings.footerIsEnabled ?? true,
  legal: {
    copyrightText: settings.footerCopyrightText ?? null,
    legalText: settings.footerLegalTextOverride ?? null,
    privacyUrl: settings.footerPrivacyUrl ?? null,
    termsUrl: settings.footerTermsUrl ?? null,
  },
  logo: settings.footerLogo ?? null,
  shortDescription: settings.footerShortDescription ?? null,
  showCompanyName: settings.footerShowCompanyName ?? true,
  showLogo: settings.footerShowLogo ?? true,
  socialLinks: (() => {
    const socialLinks: FooterSettingsContent["socialLinks"] = [];

    for (const link of settings.footerSocialLinks ?? []) {
      if (!link?.name || !link?.url || !link?.type) {
        continue;
      }

      socialLinks.push({
        iconName: link.iconName ?? null,
        isActive: link.isActive ?? true,
        name: link.name,
        openInNewTab: link.openInNewTab ?? true,
        showInFooter: link.showInFooter ?? true,
        type: link.type,
        url: link.url,
      });
    }

    return socialLinks;
  })(),
});

async function fetchCompanySettings(): Promise<CompanySettingsResponse | null> {
  try {
    const response = await fetch(`${cmsBaseUrl}/api/globals/company-settings`, {
      cache: "no-store",
    });

    if (!response.ok) {
      return null;
    }

    return (await response.json()) as CompanySettingsResponse;
  } catch {
    return null;
  }
}

async function fetchPages(query: string): Promise<SitePage[]> {
  try {
    const response = await fetch(`${cmsBaseUrl}/api/pages?${query}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      return [];
    }

    const payload = (await response.json()) as PagesResponse;

    return (payload.docs ?? [])
      .map(normalizePage)
      .filter((page): page is SitePage => Boolean(page));
  } catch {
    return [];
  }
}

export async function getCompanySettings(
  _locale?: Locale,
): Promise<CompanySettingsContent> {
  const settings = await fetchCompanySettings();

  return settings ? normalizeCompanySettings(settings) : fallbackCompanySettings;
}

export async function getDefaultLanguage(): Promise<Locale> {
  const settings = await fetchCompanySettings();

  return normalizeLocale(settings?.defaultLanguage);
}

export async function getFooterSettings(
  _locale?: Locale,
): Promise<FooterSettingsContent> {
  const settings = await fetchCompanySettings();

  return settings ? normalizeFooterSettings(settings) : fallbackFooterSettings;
}

export async function getSiteSettings(
  _locale: Locale = defaultLocale,
): Promise<SiteSettingsContent> {
  const settings = await fetchCompanySettings();

  return settings ? normalizeSiteSettings(settings) : fallbackSiteSettings;
}

export async function getMainNavigation(_locale?: Locale): Promise<NavigationItem[]> {
  const locale = _locale ?? defaultLocale;
  const pages = await fetchPages(
    `locale=${encodeURIComponent(locale)}&depth=1&limit=50&sort=navigationOrder&where[_status][equals]=published&where[showInNavigation][equals]=true`,
  );

  const getParentId = (page: SitePage) => {
    if (!page.parentPage) {
      return null;
    }

    if (typeof page.parentPage === "number" || typeof page.parentPage === "string") {
      return page.parentPage;
    }

    return page.parentPage.id ?? null;
  };
  const childrenByParent = new Map<number | string, SitePage[]>();

  for (const page of pages) {
    const parentId = getParentId(page);

    if (!parentId) {
      continue;
    }

    childrenByParent.set(parentId, [...(childrenByParent.get(parentId) ?? []), page]);
  }

  return pages.filter((page) => !getParentId(page)).map((page) => ({
    children: (childrenByParent.get(page.id) ?? []).map((child) => ({
      href: getPublicPagePath(child.slug),
      label: child.navigationLabel ?? child.title,
    })),
    href: isHomeSlug(page.slug) ? "/" : `/#${getPageAnchor(page.slug)}`,
    label: page.navigationLabel ?? page.title,
  }));
}

const isHomeSlug = (slug: string) => slug === "home" || slug === "inicio";

const getPageAnchor = (slug: string) => slug.replace(/^\/+/, "").replace(/\/+$/g, "");

export const getPublicPagePath = (slug: string) =>
  isHomeSlug(slug) ? "/" : `/${slug.replace(/^\/+/, "")}`;

export async function getPageBySlug(
  slug: string,
  locale: Locale = defaultLocale,
): Promise<SitePage | null> {
  const pages = await fetchPages(
    `locale=${encodeURIComponent(locale)}&depth=2&limit=1&where[_status][equals]=published&where[slug][equals]=${encodeURIComponent(slug)}`,
  );

  return pages[0] ?? null;
}

export async function getHomePage(
  locale: Locale = defaultLocale,
): Promise<SitePage | null> {
  const homePage =
    (await getPageBySlug("inicio", locale)) ?? (await getPageBySlug("home", locale));

  if (!homePage) {
    return null;
  }

  const navigationPages = await fetchPages(
    `locale=${encodeURIComponent(locale)}&depth=1&limit=50&sort=navigationOrder&where[_status][equals]=published&where[showInNavigation][equals]=true`,
  );

  const homeSections = [...homePage.sections];
  const extraSections = navigationPages
    .filter((page) => !isHomeSlug(page.slug))
    .filter((page) => !page.parentPage)
    .flatMap((page) =>
      page.sections.map((section, index) => ({
        ...section,
        id: `${page.slug}-${section.id ?? index}`,
        pageAnchor: index === 0 ? getPageAnchor(page.slug) : undefined,
      })),
    );

  return {
    ...homePage,
    sections: [...homeSections, ...extraSections],
  };
}

export function getCompanyThemeCSS(settings: CompanySettingsContent): string {
  const { accent, background, foreground, muted } = settings.theme;

  return `
:root {
  --company-background: ${background};
  --company-foreground: ${foreground};
  --company-accent: ${accent};
  --company-muted: ${muted};
}
`;
}
