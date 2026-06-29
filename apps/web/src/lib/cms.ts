export type NavbarLink = {
  id?: string
  label: string
  href: string
  openInNewTab?: boolean
}

export type MediaAsset = {
  id?: string
  alt?: string
  mimeType?: string
  url?: string
}

export type PageContent = {
  heroTitle: string
  heroSubtitle: string
  navbarLinks: NavbarLink[]
  videoBackground?: MediaAsset | null
}

type PayloadPage = {
  heroTitle?: string
  heroSubtitle?: string
  navbarLinks?: NavbarLink[]
  videoBackground?: MediaAsset | string | null
}

type PagesResponse = {
  docs?: PayloadPage[]
}

const fallbackPage: PageContent = {
  heroTitle: 'Ideas que toman forma. Tecnología que despega.',
  heroSubtitle:
    'Zanders SV crea piezas, productos personalizados e impresiones profesionales. Zanders Aero Solutions diseña, vende y opera drones para video, racing, limpieza UAV y proyectos aéreos.',
  navbarLinks: [
    { label: 'Impresiones', href: '#impresiones' },
    { label: 'Drones', href: '#drones' },
    { label: 'Contacto', href: '#contacto' }
  ],
  videoBackground: null
}

const getCmsBaseUrl = () =>
  process.env.CMS_INTERNAL_URL ??
  process.env.NEXT_PUBLIC_CMS_URL ??
  'http://localhost:3001'

const getPublicCmsUrl = () =>
  process.env.NEXT_PUBLIC_CMS_URL ?? 'http://localhost:3001'

const resolveMediaUrl = (asset: MediaAsset | string | null | undefined) => {
  if (!asset || typeof asset === 'string' || !asset.url) {
    return null
  }

  if (asset.url.startsWith('http')) {
    return asset
  }

  const normalizedPath = asset.url.startsWith('/') ? asset.url : `/${asset.url}`

  return {
    ...asset,
    url: `${getPublicCmsUrl()}${normalizedPath}`
  }
}

export async function getHomePage(): Promise<PageContent> {
  try {
    const response = await fetch(`${getCmsBaseUrl()}/api/pages?limit=1&depth=1`, {
      next: { revalidate: 60 }
    })

    if (!response.ok) {
      return fallbackPage
    }

    const data = (await response.json()) as PagesResponse
    const page = data.docs?.[0]

    if (!page) {
      return fallbackPage
    }

    return {
      heroTitle: page.heroTitle ?? fallbackPage.heroTitle,
      heroSubtitle: page.heroSubtitle ?? fallbackPage.heroSubtitle,
      navbarLinks:
        page.navbarLinks && page.navbarLinks.length > 0
          ? page.navbarLinks
          : fallbackPage.navbarLinks,
      videoBackground: resolveMediaUrl(page.videoBackground)
    }
  } catch {
    return fallbackPage
  }
}
