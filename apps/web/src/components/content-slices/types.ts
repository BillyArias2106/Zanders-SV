import type { MediaAsset, PageSection, SiteProfile } from '@/lib/cms'

export type SliceComponentProps<TSection extends PageSection = PageSection> = {
  isPreview?: boolean
  section: TSection
  sectionIndex?: number
  siteProfile: SiteProfile
  visualOverrides?: Record<string, unknown> | null
}

export type SliceAction = {
  id?: string | null
  label?: string | null
  openInNewTab?: boolean | null
  url?: string | null
}

export type SafeSliceAction = Omit<SliceAction, 'label' | 'url'> & {
  label: string
  url: string
}

export type FeatureGridItem = {
  description?: string | null
  icon?: string | null
  id?: string | null
  link?: SliceAction | null
  media?: MediaAsset | number | string | null
  title?: string | null
}

export type HeroSliceSection = PageSection & {
  actions?: unknown
  backgroundMedia?: MediaAsset | number | string | null
  description?: string | null
  eyebrow?: string | null
  media?: MediaAsset | number | string | null
  purpose?: 'campaign' | 'clear-intro' | 'institutional' | 'product-focus' | null
  title?: string | null
}

export type FeatureGridSliceSection = PageSection & {
  eyebrow?: string | null
  intro?: string | null
  items?: unknown
  purpose?: 'bento-showcase' | 'editorial' | 'simple-grid' | null
  title?: string | null
}

export type CTASliceSection = PageSection & {
  actions?: unknown
  description?: string | null
  eyebrow?: string | null
  finePrint?: string | null
  purpose?: 'contact' | 'conversion' | 'navigation' | 'subscription' | null
  title?: string | null
}

export const getMediaUrl = (media: MediaAsset | number | string | null | undefined) =>
  media && typeof media === 'object' && 'url' in media && typeof media.url === 'string'
    ? media.url
    : null

export const getMediaAlt = (
  media: MediaAsset | number | string | null | undefined,
  fallback = '',
) =>
  media && typeof media === 'object' && 'alt' in media && typeof media.alt === 'string'
    ? media.alt
    : fallback

export const isVideoMedia = (media: MediaAsset | number | string | null | undefined) => {
  if (!media || typeof media !== 'object') {
    return false
  }

  return media.mediaType === 'video' || media.mimeType?.startsWith('video/') === true
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  Boolean(value && typeof value === 'object')

export const getSafeActions = (actions: unknown): SafeSliceAction[] =>
  (Array.isArray(actions) ? actions : []).filter(
    (action): action is SafeSliceAction =>
      isRecord(action) &&
      typeof action.label === 'string' &&
      typeof action.url === 'string' &&
      Boolean(action.label.trim() && action.url.trim()),
  )

export const getSafeFeatureItems = (items: unknown): FeatureGridItem[] =>
  (Array.isArray(items) ? items : []).filter(
    (item): item is FeatureGridItem =>
      isRecord(item) && typeof item.title === 'string' && Boolean(item.title.trim()),
  )
