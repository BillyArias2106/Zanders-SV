import { getPayload } from "payload";

import config from "../../payload.config";

type DemoPage = {
  content: Record<string, unknown>[];
  excerpt: string;
  navigationOrder: number;
  parentSlug?: string;
  pageType:
    | "blog"
    | "contact"
    | "internal"
    | "landing"
    | "legal"
    | "portfolio"
    | "service";
  showInMainNavigation: boolean;
  showInFooter: boolean;
  slug: string;
  title: string;
};

type PageTemplate =
  | "contact"
  | "default"
  | "landing"
  | "legal"
  | "portfolio"
  | "serviceDetail";

const getPageTemplate = (pageType: DemoPage["pageType"]): PageTemplate => {
  if (pageType === "service") {
    return "serviceDetail";
  }

  if (pageType === "portfolio") {
    return "portfolio";
  }

  if (
    pageType === "contact" ||
    pageType === "landing" ||
    pageType === "legal"
  ) {
    return pageType;
  }

  return "default";
};

const heroBlock = ({
  description,
  primaryButtonLabel,
  primaryButtonUrl,
  secondaryButtonLabel,
  secondaryButtonUrl,
  subtitle,
  title,
}: {
  description: string;
  primaryButtonLabel?: string;
  primaryButtonUrl?: string;
  secondaryButtonLabel?: string;
  secondaryButtonUrl?: string;
  subtitle: string;
  title: string;
}) => ({
  blockType: "hero",
  description,
  primaryButtonLabel,
  primaryButtonUrl,
  secondaryButtonLabel,
  secondaryButtonUrl,
  subtitle,
  title,
});

const cardsBlock = ({
  cards,
  sectionDescription,
  sectionTitle,
}: {
  cards: { description: string; title: string; url?: string }[];
  sectionDescription: string;
  sectionTitle: string;
}) => ({
  blockType: "cards",
  cards,
  sectionDescription,
  sectionTitle,
});

const faqBlock = ({
  items,
  title,
}: {
  items: { answer: string; question: string }[];
  title: string;
}) => ({
  blockType: "faq",
  items,
  title,
});

const demoPages: DemoPage[] = [
  {
    content: [
      heroBlock({
        description:
          "Un sitio base administrable para validar navegación, páginas, footer automático, SEO y bloques visuales desde Payload CMS.",
        primaryButtonLabel: "Ver servicios",
        primaryButtonUrl: "/servicios",
        secondaryButtonLabel: "Contactar",
        secondaryButtonUrl: "/contacto",
        subtitle: "Diseño web, CMS y presencia digital en un solo lugar",
        title: "Tu sitio web administrable empieza aquí",
      }),
      cardsBlock({
        cards: [
          {
            description:
              "Explora los servicios ficticios para validar tarjetas, textos comerciales y navegación principal.",
            title: "Servicios",
            url: "/servicios",
          },
          {
            description:
              "Revisa casos de ejemplo para probar cómo se ven proyectos y contenido de portafolio.",
            title: "Proyectos",
            url: "/proyectos",
          },
          {
            description:
              "Usa esta página para comprobar llamados a la acción, preguntas frecuentes y flujo de contacto.",
            title: "Contacto",
            url: "/contacto",
          },
        ],
        sectionDescription:
          "Estas páginas vienen desde el CMS y se pueden activar, ordenar o editar sin tocar código.",
        sectionTitle: "Páginas iniciales para revisar",
      }),
      {
        blockType: "cta",
        buttonLabel: "Abrir contacto",
        buttonUrl: "/contacto",
        description:
          "A partir de aquí puedes ajustar textos, bloques, orden, SEO y visibilidad para decidir qué te gusta y qué no.",
        title: "Listo para empezar a probar el CMS",
        variant: "solid",
      },
    ],
    excerpt:
      "Página inicial administrable para revisar las páginas de demo creadas desde Payload CMS.",
    navigationOrder: 0,
    pageType: "landing",
    showInFooter: false,
    showInMainNavigation: false,
    slug: "home",
    title: "Inicio",
  },
  {
    content: [
      heroBlock({
        description:
          "Creamos sitios web administrables, identidades visuales y experiencias digitales pensadas para convertir visitantes en clientes.",
        primaryButtonLabel: "Solicitar cotización",
        primaryButtonUrl: "/contacto",
        secondaryButtonLabel: "Ver portafolio",
        secondaryButtonUrl: "/proyectos",
        subtitle: "Diseño, desarrollo y estrategia en un solo proceso",
        title:
          "Servicios digitales para marcas que quieren verse profesionales",
      }),
      cardsBlock({
        cards: [
          {
            description:
              "Creamos páginas rápidas, modernas y conectadas a un CMS para que puedas actualizar contenido sin tocar código.",
            title: "Sitios web administrables",
            url: "/servicios",
          },
          {
            description:
              "Diseñamos páginas enfocadas en campañas, captación de leads, lanzamientos y ventas.",
            title: "Landing pages de conversión",
            url: "/servicios",
          },
          {
            description:
              "Organizamos colores, tipografías, mensajes y recursos visuales para que tu marca se vea consistente.",
            title: "Branding digital",
            url: "/servicios",
          },
          {
            description:
              "Configuramos títulos, descripciones, estructura y contenido base para mejorar visibilidad desde el inicio.",
            title: "Optimización SEO básica",
            url: "/servicios",
          },
        ],
        sectionDescription:
          "Servicios pensados para negocios que quieren orden, presencia y crecimiento digital.",
        sectionTitle: "Qué podemos construir contigo",
      }),
    ],
    excerpt:
      "Diseño web, branding y automatización para empresas que necesitan una presencia digital clara, moderna y fácil de administrar.",
    navigationOrder: 1,
    pageType: "service",
    showInFooter: true,
    showInMainNavigation: true,
    slug: "servicios",
    title: "Servicios",
  },
  {
    content: [
      heroBlock({
        description:
          "Estos ejemplos muestran cómo puede verse una web profesional cuando el contenido, la estructura y el diseño trabajan juntos.",
        primaryButtonLabel: "Hablemos de tu proyecto",
        primaryButtonUrl: "/contacto",
        subtitle: "Sitios claros, visuales y administrables",
        title: "Proyectos diseñados para comunicar mejor",
      }),
      cardsBlock({
        cards: [
          {
            description:
              "Sitio web informativo con servicios médicos, formularios de contacto y SEO local.",
            title: "Clínica Nova Salud",
            url: "/proyectos",
          },
          {
            description:
              "Página de marca para cafetería con menú, ubicación, historia y enlaces sociales.",
            title: "Café Monte Claro",
            url: "/proyectos",
          },
          {
            description:
              "Web corporativa para firma legal con páginas de servicios, contacto y contenido institucional.",
            title: "LegalPro Consultores",
            url: "/proyectos",
          },
        ],
        sectionDescription:
          "Una muestra ficticia para validar composición, textos, tarjetas y navegación.",
        sectionTitle: "Casos destacados",
      }),
    ],
    excerpt:
      "Una selección ficticia de proyectos digitales creados para empresas de servicios, comercio y marcas personales.",
    navigationOrder: 2,
    pageType: "portfolio",
    showInFooter: true,
    showInMainNavigation: true,
    slug: "proyectos",
    title: "Proyectos",
  },
  {
    content: [
      heroBlock({
        description:
          "Cuéntanos qué necesitas, en qué etapa está tu negocio y qué resultado quieres lograr con tu sitio web.",
        primaryButtonLabel: "Enviar mensaje",
        primaryButtonUrl: "#contacto",
        subtitle: "Estamos listos para ayudarte a ordenar tu presencia digital",
        title: "Hablemos de lo que quieres construir",
      }),
      faqBlock({
        items: [
          {
            answer:
              "Sí. El sitio se entrega conectado a un CMS para que puedas editar páginas, textos, imágenes, redes sociales y datos de empresa.",
            question: "¿Puedo administrar mi sitio después de publicado?",
          },
          {
            answer:
              "Sí. Puedes iniciar con Inicio, Servicios y Contacto, y luego agregar proyectos, blog o páginas legales.",
            question: "¿Puedo empezar con pocas páginas?",
          },
          {
            answer:
              "Sí. La estructura permite agregar nuevas páginas, bloques y secciones sin rehacer todo desde cero.",
            question: "¿El sitio puede crecer después?",
          },
        ],
        title: "Preguntas frecuentes",
      }),
    ],
    excerpt:
      "Escríbenos para cotizar tu sitio web, mejorar tu presencia digital o planificar el lanzamiento de tu marca.",
    navigationOrder: 3,
    pageType: "contact",
    showInFooter: true,
    showInMainNavigation: true,
    slug: "contacto",
    title: "Contacto",
  },
  {
    content: [
      heroBlock({
        description:
          "Agrupamos servicios por objetivo para que el cliente entienda rápido qué puede contratar y cómo puede crecer el sitio después.",
        primaryButtonLabel: "Hablar de una solución",
        primaryButtonUrl: "/contacto",
        subtitle: "Arquitectura digital para distintas necesidades",
        title: "Soluciones para cada etapa de tu presencia digital",
      }),
      cardsBlock({
        cards: [
          {
            description:
              "Sitios corporativos, landing pages y páginas administrables conectadas al CMS.",
            title: "Diseño web",
            url: "/soluciones/diseno-web",
          },
          {
            description:
              "Estructuras para vender productos, captar pedidos y preparar catálogos digitales.",
            title: "Comercio digital",
            url: "/soluciones/comercio-digital",
          },
        ],
        sectionDescription:
          "Esta página padre prueba menús con subpáginas y organización de servicios.",
        sectionTitle: "Soluciones disponibles",
      }),
    ],
    excerpt:
      "Página padre para agrupar soluciones digitales con subpáginas visibles en el menú.",
    navigationOrder: 4,
    pageType: "service",
    showInFooter: true,
    showInMainNavigation: true,
    slug: "soluciones",
    title: "Soluciones",
  },
  {
    content: [
      heroBlock({
        description:
          "Diseñamos sitios claros, rápidos y administrables para empresas que necesitan presencia profesional sin procesos técnicos complejos.",
        primaryButtonLabel: "Cotizar sitio web",
        primaryButtonUrl: "/contacto",
        subtitle: "Subpágina de Soluciones",
        title: "Diseño web administrable",
      }),
      cardsBlock({
        cards: [
          {
            description:
              "Estructura de páginas, navegación, contenido base y bloques editables desde Payload.",
            title: "Estructura CMS",
          },
          {
            description:
              "Componentes visuales reutilizables para portadas, tarjetas, FAQ, CTA y contenido.",
            title: "Bloques reutilizables",
          },
        ],
        sectionDescription:
          "Subpágina para probar jerarquía de menú y contenido de detalle.",
        sectionTitle: "Qué incluye",
      }),
    ],
    excerpt: "Subpágina de soluciones enfocada en sitios web administrables.",
    navigationOrder: 1,
    pageType: "service",
    parentSlug: "soluciones",
    showInFooter: true,
    showInMainNavigation: true,
    slug: "soluciones/diseno-web",
    title: "Diseño web",
  },
  {
    content: [
      heroBlock({
        description:
          "Preparamos bases para catálogos, pedidos y experiencias de compra que pueden evolucionar según el negocio.",
        primaryButtonLabel: "Planificar comercio",
        primaryButtonUrl: "/contacto",
        subtitle: "Subpágina de Soluciones",
        title: "Comercio digital y catálogos",
      }),
      cardsBlock({
        cards: [
          {
            description:
              "Secciones para productos, beneficios, procesos de compra y preguntas frecuentes.",
            title: "Catálogo inicial",
          },
          {
            description:
              "Contenido organizado para futuras integraciones de pago, CRM o automatización.",
            title: "Base escalable",
          },
        ],
        sectionDescription:
          "Contenido ficticio para validar subpáginas de servicio.",
        sectionTitle: "Enfoque del módulo",
      }),
    ],
    excerpt:
      "Subpágina de soluciones enfocada en comercio digital y catálogos.",
    navigationOrder: 2,
    pageType: "service",
    parentSlug: "soluciones",
    showInFooter: true,
    showInMainNavigation: true,
    slug: "soluciones/comercio-digital",
    title: "Comercio digital",
  },
  {
    content: [
      heroBlock({
        description:
          "Centraliza contenidos de apoyo para explicar procesos, educar clientes y mantener el sitio vivo.",
        primaryButtonLabel: "Ver guías",
        primaryButtonUrl: "/recursos/guias",
        subtitle: "Contenido útil para clientes",
        title: "Recursos para entender y mejorar tu sitio",
      }),
      cardsBlock({
        cards: [
          {
            description:
              "Ideas, novedades y artículos cortos para alimentar el sitio con contenido fresco.",
            title: "Blog",
            url: "/recursos/blog",
          },
          {
            description:
              "Materiales prácticos para orientar decisiones antes de iniciar un proyecto digital.",
            title: "Guías",
            url: "/recursos/guias",
          },
        ],
        sectionDescription:
          "Segunda página padre para validar menús con más de un dropdown.",
        sectionTitle: "Tipos de recursos",
      }),
    ],
    excerpt:
      "Página padre para organizar recursos, artículos y guías dentro del sitio.",
    navigationOrder: 5,
    pageType: "internal",
    showInFooter: true,
    showInMainNavigation: true,
    slug: "recursos",
    title: "Recursos",
  },
  {
    content: [
      heroBlock({
        description:
          "Espacio para publicar artículos, noticias y reflexiones sobre diseño web, CMS y presencia digital.",
        primaryButtonLabel: "Proponer tema",
        primaryButtonUrl: "/contacto",
        subtitle: "Subpágina de Recursos",
        title: "Blog de ideas digitales",
      }),
      cardsBlock({
        cards: [
          {
            description:
              "Cómo ordenar la información antes de construir una página web.",
            title: "Contenido antes del diseño",
          },
          {
            description:
              "Qué debería revisar una empresa antes de publicar su nuevo sitio.",
            title: "Checklist de lanzamiento",
          },
        ],
        sectionDescription:
          "Entradas ficticias para probar una sección tipo blog.",
        sectionTitle: "Artículos recientes",
      }),
    ],
    excerpt: "Subpágina de recursos para probar contenido tipo blog.",
    navigationOrder: 1,
    pageType: "blog",
    parentSlug: "recursos",
    showInFooter: true,
    showInMainNavigation: true,
    slug: "recursos/blog",
    title: "Blog",
  },
  {
    content: [
      heroBlock({
        description:
          "Guías prácticas para que el cliente entienda qué preparar, qué decidir y cómo revisar avances.",
        primaryButtonLabel: "Solicitar guía",
        primaryButtonUrl: "/contacto",
        subtitle: "Subpágina de Recursos",
        title: "Guías para planificar tu web",
      }),
      faqBlock({
        items: [
          {
            answer:
              "Define objetivos, páginas principales, datos de contacto, redes sociales y ejemplos visuales.",
            question: "¿Qué debo preparar antes de iniciar?",
          },
          {
            answer:
              "Puedes empezar con pocas páginas y ampliar secciones desde el CMS cuando el negocio lo necesite.",
            question: "¿Necesito todo el contenido desde el inicio?",
          },
        ],
        title: "Preguntas de planificación",
      }),
    ],
    excerpt: "Subpágina de recursos con guías prácticas para clientes.",
    navigationOrder: 2,
    pageType: "internal",
    parentSlug: "recursos",
    showInFooter: true,
    showInMainNavigation: true,
    slug: "recursos/guias",
    title: "Guías",
  },
  {
    content: [
      heroBlock({
        description:
          "Somos un estudio ficticio creado para probar una experiencia CMS vendible, clara y fácil de administrar.",
        primaryButtonLabel: "Conversemos",
        primaryButtonUrl: "/contacto",
        subtitle: "Página normal visible en el menú",
        title: "Un equipo enfocado en sitios administrables",
      }),
      cardsBlock({
        cards: [
          {
            description:
              "Menos pasos duplicados, más claridad para editar contenido y revisar resultados.",
            title: "CMS simple",
          },
          {
            description:
              "Estructura lista para páginas, navegación, footer, contacto y contenido legal.",
            title: "Base vendible",
          },
          {
            description:
              "Bloques reutilizables para crecer sin rediseñar todo desde cero.",
            title: "Crecimiento ordenado",
          },
        ],
        sectionDescription:
          "Página normal para probar un elemento de menú sin subpáginas.",
        sectionTitle: "Cómo trabajamos",
      }),
    ],
    excerpt:
      "Página normal visible en el menú para presentar información de empresa.",
    navigationOrder: 6,
    pageType: "internal",
    showInFooter: true,
    showInMainNavigation: true,
    slug: "nosotros",
    title: "Nosotros",
  },
  {
    content: [
      heroBlock({
        description:
          "En esta página explicamos, de forma simple, cómo se manejan los datos enviados por formularios y canales de contacto.",
        subtitle: "Información legal para visitantes y clientes",
        title: "Política de privacidad",
      }),
      faqBlock({
        items: [
          {
            answer:
              "Usamos los datos enviados por formularios únicamente para responder consultas, preparar propuestas y dar seguimiento comercial.",
            question: "¿Para qué usamos tus datos?",
          },
          {
            answer:
              "No vendemos información personal. Solo compartimos datos cuando sea necesario para operar el servicio o cumplir obligaciones legales.",
            question: "¿Compartimos información con terceros?",
          },
          {
            answer:
              "Puedes escribirnos para solicitar actualización o eliminación de tus datos de contacto.",
            question: "¿Cómo puedes solicitar cambios?",
          },
        ],
        title: "Resumen de privacidad",
      }),
    ],
    excerpt:
      "Información básica sobre el manejo de datos personales enviados por formularios y canales de contacto.",
    navigationOrder: 90,
    pageType: "legal",
    showInFooter: true,
    showInMainNavigation: false,
    slug: "politica-de-privacidad",
    title: "Política de privacidad",
  },
  {
    content: [
      heroBlock({
        description:
          "Estos términos son un ejemplo editable para validar páginas legales, footer automático y SEO básico.",
        subtitle: "Condiciones generales de uso",
        title: "Términos y condiciones",
      }),
      faqBlock({
        items: [
          {
            answer:
              "El contenido del sitio se ofrece como información general y puede actualizarse sin previo aviso.",
            question: "Uso del sitio",
          },
          {
            answer:
              "Las propuestas, tiempos y precios se confirman por escrito según el alcance de cada proyecto.",
            question: "Servicios y cotizaciones",
          },
          {
            answer:
              "Los textos, imágenes y diseños de ejemplo pueden reemplazarse por contenido definitivo del cliente.",
            question: "Contenido editable",
          },
        ],
        title: "Condiciones principales",
      }),
    ],
    excerpt:
      "Condiciones generales ficticias para probar el manejo de páginas legales dentro del footer automático.",
    navigationOrder: 91,
    pageType: "legal",
    showInFooter: true,
    showInMainNavigation: false,
    slug: "terminos-y-condiciones",
    title: "Términos y condiciones",
  },
];

const seed = async () => {
  const payload = await getPayload({ config });

  for (const page of demoPages) {
    const { parentSlug, ...pageData } = page;
    const existing = await payload.find({
      collection: "pages",
      limit: 1,
      locale: "es",
      overrideAccess: true,
      where: {
        slug: {
          equals: page.slug,
        },
      },
    });
    const parent = parentSlug
      ? await payload.find({
          collection: "pages",
          limit: 1,
          locale: "es",
          overrideAccess: true,
          where: {
            slug: {
              equals: parentSlug,
            },
          },
        })
      : null;
    const parentPage = parent?.docs[0]?.id ?? null;

    const data = {
      ...pageData,
      _status: "published" as const,
      parentPage,
      navigationLabel: page.title,
      pageTemplate: getPageTemplate(page.pageType),
      seo: {
        canonicalUrl: null,
        keywords: null,
        metaDescription: null,
        metaTitle: null,
        noFollow: false,
        noIndex: false,
        ogImage: null,
      },
      status: "published" as const,
    } as any;

    if (existing.docs[0]) {
      await payload.update({
        collection: "pages",
        data,
        id: existing.docs[0].id,
        locale: "es",
        overrideAccess: true,
      });
      payload.logger.info(`Página actualizada: ${page.title}`);
      continue;
    }

    await payload.create({
      collection: "pages",
      data,
      locale: "es",
      overrideAccess: true,
    });
    payload.logger.info(`Página creada: ${page.title}`);
  }

  await payload.destroy();
};

await seed();
