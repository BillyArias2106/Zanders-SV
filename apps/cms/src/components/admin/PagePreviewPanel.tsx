'use client'

import type { KeyboardEvent, PointerEvent } from 'react'
import { useEffect, useMemo, useRef, useState } from 'react'

import { useForm, useFormFields } from '@payloadcms/ui'
import { reduceFieldsToValues } from 'payload/shared'

import { formatPageSlug } from '../../lib/page-composer'
import './page-composer-admin.css'

type PageValues = Record<string, unknown> & {
  slug?: unknown
  title?: unknown
}

type PreviewDevice = 'desktop' | 'mobile' | 'tablet'

type VisualEditUpdate = {
  path: string
  value: unknown
}

const deviceWidths: Record<PreviewDevice, number> = {
  desktop: 1440,
  mobile: 390,
  tablet: 768,
}

const DEFAULT_PANEL_WIDTH = 520
const MAX_PANEL_WIDTH = 920
const MIN_PANEL_WIDTH = 300
const PANEL_WIDTH_STORAGE_KEY = 'zandersv-page-preview-width'

const clampPanelWidth = (width: number) =>
  Math.min(MAX_PANEL_WIDTH, Math.max(MIN_PANEL_WIDTH, Math.round(width)))

const getPublicBaseUrl = () => {
  const configuredUrl =
    process.env.NEXT_PUBLIC_WEB_PUBLIC_URL ?? process.env.NEXT_PUBLIC_WEB_URL

  if (configuredUrl) {
    return configuredUrl.replace(/\/$/, '')
  }

  if (typeof window === 'undefined') {
    return 'http://localhost:3000'
  }

  const currentUrl = new URL(window.location.href)
  currentUrl.port = currentUrl.port === '3001' ? '3000' : currentUrl.port
  currentUrl.pathname = ''
  currentUrl.search = ''
  currentUrl.hash = ''

  return currentUrl.toString().replace(/\/$/, '')
}

const getPagePath = (slugValue: unknown, titleValue: unknown) => {
  const rawValue =
    typeof slugValue === 'string' && slugValue.trim()
      ? slugValue
      : typeof titleValue === 'string'
        ? titleValue
        : 'vista-previa'
  const slug = formatPageSlug(rawValue)

  return slug === 'home' || slug === 'inicio' ? '/' : `/${slug || 'vista-previa'}`
}

const isVisualEditUpdate = (value: unknown): value is VisualEditUpdate =>
  Boolean(
    value &&
      typeof value === 'object' &&
      'path' in value &&
      typeof (value as { path?: unknown }).path === 'string',
  )

export function PagePreviewPanel() {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [device, setDevice] = useState<PreviewDevice>('desktop')
  const [hasLoadedPanelWidth, setHasLoadedPanelWidth] = useState(false)
  const [panelWidth, setPanelWidth] = useState(DEFAULT_PANEL_WIDTH)
  const [refreshKey, setRefreshKey] = useState(0)
  const [status, setStatus] = useState('Lista')
  const { setModified } = useForm()
  const dispatchField = useFormFields(([, dispatch]) => dispatch)
  const values = useFormFields(([fields]) =>
    reduceFieldsToValues(fields, true),
  ) as PageValues
  const [previewValues, setPreviewValues] = useState<PageValues>(values)
  const valuesSignature = useMemo(() => JSON.stringify(values), [values])
  const url = useMemo(() => {
    const previewUrl = new URL(
      getPagePath(previewValues.slug, previewValues.title),
      getPublicBaseUrl(),
    )
    previewUrl.searchParams.set('cmsPreview', 'page')
    return previewUrl.toString()
  }, [previewValues.slug, previewValues.title])

  useEffect(() => {
    const storedWidth = Number(window.localStorage.getItem(PANEL_WIDTH_STORAGE_KEY))

    if (Number.isFinite(storedWidth)) {
      setPanelWidth(clampPanelWidth(storedWidth))
    }

    setHasLoadedPanelWidth(true)
  }, [])

  useEffect(() => {
    document.documentElement.style.setProperty('--zandersv-page-preview-width', `${panelWidth}px`)

    if (hasLoadedPanelWidth) {
      window.localStorage.setItem(PANEL_WIDTH_STORAGE_KEY, String(panelWidth))
    }
  }, [hasLoadedPanelWidth, panelWidth])

  useEffect(() => {
    setStatus((current) => (current === 'Actualizando...' ? current : 'Actualizando...'))
    const timeout = window.setTimeout(() => {
      setPreviewValues(JSON.parse(valuesSignature) as PageValues)
      setStatus((current) => (current === 'Actualizada' ? current : 'Actualizada'))
    }, 350)

    return () => window.clearTimeout(timeout)
  }, [valuesSignature])

  useEffect(() => {
    setIsLoaded(false)
  }, [url, refreshKey])

  useEffect(() => {
    if (!isLoaded || !iframeRef.current?.contentWindow) {
      return
    }

    iframeRef.current.contentWindow.postMessage(
      {
        collectionSlug: 'pages',
        data: previewValues,
        type: 'payload-live-preview',
      },
      new URL(url).origin,
    )
  }, [isLoaded, previewValues, url])

  useEffect(() => {
    const expectedOrigin = new URL(url).origin

    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== expectedOrigin) {
        return
      }

      const message = event.data as { type?: unknown; updates?: unknown } | null

      if (!message || message.type !== 'cms-visual-edit' || !Array.isArray(message.updates)) {
        return
      }

      message.updates.forEach((update) => {
        if (!isVisualEditUpdate(update)) {
          return
        }

        dispatchField({
          path: update.path,
          type: 'UPDATE',
          value: update.value,
        })
      })

      if (message.updates.length > 0) {
        setModified(true)
      }
    }

    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [dispatchField, setModified, url])

  const handleResizeStart = (event: PointerEvent<HTMLButtonElement>) => {
    event.preventDefault()

    const startX = event.clientX
    const startWidth = panelWidth

    document.body.classList.add('is-resizing-page-preview')

    const handlePointerMove = (moveEvent: globalThis.PointerEvent) => {
      setPanelWidth(clampPanelWidth(startWidth + startX - moveEvent.clientX))
    }

    const handlePointerUp = () => {
      document.body.classList.remove('is-resizing-page-preview')
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerup', handlePointerUp)
    }

    window.addEventListener('pointermove', handlePointerMove)
    window.addEventListener('pointerup', handlePointerUp, { once: true })
  }

  const handleResizeKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      setPanelWidth((current) => clampPanelWidth(current + 32))
    }

    if (event.key === 'ArrowRight') {
      event.preventDefault()
      setPanelWidth((current) => clampPanelWidth(current - 32))
    }

    if (event.key === 'Home') {
      event.preventDefault()
      setPanelWidth(MIN_PANEL_WIDTH)
    }

    if (event.key === 'End') {
      event.preventDefault()
      setPanelWidth(MAX_PANEL_WIDTH)
    }
  }

  return (
    <section className={`app-page-preview${isExpanded ? ' is-expanded' : ''}`}>
      <button
        aria-label="Cambiar ancho de la vista previa"
        aria-valuemax={MAX_PANEL_WIDTH}
        aria-valuemin={MIN_PANEL_WIDTH}
        aria-valuenow={panelWidth}
        className="app-page-preview__resize-handle"
        onDoubleClick={() => setPanelWidth(DEFAULT_PANEL_WIDTH)}
        onKeyDown={handleResizeKeyDown}
        onPointerDown={handleResizeStart}
        role="slider"
        title="Arrastra para cambiar el ancho. Doble clic para restablecer."
        type="button"
      >
        <span />
      </button>
      <div className="app-page-preview__header">
        <div>
          <p>VISTA PREVIA</p>
          <h2>Asi se vera la pagina</h2>
          <span>{status}</span>
        </div>
        <div>
          {(['desktop', 'tablet', 'mobile'] as PreviewDevice[]).map((item) => (
            <button
              aria-pressed={device === item}
              className={device === item ? 'is-active' : undefined}
              key={item}
              onClick={() => setDevice(item)}
              type="button"
            >
              {item === 'desktop' ? 'Escritorio' : item === 'tablet' ? 'Tablet' : 'Movil'}
            </button>
          ))}
          <button onClick={() => setRefreshKey((current) => current + 1)} type="button">
            Recargar
          </button>
          <button onClick={() => setIsExpanded((current) => !current)} type="button">
            {isExpanded ? 'Reducir' : 'Ampliar'}
          </button>
          <a href={url} rel="noreferrer" target="_blank">
            Abrir
          </a>
        </div>
      </div>
      <div className="app-page-preview__frame-wrap" data-device={device}>
        <iframe
          className="app-page-preview__frame"
          key={`${url}-${refreshKey}`}
          onLoad={() => setIsLoaded(true)}
          ref={iframeRef}
          src={url}
          style={{ maxWidth: deviceWidths[device] }}
          title="Vista previa de pagina"
        />
      </div>
    </section>
  )
}
