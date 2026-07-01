import type { MediaAsset, ObjectFit } from '@/lib/cms'

const objectFitClassName = {
  contain: 'object-contain',
  cover: 'object-cover'
} satisfies Record<ObjectFit, string>

type MediaAssetViewProps = {
  alt?: string | null
  autoPlay?: boolean
  className?: string
  controls?: boolean
  loop?: boolean
  media?: MediaAsset | null
  muted?: boolean
  objectFit?: ObjectFit
  poster?: MediaAsset | null
}

export function MediaAssetView({
  alt,
  autoPlay = false,
  className = 'h-full w-full',
  controls = true,
  loop = false,
  media,
  muted = true,
  objectFit = 'cover',
  poster
}: MediaAssetViewProps) {
  if (!media?.url) {
    return null
  }

  const fitClassName = objectFitClassName[objectFit]
  const isVideo =
    media.mediaType === 'video' || media.mimeType?.startsWith('video/')

  if (isVideo) {
    return (
      <video
        autoPlay={autoPlay}
        className={`${className} ${fitClassName}`}
        controls={controls}
        loop={loop}
        muted={muted}
        playsInline
        poster={poster?.url ?? media.poster?.url ?? undefined}
        src={media.url}
      />
    )
  }

  return (
    <img
      alt={alt ?? media.alt ?? ''}
      className={`${className} ${fitClassName}`}
      src={media.url}
    />
  )
}
