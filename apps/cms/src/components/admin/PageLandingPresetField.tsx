"use client";

import { useMemo, useState } from "react";

import { useForm, useFormFields, useTranslation } from "@payloadcms/ui";
import { reduceFieldsToValues } from "payload/shared";

import "./page-landing-preset-field.css";

type PresetBlock = Record<string, unknown> & {
  blockType: string;
  id: string;
};

const createId = (prefix: string) => {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return `${prefix}-${crypto.randomUUID()}`;
  }

  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
};

const createAgencyLandingBlocks = (): PresetBlock[] => [
  {
    blockType: "hero",
    description:
      "Combinamos estrategia, diseño, desarrollo y medición para crear sitios que trabajan como una herramienta real de ventas.",
    eyebrow: "Agencia digital",
    id: createId("hero"),
    primaryButtonLabel: "Hablemos de tu proyecto",
    primaryButtonUrl: "/contacto",
    secondaryButtonLabel: "Ver servicios",
    secondaryButtonUrl: "/servicios",
    subtitle: "Diseño web, automatización y crecimiento digital",
    title: "Impulsamos los resultados de tu negocio integrando tecnología, marca y marketing",
  },
  {
    blockType: "logoStrip",
    displayStyle: "logos",
    id: createId("logos"),
    items: [
      { id: createId("brand"), name: "Nova Retail" },
      { id: createId("brand"), name: "Momentum Labs" },
      { id: createId("brand"), name: "Urban Clinic" },
      { id: createId("brand"), name: "Atlas Studio" },
      { id: createId("brand"), name: "Mercado Norte" },
    ],
    sectionDescription:
      "Una estructura flexible para mostrar marcas, clientes o aliados sin tener que disenar una seccion desde cero.",
    sectionTitle: "Confian en nuestro metodo",
  },
  {
    blockType: "stats",
    description:
      "Usa estas metricas para resumir impacto, experiencia o resultados comerciales.",
    eyebrow: "Resultados visibles",
    id: createId("stats"),
    items: [
      {
        description: "Sitios, landings y sistemas listos para operar.",
        id: createId("stat"),
        label: "proyectos digitales",
        value: "+120",
      },
      {
        description: "Contactos generados desde formularios, campanas y CRM.",
        id: createId("stat"),
        label: "leads gestionados",
        value: "+50K",
      },
      {
        description: "Estrategia, contenido y desarrollo trabajando juntos.",
        id: createId("stat"),
        label: "areas integradas",
        value: "4",
      },
    ],
    title: "Digitalizarse es mas facil cuando todo vive en una misma estrategia",
    variant: "editorial",
  },
  {
    blockType: "cards",
    cards: [
      {
        description:
          "Arquitectura, diseno visual, CMS, velocidad y experiencia pensada para convertir.",
        id: createId("card"),
        title: "Paginas web",
        url: "/servicios/diseno-web",
      },
      {
        description:
          "Estrategia, posicionamiento y piezas visuales para que tu marca se entienda rapido.",
        id: createId("card"),
        title: "Branding digital",
        url: "/servicios/branding",
      },
      {
        description:
          "Campanas, formularios, automatizaciones y seguimiento para no perder oportunidades.",
        id: createId("card"),
        title: "Marketing y leads",
        url: "/servicios/marketing",
      },
      {
        description:
          "Estructura tecnica, contenido y mejoras para crecer de manera sostenible.",
        id: createId("card"),
        title: "SEO y contenido",
        url: "/servicios/seo",
      },
      {
        description:
          "Herramientas internas, integraciones y flujos que ahorran tiempo operativo.",
        id: createId("card"),
        title: "Automatizacion",
        url: "/servicios/automatizacion",
      },
      {
        description:
          "Paneles, CMS y procesos claros para que el equipo pueda administrar el sitio.",
        id: createId("card"),
        title: "CMS a medida",
        url: "/servicios/cms",
      },
    ],
    id: createId("cards"),
    sectionDescription:
      "Cambia nombres, textos y enlaces segun los servicios reales de la empresa.",
    sectionTitle: "Servicios digitales para una presencia completa",
  },
  {
    alignment: "left",
    blockType: "snapLayoutBlock",
    className: "agency-method-section",
    gap: "md",
    id: createId("method"),
    isActive: true,
    items: [
      {
        backgroundColor: "#0A1824",
        borderRadius: "lg",
        contentType: "text",
        description:
          "Aterrizamos objetivos, audiencia, propuesta de valor y prioridades antes de disenar.",
        iconName: "sparkles",
        id: createId("step"),
        isActive: true,
        padding: "lg",
        shadow: "none",
        showBorder: true,
        subtitle: "Paso 01",
        title: "Estrategia",
      },
      {
        backgroundColor: "#0D2231",
        borderRadius: "lg",
        contentType: "text",
        description:
          "Creamos una estructura visual clara, moderna y facil de navegar.",
        iconName: "camera",
        id: createId("step"),
        isActive: true,
        padding: "lg",
        shadow: "none",
        showBorder: true,
        subtitle: "Paso 02",
        title: "Diseno",
      },
      {
        backgroundColor: "#102B3B",
        borderRadius: "lg",
        contentType: "text",
        description:
          "Construimos el sitio con CMS, rendimiento, SEO base y componentes reutilizables.",
        iconName: "wrench",
        id: createId("step"),
        isActive: true,
        padding: "lg",
        shadow: "none",
        showBorder: true,
        subtitle: "Paso 03",
        title: "Desarrollo",
      },
      {
        backgroundColor: "#143548",
        borderRadius: "lg",
        contentType: "text",
        description:
          "Conectamos formularios, medimos conversiones y ajustamos segun datos reales.",
        iconName: "plane",
        id: createId("step"),
        isActive: true,
        padding: "lg",
        shadow: "none",
        showBorder: true,
        subtitle: "Paso 04",
        title: "Crecimiento",
      },
    ],
    layout: "fourColumns",
    maxWidth: "wide",
    paddingBottom: "xl",
    paddingTop: "xl",
    sectionDescription:
      "Una seccion lista para explicar como trabajas, sin depender de textos largos o configuraciones avanzadas.",
    sectionSubtitle: "Metodo de trabajo",
    sectionTitle: "De la idea al sitio publicado con un proceso claro",
    textColor: "#F7FBFF",
  },
  {
    blockType: "testimonials",
    id: createId("testimonials"),
    items: [
      {
        id: createId("testimonial"),
        name: "Andrea Molina",
        quote:
          "La nueva pagina nos ayudo a explicar mejor nuestros servicios y empezar a recibir contactos mas calificados.",
        rating: 5,
        role: "Directora comercial",
      },
      {
        id: createId("testimonial"),
        name: "Carlos Benitez",
        quote:
          "Ahora podemos actualizar contenido sin depender de desarrollo para cada cambio pequeno.",
        rating: 5,
        role: "Fundador",
      },
      {
        id: createId("testimonial"),
        name: "Mariela Torres",
        quote:
          "El sitio se siente mas profesional, mas rapido y mucho mas claro para nuestros clientes.",
        rating: 5,
        role: "Marketing manager",
      },
    ],
    sectionDescription:
      "Puedes reemplazar estos comentarios por reseñas reales, casos de exito o frases internas.",
    sectionTitle: "Lo que deberia sentir un cliente al trabajar contigo",
  },
  {
    blockType: "cta",
    buttonLabel: "Agendar una llamada",
    buttonUrl: "/contacto",
    description:
      "Cuéntanos qué necesitas construir y armamos una ruta clara para publicarlo, medirlo y mejorarlo.",
    id: createId("cta"),
    title: "Convierte tu sitio en una herramienta comercial",
    variant: "solid",
  },
];

const getStringValue = (value: unknown) =>
  typeof value === "string" ? value.trim() : "";

export function PageLandingPresetField() {
  const { i18n } = useTranslation();
  const language = i18n.language === "en" ? "en" : "es";
  const [lastAppliedAt, setLastAppliedAt] = useState<number | null>(null);
  const { setModified } = useForm();
  const dispatchField = useFormFields(([, dispatch]) => dispatch);
  const formValues = useFormFields(([fields]) =>
    reduceFieldsToValues(fields, true),
  ) as Record<string, unknown>;
  const hasContent = useMemo(() => {
    if (Array.isArray(formValues.content)) {
      return formValues.content.length > 0;
    }

    return typeof formValues.content === "object" && formValues.content !== null;
  }, [formValues.content]);

  const updateField = (path: string, value: unknown) => {
    dispatchField({
      path,
      type: "UPDATE",
      value,
    });
  };

  const applyAgencyPreset = () => {
    if (
      hasContent &&
      !window.confirm(
        language === "en"
          ? "This will replace the current page sections. Continue?"
          : "Esto reemplazara las secciones actuales de la pagina. ¿Continuar?",
      )
    ) {
      return;
    }

    if (!getStringValue(formValues.title)) {
      updateField("title", "Agencia Digital");
    }

    if (!getStringValue(formValues.slug)) {
      updateField("slug", "agencia-digital");
    }

    if (!getStringValue(formValues.excerpt)) {
      updateField(
        "excerpt",
        "Landing editable para presentar servicios digitales, metricas, metodo de trabajo, testimonios y llamado a la accion.",
      );
    }

    updateField("pageType", "landing");
    updateField("pageTemplate", "landing");
    updateField("showInMainNavigation", true);
    updateField("showInFooter", true);
    updateField("hideFooter", false);
    updateField("content", createAgencyLandingBlocks());
    setModified(true);
    setLastAppliedAt(Date.now());
  };

  return (
    <section className="app-page-preset">
      <div>
        <p className="app-page-preset__eyebrow">
          {language === "en" ? "Fast start" : "Inicio rapido"}
        </p>
        <h2>
          {language === "en"
            ? "Build an agency landing page"
            : "Crear landing tipo agencia"}
        </h2>
        <p>
          {language === "en"
            ? "Adds a complete editable structure: hero, logos, stats, services, process, testimonials and CTA."
            : "Agrega una estructura completa y editable: portada, logos, metricas, servicios, proceso, testimonios y CTA."}
        </p>
      </div>
      <div className="app-page-preset__actions">
        <button onClick={applyAgencyPreset} type="button">
          {language === "en" ? "Use agency preset" : "Usar plantilla agencia"}
        </button>
        {lastAppliedAt ? (
          <span role="status">
            {language === "en" ? "Preset applied" : "Plantilla aplicada"}
          </span>
        ) : null}
      </div>
    </section>
  );
}
