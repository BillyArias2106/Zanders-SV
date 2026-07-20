'use client'

import { useEffect, useState } from 'react'

import { SliceRenderer } from '@/components/content-slices/SliceRenderer'
import { GlobalTopToolbar } from '@/components/page-composer/GlobalTopToolbar'
import type { SitePage, SiteProfile } from '@/lib/cms'

type PageLivePreviewCanvasProps = {
  initialPage: SitePage
  siteProfile: SiteProfile
}

const cmsPublicUrl = (process.env.NEXT_PUBLIC_CMS_URL ?? 'http://localhost:3001').replace(/\/$/, '')

const mediaFieldNames = new Set([
  'backgroundMedia',
  'file',
  'image',
  'logo',
  'media',
  'mobileMedia',
  'poster',
  'video',
])

const fetchMediaById = async (
  id: number | string,
  cache: Map<number | string, unknown>,
) => {
  if (cache.has(id)) {
    return cache.get(id)
  }

  const response = await fetch(`${cmsPublicUrl}/api/media/${id}`, {
    credentials: 'include',
  })

  if (!response.ok) {
    return id
  }

  const media = await response.json()
  cache.set(id, media)

  return media
}

const hydratePreviewMedia = async (
  value: unknown,
  cache: Map<number | string, unknown>,
  key?: string,
): Promise<unknown> => {
  if (
    key &&
    mediaFieldNames.has(key) &&
    (typeof value === 'number' || (typeof value === 'string' && value.trim()))
  ) {
    return fetchMediaById(value, cache)
  }

  if (Array.isArray(value)) {
    return Promise.all(value.map((item) => hydratePreviewMedia(item, cache)))
  }

  if (!value || typeof value !== 'object') {
    return value
  }

  const entries = await Promise.all(
    Object.entries(value).map(async ([entryKey, entryValue]) => [
      entryKey,
      await hydratePreviewMedia(entryValue, cache, entryKey),
    ]),
  )

  return Object.fromEntries(entries)
}

export function PageLivePreviewCanvas({ initialPage, siteProfile }: PageLivePreviewCanvasProps) {
  const [page, setPage] = useState(initialPage)

  useEffect(() => {
    const mediaCache = new Map<number | string, unknown>()

    const receivePreview = async (event: MessageEvent) => {
      const message = event.data as {
        collectionSlug?: string
        data?: Partial<SitePage>
        type?: string
      } | null

      if (
        message?.type !== 'payload-live-preview' ||
        message.collectionSlug !== 'pages' ||
        !message.data
      ) {
        return
      }

      const hydratedData = await hydratePreviewMedia(message.data, mediaCache)

      setPage((current) => ({ ...current, ...(hydratedData as Partial<SitePage>) } as SitePage))
    }

    window.addEventListener('message', receivePreview)
    return () => window.removeEventListener('message', receivePreview)
  }, [])

  return (
    <>
      <GlobalTopToolbar />
      <SliceRenderer isPreview page={page} siteProfile={siteProfile} />
    </>
  )
}
