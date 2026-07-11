import type {
  Field,
  GlobalConfig,
  StaticLabel,
  TextFieldSingleValidation,
} from "payload";

import { adminGroups } from "../lib/admin-groups";
import { adminLabel, adminLabels } from "../lib/admin-i18n";

const hexColorPattern = /^#(?:[0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/;

const validateHexColor: TextFieldSingleValidation = (value) => {
  if (!value) {
    return true;
  }

  return (
    hexColorPattern.test(value) ||
    "Usa un color HEX válido, por ejemplo #0F172A."
  );
};

const colorField = (
  name: string,
  label: StaticLabel,
  defaultValue: string,
): Field => ({
  name,
  type: "text",
  label,
  required: true,
  defaultValue,
  admin: {
    components: {
      Field: {
        path: "@/components/ColorPickerField",
        exportName: "ColorPickerField",
      },
    },
    description: adminLabel(
      "Formato HEX. Ejemplo: #0F172A.",
      "HEX format. Example: #0F172A.",
    ),
    placeholder: defaultValue,
  },
  validate: validateHexColor,
});

const imageUploadField = (
  name: string,
  label: StaticLabel,
  required = false,
): Field => ({
  name,
  type: "upload",
  label,
  relationTo: "media",
  required,
  displayPreview: true,
  filterOptions: {
    mimeType: {
      contains: "image/",
    },
  },
});

type FooterColumnSiblingData = {
  contentType?:
    | "contact"
    | "customText"
    | "mainNavigation"
    | "manualLinks"
    | "publishedPages"
    | "socialLinks";
};

const showForFooterColumnType =
  (contentType: FooterColumnSiblingData["contentType"]) =>
  (_: unknown, siblingData: unknown) =>
    (siblingData as FooterColumnSiblingData).contentType === contentType;

const footerManualLinkFields: Field[] = [
  {
    name: "label",
    type: "text",
    label: adminLabel("Texto visible", "Visible text"),
    localized: true,
    required: true,
  },
  {
    name: "url",
    type: "text",
    label: "URL",
    required: true,
  },
  {
    name: "openInNewTab",
    type: "checkbox",
    label: adminLabel("Abrir en nueva pestaña", "Open in new tab"),
    defaultValue: false,
  },
  {
    name: "isActive",
    type: "checkbox",
    label: adminLabel("Activo", "Active"),
    defaultValue: true,
  },
  {
    name: "order",
    type: "number",
    label: adminLabel("Orden", "Order"),
    defaultValue: 0,
  },
];

const footerFields: Field[] = [
  {
    name: "footerIsEnabled",
    type: "checkbox",
    label: adminLabel("Mostrar pie de página", "Show footer"),
    defaultValue: true,
    admin: {
      description: adminLabel(
        "El footer se arma automáticamente con empresa, redes sociales y páginas publicadas.",
        "The footer is built automatically from company details, social links and published pages.",
      ),
    },
  },
  {
    name: "footerShowLogo",
    type: "checkbox",
    label: adminLabel("Mostrar logo", "Show logo"),
    defaultValue: true,
  },
  {
    name: "footerLogo",
    type: "upload",
    label: adminLabel("Logo alternativo del footer", "Alternative footer logo"),
    relationTo: "media",
    displayPreview: true,
    filterOptions: {
      mimeType: {
        contains: "image/",
      },
    },
    admin: {
      description: adminLabel(
        "Opcional. Si queda vacío se usa el logo secundario o principal de Marca.",
        "Optional. If empty, the secondary or primary brand logo is used.",
      ),
    },
  },
  {
    name: "footerShowCompanyName",
    type: "checkbox",
    label: adminLabel("Mostrar nombre de empresa", "Show company name"),
    defaultValue: true,
  },
  {
    name: "footerCompanyNameOverride",
    type: "text",
    label: adminLabel(
      "Nombre de empresa alternativo",
      "Alternative company name",
    ),
    localized: true,
    admin: {
      hidden: true,
    },
  },
  {
    name: "footerShortDescription",
    type: "textarea",
    label: adminLabel("Descripción corta", "Short description"),
    localized: true,
    admin: {
      hidden: true,
      rows: 3,
    },
  },
  {
    name: "footerAdditionalText",
    type: "textarea",
    label: adminLabel("Texto adicional", "Additional text"),
    localized: true,
    admin: {
      hidden: true,
      rows: 4,
    },
  },
  {
    name: "footerColumns",
    type: "array",
    label: adminLabel("Columnas del pie de página", "Footer columns"),
    admin: {
      hidden: true,
    },
    labels: adminLabels("Columna", "Columnas", "Column", "Columns"),
    fields: [
      {
        name: "title",
        type: "text",
        label: adminLabel("Título", "Title"),
        localized: true,
        required: true,
      },
      {
        name: "contentType",
        type: "select",
        label: adminLabel("Tipo de contenido", "Content type"),
        required: true,
        defaultValue: "manualLinks",
        options: [
          {
            label: adminLabel(
              "Páginas publicadas automáticamente",
              "Published pages automatically",
            ),
            value: "publishedPages",
          },
          {
            label: adminLabel("Menú principal", "Main menu"),
            value: "mainNavigation",
          },
          {
            label: adminLabel("Enlaces manuales", "Manual links"),
            value: "manualLinks",
          },
          {
            label: adminLabel("Redes sociales", "Social links"),
            value: "socialLinks",
          },
          { label: adminLabel("Contacto", "Contact"), value: "contact" },
          {
            label: adminLabel("Texto personalizado", "Custom text"),
            value: "customText",
          },
        ],
      },
      {
        name: "customText",
        type: "textarea",
        label: adminLabel("Texto personalizado", "Custom text"),
        localized: true,
        admin: {
          condition: showForFooterColumnType("customText"),
          rows: 5,
        },
      },
      {
        name: "links",
        type: "array",
        label: adminLabel("Enlaces manuales", "Manual links"),
        labels: adminLabels("Enlace", "Enlaces", "Link", "Links"),
        admin: {
          condition: showForFooterColumnType("manualLinks"),
        },
        fields: footerManualLinkFields,
      },
      {
        name: "order",
        type: "number",
        label: adminLabel("Orden", "Order"),
        defaultValue: 0,
      },
      {
        name: "isActive",
        type: "checkbox",
        label: adminLabel("Activo", "Active"),
        defaultValue: true,
      },
    ],
  },
  {
    name: "footerSocialLinks",
    type: "array",
    label: adminLabel(
      "Redes sociales visibles en el pie de página",
      "Social links visible in the footer",
    ),
    admin: {
      hidden: true,
      description: adminLabel(
        "Opcional. Si no agregas redes aquí, el sitio usa las redes principales de Configuración General.",
        "Optional. If you do not add links here, the site uses the main social links from General Settings.",
      ),
    },
    labels: adminLabels(
      "Red social",
      "Redes sociales",
      "Social link",
      "Social links",
    ),
    fields: [
      {
        name: "name",
        type: "text",
        label: adminLabel("Nombre", "Name"),
        localized: true,
        required: true,
      },
      {
        name: "type",
        type: "select",
        label: adminLabel("Tipo", "Type"),
        required: true,
        defaultValue: "other",
        options: [
          { label: "Facebook", value: "facebook" },
          { label: "Instagram", value: "instagram" },
          { label: "TikTok", value: "tiktok" },
          { label: "LinkedIn", value: "linkedin" },
          { label: "YouTube", value: "youtube" },
          { label: "X / Twitter", value: "twitter" },
          { label: "WhatsApp", value: "whatsapp" },
          { label: adminLabel("Sitio web", "Website"), value: "website" },
          { label: adminLabel("Otro", "Other"), value: "other" },
        ],
      },
      {
        name: "url",
        type: "text",
        label: "URL",
        required: true,
      },
      {
        name: "iconName",
        type: "text",
        label: adminLabel("Ícono o nombre de ícono", "Icon or icon name"),
      },
      {
        name: "showInFooter",
        type: "checkbox",
        label: adminLabel("Mostrar en pie de página", "Show in footer"),
        defaultValue: true,
      },
      {
        name: "showInHeader",
        type: "checkbox",
        label: adminLabel("Mostrar en encabezado", "Show in header"),
        defaultValue: false,
      },
      {
        name: "openInNewTab",
        type: "checkbox",
        label: adminLabel("Abrir en nueva pestaña", "Open in new tab"),
        defaultValue: true,
      },
      {
        name: "isActive",
        type: "checkbox",
        label: adminLabel("Activo", "Active"),
        defaultValue: true,
      },
      {
        name: "order",
        type: "number",
        label: adminLabel("Orden", "Order"),
        defaultValue: 0,
      },
    ],
  },
  {
    name: "footerUseCompanySettings",
    type: "checkbox",
    label: adminLabel(
      "Usar datos de contacto generales",
      "Use general contact details",
    ),
    defaultValue: true,
    admin: {
      hidden: true,
    },
  },
  {
    name: "footerEmail",
    type: "email",
    label: adminLabel("Correo", "Email"),
    admin: {
      hidden: true,
    },
  },
  {
    name: "footerPhone",
    type: "text",
    label: adminLabel("Teléfono", "Phone"),
    admin: {
      hidden: true,
    },
  },
  {
    name: "footerWhatsapp",
    type: "text",
    label: "WhatsApp",
    admin: {
      hidden: true,
    },
  },
  {
    name: "footerAddress",
    type: "textarea",
    label: adminLabel("Dirección", "Address"),
    localized: true,
    admin: {
      hidden: true,
      rows: 3,
    },
  },
  {
    name: "footerBusinessHours",
    type: "textarea",
    label: adminLabel("Horarios", "Business hours"),
    localized: true,
    admin: {
      hidden: true,
      rows: 3,
    },
  },
  {
    name: "footerCountry",
    type: "text",
    label: adminLabel("País", "Country"),
    admin: {
      hidden: true,
    },
  },
  {
    name: "footerCity",
    type: "text",
    label: adminLabel("Ciudad", "City"),
    admin: {
      hidden: true,
    },
  },
  {
    name: "footerCopyrightText",
    type: "text",
    label: "Copyright",
    localized: true,
    admin: {
      hidden: true,
    },
  },
  {
    name: "footerPrivacyPage",
    type: "relationship",
    label: adminLabel(
      "Página de políticas de privacidad",
      "Privacy policy page",
    ),
    relationTo: "pages",
    filterOptions: {
      pageType: {
        equals: "legal",
      },
      status: {
        equals: "published",
      },
    },
    admin: {
      description: adminLabel(
        "Opcional. Si queda vacío, el footer usará páginas legales publicadas marcadas para footer.",
        "Optional. If empty, the footer uses published legal pages marked for footer.",
      ),
    },
  },
  {
    name: "footerTermsPage",
    type: "relationship",
    label: adminLabel(
      "Página de términos y condiciones",
      "Terms and conditions page",
    ),
    relationTo: "pages",
    filterOptions: {
      pageType: {
        equals: "legal",
      },
      status: {
        equals: "published",
      },
    },
    admin: {
      description: adminLabel(
        "Opcional. Si queda vacío, el footer usará páginas legales publicadas marcadas para footer.",
        "Optional. If empty, the footer uses published legal pages marked for footer.",
      ),
    },
  },
  {
    name: "footerLegalTextOverride",
    type: "textarea",
    label: adminLabel("Texto legal personalizado", "Custom legal text"),
    localized: true,
    admin: {
      hidden: true,
      rows: 4,
    },
  },
];

export const CompanySettings: GlobalConfig = {
  slug: "company-settings",
  label: adminLabel("Configuración del sitio", "Site Settings"),
  access: {
    read: () => true,
    update: ({ req }) => Boolean(req.user),
  },
  admin: {
    group: adminGroups.settings,
    description: adminLabel(
      "Centro único para empresa, marca, contacto, footer, redes sociales, SEO y textos legales.",
      "Single center for company, brand, contact, footer, social links, SEO and legal text.",
    ),
  },
  typescript: {
    interface: "CompanySettings",
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: adminLabel("Información General", "General Information"),
          fields: [
            {
              name: "defaultLanguage",
              type: "select",
              label: adminLabel(
                "Idioma predeterminado del sitio",
                "Default site language",
              ),
              required: true,
              defaultValue: "es",
              options: [
                { label: adminLabel("Español", "Spanish"), value: "es" },
                { label: adminLabel("Inglés", "English"), value: "en" },
              ],
              admin: {
                description: adminLabel(
                  "Si una persona no ha elegido idioma, el sitio público cargará este idioma.",
                  "If a visitor has not chosen a language, the public site loads this language.",
                ),
              },
            },
            {
              name: "commercialName",
              type: "text",
              label: adminLabel("Nombre comercial", "Commercial name"),
              required: true,
              defaultValue: "New Site",
            },
            {
              name: "legalName",
              type: "text",
              label: adminLabel("Razón social", "Legal name"),
            },
            {
              name: "slogan",
              type: "text",
              label: adminLabel("Eslogan", "Slogan"),
              localized: true,
            },
            {
              name: "shortDescription",
              type: "textarea",
              label: adminLabel("Descripción corta", "Short description"),
              localized: true,
              admin: {
                rows: 3,
              },
            },
            {
              name: "longDescription",
              type: "textarea",
              label: adminLabel("Descripción larga", "Long description"),
              localized: true,
              admin: {
                rows: 7,
              },
            },
            {
              name: "mainEmail",
              type: "email",
              label: adminLabel("Correo principal", "Main email"),
            },
            {
              name: "mainPhone",
              type: "text",
              label: adminLabel("Teléfono principal", "Main phone"),
            },
            {
              name: "whatsapp",
              type: "text",
              label: "WhatsApp",
            },
            {
              name: "address",
              type: "textarea",
              label: adminLabel("Dirección", "Address"),
              localized: true,
              admin: {
                rows: 3,
              },
            },
            {
              name: "countryCity",
              type: "text",
              label: adminLabel("País / ciudad", "Country / city"),
              localized: true,
            },
            {
              name: "businessHours",
              type: "textarea",
              label: adminLabel("Horarios de atención", "Business hours"),
              localized: true,
              admin: {
                rows: 3,
              },
            },
          ],
        },
        {
          label: adminLabel("Marca", "Brand"),
          fields: [
            imageUploadField(
              "logoPrimary",
              adminLabel("Logo principal", "Primary logo"),
            ),
            imageUploadField(
              "logoSecondary",
              adminLabel(
                "Logo secundario o alternativo",
                "Secondary or alternative logo",
              ),
            ),
            imageUploadField(
              "favicon",
              adminLabel("Ícono del sitio", "Site icon"),
            ),
            imageUploadField(
              "ogImage",
              adminLabel(
                "Imagen para compartir en redes",
                "Social sharing image",
              ),
            ),
            colorField(
              "colorPrimary",
              adminLabel("Color primario", "Primary color"),
              "#8DE1E8",
            ),
            colorField(
              "colorSecondary",
              adminLabel("Color secundario", "Secondary color"),
              "#1A6B80",
            ),
            colorField(
              "colorAccent",
              adminLabel("Color de acento", "Accent color"),
              "#45ACBF",
            ),
            colorField(
              "colorBackground",
              adminLabel("Color de fondo", "Background color"),
              "#02080C",
            ),
            colorField(
              "colorTextPrimary",
              adminLabel("Color de texto principal", "Primary text color"),
              "#F8FAFC",
            ),
            colorField(
              "colorTextSecondary",
              adminLabel("Color de texto secundario", "Secondary text color"),
              "#C7D1D6",
            ),
          ],
        },
        {
          label: adminLabel("Redes Sociales", "Social Links"),
          fields: [
            {
              name: "facebookUrl",
              type: "text",
              label: "Facebook",
            },
            {
              name: "instagramUrl",
              type: "text",
              label: "Instagram",
            },
            {
              name: "tiktokUrl",
              type: "text",
              label: "TikTok",
            },
            {
              name: "linkedinUrl",
              type: "text",
              label: "LinkedIn",
            },
            {
              name: "youtubeUrl",
              type: "text",
              label: "YouTube",
            },
            {
              name: "twitterUrl",
              type: "text",
              label: "X / Twitter",
            },
            {
              name: "whatsappUrl",
              type: "text",
              label: adminLabel("Enlace de WhatsApp", "WhatsApp link"),
            },
          ],
        },
        {
          label: adminLabel("Contacto", "Contact"),
          fields: [
            {
              name: "contactEyebrow",
              type: "text",
              label: adminLabel("Texto pequeño", "Small text"),
              localized: true,
              defaultValue: "Pongámonos en contacto",
            },
            {
              name: "contactHeadline",
              type: "textarea",
              label: adminLabel("Título del contacto", "Contact headline"),
              localized: true,
              defaultValue: "Cuéntanos qué necesitas",
              admin: {
                rows: 3,
              },
            },
            {
              name: "contactIntro",
              type: "textarea",
              label: adminLabel("Texto de apoyo", "Supporting text"),
              localized: true,
              admin: {
                rows: 3,
              },
            },
            {
              name: "contactRecipients",
              type: "array",
              label: adminLabel(
                "Correos que reciben formularios",
                "Form recipient emails",
              ),
              labels: adminLabels(
                "Correo destinatario",
                "Correos destinatarios",
                "Recipient email",
                "Recipient emails",
              ),
              admin: {
                description: adminLabel(
                  "Puedes agregar varios correos. Cada mensaje del formulario se guardará en el admin y se enviará a estos correos.",
                  "You can add multiple emails. Each form message is saved in the admin and sent to these addresses.",
                ),
              },
              fields: [
                {
                  name: "email",
                  type: "email",
                  label: adminLabel("Correo", "Email"),
                  required: true,
                },
              ],
            },
          ],
        },
        {
          label: adminLabel("Pie de página", "Footer"),
          fields: footerFields,
        },
        {
          label: "SEO",
          fields: [
            {
              name: "defaultMetaTitle",
              type: "text",
              label: adminLabel("Título SEO por defecto", "Default SEO title"),
              required: true,
              localized: true,
              defaultValue: "New Site",
            },
            {
              name: "defaultMetaDescription",
              type: "textarea",
              label: adminLabel(
                "Descripción SEO por defecto",
                "Default SEO description",
              ),
              required: true,
              localized: true,
              admin: {
                rows: 3,
              },
              defaultValue:
                "Sitio web listo para configurar desde el panel de administración.",
            },
            {
              name: "globalKeywords",
              type: "textarea",
              label: adminLabel("Palabras clave globales", "Global keywords"),
              localized: true,
              admin: {
                rows: 3,
                description: adminLabel(
                  "Separar palabras clave con comas.",
                  "Separate keywords with commas.",
                ),
              },
            },
            {
              name: "canonicalBaseUrl",
              type: "text",
              label: adminLabel("URL canónica base", "Base canonical URL"),
              defaultValue: "http://localhost:3000",
            },
          ],
        },
        {
          label: "Legal",
          fields: [
            {
              name: "copyrightText",
              type: "text",
              label: adminLabel("Texto de copyright", "Copyright text"),
              localized: true,
              defaultValue: "© New Site. Todos los derechos reservados.",
            },
            {
              name: "privacyPolicy",
              type: "textarea",
              label: adminLabel("Políticas de privacidad", "Privacy policy"),
              localized: true,
              admin: {
                rows: 8,
              },
            },
            {
              name: "termsAndConditions",
              type: "textarea",
              label: adminLabel(
                "Términos y condiciones",
                "Terms and conditions",
              ),
              localized: true,
              admin: {
                rows: 8,
              },
            },
            {
              name: "footerLegalText",
              type: "textarea",
              label: adminLabel(
                "Texto legal del pie de página",
                "Footer legal text",
              ),
              localized: true,
              admin: {
                rows: 4,
              },
            },
          ],
        },
      ],
    },
  ],
};
