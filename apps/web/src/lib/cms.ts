export type MediaAsset = {
  id?: number | string
  alt?: string | null
  caption?: string | null
  description?: string | null
  mediaType?: 'image' | 'other' | 'video' | null
  mimeType?: string | null
  poster?: MediaAsset | null
  url?: string | null
}

type PayloadMediaAsset = Omit<MediaAsset, 'poster'> & {
  poster?: PayloadMediaValue
}

type PayloadMediaValue = PayloadMediaAsset | number | string | null | undefined

type PagesResponse<TPage> = {
  docs?: TPage[]
}

type PayloadRelationshipValue<T> = T | number | string | null | undefined

export type LinkTarget = {
  href: string
  label: string
  openInNewTab?: boolean
}

export type NavigationItem = LinkTarget & {
  children?: NavigationItem[]
}

type PayloadNavigationItem = {
  children?: PayloadNavigationItem[] | null
  isActive?: boolean | null
  label?: string | null
  linkType?: 'anchor' | 'container' | 'external' | 'page' | null
  manualUrl?: string | null
  openInNewTab?: boolean | null
  order?: number | null
  page?: PayloadRelationshipValue<PayloadPageSummary>
}

type PayloadMainNavigation = {
  items?: PayloadNavigationItem[] | null
}

type PayloadPageSummary = {
  id?: number | string
  navigationLabel?: string | null
  navigationOrder?: number | null
  parentPage?: PayloadRelationshipValue<PayloadPageSummary>
  showInMainNavigation?: boolean | null
  showInFooter?: boolean | null
  slug?: string | null
  status?: 'draft' | 'published' | null
  title?: string | null
}

type PageNavigationEntry = {
  children: PageNavigationEntry[]
  href: string
  id: string
  label: string
  order: number | null
  parentId: string | null
}

export type PageSeo = {
  keywords: string[]
  metaDescription?: string | null
  metaTitle?: string | null
  ogImage?: MediaAsset | null
}

export type PageBuilderPage = {
  content: PageBlock[]
  excerpt?: string | null
  featuredImage?: MediaAsset | null
  seo: PageSeo
  slug: string
  status: 'draft' | 'published'
  title: string
}

type PayloadPage = {
  content?: PayloadPageBlock[] | null
  excerpt?: string | null
  featuredImage?: PayloadMediaValue
  seo?: {
    keywords?: string | null
    metaDescription?: string | null
    metaTitle?: string | null
    ogImage?: PayloadMediaValue
  } | null
  slug?: string | null
  status?: 'draft' | 'published' | null
  title?: string | null
}

export type HeroPageBlock = {
  backgroundMedia?: MediaAsset | null
  description?: string | null
  eyebrow?: string | null
  id?: string | null
  primaryButton?: LinkTarget | null
  secondaryButton?: LinkTarget | null
  subtitle?: string | null
  title: string
  type: 'hero'
}

export type RichTextPageBlock = {
  alignment: 'center' | 'left' | 'right'
  content: unknown
  id?: string | null
  type: 'richText'
  width: 'narrow' | 'normal' | 'wide'
}

export type ImageTextPageBlock = {
  button?: LinkTarget | null
  description?: string | null
  id?: string | null
  image?: MediaAsset | null
  imagePosition: 'left' | 'right'
  title: string
  type: 'imageText'
}

export type CardItem = {
  description?: string | null
  media?: MediaAsset | null
  title: string
  url?: string | null
}

export type CardsPageBlock = {
  cards: CardItem[]
  id?: string | null
  sectionDescription?: string | null
  sectionTitle?: string | null
  type: 'cards'
}

export type GalleryImage = {
  caption?: string | null
  image?: MediaAsset | null
}

export type GalleryPageBlock = {
  description?: string | null
  id?: string | null
  images: GalleryImage[]
  title?: string | null
  type: 'gallery'
}

export type MediaBlockWidth = 'custom' | 'full' | 'normal' | 'small'
export type MediaBlockHeight = 'auto' | 'fixed' | 'viewport'
export type MediaAlignment = 'center' | 'left' | 'right'
export type MediaBorderRadius = 'lg' | 'md' | 'none' | 'sm' | 'xl'
export type MediaShadow = 'none' | 'soft' | 'strong'
export type ObjectFit = 'contain' | 'cover'

export type MediaPageBlock = {
  alignment: MediaAlignment
  altText?: string | null
  autoplay: boolean
  borderRadius: MediaBorderRadius
  controls: boolean
  customWidth?: string | null
  description?: string | null
  fixedHeight?: string | null
  height: MediaBlockHeight
  id?: string | null
  loop: boolean
  media?: MediaAsset | null
  mediaKind: 'image' | 'video'
  muted: boolean
  objectFit: ObjectFit
  poster?: MediaAsset | null
  shadow: MediaShadow
  showBorder: boolean
  title?: string | null
  type: 'mediaBlock'
  width: MediaBlockWidth
}

export type VideoProvider = 'auto' | 'direct' | 'vimeo' | 'youtube'
export type VideoAspectRatio = '16:9' | '1:1' | '4:3' | 'vertical'

export type VideoPageBlock = {
  aspectRatio: VideoAspectRatio
  autoplay: boolean
  controls: boolean
  description?: string | null
  externalProvider: VideoProvider
  externalUrl?: string | null
  id?: string | null
  internalVideo?: MediaAsset | null
  loop: boolean
  muted: boolean
  poster?: MediaAsset | null
  title?: string | null
  type: 'videoBlock'
  videoSource: 'external' | 'internal'
}

export type SnapLayout =
  | 'bentoGrid'
  | 'contact'
  | 'featureLeft'
  | 'featureRight'
  | 'fourColumns'
  | 'mediaText'
  | 'mosaicGallery'
  | 'oneColumn'
  | 'serviceCards'
  | 'splitHero'
  | 'textMedia'
  | 'threeColumns'
  | 'twoColumns'
  | 'twoColumnsWideLeft'
  | 'twoColumnsWideRight'

export type SectionSize = 'full' | 'narrow' | 'normal' | 'wide'
export type SectionSpacing = 'lg' | 'md' | 'none' | 'sm' | 'xl'
export type SnapItemContentType =
  | 'button'
  | 'card'
  | 'cta'
  | 'iconText'
  | 'image'
  | 'list'
  | 'mediaText'
  | 'richText'
  | 'text'
  | 'video'

export type SnapLayoutItem = {
  alignment: MediaAlignment
  backgroundColor?: string | null
  borderRadius: MediaBorderRadius
  button?: LinkTarget | null
  contentType: SnapItemContentType
  description?: string | null
  iconName?: string | null
  id?: string | null
  image?: MediaAsset | null
  isActive: boolean
  link?: LinkTarget | null
  listItems: string[]
  padding: SectionSpacing
  responsiveOrder?: number | null
  richText?: unknown
  shadow: MediaShadow
  showBorder: boolean
  subtitle?: string | null
  textColor?: string | null
  title?: string | null
  video?: MediaAsset | null
}

export type SnapLayoutPageBlock = {
  alignment: MediaAlignment
  backgroundColor?: string | null
  backgroundImage?: MediaAsset | null
  backgroundVideo?: MediaAsset | null
  className?: string | null
  gap: SectionSpacing
  id?: string | null
  isActive: boolean
  items: SnapLayoutItem[]
  layout: SnapLayout
  maxWidth: SectionSize
  paddingBottom: SectionSpacing
  paddingTop: SectionSpacing
  sectionDescription?: string | null
  sectionId?: string | null
  sectionSubtitle?: string | null
  sectionTitle?: string | null
  textColor?: string | null
  type: 'snapLayoutBlock'
}

export type CTAPageBlock = {
  button?: LinkTarget | null
  description?: string | null
  id?: string | null
  title: string
  type: 'cta'
  variant: 'minimal' | 'outline' | 'solid'
}

export type FAQItem = {
  answer: string
  question: string
}

export type FAQPageBlock = {
  id?: string | null
  items: FAQItem[]
  title?: string | null
  type: 'faq'
}

export type PageBlock =
  | CardsPageBlock
  | CTAPageBlock
  | FAQPageBlock
  | GalleryPageBlock
  | HeroPageBlock
  | ImageTextPageBlock
  | MediaPageBlock
  | RichTextPageBlock
  | SnapLayoutPageBlock
  | VideoPageBlock

type PayloadPageBlock = {
  [key: string]: unknown
  blockType?: string
  id?: string | null
}

export type CompanyColors = {
  primary: string
  secondary: string
  accent: string
  background: string
  textPrimary: string
  textSecondary: string
}

export type SocialLinks = {
  facebook?: string | null
  instagram?: string | null
  tiktok?: string | null
  linkedin?: string | null
  youtube?: string | null
  twitter?: string | null
  whatsapp?: string | null
}

export type SeoDefaults = {
  title: string
  description: string
  keywords: string[]
  canonicalBaseUrl: string
}

export type LegalContent = {
  copyrightText: string
  privacyPolicy?: string | null
  termsAndConditions?: string | null
  footerLegalText?: string | null
}

export type CompanySettingsContent = {
  commercialName: string
  legalName?: string | null
  slogan: string
  shortDescription: string
  longDescription?: string | null
  mainEmail?: string | null
  mainPhone?: string | null
  whatsapp?: string | null
  address?: string | null
  countryCity?: string | null
  businessHours?: string | null
  logoPrimary?: MediaAsset | null
  logoSecondary?: MediaAsset | null
  favicon?: MediaAsset | null
  ogImage?: MediaAsset | null
  contact: {
    eyebrow: string
    headline: string
    intro?: string | null
    recipients: string[]
  }
  colors: CompanyColors
  social: SocialLinks
  seo: SeoDefaults
  legal: LegalContent
}

type PayloadCompanySettings = {
  commercialName?: string | null
  legalName?: string | null
  slogan?: string | null
  shortDescription?: string | null
  longDescription?: string | null
  mainEmail?: string | null
  mainPhone?: string | null
  whatsapp?: string | null
  address?: string | null
  countryCity?: string | null
  businessHours?: string | null
  logoPrimary?: PayloadMediaValue
  logoSecondary?: PayloadMediaValue
  favicon?: PayloadMediaValue
  ogImage?: PayloadMediaValue
  colorPrimary?: string | null
  colorSecondary?: string | null
  colorAccent?: string | null
  colorBackground?: string | null
  colorTextPrimary?: string | null
  colorTextSecondary?: string | null
  facebookUrl?: string | null
  instagramUrl?: string | null
  tiktokUrl?: string | null
  linkedinUrl?: string | null
  youtubeUrl?: string | null
  twitterUrl?: string | null
  whatsappUrl?: string | null
  contactEyebrow?: string | null
  contactHeadline?: string | null
  contactIntro?: string | null
  contactRecipients?: { email?: string | null }[] | null
  defaultMetaTitle?: string | null
  defaultMetaDescription?: string | null
  globalKeywords?: string | string[] | null
  canonicalBaseUrl?: string | null
  copyrightText?: string | null
  privacyPolicy?: string | null
  termsAndConditions?: string | null
  footerLegalText?: string | null
}

export type FooterColumnContentType =
  | 'contact'
  | 'customText'
  | 'mainNavigation'
  | 'manualLinks'
  | 'publishedPages'
  | 'socialLinks'

export type FooterSocialType =
  | 'facebook'
  | 'instagram'
  | 'linkedin'
  | 'other'
  | 'tiktok'
  | 'twitter'
  | 'website'
  | 'whatsapp'
  | 'youtube'

export type FooterManualLink = LinkTarget & {
  id?: string | null
  isActive: boolean
  order: number
}

export type FooterColumn = {
  contentType: FooterColumnContentType
  customText?: string | null
  id?: string | null
  isActive: boolean
  links: FooterManualLink[]
  order: number
  title: string
}

export type FooterSocialLink = {
  iconName?: string | null
  id?: string | null
  isActive: boolean
  name: string
  openInNewTab: boolean
  order: number
  showInFooter: boolean
  showInHeader: boolean
  type: FooterSocialType
  url: string
}

export type FooterContactSettings = {
  address?: string | null
  businessHours?: string | null
  city?: string | null
  country?: string | null
  email?: string | null
  phone?: string | null
  useCompanySettings: boolean
  whatsapp?: string | null
}

export type FooterLegalSettings = {
  copyrightText?: string | null
  legalText?: string | null
  privacyPage?: LinkTarget | null
  termsPage?: LinkTarget | null
}

export type FooterSettingsContent = {
  additionalText?: string | null
  columns: FooterColumn[]
  companyNameOverride?: string | null
  contact: FooterContactSettings
  isEnabled: boolean
  legal: FooterLegalSettings
  logo?: MediaAsset | null
  shortDescription?: string | null
  showCompanyName: boolean
  showLogo: boolean
  socialLinks: FooterSocialLink[]
}

type PayloadFooterManualLink = {
  id?: string | null
  isActive?: boolean | null
  label?: string | null
  openInNewTab?: boolean | null
  order?: number | null
  url?: string | null
}

type PayloadFooterColumn = {
  contentType?: FooterColumnContentType | null
  customText?: string | null
  id?: string | null
  isActive?: boolean | null
  links?: PayloadFooterManualLink[] | null
  order?: number | null
  title?: string | null
}

type PayloadFooterSocialLink = {
  iconName?: string | null
  id?: string | null
  isActive?: boolean | null
  name?: string | null
  openInNewTab?: boolean | null
  order?: number | null
  showInFooter?: boolean | null
  showInHeader?: boolean | null
  type?: FooterSocialType | null
  url?: string | null
}

type PayloadFooterSettings = {
  additionalText?: string | null
  address?: string | null
  businessHours?: string | null
  city?: string | null
  columns?: PayloadFooterColumn[] | null
  companyNameOverride?: string | null
  copyrightText?: string | null
  country?: string | null
  email?: string | null
  isEnabled?: boolean | null
  legalText?: string | null
  logo?: PayloadMediaValue
  phone?: string | null
  privacyPage?: PayloadRelationshipValue<PayloadPageSummary>
  shortDescription?: string | null
  showCompanyName?: boolean | null
  showLogo?: boolean | null
  socialLinks?: PayloadFooterSocialLink[] | null
  termsPage?: PayloadRelationshipValue<PayloadPageSummary>
  useCompanySettings?: boolean | null
  whatsapp?: string | null
}

const homeContactNavigationItem: NavigationItem = {
  href: '/#contacto',
  label: 'Contacto'
}

const fallbackNavigationItems: NavigationItem[] = [homeContactNavigationItem]

const fallbackCompanySettings: CompanySettingsContent = {
  commercialName: 'Zanders SV',
  legalName: null,
  slogan: '',
  shortDescription: '',
  longDescription: null,
  mainEmail: null,
  mainPhone: '+503 7934 7603',
  whatsapp: '+503 7934 7603',
  address: null,
  countryCity: 'El Salvador',
  businessHours: null,
  logoPrimary: null,
  logoSecondary: null,
  favicon: null,
  ogImage: null,
  contact: {
    eyebrow: 'Pongámonos en contacto',
    headline: '¡Trabajemos en una nueva visión de tu negocio!',
    intro: null,
    recipients: []
  },
  colors: {
    primary: '#8DE1E8',
    secondary: '#1A6B80',
    accent: '#45ACBF',
    background: '#02080C',
    textPrimary: '#F8FAFC',
    textSecondary: '#C7D1D6'
  },
  social: {
    facebook: null,
    instagram: null,
    tiktok: null,
    linkedin: null,
    youtube: null,
    twitter: null,
    whatsapp: null
  },
  seo: {
    title: 'Zanders SV',
    description: 'Sitio oficial de Zanders SV.',
    keywords: [],
    canonicalBaseUrl: 'http://localhost:3000'
  },
  legal: {
    copyrightText: '© Zanders SV. Todos los derechos reservados.',
    privacyPolicy: null,
    termsAndConditions: null,
    footerLegalText: null
  }
}

const fallbackFooterSettings: FooterSettingsContent = {
  additionalText: null,
  columns: [
    {
      contentType: 'publishedPages',
      id: 'fallback-pages',
      isActive: true,
      links: [],
      order: 0,
      title: 'Páginas'
    },
    {
      contentType: 'contact',
      id: 'fallback-contact',
      isActive: true,
      links: [],
      order: 1,
      title: 'Contacto'
    },
    {
      contentType: 'socialLinks',
      id: 'fallback-social',
      isActive: true,
      links: [],
      order: 2,
      title: 'Redes'
    }
  ],
  companyNameOverride: null,
  contact: {
    address: null,
    businessHours: null,
    city: null,
    country: null,
    email: null,
    phone: null,
    useCompanySettings: true,
    whatsapp: null
  },
  isEnabled: true,
  legal: {
    copyrightText: null,
    legalText: null,
    privacyPage: null,
    termsPage: null
  },
  logo: null,
  shortDescription: null,
  showCompanyName: true,
  showLogo: true,
  socialLinks: []
}

const getCmsBaseUrl = () =>
  process.env.CMS_INTERNAL_URL ??
  process.env.NEXT_PUBLIC_CMS_URL ??
  'http://localhost:3001'

const getPublicCmsUrl = () =>
  process.env.NEXT_PUBLIC_CMS_URL ?? 'http://localhost:3001'

const resolveText = (value: unknown, fallback: string) => {
  const trimmedValue = typeof value === 'string' ? value.trim() : ''

  return trimmedValue && trimmedValue.length > 0 ? trimmedValue : fallback
}

const resolveOptionalText = (value: unknown) => {
  const trimmedValue = typeof value === 'string' ? value.trim() : ''

  return trimmedValue && trimmedValue.length > 0 ? trimmedValue : null
}

const resolveColor = (value: unknown, fallback: string) => {
  const trimmedValue = typeof value === 'string' ? value.trim() : ''

  return trimmedValue &&
    /^#(?:[0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(trimmedValue)
    ? trimmedValue
    : fallback
}

const expandHexColor = (hexColor: string) => {
  const normalizedColor = hexColor.replace('#', '')

  if (normalizedColor.length === 3) {
    return normalizedColor
      .split('')
      .map((character) => `${character}${character}`)
      .join('')
  }

  return normalizedColor
}

const hexToRgbChannels = (hexColor: string) => {
  const expandedColor = expandHexColor(hexColor)
  const red = Number.parseInt(expandedColor.slice(0, 2), 16)
  const green = Number.parseInt(expandedColor.slice(2, 4), 16)
  const blue = Number.parseInt(expandedColor.slice(4, 6), 16)

  return `${red} ${green} ${blue}`
}

const resolveCanonicalBaseUrl = (value: string | null | undefined) => {
  const fallbackUrl = fallbackCompanySettings.seo.canonicalBaseUrl
  const candidate = resolveText(value, fallbackUrl)

  try {
    const url = new URL(candidate)

    return url.toString().replace(/\/$/, '')
  } catch {
    return fallbackUrl
  }
}

const resolveKeywords = (value: string | string[] | null | undefined) => {
  if (Array.isArray(value)) {
    return value.map((keyword) => keyword.trim()).filter(Boolean)
  }

  if (typeof value !== 'string') {
    return fallbackCompanySettings.seo.keywords
  }

  return value
    .split(',')
    .map((keyword) => keyword.trim())
    .filter(Boolean)
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null

const resolveChoice = <TChoice extends string>(
  value: unknown,
  allowedChoices: readonly TChoice[],
  fallback: TChoice
): TChoice =>
  typeof value === 'string' && allowedChoices.includes(value as TChoice)
    ? (value as TChoice)
    : fallback

const resolveBoolean = (value: unknown, fallback = false) =>
  typeof value === 'boolean' ? value : fallback

const resolveNumber = (value: unknown) =>
  typeof value === 'number' && Number.isFinite(value) ? value : null

const resolveSafeClassName = (value: unknown) => {
  const className = resolveOptionalText(value)

  return className && /^[A-Za-z0-9_:\-./\s[\]]*$/.test(className)
    ? className
    : null
}

const resolveMediaUrl = (
  asset: PayloadMediaValue,
  nestingDepth = 0
): MediaAsset | null => {
  if (
    !asset ||
    typeof asset === 'string' ||
    typeof asset === 'number' ||
    !asset.url
  ) {
    return null
  }

  if (asset.url.startsWith('http')) {
    return {
      ...asset,
      poster:
        nestingDepth < 1 ? resolveMediaUrl(asset.poster, nestingDepth + 1) : null
    }
  }

  const normalizedPath = asset.url.startsWith('/') ? asset.url : `/${asset.url}`

  return {
    ...asset,
    poster:
      nestingDepth < 1 ? resolveMediaUrl(asset.poster, nestingDepth + 1) : null,
    url: `${getPublicCmsUrl()}${normalizedPath}`
  }
}

const resolveLink = (
  label: unknown,
  href: unknown,
  openInNewTab = false
): LinkTarget | null => {
  const resolvedLabel = resolveOptionalText(label)
  const resolvedHref = resolveOptionalText(href)

  if (!resolvedLabel || !resolvedHref) {
    return null
  }

  return {
    href: resolvedHref,
    label: resolvedLabel,
    openInNewTab
  }
}

const resolvePageHref = (
  page: PayloadRelationshipValue<PayloadPageSummary>
) => {
  if (!page || typeof page === 'number' || typeof page === 'string') {
    return null
  }

  if (page.status !== 'published' || !page.slug) {
    return null
  }

  return page.slug === 'home' ? '/' : `/${page.slug}`
}

const resolvePageLink = (
  page: PayloadRelationshipValue<PayloadPageSummary>,
  fallbackLabel?: string
): LinkTarget | null => {
  if (!page || typeof page === 'number' || typeof page === 'string') {
    return null
  }

  const href = resolvePageHref(page)
  const label = resolveOptionalText(page.title) ?? fallbackLabel

  return href && label ? { href, label } : null
}

const sortByOrder = <T extends { order?: number | null }>(items: T[]) =>
  items
    .map((item, index) => ({ index, item }))
    .sort((a, b) => {
      const orderA = a.item.order ?? a.index
      const orderB = b.item.order ?? b.index

      return orderA === orderB ? a.index - b.index : orderA - orderB
    })
    .map(({ item }) => item)

const resolveRelationshipId = <T extends { id?: number | string }>(
  relationship: PayloadRelationshipValue<T>
) => {
  if (!relationship) {
    return null
  }

  if (typeof relationship === 'number' || typeof relationship === 'string') {
    return String(relationship)
  }

  return relationship.id === undefined || relationship.id === null
    ? null
    : String(relationship.id)
}

const normalizePageNavigationEntry = (
  page: PayloadPageSummary
): PageNavigationEntry | null => {
  const id = resolveRelationshipId(page)
  const href = resolvePageHref(page)
  const label =
    resolveOptionalText(page.navigationLabel) ?? resolveOptionalText(page.title)

  if (!id || !href || !label) {
    return null
  }

  const parentId = resolveRelationshipId(page.parentPage)

  return {
    children: [],
    href,
    id,
    label,
    order: page.navigationOrder ?? 0,
    parentId
  }
}

const normalizePageNavigationTree = (
  entry: PageNavigationEntry
): NavigationItem => {
  const children = sortByOrder(entry.children).map(normalizePageNavigationTree)

  return {
    ...(children.length > 0 ? { children } : {}),
    href: entry.href,
    label: entry.label
  }
}

const buildPageNavigation = (
  pages: PayloadPageSummary[]
): NavigationItem[] => {
  const entries = pages
    .map(normalizePageNavigationEntry)
    .filter((entry): entry is PageNavigationEntry => Boolean(entry))
  const entriesById = new Map(entries.map((entry) => [entry.id, entry]))
  const rootEntries: PageNavigationEntry[] = []

  entries.forEach((entry) => {
    const parentEntry =
      entry.parentId && entry.parentId !== entry.id
        ? entriesById.get(entry.parentId)
        : null

    if (parentEntry) {
      parentEntry.children.push(entry)
      return
    }

    rootEntries.push(entry)
  })

  return sortByOrder(rootEntries).map(normalizePageNavigationTree)
}

const isContactNavigationItem = (item: NavigationItem) =>
  item.label.trim().toLowerCase() === 'contacto' ||
  item.href === '#contacto' ||
  item.href === '/#contacto'

const normalizeHomeContactNavigation = (
  items: NavigationItem[]
): NavigationItem[] => {
  const normalizedItems = items.map((item) => {
    const children = item.children
      ? normalizeHomeContactNavigation(item.children)
      : undefined

    if (isContactNavigationItem(item)) {
      return {
        ...item,
        children,
        href: homeContactNavigationItem.href,
        label: homeContactNavigationItem.label,
        openInNewTab: false
      }
    }

    return {
      ...item,
      ...(children ? { children } : {})
    }
  })
  const hasContactItem = normalizedItems.some((item) =>
    isContactNavigationItem(item)
  )

  return hasContactItem
    ? normalizedItems
    : [...normalizedItems, homeContactNavigationItem]
}

const normalizeNavigationItem = (
  item: PayloadNavigationItem
): NavigationItem | null => {
  if (item.isActive === false) {
    return null
  }

  const label = resolveOptionalText(item.label)

  if (!label) {
    return null
  }

  const children = sortByOrder(item.children ?? [])
    .map(normalizeNavigationItem)
    .filter((child): child is NavigationItem => Boolean(child))
  const linkType = item.linkType ?? 'page'
  const pageHref = linkType === 'page' ? resolvePageHref(item.page) : null
  const manualHref =
    linkType === 'external' || linkType === 'anchor'
      ? resolveOptionalText(item.manualUrl)
      : null
  const href = linkType === 'container' ? '' : (pageHref ?? manualHref ?? '')

  if (!href && children.length === 0) {
    return null
  }

  return {
    children,
    href,
    label,
    openInNewTab: Boolean(item.openInNewTab)
  }
}

const mediaWidthChoices = ['custom', 'full', 'normal', 'small'] as const
const mediaHeightChoices = ['auto', 'fixed', 'viewport'] as const
const mediaAlignmentChoices = ['center', 'left', 'right'] as const
const borderRadiusChoices = ['lg', 'md', 'none', 'sm', 'xl'] as const
const shadowChoices = ['none', 'soft', 'strong'] as const
const objectFitChoices = ['contain', 'cover'] as const
const videoProviderChoices = ['auto', 'direct', 'vimeo', 'youtube'] as const
const videoAspectRatioChoices = ['16:9', '1:1', '4:3', 'vertical'] as const
const snapLayoutChoices = [
  'bentoGrid',
  'contact',
  'featureLeft',
  'featureRight',
  'fourColumns',
  'mediaText',
  'mosaicGallery',
  'oneColumn',
  'serviceCards',
  'splitHero',
  'textMedia',
  'threeColumns',
  'twoColumns',
  'twoColumnsWideLeft',
  'twoColumnsWideRight'
] as const
const sectionSizeChoices = ['full', 'narrow', 'normal', 'wide'] as const
const sectionSpacingChoices = ['lg', 'md', 'none', 'sm', 'xl'] as const
const snapContentTypeChoices = [
  'button',
  'card',
  'cta',
  'iconText',
  'image',
  'list',
  'mediaText',
  'richText',
  'text',
  'video'
] as const
const footerColumnContentTypeChoices = [
  'contact',
  'customText',
  'mainNavigation',
  'manualLinks',
  'publishedPages',
  'socialLinks'
] as const
const footerSocialTypeChoices = [
  'facebook',
  'instagram',
  'linkedin',
  'other',
  'tiktok',
  'twitter',
  'website',
  'whatsapp',
  'youtube'
] as const

const resolveMediaKind = (
  media: MediaAsset | null,
  explicitKind: unknown
): 'image' | 'video' => {
  if (explicitKind === 'video' || explicitKind === 'image') {
    return explicitKind
  }

  return media?.mimeType?.startsWith('video/') ? 'video' : 'image'
}

const normalizeMediaBlock = (block: PayloadPageBlock): MediaPageBlock | null => {
  const media = resolveMediaUrl(block.media as PayloadMediaValue)

  if (!media) {
    return null
  }

  return {
    alignment: resolveChoice(block.alignment, mediaAlignmentChoices, 'center'),
    altText: resolveOptionalText(block.altText),
    autoplay: resolveBoolean(block.autoplay, false),
    borderRadius: resolveChoice(block.borderRadius, borderRadiusChoices, 'md'),
    controls: resolveBoolean(block.controls, true),
    customWidth: resolveOptionalText(block.customWidth),
    description: resolveOptionalText(block.description),
    fixedHeight: resolveOptionalText(block.fixedHeight),
    height: resolveChoice(block.height, mediaHeightChoices, 'auto'),
    id: (block.id as string | null | undefined) ?? null,
    loop: resolveBoolean(block.loop, false),
    media,
    mediaKind: resolveMediaKind(media, block.mediaKind),
    muted: resolveBoolean(block.muted, true),
    objectFit: resolveChoice(block.objectFit, objectFitChoices, 'cover'),
    poster:
      resolveMediaUrl(block.poster as PayloadMediaValue) ?? media.poster ?? null,
    shadow: resolveChoice(block.shadow, shadowChoices, 'soft'),
    showBorder: resolveBoolean(block.showBorder, false),
    title: resolveOptionalText(block.title),
    type: 'mediaBlock',
    width: resolveChoice(block.width, mediaWidthChoices, 'normal')
  }
}

const normalizeVideoBlock = (block: PayloadPageBlock): VideoPageBlock | null => {
  const videoSource = block.videoSource === 'external' ? 'external' : 'internal'
  const internalVideo = resolveMediaUrl(block.internalVideo as PayloadMediaValue)
  const externalUrl = resolveOptionalText(block.externalUrl)

  if (videoSource === 'internal' && !internalVideo) {
    return null
  }

  if (videoSource === 'external' && !externalUrl) {
    return null
  }

  return {
    aspectRatio: resolveChoice(
      block.aspectRatio,
      videoAspectRatioChoices,
      '16:9'
    ),
    autoplay: resolveBoolean(block.autoplay, false),
    controls: resolveBoolean(block.controls, true),
    description: resolveOptionalText(block.description),
    externalProvider: resolveChoice(
      block.externalProvider,
      videoProviderChoices,
      'auto'
    ),
    externalUrl,
    id: (block.id as string | null | undefined) ?? null,
    internalVideo,
    loop: resolveBoolean(block.loop, false),
    muted: resolveBoolean(block.muted, true),
    poster:
      resolveMediaUrl(block.poster as PayloadMediaValue) ??
      internalVideo?.poster ??
      null,
    title: resolveOptionalText(block.title),
    type: 'videoBlock',
    videoSource
  }
}

const normalizeSnapLayoutItem = (item: unknown): SnapLayoutItem | null => {
  if (!isRecord(item) || item.isActive === false) {
    return null
  }

  const listItems = Array.isArray(item.listItems)
    ? item.listItems
        .map((listItem) =>
          isRecord(listItem) ? resolveOptionalText(listItem.text) : null
        )
        .filter((text): text is string => Boolean(text))
    : []

  return {
    alignment: resolveChoice(item.alignment, mediaAlignmentChoices, 'left'),
    backgroundColor: resolveOptionalText(item.backgroundColor),
    borderRadius: resolveChoice(item.borderRadius, borderRadiusChoices, 'md'),
    button: resolveLink(
      item.buttonLabel,
      item.buttonUrl,
      resolveBoolean(item.buttonOpenInNewTab, false)
    ),
    contentType: resolveChoice(
      item.contentType,
      snapContentTypeChoices,
      'text'
    ),
    description: resolveOptionalText(item.description),
    iconName: resolveOptionalText(item.iconName),
    id: (item.id as string | null | undefined) ?? null,
    image: resolveMediaUrl(item.image as PayloadMediaValue),
    isActive: true,
    link: resolveLink(
      item.linkLabel,
      item.linkUrl,
      resolveBoolean(item.linkOpenInNewTab, false)
    ),
    listItems,
    padding: resolveChoice(item.padding, sectionSpacingChoices, 'md'),
    responsiveOrder: resolveNumber(item.responsiveOrder),
    richText: item.richText,
    shadow: resolveChoice(item.shadow, shadowChoices, 'none'),
    showBorder: resolveBoolean(item.showBorder, true),
    subtitle: resolveOptionalText(item.subtitle),
    textColor: resolveOptionalText(item.textColor),
    title: resolveOptionalText(item.title),
    video: resolveMediaUrl(item.video as PayloadMediaValue)
  }
}

const normalizeSnapLayoutBlock = (
  block: PayloadPageBlock
): SnapLayoutPageBlock | null => {
  if (block.isActive === false) {
    return null
  }

  return {
    alignment: resolveChoice(block.alignment, mediaAlignmentChoices, 'left'),
    backgroundColor: resolveOptionalText(block.backgroundColor),
    backgroundImage: resolveMediaUrl(block.backgroundImage as PayloadMediaValue),
    backgroundVideo: resolveMediaUrl(block.backgroundVideo as PayloadMediaValue),
    className: resolveSafeClassName(block.className),
    gap: resolveChoice(block.gap, sectionSpacingChoices, 'md'),
    id: (block.id as string | null | undefined) ?? null,
    isActive: true,
    items: Array.isArray(block.items)
      ? block.items
          .map(normalizeSnapLayoutItem)
          .filter((item): item is SnapLayoutItem => Boolean(item))
      : [],
    layout: resolveChoice(block.layout, snapLayoutChoices, 'oneColumn'),
    maxWidth: resolveChoice(block.maxWidth, sectionSizeChoices, 'wide'),
    paddingBottom: resolveChoice(
      block.paddingBottom,
      sectionSpacingChoices,
      'lg'
    ),
    paddingTop: resolveChoice(block.paddingTop, sectionSpacingChoices, 'lg'),
    sectionDescription: resolveOptionalText(block.sectionDescription),
    sectionId: resolveOptionalText(block.sectionId),
    sectionSubtitle: resolveOptionalText(block.sectionSubtitle),
    sectionTitle: resolveOptionalText(block.sectionTitle),
    textColor: resolveOptionalText(block.textColor),
    type: 'snapLayoutBlock'
  }
}

const normalizeBlocks = (blocks: PayloadPageBlock[] | null | undefined) =>
  (blocks ?? [])
    .map((block): PageBlock | null => {
      switch (block.blockType) {
        case 'hero':
          if (typeof block.title !== 'string') {
            return null
          }

          return {
            backgroundMedia: resolveMediaUrl(
              block.backgroundMedia as PayloadMediaValue
            ),
            description: resolveOptionalText(block.description as string),
            eyebrow: resolveOptionalText(block.eyebrow as string),
            id: (block.id as string | null | undefined) ?? null,
            primaryButton: resolveLink(
              block.primaryButtonLabel as string,
              block.primaryButtonUrl as string
            ),
            secondaryButton: resolveLink(
              block.secondaryButtonLabel as string,
              block.secondaryButtonUrl as string
            ),
            subtitle: resolveOptionalText(block.subtitle as string),
            title: block.title,
            type: 'hero'
          }
        case 'richText':
          return {
            alignment:
              block.alignment === 'center' || block.alignment === 'right'
                ? block.alignment
                : 'left',
            content: block.content,
            id: (block.id as string | null | undefined) ?? null,
            type: 'richText',
            width:
              block.width === 'narrow' || block.width === 'wide'
                ? block.width
                : 'normal'
          }
        case 'imageText':
          if (typeof block.title !== 'string') {
            return null
          }

          return {
            button: resolveLink(
              block.buttonLabel as string,
              block.buttonUrl as string
            ),
            description: resolveOptionalText(block.description as string),
            id: (block.id as string | null | undefined) ?? null,
            image: resolveMediaUrl(block.image as PayloadMediaValue),
            imagePosition: block.imagePosition === 'right' ? 'right' : 'left',
            title: block.title,
            type: 'imageText'
          }
        case 'cards':
          return {
            cards: Array.isArray(block.cards)
              ? block.cards
                  .map((card): CardItem | null => {
                    if (
                      typeof card !== 'object' ||
                      !card ||
                      typeof card.title !== 'string'
                    ) {
                      return null
                    }

                    return {
                      description: resolveOptionalText(
                        card.description as string
                      ),
                      media: resolveMediaUrl(card.media as PayloadMediaValue),
                      title: card.title,
                      url: resolveOptionalText(card.url as string)
                    }
                  })
                  .filter((card): card is CardItem => Boolean(card))
              : [],
            id: (block.id as string | null | undefined) ?? null,
            sectionDescription: resolveOptionalText(
              block.sectionDescription as string
            ),
            sectionTitle: resolveOptionalText(block.sectionTitle as string),
            type: 'cards'
          }
        case 'gallery':
          return {
            description: resolveOptionalText(block.description as string),
            id: (block.id as string | null | undefined) ?? null,
            images: Array.isArray(block.images)
              ? block.images
                  .map((item): GalleryImage | null => {
                    if (typeof item !== 'object' || !item) {
                      return null
                    }

                    return {
                      caption: resolveOptionalText(item.caption as string),
                      image: resolveMediaUrl(item.image as PayloadMediaValue)
                    }
                  })
                  .filter((image): image is GalleryImage => Boolean(image))
              : [],
            title: resolveOptionalText(block.title as string),
            type: 'gallery'
          }
        case 'mediaBlock':
          return normalizeMediaBlock(block)
        case 'videoBlock':
          return normalizeVideoBlock(block)
        case 'snapLayoutBlock':
          return normalizeSnapLayoutBlock(block)
        case 'cta':
          if (typeof block.title !== 'string') {
            return null
          }

          return {
            button: resolveLink(
              block.buttonLabel as string,
              block.buttonUrl as string
            ),
            description: resolveOptionalText(block.description as string),
            id: (block.id as string | null | undefined) ?? null,
            title: block.title,
            type: 'cta',
            variant:
              block.variant === 'minimal' || block.variant === 'outline'
                ? block.variant
                : 'solid'
          }
        case 'faq':
          return {
            id: (block.id as string | null | undefined) ?? null,
            items: Array.isArray(block.items)
              ? block.items
                  .map((item): FAQItem | null => {
                    if (
                      typeof item !== 'object' ||
                      !item ||
                      typeof item.question !== 'string' ||
                      typeof item.answer !== 'string'
                    ) {
                      return null
                    }

                    return {
                      answer: item.answer,
                      question: item.question
                    }
                  })
                  .filter((item): item is FAQItem => Boolean(item))
              : [],
            title: resolveOptionalText(block.title as string),
            type: 'faq'
          }
        default:
          return null
      }
    })
    .filter((block): block is PageBlock => Boolean(block))

const normalizePage = (page: PayloadPage): PageBuilderPage | null => {
  if (!page.title || !page.slug || page.status !== 'published') {
    return null
  }

  return {
    content: normalizeBlocks(page.content),
    excerpt: resolveOptionalText(page.excerpt),
    featuredImage: resolveMediaUrl(page.featuredImage),
    seo: {
      keywords: resolveKeywords(page.seo?.keywords),
      metaDescription: resolveOptionalText(page.seo?.metaDescription),
      metaTitle: resolveOptionalText(page.seo?.metaTitle),
      ogImage: resolveMediaUrl(page.seo?.ogImage)
    },
    slug: page.slug,
    status: 'published',
    title: page.title
  }
}

const normalizeFooterManualLink = (
  link: PayloadFooterManualLink
): FooterManualLink | null => {
  if (link.isActive === false) {
    return null
  }

  const resolvedLink = resolveLink(
    link.label,
    link.url,
    Boolean(link.openInNewTab)
  )

  if (!resolvedLink) {
    return null
  }

  return {
    ...resolvedLink,
    id: link.id ?? null,
    isActive: true,
    order: link.order ?? 0
  }
}

const normalizeFooterColumn = (
  column: PayloadFooterColumn
): FooterColumn | null => {
  if (column.isActive === false) {
    return null
  }

  const title = resolveOptionalText(column.title)

  if (!title) {
    return null
  }

  return {
    contentType: resolveChoice(
      column.contentType,
      footerColumnContentTypeChoices,
      'manualLinks'
    ),
    customText: resolveOptionalText(column.customText),
    id: column.id ?? null,
    isActive: true,
    links: sortByOrder(column.links ?? [])
      .map(normalizeFooterManualLink)
      .filter((link): link is FooterManualLink => Boolean(link)),
    order: column.order ?? 0,
    title
  }
}

const normalizeFooterSocialLink = (
  socialLink: PayloadFooterSocialLink
): FooterSocialLink | null => {
  if (socialLink.isActive === false) {
    return null
  }

  const name = resolveOptionalText(socialLink.name)
  const url = resolveOptionalText(socialLink.url)

  if (!name || !url) {
    return null
  }

  return {
    iconName: resolveOptionalText(socialLink.iconName),
    id: socialLink.id ?? null,
    isActive: true,
    name,
    openInNewTab: socialLink.openInNewTab !== false,
    order: socialLink.order ?? 0,
    showInFooter: socialLink.showInFooter !== false,
    showInHeader: Boolean(socialLink.showInHeader),
    type: resolveChoice(socialLink.type, footerSocialTypeChoices, 'other'),
    url
  }
}

const normalizeFooterSettings = (
  settings: PayloadFooterSettings
): FooterSettingsContent => ({
  additionalText: resolveOptionalText(settings.additionalText),
  columns: sortByOrder(settings.columns ?? [])
    .map(normalizeFooterColumn)
    .filter((column): column is FooterColumn => Boolean(column)),
  companyNameOverride: resolveOptionalText(settings.companyNameOverride),
  contact: {
    address: resolveOptionalText(settings.address),
    businessHours: resolveOptionalText(settings.businessHours),
    city: resolveOptionalText(settings.city),
    country: resolveOptionalText(settings.country),
    email: resolveOptionalText(settings.email),
    phone: resolveOptionalText(settings.phone),
    useCompanySettings: settings.useCompanySettings !== false,
    whatsapp: resolveOptionalText(settings.whatsapp)
  },
  isEnabled: settings.isEnabled !== false,
  legal: {
    copyrightText: resolveOptionalText(settings.copyrightText),
    legalText: resolveOptionalText(settings.legalText),
    privacyPage: resolvePageLink(settings.privacyPage, 'Privacidad'),
    termsPage: resolvePageLink(settings.termsPage, 'Términos')
  },
  logo: resolveMediaUrl(settings.logo),
  shortDescription: resolveOptionalText(settings.shortDescription),
  showCompanyName: settings.showCompanyName !== false,
  showLogo: settings.showLogo !== false,
  socialLinks: sortByOrder(settings.socialLinks ?? [])
    .map(normalizeFooterSocialLink)
    .filter((link): link is FooterSocialLink => Boolean(link))
})

export async function getMainNavigation(): Promise<NavigationItem[]> {
  const pageNavigation = await getPageBasedMainNavigation()

  if (pageNavigation.length > 0) {
    return normalizeHomeContactNavigation(pageNavigation)
  }

  try {
    const response = await fetch(
      `${getCmsBaseUrl()}/api/globals/main-navigation?depth=2`,
      {
        cache: 'no-store'
      }
    )

    if (!response.ok) {
      return normalizeHomeContactNavigation(fallbackNavigationItems)
    }

    const navigation = (await response.json()) as PayloadMainNavigation
    const items = sortByOrder(navigation.items ?? [])
      .map(normalizeNavigationItem)
      .filter((item): item is NavigationItem => Boolean(item))

    return normalizeHomeContactNavigation(
      items.length > 0 ? items : fallbackNavigationItems
    )
  } catch {
    return normalizeHomeContactNavigation(fallbackNavigationItems)
  }
}

async function getPageBasedMainNavigation(): Promise<NavigationItem[]> {
  const query = new URLSearchParams({
    depth: '1',
    limit: '100',
    sort: 'navigationOrder',
    'where[status][equals]': 'published',
    'where[showInMainNavigation][equals]': 'true'
  })

  try {
    const response = await fetch(`${getCmsBaseUrl()}/api/pages?${query}`, {
      cache: 'no-store'
    })

    if (!response.ok) {
      return []
    }

    const data = (await response.json()) as PagesResponse<PayloadPageSummary>

    return buildPageNavigation(data.docs ?? [])
  } catch {
    return []
  }
}

export async function getFooterSettings(): Promise<FooterSettingsContent> {
  try {
    const response = await fetch(
      `${getCmsBaseUrl()}/api/globals/footer-settings?depth=2`,
      {
        cache: 'no-store'
      }
    )

    if (!response.ok) {
      return fallbackFooterSettings
    }

    const footer = normalizeFooterSettings(
      (await response.json()) as PayloadFooterSettings
    )

    return {
      ...fallbackFooterSettings,
      ...footer,
      columns:
        footer.columns.length > 0
          ? footer.columns
          : fallbackFooterSettings.columns,
      contact: {
        ...fallbackFooterSettings.contact,
        ...footer.contact
      },
      legal: {
        ...fallbackFooterSettings.legal,
        ...footer.legal
      }
    }
  } catch {
    return fallbackFooterSettings
  }
}

export async function getPublishedPageLinks(): Promise<LinkTarget[]> {
  const query = new URLSearchParams({
    depth: '0',
    limit: '100',
    sort: 'title',
    'where[status][equals]': 'published'
  })

  try {
    const response = await fetch(`${getCmsBaseUrl()}/api/pages?${query}`, {
      cache: 'no-store'
    })

    if (!response.ok) {
      return []
    }

    const data = (await response.json()) as PagesResponse<PayloadPageSummary>

    return (data.docs ?? [])
      .filter((page) => page.showInFooter !== false)
      .sort((pageA, pageB) => {
        const orderA = pageA.navigationOrder ?? 0
        const orderB = pageB.navigationOrder ?? 0

        return orderA === orderB
          ? (pageA.title ?? '').localeCompare(pageB.title ?? '')
          : orderA - orderB
      })
      .map((page) => resolvePageLink(page))
      .filter((link): link is LinkTarget => Boolean(link))
  } catch {
    return []
  }
}

export async function getPageBySlug(
  slug: string
): Promise<PageBuilderPage | null> {
  const normalizedSlug = slug.replace(/^\/+|\/+$/g, '')
  const query = new URLSearchParams({
    depth: '1',
    limit: '1',
    'where[slug][equals]': normalizedSlug,
    'where[status][equals]': 'published'
  })

  try {
    const response = await fetch(`${getCmsBaseUrl()}/api/pages?${query}`, {
      cache: 'no-store'
    })

    if (!response.ok) {
      return null
    }

    const data = (await response.json()) as PagesResponse<PayloadPage>
    const page = data.docs?.[0]

    return page ? normalizePage(page) : null
  } catch {
    return null
  }
}

export async function getCompanySettings(): Promise<CompanySettingsContent> {
  try {
    const response = await fetch(
      `${getCmsBaseUrl()}/api/globals/company-settings?depth=1`,
      {
        cache: 'no-store'
      }
    )

    if (!response.ok) {
      return fallbackCompanySettings
    }

    const settings = (await response.json()) as PayloadCompanySettings

    return {
      commercialName: resolveText(
        settings.commercialName,
        fallbackCompanySettings.commercialName
      ),
      legalName: resolveOptionalText(settings.legalName),
      slogan: resolveText(settings.slogan, fallbackCompanySettings.slogan),
      shortDescription: resolveText(
        settings.shortDescription,
        fallbackCompanySettings.shortDescription
      ),
      longDescription: resolveOptionalText(settings.longDescription),
      mainEmail: resolveOptionalText(settings.mainEmail),
      mainPhone:
        resolveOptionalText(settings.mainPhone) ??
        fallbackCompanySettings.mainPhone,
      whatsapp:
        resolveOptionalText(settings.whatsapp) ??
        fallbackCompanySettings.whatsapp,
      address: resolveOptionalText(settings.address),
      countryCity:
        resolveOptionalText(settings.countryCity) ??
        fallbackCompanySettings.countryCity,
      businessHours: resolveOptionalText(settings.businessHours),
      logoPrimary: resolveMediaUrl(settings.logoPrimary),
      logoSecondary: resolveMediaUrl(settings.logoSecondary),
      favicon: resolveMediaUrl(settings.favicon),
      ogImage: resolveMediaUrl(settings.ogImage),
      contact: {
        eyebrow: resolveText(
          settings.contactEyebrow,
          fallbackCompanySettings.contact.eyebrow
        ),
        headline: resolveText(
          settings.contactHeadline,
          fallbackCompanySettings.contact.headline
        ),
        intro: resolveOptionalText(settings.contactIntro),
        recipients: (settings.contactRecipients ?? [])
          .map((recipient) => resolveOptionalText(recipient.email))
          .filter((email): email is string => Boolean(email))
      },
      colors: {
        primary: resolveColor(
          settings.colorPrimary,
          fallbackCompanySettings.colors.primary
        ),
        secondary: resolveColor(
          settings.colorSecondary,
          fallbackCompanySettings.colors.secondary
        ),
        accent: resolveColor(
          settings.colorAccent,
          fallbackCompanySettings.colors.accent
        ),
        background: resolveColor(
          settings.colorBackground,
          fallbackCompanySettings.colors.background
        ),
        textPrimary: resolveColor(
          settings.colorTextPrimary,
          fallbackCompanySettings.colors.textPrimary
        ),
        textSecondary: resolveColor(
          settings.colorTextSecondary,
          fallbackCompanySettings.colors.textSecondary
        )
      },
      social: {
        facebook: resolveOptionalText(settings.facebookUrl),
        instagram: resolveOptionalText(settings.instagramUrl),
        tiktok: resolveOptionalText(settings.tiktokUrl),
        linkedin: resolveOptionalText(settings.linkedinUrl),
        youtube: resolveOptionalText(settings.youtubeUrl),
        twitter: resolveOptionalText(settings.twitterUrl),
        whatsapp: resolveOptionalText(settings.whatsappUrl)
      },
      seo: {
        title: resolveText(
          settings.defaultMetaTitle,
          fallbackCompanySettings.seo.title
        ),
        description: resolveText(
          settings.defaultMetaDescription,
          fallbackCompanySettings.seo.description
        ),
        keywords: resolveKeywords(settings.globalKeywords),
        canonicalBaseUrl: resolveCanonicalBaseUrl(settings.canonicalBaseUrl)
      },
      legal: {
        copyrightText: resolveText(
          settings.copyrightText,
          fallbackCompanySettings.legal.copyrightText
        ),
        privacyPolicy: resolveOptionalText(settings.privacyPolicy),
        termsAndConditions: resolveOptionalText(settings.termsAndConditions),
        footerLegalText: resolveOptionalText(settings.footerLegalText)
      }
    }
  } catch {
    return fallbackCompanySettings
  }
}

export function getCompanyThemeVariables(
  settings: CompanySettingsContent
): Record<string, string> {
  return {
    '--zanders-bg': settings.colors.background,
    '--zanders-fg': settings.colors.textPrimary,
    '--zanders-cyan': settings.colors.primary,
    '--zanders-aqua': settings.colors.accent,
    '--zanders-teal': settings.colors.secondary,
    '--zanders-bg-rgb': hexToRgbChannels(settings.colors.background),
    '--zanders-fg-rgb': hexToRgbChannels(settings.colors.textPrimary),
    '--zanders-cyan-rgb': hexToRgbChannels(settings.colors.primary),
    '--zanders-aqua-rgb': hexToRgbChannels(settings.colors.accent),
    '--zanders-teal-rgb': hexToRgbChannels(settings.colors.secondary),
    '--zanders-muted-rgb': hexToRgbChannels(settings.colors.textSecondary),
    '--zanders-company-primary': settings.colors.primary,
    '--zanders-company-secondary': settings.colors.secondary,
    '--zanders-company-accent': settings.colors.accent,
    '--zanders-company-bg': settings.colors.background,
    '--zanders-company-text': settings.colors.textPrimary,
    '--zanders-company-muted': settings.colors.textSecondary
  }
}

export function getCompanyThemeCSS(settings: CompanySettingsContent) {
  const variables = getCompanyThemeVariables(settings)
  const declarations = Object.entries(variables)
    .map(([property, value]) => `${property}: ${value};`)
    .join('')

  return `:root{${declarations}}`
}
