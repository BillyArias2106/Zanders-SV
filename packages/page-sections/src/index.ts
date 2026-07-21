export type SectionCategory =
  | 'cases'
  | 'contact'
  | 'content'
  | 'conversion'
  | 'data'
  | 'education'
  | 'events'
  | 'hero'
  | 'media'
  | 'news'
  | 'process'
  | 'services'
  | 'sports'
  | 'trust'

export type SectionBuilderGroup =
  | 'entry'
  | 'offer'
  | 'proof'
  | 'conversion'
  | 'resources'

export type SectionStatus = 'beta' | 'stable'

export type SectionRenderer =
  | 'cards'
  | 'comparison'
  | 'contact'
  | 'cta'
  | 'custom'
  | 'documents'
  | 'faq'
  | 'hero'
  | 'logos'
  | 'media'
  | 'metrics'
  | 'pricing'
  | 'scoreboard'
  | 'steps'
  | 'terminal'
  | 'timeline'

export type SectionSchema =
  | 'cards'
  | 'comparison'
  | 'contact'
  | 'custom'
  | 'cta'
  | 'documents'
  | 'event'
  | 'faq'
  | 'hero'
  | 'logos'
  | 'media'
  | 'metrics'
  | 'pricing'
  | 'scoreboard'
  | 'steps'
  | 'terminal'
  | 'timeline'

export type PageTypeRecommendation =
  | 'contact'
  | 'education'
  | 'event'
  | 'free'
  | 'home'
  | 'institutional'
  | 'landing'
  | 'news'
  | 'product'
  | 'service'

export type PageSectionGuide = {
  description: string
  label: string
  pageType: PageTypeRecommendation
  recommendedSteps: Array<{
    blockType: string
    category?: string
    description: string
    label: string
  }>
}

export type SectionTemplate = {
  category: SectionCategory
  defaultData: Record<string, unknown>
  defaultSettings: Record<string, unknown>
  description: string
  icon: string
  key: string
  legacyBlockTypes?: string[]
  name: string
  previewData: Record<string, unknown>
  recommendedFor: PageTypeRecommendation[]
  renderer: SectionRenderer
  schema: SectionSchema
  sortOrder: number
  status: SectionStatus
  tags: string[]
  version: number
}

const canvasQuickAddStep = {
  blockType: 'canvasSlice',
  category: 'Lienzo Libre / Framer Mode',
  description: 'Activa posicionamiento libre con capas, texto, botones y coordenadas visuales.',
  label: '+ Anadir Lienzo Libre',
}

export const sectionCategories: Record<SectionCategory, string> = {
  cases: 'Casos y testimonios',
  contact: 'Contacto',
  content: 'Contenido',
  conversion: 'Conversion',
  data: 'Datos y metricas',
  education: 'Educacion',
  events: 'Eventos',
  hero: 'Portadas',
  media: 'Multimedia',
  news: 'Noticias y avisos',
  process: 'Procesos',
  services: 'Servicios y productos',
  sports: 'Deportes y resultados',
  trust: 'Confianza',
}

export const sectionBuilderGroups: Record<SectionBuilderGroup, string> = {
  entry: '1. Cabeceras',
  offer: '2. Oferta y contenido',
  proof: '3. Confianza',
  conversion: '4. Captacion y contacto',
  resources: '5. Actualidad y recursos',
}

export const sectionBuilderGroupByCategory: Record<SectionCategory, SectionBuilderGroup> = {
  cases: 'proof',
  contact: 'conversion',
  content: 'offer',
  conversion: 'conversion',
  data: 'proof',
  education: 'offer',
  events: 'offer',
  hero: 'entry',
  media: 'resources',
  news: 'resources',
  process: 'offer',
  services: 'offer',
  sports: 'offer',
  trust: 'proof',
}

export const getSectionBuilderGroup = (category: SectionCategory) =>
  sectionBuilderGroups[sectionBuilderGroupByCategory[category]]

const settings = (variant: string, overrides: Record<string, unknown> = {}) => ({
  alignment: 'left',
  background: 'default',
  containerWidth: 'normal',
  spacingBottom: 'normal',
  spacingTop: 'normal',
  theme: 'auto',
  variant,
  ...overrides,
})

const heroData = {
  buttons: [
    { backgroundColor: '#07164b', label: 'Hablemos', shape: 'rounded', textColor: '#ffffff', url: '#contacto' },
    { backgroundColor: 'transparent', label: 'Conocer mas', shape: 'rounded', style: 'secondary', textColor: '#07164b', url: '/' },
  ],
  description: 'Presenta una propuesta clara, creible y facil de entender para la audiencia correcta.',
  mediaKind: 'image',
  title: 'Una pagina profesional empieza con una portada clara',
}

const customCanvasData = {
  buttons: [
    { backgroundColor: '#07164b', label: 'Hablemos', shape: 'rounded', textColor: '#ffffff', url: '#contacto' },
    { backgroundColor: 'transparent', label: 'Ver servicios', shape: 'rounded', style: 'secondary', textColor: '#07164b', url: '#servicios' },
  ],
  canvas: {
    background: { overlay: 'soft', type: 'media' },
    breakpoints: {
      desktop: { height: 720, width: 1180 },
      mobile: { height: 720, width: 390 },
      tablet: { height: 760, width: 768 },
    },
    elements: [],
    grid: { enabled: false, size: 20, snap: true, tolerance: 8 },
    schemaVersion: 2,
  },
  description: 'Texto de apoyo editable. Puedes moverlo desde la vista previa y ajustar su tamano o color.',
  layoutControls: {
    buttonsScale: 100,
    buttonsX: 34,
    buttonsY: 72,
    descriptionColor: '#42517e',
    descriptionFont: 'montserrat',
    descriptionAlign: 'left',
    descriptionSize: 1.15,
    descriptionX: 34,
    descriptionY: 58,
    titleAlign: 'left',
    titleColor: '#07164b',
    titleFont: 'rajdhani',
    titleSize: 4.6,
    titleX: 34,
    titleY: 42,
  },
  mediaKind: 'image',
  title: 'Titulo personalizable',
}

const item = (title: string, description: string, extra: Record<string, unknown> = {}) => ({
  description,
  title,
  ...extra,
})

const items = [
  item('Estrategia clara', 'Ordena el mensaje para que la visita entienda el valor.'),
  item('Diseno adaptable', 'Funciona bien en escritorio, tablet y movil.'),
  item('Accion directa', 'Cierra con un siguiente paso concreto.'),
]

export const sectionTemplates: SectionTemplate[] = [
  {
    category: 'hero',
    defaultData: heroData,
    defaultSettings: settings('simple', { alignment: 'left', background: 'media', containerWidth: 'wide' }),
    description: 'Portada simple con titulo, descripcion, fondo visual y hasta dos botones.',
    icon: 'layout',
    key: 'hero_split',
    legacyBlockTypes: ['heroSection'],
    name: 'Portada simple',
    previewData: heroData,
    recommendedFor: ['home', 'landing', 'service', 'product'],
    renderer: 'hero',
    schema: 'hero',
    sortOrder: 10,
    status: 'stable',
    tags: ['Corporativo', 'Servicio', 'Producto'],
    version: 2,
  },
  {
    category: 'hero',
    defaultData: customCanvasData,
    defaultSettings: settings('custom', { alignment: 'center', background: 'media', containerWidth: 'full' }),
    description: 'Portada simple avanzada: fondo visual, texto y botones movibles desde la vista previa.',
    icon: 'custom',
    key: 'custom_canvas',
    name: 'Personalizada',
    previewData: customCanvasData,
    recommendedFor: ['free', 'home', 'landing', 'service', 'product'],
    renderer: 'custom',
    schema: 'custom',
    sortOrder: 15,
    status: 'stable',
    tags: ['Personalizada', 'Portada', 'Avanzado'],
    version: 1,
  },
  {
    category: 'hero',
    defaultData: { ...heroData, note: 'Ideal para productos, plataformas o lanzamientos.' },
    defaultSettings: settings('centeredProduct', { alignment: 'center' }),
    description: 'Portada centrada para destacar producto, curso o plataforma.',
    icon: 'product',
    key: 'hero_centered_product',
    name: 'Portada producto centrado',
    previewData: { ...heroData, title: 'El producto como protagonista' },
    recommendedFor: ['product', 'landing', 'education'],
    renderer: 'hero',
    schema: 'hero',
    sortOrder: 20,
    status: 'stable',
    tags: ['Producto', 'Tecnologia', 'Educativo'],
    version: 1,
  },
  {
    category: 'hero',
    defaultData: heroData,
    defaultSettings: settings('fullBleed', { alignment: 'center', overlay: 'medium' }),
    description: 'Portada de ancho completo con imagen o video de fondo.',
    icon: 'image',
    key: 'hero_full_bleed',
    name: 'Portada inmersiva',
    previewData: { ...heroData, title: 'Una primera impresion memorable' },
    recommendedFor: ['home', 'event', 'institutional'],
    renderer: 'hero',
    schema: 'hero',
    sortOrder: 30,
    status: 'stable',
    tags: ['Institucional', 'Multimedia'],
    version: 1,
  },
  {
    category: 'hero',
    defaultData: { slides: [heroData, { ...heroData, eyebrow: 'Novedad', title: 'Muestra varias prioridades sin perder orden' }] },
    defaultSettings: settings('carousel', { autoplay: true, intervalMs: 6500 }),
    description: 'Carrusel de mensajes institucionales o promocionales.',
    icon: 'carousel',
    key: 'hero_carousel',
    name: 'Portada carrusel',
    previewData: { slides: [heroData, { ...heroData, title: 'Otra campana destacada' }] },
    recommendedFor: ['home', 'institutional', 'news'],
    renderer: 'hero',
    schema: 'hero',
    sortOrder: 40,
    status: 'stable',
    tags: ['Institucional', 'Noticias'],
    version: 1,
  },
  {
    category: 'events',
    defaultData: { ...heroData, date: '2026-08-15', location: 'Auditorio principal', status: 'upcoming' },
    defaultSettings: settings('event', { showCountdown: false }),
    description: 'Portada para eventos, lanzamientos o campanas con fecha.',
    icon: 'calendar',
    key: 'hero_event',
    name: 'Portada de evento',
    previewData: { ...heroData, title: 'Evento principal de la temporada' },
    recommendedFor: ['event', 'education', 'landing'],
    renderer: 'hero',
    schema: 'event',
    sortOrder: 50,
    status: 'stable',
    tags: ['Eventos', 'Educativo'],
    version: 1,
  },
  {
    category: 'trust',
    defaultData: { description: 'Muestra organizaciones, aliados o clientes relevantes.', items: items.map((entry) => ({ name: entry.title })), title: 'Aliados que fortalecen nuestro trabajo' },
    defaultSettings: settings('marquee', { monochrome: true }),
    description: 'Clientes, proveedores, aliados o instituciones en cuadricula o carrusel.',
    icon: 'logos',
    key: 'logo_cloud',
    legacyBlockTypes: ['providerCarouselSection'],
    name: 'Logos y aliados',
    previewData: { items: [{ name: 'Aliado A' }, { name: 'Aliado B' }, { name: 'Aliado C' }], title: 'Confian en nosotros' },
    recommendedFor: ['home', 'service', 'institutional', 'product'],
    renderer: 'logos',
    schema: 'logos',
    sortOrder: 110,
    status: 'stable',
    tags: ['Corporativo', 'Institucional', 'Confianza'],
    version: 1,
  },
  {
    category: 'data',
    defaultData: { items: [{ label: 'proyectos', value: '+120' }, { label: 'clientes', value: '+40' }, { label: 'anos', value: '+8' }], title: 'Resultados que dan confianza' },
    defaultSettings: settings('strip'),
    description: 'Banda de cifras, resultados o indicadores destacados.',
    icon: 'metrics',
    key: 'metrics_strip',
    legacyBlockTypes: ['metricsSection'],
    name: 'Banda de metricas',
    previewData: { items: [{ label: 'resultados', value: '+00' }, { label: 'usuarios', value: '+00' }], title: 'Metricas importantes' },
    recommendedFor: ['home', 'service', 'institutional', 'education'],
    renderer: 'metrics',
    schema: 'metrics',
    sortOrder: 120,
    status: 'stable',
    tags: ['Datos', 'Confianza'],
    version: 1,
  },
  {
    category: 'trust',
    defaultData: { items: items.map((entry) => ({ ...entry, issuer: 'Entidad emisora' })), title: 'Certificaciones y garantias' },
    defaultSettings: settings('badges'),
    description: 'Sellos, certificaciones, reconocimientos o garantias.',
    icon: 'badge',
    key: 'trust_badges',
    legacyBlockTypes: ['trustSection'],
    name: 'Insignias de confianza',
    previewData: { items, title: 'Pruebas de confianza' },
    recommendedFor: ['institutional', 'service', 'product'],
    renderer: 'cards',
    schema: 'cards',
    sortOrder: 130,
    status: 'stable',
    tags: ['Confianza', 'Institucional'],
    version: 1,
  },
  {
    category: 'services',
    defaultData: { items, title: 'Servicios principales' },
    defaultSettings: settings('cards', { columnsDesktop: 3 }),
    description: 'Cuadricula para servicios, areas o soluciones.',
    icon: 'grid',
    key: 'services_grid',
    name: 'Cuadricula de servicios',
    previewData: { items, title: 'Lo que ofrecemos' },
    recommendedFor: ['home', 'service', 'institutional'],
    renderer: 'cards',
    schema: 'cards',
    sortOrder: 210,
    status: 'stable',
    tags: ['Servicios', 'Corporativo'],
    version: 1,
  },
  {
    category: 'services',
    defaultData: { items: items.map((entry, index) => ({ ...entry, size: index === 0 ? 'large' : 'small' })), title: 'Capacidades destacadas' },
    defaultSettings: settings('bento'),
    description: 'Cuadricula bento para destacar capacidades con ritmo visual.',
    icon: 'bento',
    key: 'bento_features',
    name: 'Bento de beneficios',
    previewData: { items, title: 'Funciones clave' },
    recommendedFor: ['product', 'service', 'landing'],
    renderer: 'cards',
    schema: 'cards',
    sortOrder: 220,
    status: 'stable',
    tags: ['Tecnologia', 'Producto'],
    version: 1,
  },
  {
    category: 'content',
    defaultData: { items, title: 'Una historia en bloques claros' },
    defaultSettings: settings('alternating'),
    description: 'Bloques alternados de texto y multimedia.',
    icon: 'alternate',
    key: 'feature_alternating',
    legacyBlockTypes: ['storySection'],
    name: 'Contenido alternado',
    previewData: { items, title: 'Explica con contexto' },
    recommendedFor: ['service', 'product', 'institutional'],
    renderer: 'cards',
    schema: 'cards',
    sortOrder: 230,
    status: 'stable',
    tags: ['Contenido', 'Servicio'],
    version: 1,
  },
  {
    category: 'services',
    defaultData: { items, title: 'Beneficios resumidos' },
    defaultSettings: settings('icons', { columnsDesktop: 3 }),
    description: 'Beneficios cortos con iconos, enlaces o llamadas puntuales.',
    icon: 'spark',
    key: 'benefits_icons',
    legacyBlockTypes: ['featureGridSection'],
    name: 'Beneficios con iconos',
    previewData: { items, title: 'Por que elegirnos' },
    recommendedFor: ['landing', 'service', 'product'],
    renderer: 'cards',
    schema: 'cards',
    sortOrder: 240,
    status: 'stable',
    tags: ['Conversion', 'Servicios'],
    version: 1,
  },
  {
    category: 'services',
    defaultData: { benefits: items, description: 'Presenta un producto, plataforma o herramienta.', specifications: items, title: 'Producto destacado' },
    defaultSettings: settings('showcase'),
    description: 'Presentacion detallada de producto, plataforma o herramienta.',
    icon: 'window',
    key: 'product_showcase',
    name: 'Presentacion de producto',
    previewData: { items, title: 'Plataforma principal' },
    recommendedFor: ['product', 'landing'],
    renderer: 'cards',
    schema: 'cards',
    sortOrder: 250,
    status: 'stable',
    tags: ['Producto', 'Tecnologia'],
    version: 1,
  },
  {
    category: 'services',
    defaultData: { code: ['npm install ejemplo', 'npm run start', 'Servicio listo en segundos'], description: 'Muestra una demo tecnica sin ejecutar codigo.', title: 'Demo segura tipo terminal' },
    defaultSettings: settings('terminal'),
    description: 'Presentacion visual de comandos, consola o codigo seguro.',
    icon: 'terminal',
    key: 'terminal_demo',
    name: 'Demo tipo terminal',
    previewData: { code: ['cms-profesional deploy', 'build completado'], title: 'Flujo tecnico' },
    recommendedFor: ['product', 'service'],
    renderer: 'terminal',
    schema: 'terminal',
    sortOrder: 260,
    status: 'stable',
    tags: ['Tecnologia'],
    version: 1,
  },
  {
    category: 'services',
    defaultData: { columns: ['Basico', 'Pro', 'Empresa'], items, title: 'Comparacion clara' },
    defaultSettings: settings('table'),
    description: 'Tabla para comparar planes, servicios o caracteristicas.',
    icon: 'compare',
    key: 'comparison_table',
    name: 'Tabla comparativa',
    previewData: { columns: ['Opcion A', 'Opcion B'], items, title: 'Compara opciones' },
    recommendedFor: ['product', 'service', 'landing'],
    renderer: 'comparison',
    schema: 'comparison',
    sortOrder: 270,
    status: 'stable',
    tags: ['Producto', 'Conversion'],
    version: 1,
  },
  {
    category: 'conversion',
    defaultData: { items: [{ features: ['Soporte base', 'Configuracion inicial'], name: 'Inicial', price: '$0' }, { featured: true, features: ['Acompanamiento', 'Mejores opciones'], name: 'Profesional', price: '$00' }], title: 'Planes disponibles' },
    defaultSettings: settings('cards'),
    description: 'Tarjetas de precios, paquetes o planes.',
    icon: 'price',
    key: 'pricing_cards',
    name: 'Tarjetas de precios',
    previewData: { items, title: 'Elige el plan correcto' },
    recommendedFor: ['landing', 'product', 'service'],
    renderer: 'pricing',
    schema: 'pricing',
    sortOrder: 280,
    status: 'stable',
    tags: ['Conversion', 'Producto'],
    version: 1,
  },
  {
    category: 'process',
    defaultData: { items, title: 'Proceso simple' },
    defaultSettings: settings('timeline'),
    description: 'Pasos de trabajo, implementacion o acompanamiento.',
    icon: 'steps',
    key: 'process_steps',
    legacyBlockTypes: ['processSection'],
    name: 'Proceso por pasos',
    previewData: { items, title: 'Como trabajamos' },
    recommendedFor: ['service', 'landing', 'education'],
    renderer: 'steps',
    schema: 'steps',
    sortOrder: 310,
    status: 'stable',
    tags: ['Proceso'],
    version: 1,
  },
  {
    category: 'process',
    defaultData: { items: items.map((entry, index) => ({ ...entry, date: String(2020 + index) })), title: 'Historia y evolucion' },
    defaultSettings: settings('vertical'),
    description: 'Linea de tiempo institucional o de proyecto.',
    icon: 'timeline',
    key: 'timeline_history',
    name: 'Linea de tiempo',
    previewData: { items, title: 'Nuestra evolucion' },
    recommendedFor: ['institutional', 'product'],
    renderer: 'timeline',
    schema: 'timeline',
    sortOrder: 320,
    status: 'stable',
    tags: ['Institucional'],
    version: 1,
  },
  {
    category: 'content',
    defaultData: { items: items.map((entry) => ({ ...entry, name: entry.title, role: 'Responsable' })), title: 'Equipo responsable' },
    defaultSettings: settings('team'),
    description: 'Equipo, autoridades, ponentes o responsables.',
    icon: 'people',
    key: 'team_grid',
    name: 'Equipo o autoridades',
    previewData: { items, title: 'Personas clave' },
    recommendedFor: ['institutional', 'event', 'education'],
    renderer: 'cards',
    schema: 'cards',
    sortOrder: 330,
    status: 'stable',
    tags: ['Institucional', 'Equipo'],
    version: 1,
  },
  {
    category: 'cases',
    defaultData: { client: 'Cliente o proyecto', description: 'Resume problema, solucion y resultado.', items, result: 'Resultado destacado', title: 'Caso destacado' },
    defaultSettings: settings('featured'),
    description: 'Caso de exito con resultado, metrica e imagen.',
    icon: 'case',
    key: 'case_study_featured',
    legacyBlockTypes: ['caseStudySection'],
    name: 'Caso destacado',
    previewData: { result: 'Impacto medible', title: 'Proyecto destacado' },
    recommendedFor: ['home', 'service', 'landing'],
    renderer: 'cards',
    schema: 'cards',
    sortOrder: 410,
    status: 'stable',
    tags: ['Casos', 'Confianza'],
    version: 1,
  },
  {
    category: 'cases',
    defaultData: { items, title: 'Proyectos y casos' },
    defaultSettings: settings('grid'),
    description: 'Cuadricula de proyectos, casos o trabajos realizados.',
    icon: 'projects',
    key: 'case_study_grid',
    name: 'Cuadricula de casos',
    previewData: { items, title: 'Casos recientes' },
    recommendedFor: ['home', 'service', 'institutional'],
    renderer: 'cards',
    schema: 'cards',
    sortOrder: 420,
    status: 'stable',
    tags: ['Casos'],
    version: 1,
  },
  {
    category: 'cases',
    defaultData: { items: [{ name: 'Cliente real', quote: 'Agrega una cita real con fuente verificable.', role: 'Cargo o empresa' }], title: 'Lo dicen nuestros clientes' },
    defaultSettings: settings('carousel'),
    description: 'Testimonios con fuente, cargo, logo o fotografia.',
    icon: 'quote',
    key: 'testimonials',
    legacyBlockTypes: ['testimonialSection'],
    name: 'Testimonios',
    previewData: { items: [{ name: 'Cliente', quote: 'Una experiencia clara y profesional.' }], title: 'Opiniones' },
    recommendedFor: ['home', 'landing', 'service'],
    renderer: 'cards',
    schema: 'cards',
    sortOrder: 430,
    status: 'stable',
    tags: ['Confianza', 'Conversion'],
    version: 1,
  },
  {
    category: 'news',
    defaultData: { category: 'Novedades', date: '2026-07-16', description: 'Destaca una noticia o publicacion importante.', title: 'Noticia destacada' },
    defaultSettings: settings('featured'),
    description: 'Publicacion principal, aviso o noticia destacada.',
    icon: 'news',
    key: 'featured_news',
    name: 'Noticia destacada',
    previewData: { title: 'Actualidad importante' },
    recommendedFor: ['news', 'home', 'institutional'],
    renderer: 'cards',
    schema: 'cards',
    sortOrder: 510,
    status: 'stable',
    tags: ['Noticias'],
    version: 1,
  },
  {
    category: 'news',
    defaultData: { contentSource: 'manual', items, title: 'Ultimas publicaciones' },
    defaultSettings: settings('grid'),
    description: 'Listado de noticias manual o preparado para contenido dinamico.',
    icon: 'posts',
    key: 'news_grid',
    name: 'Cuadricula de noticias',
    previewData: { items, title: 'Noticias recientes' },
    recommendedFor: ['news', 'home', 'institutional'],
    renderer: 'cards',
    schema: 'cards',
    sortOrder: 520,
    status: 'stable',
    tags: ['Noticias', 'Institucional'],
    version: 1,
  },
  {
    category: 'news',
    defaultData: { items: [{ level: 'info', title: 'Aviso importante', description: 'Describe el aviso con claridad.' }], title: 'Avisos' },
    defaultSettings: settings('alerts'),
    description: 'Avisos institucionales, alertas o mensajes importantes.',
    icon: 'alert',
    key: 'notices_alerts',
    name: 'Avisos y alertas',
    previewData: { items: [{ title: 'Aviso', description: 'Informacion relevante.' }], title: 'Avisos' },
    recommendedFor: ['institutional', 'news', 'home'],
    renderer: 'cards',
    schema: 'cards',
    sortOrder: 530,
    status: 'stable',
    tags: ['Avisos', 'Institucional'],
    version: 1,
  },
  {
    category: 'news',
    defaultData: { items, title: 'Documentos disponibles' },
    defaultSettings: settings('downloads'),
    description: 'Documentos, normativas, formularios o informes descargables.',
    icon: 'download',
    key: 'documents_downloads',
    name: 'Documentos descargables',
    previewData: { items, title: 'Recursos' },
    recommendedFor: ['institutional', 'education'],
    renderer: 'documents',
    schema: 'documents',
    sortOrder: 540,
    status: 'stable',
    tags: ['Documentos', 'Institucional'],
    version: 1,
  },
  {
    category: 'education',
    defaultData: { items, title: 'Programas disponibles' },
    defaultSettings: settings('grid'),
    description: 'Programas, carreras, diplomados o rutas formativas.',
    icon: 'program',
    key: 'programs_grid',
    name: 'Programas educativos',
    previewData: { items, title: 'Oferta academica' },
    recommendedFor: ['education', 'institutional'],
    renderer: 'cards',
    schema: 'cards',
    sortOrder: 610,
    status: 'stable',
    tags: ['Educativo'],
    version: 1,
  },
  {
    category: 'education',
    defaultData: { contentSource: 'manual', items, title: 'Catalogo de cursos' },
    defaultSettings: settings('catalog'),
    description: 'Catalogo de cursos manual o preparado para colecciones futuras.',
    icon: 'course',
    key: 'course_catalog',
    name: 'Catalogo de cursos',
    previewData: { items, title: 'Cursos disponibles' },
    recommendedFor: ['education'],
    renderer: 'cards',
    schema: 'cards',
    sortOrder: 620,
    status: 'stable',
    tags: ['Educativo', 'Cursos'],
    version: 1,
  },
  {
    category: 'events',
    defaultData: { items: items.map((entry) => ({ ...entry, date: '2026-08-15', modality: 'Presencial' })), title: 'Eventos y webinars' },
    defaultSettings: settings('cards'),
    description: 'Eventos, capacitaciones, webinars o agenda.',
    icon: 'event',
    key: 'events_webinars',
    name: 'Eventos y webinars',
    previewData: { items, title: 'Proximos eventos' },
    recommendedFor: ['event', 'education', 'home'],
    renderer: 'cards',
    schema: 'event',
    sortOrder: 630,
    status: 'stable',
    tags: ['Eventos', 'Educativo'],
    version: 1,
  },
  {
    category: 'sports',
    defaultData: { items: [{ away: 'Visitante', home: 'Local', score: '0 - 0', status: 'Programado' }], title: 'Marcador de eventos' },
    defaultSettings: settings('scoreboard'),
    description: 'Marcador para encuentros, actividades o eventos en vivo.',
    icon: 'score',
    key: 'live_scoreboard',
    name: 'Marcador en vivo',
    previewData: { items: [{ home: 'Equipo A', away: 'Equipo B', status: 'Programado' }], title: 'Jornada actual' },
    recommendedFor: ['free'],
    renderer: 'scoreboard',
    schema: 'scoreboard',
    sortOrder: 710,
    status: 'stable',
    tags: ['Deportes', 'Datos'],
    version: 1,
  },
  {
    category: 'sports',
    defaultData: { items: items.map((entry, index) => ({ participant: entry.title, points: 10 - index, position: index + 1 })), title: 'Clasificacion' },
    defaultSettings: settings('ranking'),
    description: 'Tabla de posiciones o ranking configurable.',
    icon: 'ranking',
    key: 'standings_ranking',
    name: 'Tabla de posiciones',
    previewData: { items, title: 'Ranking' },
    recommendedFor: ['free'],
    renderer: 'scoreboard',
    schema: 'scoreboard',
    sortOrder: 720,
    status: 'stable',
    tags: ['Deportes', 'Datos'],
    version: 1,
  },
  {
    category: 'sports',
    defaultData: { items: items.map((entry) => ({ ...entry, date: '2026-08-15' })), title: 'Calendario y resultados' },
    defaultSettings: settings('schedule'),
    description: 'Calendario de encuentros, actividades o resultados.',
    icon: 'calendar',
    key: 'schedule_results',
    name: 'Calendario y resultados',
    previewData: { items, title: 'Proximas fechas' },
    recommendedFor: ['free', 'event'],
    renderer: 'scoreboard',
    schema: 'scoreboard',
    sortOrder: 730,
    status: 'stable',
    tags: ['Deportes', 'Eventos'],
    version: 1,
  },
  {
    category: 'media',
    defaultData: { items, title: 'Galeria multimedia' },
    defaultSettings: settings('gallery'),
    description: 'Galeria de imagenes y videos con estructura accesible.',
    icon: 'gallery',
    key: 'media_gallery',
    name: 'Galeria multimedia',
    previewData: { items, title: 'Momentos destacados' },
    recommendedFor: ['home', 'institutional', 'event'],
    renderer: 'media',
    schema: 'media',
    sortOrder: 810,
    status: 'stable',
    tags: ['Multimedia'],
    version: 1,
  },
  {
    category: 'media',
    defaultData: { description: 'Presenta un video con miniatura, descripcion y transcripcion.', title: 'Video destacado' },
    defaultSettings: settings('featuredVideo', { autoplay: false }),
    description: 'Video destacado con miniatura, descripcion y controles seguros.',
    icon: 'video',
    key: 'video_feature',
    name: 'Video destacado',
    previewData: { title: 'Historia en video' },
    recommendedFor: ['home', 'event', 'education'],
    renderer: 'media',
    schema: 'media',
    sortOrder: 820,
    status: 'stable',
    tags: ['Multimedia', 'Video'],
    version: 1,
  },
  {
    category: 'conversion',
    defaultData: { items: [{ answer: 'Responde con claridad y sin tecnicismos innecesarios.', question: 'Pregunta frecuente importante' }], title: 'Preguntas frecuentes' },
    defaultSettings: settings('accordion'),
    description: 'FAQ con acordeon accesible y soporte de categorias.',
    icon: 'faq',
    key: 'faq_accordion',
    legacyBlockTypes: ['faqSection'],
    name: 'Preguntas frecuentes',
    previewData: { items: [{ question: 'Pregunta', answer: 'Respuesta clara.' }], title: 'Dudas comunes' },
    recommendedFor: ['landing', 'service', 'education', 'event'],
    renderer: 'faq',
    schema: 'faq',
    sortOrder: 910,
    status: 'stable',
    tags: ['Conversion', 'Soporte'],
    version: 1,
  },
  {
    category: 'conversion',
    defaultData: { buttons: [{ label: 'Contactar', url: '#contacto' }], description: 'Cierra con un siguiente paso claro.', title: 'El siguiente paso es simple' },
    defaultSettings: settings('band'),
    description: 'Llamado a la accion con botones y soporte visual.',
    icon: 'cta',
    key: 'call_to_action',
    legacyBlockTypes: ['ctaSection'],
    name: 'Llamado a la accion',
    previewData: { title: 'Hablemos de tu proyecto' },
    recommendedFor: ['home', 'landing', 'service', 'product'],
    renderer: 'cta',
    schema: 'cta',
    sortOrder: 920,
    status: 'stable',
    tags: ['Conversion'],
    version: 1,
  },
  {
    category: 'conversion',
    defaultData: { consentLabel: 'Acepto recibir comunicaciones.', description: 'Captura correos solo cuando exista integracion real.', title: 'Suscribete a novedades' },
    defaultSettings: settings('newsletter'),
    description: 'Bloque de suscripcion preparado para integracion real.',
    icon: 'mail',
    key: 'newsletter_signup',
    name: 'Suscripcion',
    previewData: { title: 'Recibe actualizaciones' },
    recommendedFor: ['news', 'home'],
    renderer: 'cta',
    schema: 'cta',
    sortOrder: 930,
    status: 'beta',
    tags: ['Conversion', 'Noticias'],
    version: 1,
  },
  {
    category: 'contact',
    defaultData: { items: [{ description: 'Canal principal de atencion.', title: 'WhatsApp' }, { description: 'Correo de contacto.', title: 'Correo' }], title: 'Canales de contacto' },
    defaultSettings: settings('cards'),
    description: 'Tarjetas para telefono, correo, direccion, horarios o redes.',
    icon: 'contact',
    key: 'contact_cards',
    name: 'Tarjetas de contacto',
    previewData: { items, title: 'Contactanos' },
    recommendedFor: ['contact', 'institutional', 'home'],
    renderer: 'contact',
    schema: 'contact',
    sortOrder: 940,
    status: 'stable',
    tags: ['Contacto'],
    version: 1,
  },
  {
    category: 'contact',
    defaultData: { address: 'Direccion principal', description: 'Muestra ubicacion, horario y formulario existente.', title: 'Ubicacion y formulario' },
    defaultSettings: settings('map'),
    description: 'Contacto con mapa, datos y enlace al formulario global.',
    icon: 'map',
    key: 'contact_map',
    name: 'Mapa y contacto',
    previewData: { title: 'Visitanos o escribenos' },
    recommendedFor: ['contact', 'institutional'],
    renderer: 'contact',
    schema: 'contact',
    sortOrder: 950,
    status: 'stable',
    tags: ['Contacto', 'Institucional'],
    version: 1,
  },
]

export const templateByKey = Object.fromEntries(
  sectionTemplates.map((template) => [template.key, template]),
) as Record<string, SectionTemplate>

export const pageSectionGuides: Record<PageTypeRecommendation, PageSectionGuide> = {
  contact: {
    description: 'Anade una cabecera simple y luego una seccion de Captacion y contacto.',
    label: 'Pagina de contacto',
    pageType: 'contact',
    recommendedSteps: [
      { blockType: 'heroSlice', description: 'Presenta el motivo de contacto.', label: '+ Anadir portada' },
      { blockType: 'featureGridSlice', description: 'Lista canales, horarios o ubicaciones.', label: '+ Anadir datos clave' },
      { blockType: 'ctaSlice', description: 'Invita a escribir, llamar o visitar.', label: '+ Anadir contacto' },
      canvasQuickAddStep,
    ],
  },
  education: {
    description: 'Presenta la oferta formativa con una secuencia clara antes del cierre de inscripcion.',
    label: 'Pagina educativa',
    pageType: 'education',
    recommendedSteps: [
      { blockType: 'heroSlice', description: 'Enmarca la propuesta academica.', label: '+ Anadir portada' },
      { blockType: 'featureGridSlice', description: 'Lista programas o rutas formativas.', label: '+ Anadir oferta' },
      { blockType: 'ctaSlice', description: 'Cierra con inscripcion o consulta.', label: '+ Anadir accion' },
      canvasQuickAddStep,
    ],
  },
  event: {
    description: 'Ordena fecha, contexto, agenda y registro para que la accion sea evidente.',
    label: 'Evento o campana',
    pageType: 'event',
    recommendedSteps: [
      { blockType: 'heroSlice', description: 'Presenta fecha, lugar y promesa.', label: '+ Anadir portada' },
      { blockType: 'featureGridSlice', description: 'Muestra agenda, beneficios o actividades.', label: '+ Anadir detalles' },
      { blockType: 'ctaSlice', description: 'Lleva a registro o contacto.', label: '+ Anadir registro' },
      canvasQuickAddStep,
    ],
  },
  free: {
    description: 'Empieza con una cabecera y agrega solo las secciones necesarias para esta pagina especial.',
    label: 'Pagina libre',
    pageType: 'free',
    recommendedSteps: [
      { blockType: 'heroSlice', description: 'Abre con contexto claro.', label: '+ Anadir portada' },
      { blockType: 'featureGridSlice', description: 'Ordena puntos importantes.', label: '+ Anadir contenido' },
      { blockType: 'ctaSlice', description: 'Agrega un siguiente paso claro.', label: '+ Anadir accion' },
      canvasQuickAddStep,
    ],
  },
  home: {
    description: 'Para una pagina de inicio, te recomendamos anadir manualmente una secuencia breve y completa.',
    label: 'Inicio empresarial',
    pageType: 'home',
    recommendedSteps: [
      { blockType: 'heroSlice', description: 'Atrapa la atencion y explica tu valor.', label: '+ Anadir portada' },
      { blockType: 'featureGridSlice', description: 'Muestra lo que haces.', label: '+ Anadir oferta' },
      { blockType: 'ctaSlice', description: 'Cierra con contacto o compra.', label: '+ Anadir accion' },
      canvasQuickAddStep,
    ],
  },
  institutional: {
    description: 'Construye credibilidad antes de llevar al usuario hacia contacto o siguiente paso.',
    label: 'Institucional',
    pageType: 'institutional',
    recommendedSteps: [
      { blockType: 'heroSlice', description: 'Da presencia y contexto institucional.', label: '+ Anadir portada' },
      { blockType: 'featureGridSlice', description: 'Cuenta historia, valores o servicios.', label: '+ Anadir contenido' },
      { blockType: 'ctaSlice', description: 'Facilita el contacto.', label: '+ Anadir contacto' },
      canvasQuickAddStep,
    ],
  },
  landing: {
    description: 'Una landing debe avanzar rapido: promesa, beneficios, prueba y accion.',
    label: 'Landing de conversion',
    pageType: 'landing',
    recommendedSteps: [
      { blockType: 'heroSlice', description: 'Presenta una promesa directa.', label: '+ Anadir portada' },
      { blockType: 'featureGridSlice', description: 'Resume beneficios faciles de leer.', label: '+ Anadir beneficios' },
      { blockType: 'ctaSlice', description: 'Pide una accion clara.', label: '+ Anadir accion' },
      canvasQuickAddStep,
    ],
  },
  news: {
    description: 'Prioriza actualidad y recursos, dejando suscripcion o contacto como cierre opcional.',
    label: 'Noticias y avisos',
    pageType: 'news',
    recommendedSteps: [
      { blockType: 'heroSlice', description: 'Destaca el contexto principal.', label: '+ Anadir portada' },
      { blockType: 'featureGridSlice', description: 'Lista avisos, temas o recursos.', label: '+ Anadir listado' },
      { blockType: 'ctaSlice', description: 'Invita a recibir novedades.', label: '+ Anadir suscripcion' },
      canvasQuickAddStep,
    ],
  },
  product: {
    description: 'Explica el producto desde valor, prueba y decision de compra.',
    label: 'Producto',
    pageType: 'product',
    recommendedSteps: [
      { blockType: 'heroSlice', description: 'Enfoca la propuesta del producto.', label: '+ Anadir portada' },
      { blockType: 'featureGridSlice', description: 'Muestra beneficios, planes o detalles.', label: '+ Anadir beneficios' },
      { blockType: 'ctaSlice', description: 'Cierra con compra o contacto.', label: '+ Anadir accion' },
      canvasQuickAddStep,
    ],
  },
  service: {
    description: 'Muestra que ofreces, como trabajas y por que confiar antes de pedir contacto.',
    label: 'Servicio',
    pageType: 'service',
    recommendedSteps: [
      { blockType: 'heroSlice', description: 'Explica el servicio principal.', label: '+ Anadir portada' },
      { blockType: 'featureGridSlice', description: 'Lista capacidades o soluciones.', label: '+ Anadir servicios' },
      { blockType: 'ctaSlice', description: 'Invita a cotizar o conversar.', label: '+ Anadir accion' },
      canvasQuickAddStep,
    ],
  },
}

export const legacyTemplateKeyByBlockType = Object.fromEntries(
  sectionTemplates.flatMap((template) =>
    (template.legacyBlockTypes ?? []).map((blockType) => [blockType, template.key]),
  ),
) as Record<string, string>

export const getTemplateForBlockType = (blockType: string | null | undefined) =>
  blockType ? templateByKey[blockType] ?? templateByKey[legacyTemplateKeyByBlockType[blockType]] : undefined
