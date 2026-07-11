import type { CollectionConfig } from "payload";

import { pageBuilderBlocks } from "../blocks/PageBuilderBlocks";
import { adminGroups } from "../lib/admin-groups";
import { adminLabel, adminLabels } from "../lib/admin-i18n";

type PageSlugData = {
  navigationLabel?: string | null;
  pageTemplate?: string | null;
  pageType?: string | null;
  showInFooter?: boolean | null;
  showInMainNavigation?: boolean | null;
  slug?: string | null;
  title?: string | null;
};

const formatSlug = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/^\/+|\/+$/g, "")
    .replace(/[^a-z0-9/]+/g, "-")
    .replace(/\/+/g, "/")
    .replace(/-+/g, "-")
    .replace(/(^-|-$)/g, "");

const safeClassNamePattern = /^[A-Za-z0-9_:\-./\s[\]]*$/;

const pageTypeTemplateDefaults: Record<string, string> = {
  contact: "contact",
  landing: "landing",
  legal: "legal",
  portfolio: "portfolio",
  service: "serviceDetail",
};

const pageTypeVisibilityDefaults: Record<
  string,
  Partial<Pick<PageSlugData, "showInFooter" | "showInMainNavigation">>
> = {
  blog: {
    showInFooter: true,
  },
  contact: {
    showInFooter: true,
    showInMainNavigation: true,
  },
  internal: {
    showInFooter: true,
  },
  landing: {
    showInMainNavigation: true,
  },
  legal: {
    showInFooter: true,
    showInMainNavigation: false,
  },
  portfolio: {
    showInFooter: true,
  },
  service: {
    showInFooter: true,
  },
};

const isEmptyText = (value: unknown) =>
  typeof value !== "string" || value.trim().length === 0;

const isUnset = (value: unknown) => value === undefined || value === null;

const validateSafeClassName = (value: unknown) => {
  if (!value || typeof value !== "string") {
    return true;
  }

  return (
    safeClassNamePattern.test(value) ||
    "Usa solo clases CSS simples, separadas por espacios."
  );
};

const getWebPublicUrl = () =>
  (process.env.WEB_PUBLIC_URL ?? "http://localhost:3000").replace(/\/$/, "");

const getPublicPagePath = (slug: unknown) => {
  if (typeof slug !== "string" || slug.trim().length === 0) {
    return "/";
  }

  const normalizedSlug = formatSlug(slug);

  return normalizedSlug === "home" || normalizedSlug === "inicio"
    ? "/"
    : `/${normalizedSlug}`;
};

const getPublicPageUrl = (data: Record<string, unknown>) => {
  const previewUrl = new URL(getPublicPagePath(data.slug), getWebPublicUrl());

  previewUrl.searchParams.set("cmsPreview", "page");

  return previewUrl.toString();
};

export const Pages: CollectionConfig = {
  slug: "pages",
  access: {
    read: ({ req }) =>
      req.user
        ? true
        : {
            status: {
              equals: "published",
            },
          },
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  admin: {
    defaultColumns: [
      "title",
      "slug",
      "pageType",
      "status",
      "showInMainNavigation",
      "navigationOrder",
      "updatedAt",
    ],
    description: adminLabel(
      "Crea, ordena y publica las páginas visibles del sitio web.",
      "Create, organize and publish the public website pages.",
    ),
    group: adminGroups.website,
    livePreview: {
      breakpoints: [
        {
          height: 900,
          label: "Desktop",
          name: "desktop",
          width: 1440,
        },
        {
          height: 900,
          label: "Tablet",
          name: "tablet",
          width: 768,
        },
        {
          height: 844,
          label: "Mobile",
          name: "mobile",
          width: 390,
        },
      ],
      url: ({ data }) => getPublicPageUrl(data),
    },
    preview: (doc) => getPublicPageUrl(doc),
    useAsTitle: "title",
  },
  labels: adminLabels("Página", "Páginas", "Page", "Pages"),
  hooks: {
    beforeValidate: [
      ({ data, operation }) => {
        const pageData = data as PageSlugData | undefined;

        if (!pageData) {
          return data;
        }

        const pageType = pageData.pageType ?? "internal";
        const templateDefault = pageTypeTemplateDefaults[pageType];
        const visibilityDefaults = pageTypeVisibilityDefaults[pageType];

        if (
          templateDefault &&
          (isUnset(pageData.pageTemplate) ||
            pageData.pageTemplate === "default")
        ) {
          pageData.pageTemplate = templateDefault;
        }

        if (operation === "create" && visibilityDefaults) {
          if (
            !isUnset(visibilityDefaults.showInFooter) &&
            isUnset(pageData.showInFooter)
          ) {
            pageData.showInFooter = visibilityDefaults.showInFooter;
          }

          if (
            !isUnset(visibilityDefaults.showInMainNavigation) &&
            isUnset(pageData.showInMainNavigation)
          ) {
            pageData.showInMainNavigation =
              visibilityDefaults.showInMainNavigation;
          }
        }

        if (isEmptyText(pageData.navigationLabel) && pageData.title) {
          pageData.navigationLabel = pageData.title;
        }

        if (pageData.slug) {
          pageData.slug = formatSlug(pageData.slug);
          return pageData;
        }

        if (pageData.title) {
          pageData.slug = formatSlug(pageData.title);
        }

        return pageData;
      },
    ],
  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: "pagePreview",
      type: "ui",
      admin: {
        position: "sidebar",
        components: {
          Field: {
            path: "@/components/admin/PagePreviewPanel",
            exportName: "PagePreviewPanel",
          },
        },
      },
    },
    {
      type: "collapsible",
      label: adminLabel("Datos básicos", "Basic details"),
      admin: {
        initCollapsed: false,
      },
      fields: [
        {
          name: "pageStarter",
          type: "ui",
          admin: {
            components: {
              Field: {
                path: "@/components/admin/PageLandingPresetField",
                exportName: "PageLandingPresetField",
              },
            },
          },
        },
        {
          name: "title",
          type: "text",
          label: adminLabel("Nombre de la página", "Page name"),
          localized: true,
          required: true,
          admin: {
            description: adminLabel(
              "También se usa automáticamente como texto del menú y título SEO si no defines algo distinto.",
              "Also used automatically as menu text and SEO title unless you set something different.",
            ),
          },
        },
        {
          name: "slug",
          type: "text",
          label: adminLabel("URL automática", "Automatic URL"),
          unique: true,
          admin: {
            description: adminLabel(
              "Se genera desde el nombre. Cambia esto solo si necesitas una URL específica.",
              "Generated from the name. Change it only if you need a specific URL.",
            ),
            placeholder: "servicios/diseno-web",
          },
        },
        {
          name: "status",
          type: "select",
          label: adminLabel("Estado", "Status"),
          required: true,
          defaultValue: "draft",
          options: [
            { label: adminLabel("Borrador", "Draft"), value: "draft" },
            {
              label: adminLabel("Publicado", "Published"),
              value: "published",
            },
          ],
        },
        {
          name: "pageType",
          type: "select",
          label: adminLabel("Tipo de página", "Page type"),
          required: true,
          defaultValue: "internal",
          options: [
            { label: "Landing", value: "landing" },
            { label: adminLabel("Servicio", "Service"), value: "service" },
            { label: adminLabel("Legal", "Legal"), value: "legal" },
            { label: adminLabel("Contacto", "Contact"), value: "contact" },
            { label: adminLabel("Interna", "Internal"), value: "internal" },
            { label: "Blog", value: "blog" },
            {
              label: adminLabel("Portafolio", "Portfolio"),
              value: "portfolio",
            },
          ],
          admin: {
            description: adminLabel(
              "Define valores automáticos para menú, footer y plantilla sugerida.",
              "Defines automatic defaults for menu, footer and suggested template.",
            ),
          },
        },
        {
          name: "excerpt",
          type: "textarea",
          label: adminLabel("Resumen corto", "Short summary"),
          localized: true,
          admin: {
            description: adminLabel(
              "Opcional. Si SEO no se edita manualmente, este resumen funciona como descripción.",
              "Optional. If SEO is not manually edited, this summary works as the description.",
            ),
            rows: 3,
          },
        },
      ],
    },
    {
      name: "content",
      type: "blocks",
      label: adminLabel("Secciones de la página", "Page sections"),
      localized: true,
      blocks: pageBuilderBlocks,
      labels: adminLabels("Sección", "Secciones", "Section", "Sections"),
      admin: {
        description: adminLabel(
          "Añade bloques visuales genéricos para construir cualquier página. Puedes editar textos desde la vista previa o desde cada sección.",
          "Add generic visual blocks to build any page. You can edit text from the preview or inside each section.",
        ),
        initCollapsed: false,
      },
    },
    {
      type: "collapsible",
      label: adminLabel("Menú y pie de página", "Menu and footer"),
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: "showInMainNavigation",
          type: "checkbox",
          label: adminLabel("Mostrar en menú principal", "Show in main menu"),
          defaultValue: false,
          admin: {
            description: adminLabel(
              "Actívalo para que esta página aparezca en el encabezado.",
              "Enable it so this page appears in the header.",
            ),
          },
        },
        {
          name: "parentPage",
          type: "relationship",
          label: adminLabel("Subpágina de", "Subpage of"),
          relationTo: "pages",
          filterOptions: {
            showInMainNavigation: {
              equals: true,
            },
            status: {
              equals: "published",
            },
          },
          admin: {
            condition: (_, siblingData) =>
              Boolean(siblingData.showInMainNavigation),
            description: adminLabel(
              "Déjalo vacío para elemento principal. Selecciona una página para crear desplegable.",
              "Leave empty for a top-level item. Select a page to create a dropdown.",
            ),
          },
        },
        {
          name: "showInFooter",
          type: "checkbox",
          label: adminLabel(
            "Mostrar en footer automático",
            "Show in automatic footer",
          ),
          defaultValue: true,
        },
        {
          name: "navigationOrder",
          type: "number",
          label: adminLabel("Orden", "Order"),
          defaultValue: 0,
          admin: {
            description: adminLabel(
              "Número menor aparece primero. También ordena subpáginas.",
              "Lower numbers appear first. Also sorts subpages.",
            ),
          },
        },
        {
          name: "navigationLabel",
          type: "text",
          label: adminLabel("Texto visible en el menú", "Visible menu text"),
          localized: true,
          admin: {
            hidden: true,
          },
        },
      ],
    },
    {
      type: "collapsible",
      label: adminLabel("Avanzado", "Advanced"),
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: "featuredImage",
          type: "upload",
          label: adminLabel("Imagen principal", "Featured image"),
          relationTo: "media",
          filterOptions: {
            mimeType: {
              contains: "image/",
            },
          },
        },
        {
          name: "isFeatured",
          type: "checkbox",
          label: adminLabel("Página destacada", "Featured page"),
          defaultValue: false,
        },
        {
          name: "headerStyle",
          type: "select",
          label: adminLabel("Estilo del encabezado", "Header style"),
          required: true,
          defaultValue: "inherit",
          options: [
            {
              label: adminLabel("Usar estilo global", "Use global style"),
              value: "inherit",
            },
            { label: adminLabel("Normal", "Normal"), value: "solid" },
            {
              label: adminLabel("Transparente", "Transparent"),
              value: "transparent",
            },
          ],
          admin: {
            description: adminLabel(
              "Solo para páginas con diseños especiales.",
              "Only for pages with special layouts.",
            ),
          },
        },
        {
          name: "hideFooter",
          type: "checkbox",
          label: adminLabel("Ocultar pie de página", "Hide footer"),
          defaultValue: false,
        },
        {
          name: "customClassName",
          type: "text",
          label: adminLabel("Clase CSS segura", "Safe CSS class"),
          admin: {
            description: adminLabel(
              "Opcional para ajustes controlados por diseño. No acepta caracteres peligrosos.",
              "Optional for design-controlled adjustments. Dangerous characters are not accepted.",
            ),
          },
          validate: validateSafeClassName,
        },
        {
          name: "seo",
          type: "group",
          label: adminLabel("SEO automático", "Automatic SEO"),
          admin: {
            description: adminLabel(
              "Normalmente no necesitas tocar esto: usa nombre, resumen e imagen principal como fallback.",
              "Usually you do not need to touch this: it falls back to name, summary and featured image.",
            ),
          },
          fields: [
            {
              name: "metaTitle",
              type: "text",
              label: adminLabel("Título SEO personalizado", "Custom SEO title"),
              localized: true,
            },
            {
              name: "metaDescription",
              type: "textarea",
              label: adminLabel(
                "Descripción SEO personalizada",
                "Custom SEO description",
              ),
              localized: true,
              admin: {
                rows: 3,
              },
            },
            {
              name: "keywords",
              type: "textarea",
              label: adminLabel("Palabras clave", "Keywords"),
              localized: true,
              admin: {
                description: adminLabel(
                  "Opcional. Separar palabras clave con comas.",
                  "Optional. Separate keywords with commas.",
                ),
                rows: 3,
              },
            },
            {
              name: "canonicalUrl",
              type: "text",
              label: adminLabel(
                "URL canónica específica",
                "Specific canonical URL",
              ),
              admin: {
                description: adminLabel(
                  "Déjalo vacío para usar la URL pública de esta página.",
                  "Leave empty to use the public URL for this page.",
                ),
              },
            },
            {
              name: "noIndex",
              type: "checkbox",
              label: adminLabel(
                "No indexar esta página",
                "Do not index this page",
              ),
              defaultValue: false,
            },
            {
              name: "noFollow",
              type: "checkbox",
              label: adminLabel(
                "No seguir enlaces de esta página",
                "Do not follow links on this page",
              ),
              defaultValue: false,
            },
            {
              name: "ogImage",
              type: "upload",
              label: adminLabel("Imagen OG", "OG image"),
              relationTo: "media",
              filterOptions: {
                mimeType: {
                  contains: "image/",
                },
              },
            },
          ],
        },
        {
          name: "pageTemplate",
          type: "select",
          label: adminLabel("Plantilla sugerida", "Suggested template"),
          required: true,
          defaultValue: "default",
          options: [
            {
              label: adminLabel("Predeterminada", "Default"),
              value: "default",
            },
            { label: "Landing", value: "landing" },
            {
              label: adminLabel("Detalle de servicio", "Service detail"),
              value: "serviceDetail",
            },
            {
              label: adminLabel("Página legal", "Legal page"),
              value: "legal",
            },
            { label: adminLabel("Contacto", "Contact"), value: "contact" },
            {
              label: adminLabel("Portafolio", "Portfolio"),
              value: "portfolio",
            },
          ],
          admin: {
            hidden: true,
          },
        },
        {
          name: "enableBreadcrumbs",
          type: "checkbox",
          label: adminLabel("Mostrar breadcrumbs", "Show breadcrumbs"),
          defaultValue: true,
          admin: {
            hidden: true,
          },
        },
      ],
    },
    {
      name: "heroTitle",
      type: "text",
      label: adminLabel("Título anterior de la portada", "Previous hero title"),
      admin: {
        hidden: true,
      },
    },
    {
      name: "heroSubtitle",
      type: "textarea",
      label: adminLabel(
        "Subtítulo anterior de la portada",
        "Previous hero subtitle",
      ),
      admin: {
        hidden: true,
      },
    },
    {
      name: "videoBackground",
      type: "upload",
      label: adminLabel("Video de fondo anterior", "Previous background video"),
      relationTo: "media",
      admin: {
        hidden: true,
      },
    },
    {
      name: "navbarLinks",
      type: "array",
      label: adminLabel("Enlaces anteriores del menú", "Previous menu links"),
      admin: {
        hidden: true,
      },
      fields: [
        {
          name: "label",
          type: "text",
        },
        {
          name: "href",
          type: "text",
        },
        {
          name: "openInNewTab",
          type: "checkbox",
          defaultValue: false,
        },
      ],
    },
  ],
};
