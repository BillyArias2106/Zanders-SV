import type { MediaAsset, VideoPageBlock, VideoProvider } from '@/lib/cms'

import { MediaAssetView } from './media-asset'

const aspectRatioClassName = {
  '16:9': 'aspect-video',
  '1:1': 'aspect-square',
  '4:3': 'aspect-[4/3]',
  vertical: 'aspect-[9/16]'
} satisfies Record<VideoPageBlock['aspectRatio'], string>

const getUrl = (url: string) => {
  try {
    return new URL(url)
  } catch {
    return null
  }
}

const getYouTubeId = (url: string) => {
  const parsedUrl = getUrl(url)

  if (!parsedUrl) {
    return null
  }

  if (parsedUrl.hostname.includes('youtu.be')) {
    return parsedUrl.pathname.replace('/', '') || null
  }

  if (!parsedUrl.hostname.includes('youtube')) {
    return null
  }

  if (parsedUrl.pathname.startsWith('/embed/')) {
    return parsedUrl.pathname.split('/')[2] ?? null
  }

  return parsedUrl.searchParams.get('v')
}

const getVimeoId = (url: string) => {
  const parsedUrl = getUrl(url)

  if (!parsedUrl || !parsedUrl.hostname.includes('vimeo')) {
    return null
  }

  return parsedUrl.pathname
    .split('/')
    .find((pathPart) => /^\d+$/.test(pathPart))
}

const detectProvider = (
  url: string,
  explicitProvider: VideoProvider
): Exclude<VideoProvider, 'auto'> => {
  if (explicitProvider !== 'auto') {
    return explicitProvider
  }

  if (getYouTubeId(url)) {
    return 'youtube'
  }

  if (getVimeoId(url)) {
    return 'vimeo'
  }

  return 'direct'
}

const buildYouTubeEmbedUrl = (block: VideoPageBlock, videoId: string) => {
  const params = new URLSearchParams({
    autoplay: block.autoplay ? '1' : '0',
    controls: block.controls ? '1' : '0',
    loop: block.loop ? '1' : '0',
    mute: block.muted ? '1' : '0',
    playsinline: '1'
  })

  if (block.loop) {
    params.set('playlist', videoId)
  }

  return `https://www.youtube.com/embed/${videoId}?${params}`
}

const buildVimeoEmbedUrl = (block: VideoPageBlock, videoId: string) => {
  const params = new URLSearchParams({
    autoplay: block.autoplay ? '1' : '0',
    controls: block.controls ? '1' : '0',
    loop: block.loop ? '1' : '0',
    muted: block.muted ? '1' : '0'
  })

  return `https://player.vimeo.com/video/${videoId}?${params}`
}

const buildExternalVideo = (url: string): MediaAsset => ({
  mediaType: 'video',
  mimeType: 'video/mp4',
  url
})

export function VideoBlock({ block }: { block: VideoPageBlock }) {
  const externalUrl = block.externalUrl
  const provider = externalUrl
    ? detectProvider(externalUrl, block.externalProvider)
    : 'direct'
  const youtubeId = externalUrl ? getYouTubeId(externalUrl) : null
  const vimeoId = externalUrl ? getVimeoId(externalUrl) : null
  const embedUrl =
    provider === 'youtube' && youtubeId
      ? buildYouTubeEmbedUrl(block, youtubeId)
      : provider === 'vimeo' && vimeoId
        ? buildVimeoEmbedUrl(block, vimeoId)
        : null
  const directVideo =
    block.videoSource === 'internal'
      ? block.internalVideo
      : externalUrl && provider === 'direct'
        ? buildExternalVideo(externalUrl)
        : null

  return (
    <section className="border-y border-cyan-200/12 bg-deep-900/55 py-16">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        {block.title || block.description ? (
          <div className="mb-7 max-w-3xl">
            {block.title ? (
              <h2 className="font-heading text-4xl font-bold uppercase leading-none text-silver-50">
                {block.title}
              </h2>
            ) : null}
            {block.description ? (
              <p className="mt-4 text-base leading-8 text-silver-300">
                {block.description}
              </p>
            ) : null}
          </div>
        ) : null}
        <div
          className={`overflow-hidden border border-cyan-200/18 bg-deep-950 shadow-panel ${aspectRatioClassName[block.aspectRatio]}`}
        >
          {embedUrl ? (
            <iframe
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="h-full w-full"
              loading="lazy"
              src={embedUrl}
              title={block.title ?? 'Video'}
            />
          ) : (
            <MediaAssetView
              autoPlay={block.autoplay}
              className="h-full w-full"
              controls={block.controls}
              loop={block.loop}
              media={directVideo}
              muted={block.muted}
              objectFit="cover"
              poster={block.poster}
            />
          )}
        </div>
      </div>
    </section>
  )
}
