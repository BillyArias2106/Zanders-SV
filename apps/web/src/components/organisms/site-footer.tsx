import {
  Facebook,
  Globe2,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
  Music2,
  Phone,
  Twitter,
  Youtube,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import type {
  CompanySettingsContent,
  FooterSettingsContent,
  FooterSocialType,
  LinkTarget,
  NavigationItem,
} from "@/lib/cms";
import type { Locale } from "@/lib/i18n";

type SiteFooterProps = {
  companySettings: CompanySettingsContent;
  footerSettings: FooterSettingsContent;
  legalPageLinks: LinkTarget[];
  locale: Locale;
  navigationItems: NavigationItem[];
};

type DisplaySocialLink = {
  iconName?: string | null;
  name: string;
  openInNewTab: boolean;
  type: FooterSocialType;
  url: string;
};

const socialIconMap = {
  facebook: Facebook,
  instagram: Instagram,
  linkedin: Linkedin,
  other: Globe2,
  tiktok: Music2,
  twitter: Twitter,
  website: Globe2,
  whatsapp: MessageCircle,
  youtube: Youtube,
} satisfies Record<FooterSocialType, LucideIcon>;

const isExternalHref = (href: string) => /^https?:\/\//.test(href);

const getAnchorProps = (link: LinkTarget) => {
  const opensNewTab = link.openInNewTab || isExternalHref(link.href);

  return {
    href: link.href,
    rel: opensNewTab ? "noopener noreferrer" : undefined,
    target: opensNewTab ? "_blank" : undefined,
  };
};

const flattenNavigation = (items: NavigationItem[]): LinkTarget[] =>
  items.flatMap((item) => {
    const currentLink = item.href
      ? [
          {
            href: item.href,
            label: item.label,
            openInNewTab: item.openInNewTab,
          },
        ]
      : [];

    return [...currentLink, ...flattenNavigation(item.children ?? [])];
  });

function FooterLink({ link }: { link: LinkTarget }) {
  return (
    <a
      {...getAnchorProps(link)}
      className="text-sm leading-7 text-silver-300 transition hover:text-cyan-200"
    >
      {link.label}
    </a>
  );
}

const companySocialEntries = [
  ["facebook", "Facebook"],
  ["instagram", "Instagram"],
  ["tiktok", "TikTok"],
  ["linkedin", "LinkedIn"],
  ["youtube", "YouTube"],
  ["twitter", "X"],
  ["whatsapp", "WhatsApp"],
] as const;

const getCompanySocialLinks = (
  companySettings: CompanySettingsContent,
): DisplaySocialLink[] =>
  companySocialEntries
    .map(([type, name]): DisplaySocialLink | null => {
      const url = companySettings.social[type];

      return url
        ? {
            name,
            openInNewTab: true,
            type,
            url,
          }
        : null;
    })
    .filter((link): link is DisplaySocialLink => Boolean(link));

const getDisplaySocialLinks = (
  footerSettings: FooterSettingsContent,
  companySettings: CompanySettingsContent,
) => {
  const footerSocialLinks = footerSettings.socialLinks
    .filter((link) => link.isActive && link.showInFooter)
    .map(
      (link): DisplaySocialLink => ({
        iconName: link.iconName,
        name: link.name,
        openInNewTab: link.openInNewTab,
        type: link.type,
        url: link.url,
      }),
    );

  return footerSocialLinks.length > 0
    ? footerSocialLinks
    : getCompanySocialLinks(companySettings);
};

const getContactDisplay = (
  footerSettings: FooterSettingsContent,
  companySettings: CompanySettingsContent,
) => {
  const contact = footerSettings.contact;

  if (!contact.useCompanySettings) {
    return contact;
  }

  return {
    address: contact.address ?? companySettings.address,
    businessHours: contact.businessHours ?? companySettings.businessHours,
    city: contact.city,
    country: contact.country ?? companySettings.countryCity,
    email: contact.email ?? companySettings.mainEmail,
    phone: contact.phone ?? companySettings.mainPhone,
    useCompanySettings: true,
    whatsapp: contact.whatsapp ?? companySettings.whatsapp,
  };
};

const getPhoneHref = (phone: string) => phone.replace(/[^\d+]/g, "");

function SocialLinks({ links }: { links: DisplaySocialLink[] }) {
  if (links.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-3">
      {links.map((link) => {
        const Icon = socialIconMap[link.type] ?? Globe2;
        const opensNewTab = link.openInNewTab || isExternalHref(link.url);

        return (
          <a
            aria-label={link.name}
            className="grid h-10 w-10 place-items-center border border-cyan-200/25 text-cyan-200 transition hover:border-cyan-200 hover:bg-cyan-200 hover:text-deep-950"
            href={link.url}
            key={`${link.name}-${link.url}`}
            rel={opensNewTab ? "noopener noreferrer" : undefined}
            target={opensNewTab ? "_blank" : undefined}
            title={link.name}
          >
            <Icon aria-hidden="true" size={18} strokeWidth={1.8} />
          </a>
        );
      })}
    </div>
  );
}

function ContactColumn({
  companySettings,
  footerSettings,
}: {
  companySettings: CompanySettingsContent;
  footerSettings: FooterSettingsContent;
}) {
  const contact = getContactDisplay(footerSettings, companySettings);

  return (
    <div className="space-y-3 text-sm leading-7 text-silver-300">
      {contact.email ? (
        <a
          className="flex gap-3 transition hover:text-cyan-200"
          href={`mailto:${contact.email}`}
        >
          <Mail aria-hidden="true" className="mt-1 shrink-0" size={16} />
          <span>{contact.email}</span>
        </a>
      ) : null}
      {contact.phone ? (
        <a
          className="flex gap-3 transition hover:text-cyan-200"
          href={`tel:${getPhoneHref(contact.phone)}`}
        >
          <Phone aria-hidden="true" className="mt-1 shrink-0" size={16} />
          <span>{contact.phone}</span>
        </a>
      ) : null}
      {contact.whatsapp ? (
        <a
          className="flex gap-3 transition hover:text-cyan-200"
          href={`https://wa.me/${getPhoneHref(contact.whatsapp).replace("+", "")}`}
          rel="noopener noreferrer"
          target="_blank"
        >
          <MessageCircle
            aria-hidden="true"
            className="mt-1 shrink-0"
            size={16}
          />
          <span>{contact.whatsapp}</span>
        </a>
      ) : null}
      {contact.address ? (
        <p className="flex gap-3">
          <MapPin aria-hidden="true" className="mt-1 shrink-0" size={16} />
          <span>{contact.address}</span>
        </p>
      ) : null}
      {contact.country || contact.city ? (
        <p>{[contact.city, contact.country].filter(Boolean).join(", ")}</p>
      ) : null}
      {contact.businessHours ? <p>{contact.businessHours}</p> : null}
    </div>
  );
}

export function SiteFooter({
  companySettings,
  footerSettings,
  legalPageLinks,
  locale: _locale,
  navigationItems,
}: SiteFooterProps) {
  if (!footerSettings.isEnabled) {
    return null;
  }

  const companyName =
    footerSettings.companyNameOverride ?? companySettings.commercialName;
  const description =
    footerSettings.shortDescription ?? companySettings.shortDescription;
  const logo =
    footerSettings.logo ??
    companySettings.logoSecondary ??
    companySettings.logoPrimary;
  const socialLinks = getDisplaySocialLinks(footerSettings, companySettings);
  const navigationLinks = flattenNavigation(navigationItems);
  const copyrightText = footerSettings.legal.copyrightText;
  const configuredLegalLinks = [
    footerSettings.legal.privacyUrl
      ? {
          href: footerSettings.legal.privacyUrl,
          label: "Privacidad",
        }
      : null,
    footerSettings.legal.termsUrl
      ? {
          href: footerSettings.legal.termsUrl,
          label: "Términos",
        }
      : null,
  ].filter((link): link is LinkTarget => Boolean(link));
  const legalLinks =
    configuredLegalLinks.length > 0 ? configuredLegalLinks : legalPageLinks;

  return (
    <footer className="border-t border-cyan-200/14 bg-deep-950 text-silver-50">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_2fr]">
          <div>
            <a className="inline-flex items-center gap-3" href="/">
              {footerSettings.showLogo ? (
                <span className="grid h-12 w-12 place-items-center border border-cyan-200/50 bg-cyan-200/10 text-cyan-200">
                  {logo?.url ? (
                    <img
                      alt={logo.alt ?? companyName}
                      className="h-full w-full object-contain p-1.5"
                      src={logo.url}
                    />
                  ) : (
                    <span className="font-heading text-2xl font-bold">Z</span>
                  )}
                </span>
              ) : null}
              {footerSettings.showCompanyName ? (
                <span className="font-heading text-2xl font-bold uppercase leading-none">
                  {companyName}
                </span>
              ) : null}
            </a>
            {description ? (
              <p className="mt-5 max-w-md text-sm leading-7 text-silver-300">
                {description}
              </p>
            ) : null}
            {footerSettings.additionalText ? (
              <p className="mt-4 max-w-md text-sm leading-7 text-silver-300">
                {footerSettings.additionalText}
              </p>
            ) : null}
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {footerSettings.columns.map((column) => (
              <div key={column.id ?? column.title}>
                <h2 className="font-heading text-lg font-bold uppercase text-silver-50">
                  {column.title}
                </h2>
                <div className="mt-4 flex flex-col items-start gap-2">
                  {column.contentType === "manualLinks" &&
                  column.links.length === 0 &&
                  navigationLinks.length > 0
                    ? navigationLinks.map((link) => (
                        <FooterLink
                          key={`${link.label}-${link.href}`}
                          link={link}
                        />
                      ))
                    : null}
                  {column.contentType === "manualLinks"
                    ? column.links.map((link) => (
                        <FooterLink
                          key={`${link.label}-${link.href}`}
                          link={link}
                        />
                      ))
                    : null}
                  {column.contentType === "socialLinks" ? (
                    <SocialLinks links={socialLinks} />
                  ) : null}
                  {column.contentType === "contact" ? (
                    <ContactColumn
                      companySettings={companySettings}
                      footerSettings={footerSettings}
                    />
                  ) : null}
                  {column.contentType === "customText" && column.customText ? (
                    <p className="text-sm leading-7 text-silver-300">
                      {column.customText}
                    </p>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-cyan-200/12 pt-6 text-sm text-silver-300 md:flex-row md:items-center md:justify-between">
          <div>
            <p>{copyrightText}</p>
            {footerSettings.legal.legalText ? (
              <p className="mt-2 max-w-3xl">{footerSettings.legal.legalText}</p>
            ) : null}
          </div>
          {legalLinks.length > 0 ? (
            <div className="flex flex-wrap gap-x-5 gap-y-2">
              {legalLinks.map((link) => (
                <FooterLink key={`${link.label}-${link.href}`} link={link} />
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </footer>
  );
}
