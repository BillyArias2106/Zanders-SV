import type { Metadata } from 'next'

import { RootPage, generatePageMetadata } from '@payloadcms/next/views'
import config from '@payload-config'

import { importMap } from '../importMap.js'

type PageParams = {
  segments?: string[]
}

type PageSearchParams = Record<string, string | string[] | undefined>

type PageProps = {
  params: Promise<PageParams>
  searchParams: Promise<PageSearchParams>
}

type PayloadParams = Promise<{
  segments: string[]
}>

type MetadataParams = Promise<Record<string, string | string[]>>

const normalizeParams = async (params: Promise<PageParams>) => {
  const { segments } = await params

  // Payload distinguishes `/admin` from `/admin/`; keep the root route segmentless.
  return segments && segments.length > 0 ? { segments } : {}
}

const normalizeSearchParams = async (searchParams: Promise<PageSearchParams>) => {
  const entries = Object.entries(await searchParams).filter(
    (entry): entry is [string, string | string[]] => entry[1] !== undefined
  )

  return Object.fromEntries(entries)
}

export const generateMetadata = ({ params, searchParams }: PageProps): Promise<Metadata> =>
  generatePageMetadata({
    config,
    params: normalizeParams(params) as MetadataParams,
    searchParams: normalizeSearchParams(searchParams)
  })

export default function Page({ params, searchParams }: PageProps) {
  return RootPage({
    config,
    importMap,
    params: normalizeParams(params) as PayloadParams,
    searchParams: normalizeSearchParams(searchParams)
  })
}
