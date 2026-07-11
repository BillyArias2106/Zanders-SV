import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MessageCircle,
  Music2,
  Phone,
  Twitter,
  Youtube,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { ContactForm } from "@/components/molecules/contact-form";
import type { CompanySettingsContent } from "@/lib/cms";
import { getUIText, type Locale } from "@/lib/i18n";

type SiteContactSectionProps = {
  companySettings: CompanySettingsContent;
  locale: Locale;
};

type SocialLink = {
  href: string;
  icon: LucideIcon;
  label: string;
};

const socialEntries = [
  ["facebook", "Facebook", Facebook],
  ["instagram", "Instagram", Instagram],
  ["tiktok", "TikTok", Music2],
  ["youtube", "YouTube", Youtube],
  ["whatsapp", "WhatsApp", MessageCircle],
  ["linkedin", "LinkedIn", Linkedin],
  ["twitter", "X", Twitter],
] as const;

const getPhoneHref = (phone: string) => phone.replace(/[^\d+]/g, "");

export function SiteContactSection({
  companySettings,
  locale,
}: SiteContactSectionProps) {
  const text = getUIText(locale);
  const socialLinks: SocialLink[] = socialEntries
    .map(([key, label, icon]): SocialLink | null => {
      const href = companySettings.social[key];

      return href
        ? {
            href,
            icon,
            label,
          }
        : null;
    })
    .filter((link): link is SocialLink => Boolean(link));
  const phone = companySettings.mainPhone ?? companySettings.whatsapp;
  const email =
    companySettings.mainEmail ?? companySettings.contact.recipients[0] ?? null;

  return (
    <section
      className="border-t border-cyan-200/14 bg-[#eef3ff] text-[#07164b]"
      id="contacto"
    >
      <div className="mx-auto grid w-full max-w-7xl items-center gap-14 px-5 py-20 sm:px-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div>
          <p className="font-heading text-sm font-bold uppercase tracking-[0.18em]">
            {companySettings.contact.eyebrow}
          </p>
          <h2 className="mt-8 max-w-2xl font-heading text-5xl font-bold leading-[1.08] text-[#07164b] sm:text-6xl">
            {companySettings.contact.headline}
          </h2>
          <span className="mt-8 block h-1 w-16 bg-black" />

          {companySettings.contact.intro ? (
            <p className="mt-10 max-w-xl text-base leading-8 text-[#24315f]">
              {companySettings.contact.intro}
            </p>
          ) : null}

          <div className="mt-10">
            <p className="font-heading text-sm font-bold uppercase tracking-[0.18em]">
              {text.contact.callOrWrite}
            </p>
            {phone ? (
              <a
                className="mt-5 inline-flex items-center gap-3 font-heading text-2xl font-bold text-[#07164b] transition hover:text-[#27337e]"
                href={`tel:${getPhoneHref(phone)}`}
              >
                <Phone aria-hidden="true" size={24} strokeWidth={1.8} />
                {phone}
              </a>
            ) : null}
          </div>

          <div className="mt-16">
            {email ? (
              <a
                className="inline-flex items-center gap-3 border-b-4 border-[#07164b] font-heading text-2xl font-bold text-[#07164b] transition hover:text-[#27337e]"
                href={`mailto:${email}`}
              >
                <Mail aria-hidden="true" size={24} strokeWidth={1.8} />
                {email}
              </a>
            ) : null}
            {socialLinks.length > 0 ? (
              <div className="mt-6 flex flex-wrap gap-4">
                {socialLinks.map(({ href, icon: Icon, label }) => (
                  <a
                    aria-label={label}
                    className="text-[#07164b] transition hover:text-[#27337e]"
                    href={href}
                    key={`${label}-${href}`}
                    rel="noopener noreferrer"
                    target="_blank"
                    title={label}
                  >
                    <Icon aria-hidden="true" size={24} strokeWidth={2.1} />
                  </a>
                ))}
              </div>
            ) : null}
          </div>
        </div>

        <div>
          <ContactForm locale={locale} />
        </div>
      </div>
    </section>
  );
}
