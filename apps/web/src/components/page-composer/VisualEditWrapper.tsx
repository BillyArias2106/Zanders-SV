'use client'

import type { CSSProperties, PointerEvent, ReactNode } from 'react'
import { useEffect, useId, useRef, useState } from 'react'
import { AlignCenter, AlignLeft, AlignRight, Minus, Plus, RotateCcw } from 'lucide-react'
import { twMerge } from 'tailwind-merge'

type TextAlign = 'center' | 'left' | 'right'
type FontStyle = 'italic' | 'normal'
type FontWeight = 'bold' | 'normal'
type TextDecoration = 'line-through' | 'none' | 'underline'
type TextTransform = 'lowercase' | 'none' | 'uppercase'

export type VisualLayerOverride = {
  backgroundColor?: string
  color?: string
  fontFamily?: string
  fontSize?: number
  fontStyle?: FontStyle
  fontWeight?: FontWeight
  opacity?: number
  textAlign?: TextAlign
  textDecoration?: TextDecoration
  textTransform?: TextTransform
  width?: number
  x?: number
  y?: number
}

type VisualOverrides = Record<string, VisualLayerOverride>

type VisualEditWrapperProps = {
  children: ReactNode
  className?: string
  displayBlock?: boolean
  fieldPath: string
  isPreview?: boolean
  label?: string
  maxWidth?: string
  sectionIndex?: number
  visualOverrides?: Record<string, unknown> | null
}

type VisualEditUpdate = {
  path: string
  value: unknown
}

type ResizeHandle = 'e' | 'n' | 'ne' | 'nw' | 's' | 'se' | 'sw' | 'w'

const draftOverridesBySection = new Map<number, VisualOverrides>()
const debounceTimersBySection = new Map<number, number>()
const activeListeners = new Set<(activeId: string | null) => void>()
let activeVisualEditId: string | null = null

const fontOptions = [
  { label: 'Inter', value: 'Inter, ui-sans-serif, system-ui, sans-serif' },
  { label: 'Serif', value: 'Georgia, Cambria, "Times New Roman", Times, serif' },
  { label: 'Mono', value: '"SFMono-Regular", Consolas, "Liberation Mono", monospace' },
  { label: 'Display', value: 'Montserrat, Inter, ui-sans-serif, system-ui, sans-serif' },
]

const isRecord = (value: unknown): value is Record<string, unknown> =>
  Boolean(value && typeof value === 'object' && !Array.isArray(value))

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value))

const round = (value: number) => Math.round(value * 100) / 100

const isColor = (value: unknown): value is string =>
  typeof value === 'string' && /^#([0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i.test(value)

const getNumber = (value: unknown, min: number, max: number) =>
  typeof value === 'number' && Number.isFinite(value) ? clamp(value, min, max) : undefined

const getString = (value: unknown) =>
  typeof value === 'string' && value.trim() ? value : undefined

const getTextAlign = (value: unknown): TextAlign | undefined =>
  value === 'left' || value === 'center' || value === 'right' ? value : undefined

const getFontStyle = (value: unknown): FontStyle | undefined =>
  value === 'italic' || value === 'normal' ? value : undefined

const getFontWeight = (value: unknown): FontWeight | undefined =>
  value === 'bold' || value === 'normal' ? value : undefined

const getTextDecoration = (value: unknown): TextDecoration | undefined =>
  value === 'underline' || value === 'line-through' || value === 'none' ? value : undefined

const getTextTransform = (value: unknown): TextTransform | undefined =>
  value === 'uppercase' || value === 'lowercase' || value === 'none' ? value : undefined

const setActiveVisualEditId = (id: string | null) => {
  activeVisualEditId = id
  activeListeners.forEach((listener) => listener(activeVisualEditId))
}

const subscribeToActiveVisualEdit = (listener: (activeId: string | null) => void) => {
  activeListeners.add(listener)
  listener(activeVisualEditId)

  return () => {
    activeListeners.delete(listener)
  }
}

export const normalizeLayerOverride = (value: unknown): VisualLayerOverride => {
  if (!isRecord(value)) {
    return {}
  }

  return {
    backgroundColor: isColor(value.backgroundColor) ? value.backgroundColor : undefined,
    color: isColor(value.color) ? value.color : undefined,
    fontFamily: getString(value.fontFamily),
    fontSize: getNumber(value.fontSize, 10, 160),
    fontStyle: getFontStyle(value.fontStyle),
    fontWeight: getFontWeight(value.fontWeight),
    opacity: getNumber(value.opacity, 0, 100),
    textAlign: getTextAlign(value.textAlign),
    textDecoration: getTextDecoration(value.textDecoration),
    textTransform: getTextTransform(value.textTransform),
    width: getNumber(value.width, 40, 2400),
    x: getNumber(value.x, -3000, 3000),
    y: getNumber(value.y, -3000, 3000),
  }
}

const normalizeVisualOverrides = (
  visualOverrides: Record<string, unknown> | null | undefined,
): VisualOverrides => {
  if (!isRecord(visualOverrides)) {
    return {}
  }

  return Object.fromEntries(
    Object.entries(visualOverrides).map(([key, value]) => [key, normalizeLayerOverride(value)]),
  )
}

export const getVisualContentStyle = (
  visualOverrides: Record<string, unknown> | null | undefined,
  fieldPath: string,
): CSSProperties => {
  const override = normalizeLayerOverride(visualOverrides?.[fieldPath])

  return {
    '--visual-bg-color': override.backgroundColor ?? 'transparent',
    '--visual-text-color': override.color ?? 'inherit',
    backgroundColor: override.backgroundColor,
    color: override.color,
    fontFamily: override.fontFamily,
    fontSize: override.fontSize ? `${override.fontSize}px` : undefined,
    fontStyle: override.fontStyle,
    fontWeight: override.fontWeight,
    opacity: typeof override.opacity === 'number' ? override.opacity / 100 : undefined,
    overflowWrap: 'break-word',
    textAlign: override.textAlign,
    textDecoration: override.textDecoration,
    textTransform: override.textTransform === 'none' ? 'none' : override.textTransform,
    whiteSpace: 'normal',
    wordBreak: 'break-word',
  } as CSSProperties
}

export const getVisualContentClassName = (
  visualOverrides: Record<string, unknown> | null | undefined,
  fieldPath: string,
) => {
  const override = normalizeLayerOverride(visualOverrides?.[fieldPath])

  return twMerge(
    'break-words whitespace-normal [overflow-wrap:break-word] [word-break:break-word]',
    override.color ? '[&_*]:![background-image:none] [&_*]:![color:inherit]' : '',
    override.fontFamily ? '[&_*]:![font-family:inherit]' : '',
    override.fontSize ? '[&_*]:![font-size:inherit]' : '',
    override.fontStyle ? '[&_*]:![font-style:inherit]' : '',
    override.fontWeight ? '[&_*]:![font-weight:inherit]' : '',
    override.textDecoration ? '[&_*]:![text-decoration:inherit]' : '',
    override.textTransform ? '[&_*]:![text-transform:inherit]' : '',
    override.backgroundColor ? '[&_a]:![background-color:inherit]' : '',
  )
}

const sendVisualEditUpdates = (updates: VisualEditUpdate[]) => {
  if (typeof window === 'undefined' || window.parent === window || updates.length === 0) {
    return
  }

  window.parent.postMessage({ type: 'cms-visual-edit', updates }, '*')
}

const scheduleVisualOverridesCommit = ({
  immediate = false,
  sectionIndex,
  value,
}: {
  immediate?: boolean
  sectionIndex: number
  value: VisualOverrides
}) => {
  const existingTimer = debounceTimersBySection.get(sectionIndex)

  if (existingTimer) {
    window.clearTimeout(existingTimer)
    debounceTimersBySection.delete(sectionIndex)
  }

  const commit = () => {
    sendVisualEditUpdates([
      {
        path: `sections.${sectionIndex}.visualOverrides`,
        value,
      },
    ])
  }

  if (immediate) {
    commit()
    return
  }

  debounceTimersBySection.set(sectionIndex, window.setTimeout(commit, 90))
}

const mergeDraftOverride = ({
  fieldPath,
  immediate,
  patch,
  sectionIndex,
  visualOverrides,
}: {
  fieldPath: string
  immediate?: boolean
  patch: VisualLayerOverride
  sectionIndex: number
  visualOverrides: Record<string, unknown> | null | undefined
}) => {
  const base = draftOverridesBySection.get(sectionIndex) ?? normalizeVisualOverrides(visualOverrides)
  const nextLayer = {
    ...(base[fieldPath] ?? {}),
    ...patch,
  }
  const nextOverrides = {
    ...base,
    [fieldPath]: nextLayer,
  }

  draftOverridesBySection.set(sectionIndex, nextOverrides)
  scheduleVisualOverridesCommit({ immediate, sectionIndex, value: nextOverrides })

  return nextLayer
}

const resetDraftOverride = ({
  fieldPath,
  sectionIndex,
  visualOverrides,
}: {
  fieldPath: string
  sectionIndex: number
  visualOverrides: Record<string, unknown> | null | undefined
}) => {
  const base = draftOverridesBySection.get(sectionIndex) ?? normalizeVisualOverrides(visualOverrides)
  const nextOverrides = { ...base, [fieldPath]: {} }

  draftOverridesBySection.set(sectionIndex, nextOverrides)
  scheduleVisualOverridesCommit({ immediate: true, sectionIndex, value: nextOverrides })

  return {}
}

const getBoxStyle = ({
  maxWidth,
  override,
}: {
  maxWidth: string
  override: VisualLayerOverride
}): CSSProperties => ({
  maxWidth,
  position: 'relative',
  transform:
    typeof override.x === 'number' || typeof override.y === 'number'
      ? `translate(${override.x ?? 0}px, ${override.y ?? 0}px)`
      : undefined,
  width: override.width ? `${override.width}px` : 'fit-content',
  zIndex: typeof override.x === 'number' || typeof override.y === 'number' ? 40 : undefined,
})

const getCurrentFontSize = (element: HTMLElement | null, fallback?: number) => {
  if (!element) {
    return fallback ?? 18
  }

  const computed = Number.parseFloat(window.getComputedStyle(element).fontSize)

  return Number.isFinite(computed) ? computed : fallback ?? 18
}

const getHandleClassName = (handle: ResizeHandle) =>
  twMerge(
    'pointer-events-auto absolute z-50 rounded-full border-2 border-white bg-[#3b82f6] shadow-[0_0_0_3px_rgba(59,130,246,0.22),0_0_20px_rgba(139,92,246,0.45)] transition-transform hover:scale-125',
    handle === 'n' ? '-top-1.5 left-1/2 h-3 w-8 -translate-x-1/2 cursor-ns-resize' : '',
    handle === 's' ? '-bottom-1.5 left-1/2 h-3 w-8 -translate-x-1/2 cursor-ns-resize' : '',
    handle === 'e' ? '-right-1.5 top-1/2 h-8 w-3 -translate-y-1/2 cursor-ew-resize' : '',
    handle === 'w' ? '-left-1.5 top-1/2 h-8 w-3 -translate-y-1/2 cursor-ew-resize' : '',
    handle === 'nw' ? '-left-2 -top-2 h-4 w-4 cursor-nwse-resize' : '',
    handle === 'ne' ? '-right-2 -top-2 h-4 w-4 cursor-nesw-resize' : '',
    handle === 'sw' ? '-bottom-2 -left-2 h-4 w-4 cursor-nesw-resize' : '',
    handle === 'se' ? '-bottom-2 -right-2 h-4 w-4 cursor-nwse-resize' : '',
  )

const controlButtonClassName =
  'grid h-8 w-8 place-items-center rounded-lg text-white/72 transition hover:bg-white/10 hover:text-white'

const activeControlButtonClassName = 'bg-white/12 text-white ring-1 ring-white/15'

export function VisualEditWrapper({
  children,
  className,
  displayBlock = true,
  fieldPath,
  isPreview = false,
  label,
  maxWidth = '48rem',
  sectionIndex,
  visualOverrides,
}: VisualEditWrapperProps) {
  const wrapperId = useId()
  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const contentRef = useRef<HTMLDivElement | null>(null)
  const [activeId, setActiveId] = useState<string | null>(activeVisualEditId)
  const [toolbarPosition, setToolbarPosition] = useState<{ left: number; top: number } | null>(null)
  const [override, setOverride] = useState<VisualLayerOverride>(() =>
    normalizeLayerOverride(visualOverrides?.[fieldPath]),
  )
  const canEdit = isPreview && typeof sectionIndex === 'number'
  const isActive = canEdit && activeId === wrapperId

  const refreshToolbarPosition = () => {
    const element = wrapperRef.current

    if (!element) {
      return
    }

    const rect = element.getBoundingClientRect()

    setToolbarPosition({
      left: rect.left + rect.width / 2,
      top: Math.max(14, rect.top - 12),
    })
  }

  useEffect(() => subscribeToActiveVisualEdit(setActiveId), [])

  useEffect(() => {
    setOverride(normalizeLayerOverride(visualOverrides?.[fieldPath]))
  }, [fieldPath, visualOverrides])

  useEffect(() => {
    if (!canEdit || !isActive) {
      return
    }

    refreshToolbarPosition()

    const handleOutsidePointerDown = (event: globalThis.PointerEvent) => {
      const target = event.target as HTMLElement | null

      if (target?.closest('[data-visual-edit-control]')) {
        return
      }

      if (!wrapperRef.current?.contains(event.target as Node)) {
        setActiveVisualEditId(null)
      }
    }
    const handleViewportChange = () => refreshToolbarPosition()

    window.addEventListener('pointerdown', handleOutsidePointerDown)
    window.addEventListener('resize', handleViewportChange)
    window.addEventListener('scroll', handleViewportChange, true)
    return () => {
      window.removeEventListener('pointerdown', handleOutsidePointerDown)
      window.removeEventListener('resize', handleViewportChange)
      window.removeEventListener('scroll', handleViewportChange, true)
    }
  }, [canEdit, isActive])

  const updateOverride = (patch: VisualLayerOverride, immediate = false) => {
    if (typeof sectionIndex !== 'number') {
      return
    }

    const nextLayer = mergeDraftOverride({
      fieldPath,
      immediate,
      patch,
      sectionIndex,
      visualOverrides,
    })

    setOverride(nextLayer)
    window.requestAnimationFrame(refreshToolbarPosition)
  }

  const resetOverride = () => {
    if (typeof sectionIndex !== 'number') {
      return
    }

    setOverride(resetDraftOverride({ fieldPath, sectionIndex, visualOverrides }))
    window.requestAnimationFrame(refreshToolbarPosition)
  }

  const startMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!canEdit || event.button !== 0) {
      return
    }

    const target = event.target as HTMLElement

    event.preventDefault()
    event.stopPropagation()
    setActiveVisualEditId(wrapperId)

    if (target.closest('[data-visual-edit-control]')) {
      return
    }

    const startX = event.clientX
    const startY = event.clientY
    const currentX = override.x ?? 0
    const currentY = override.y ?? 0

    const handlePointerMove = (moveEvent: globalThis.PointerEvent) => {
      updateOverride({
        x: round(clamp(currentX + moveEvent.clientX - startX, -3000, 3000)),
        y: round(clamp(currentY + moveEvent.clientY - startY, -3000, 3000)),
      })
    }

    const handlePointerUp = () => {
      scheduleVisualOverridesCommit({
        immediate: true,
        sectionIndex,
        value: draftOverridesBySection.get(sectionIndex) ?? normalizeVisualOverrides(visualOverrides),
      })
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerup', handlePointerUp)
    }

    window.addEventListener('pointermove', handlePointerMove)
    window.addEventListener('pointerup', handlePointerUp, { once: true })
  }

  const startResize = (handle: ResizeHandle) => (event: PointerEvent<HTMLButtonElement>) => {
    if (!canEdit || event.button !== 0) {
      return
    }

    event.preventDefault()
    event.stopPropagation()
    setActiveVisualEditId(wrapperId)

    const element = wrapperRef.current

    if (!element) {
      return
    }

    const startX = event.clientX
    const startY = event.clientY
    const startWidth = override.width ?? element.getBoundingClientRect().width
    const startFontSize = override.fontSize ?? getCurrentFontSize(contentRef.current)
    const maxWidthPx = Math.max(80, Math.min(window.innerWidth * 0.95, 2400))

    const handlePointerMove = (moveEvent: globalThis.PointerEvent) => {
      const deltaX = moveEvent.clientX - startX
      const deltaY = moveEvent.clientY - startY
      const patch: VisualLayerOverride = {}

      if (handle.includes('e') || handle.includes('w')) {
        const direction = handle.includes('e') ? 1 : -1

        patch.width = round(clamp(startWidth + deltaX * direction, 40, maxWidthPx))
      }

      if (handle.includes('n') || handle.includes('s')) {
        const direction = handle.includes('s') ? 1 : -1
        const diagonalBoost = handle.length === 2 ? Math.abs(deltaX) * 0.02 : 0

        patch.fontSize = round(clamp(startFontSize + deltaY * direction * 0.18 + diagonalBoost, 10, 160))
      }

      updateOverride(patch)
    }

    const handlePointerUp = () => {
      scheduleVisualOverridesCommit({
        immediate: true,
        sectionIndex,
        value: draftOverridesBySection.get(sectionIndex) ?? normalizeVisualOverrides(visualOverrides),
      })
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerup', handlePointerUp)
    }

    window.addEventListener('pointermove', handlePointerMove)
    window.addEventListener('pointerup', handlePointerUp, { once: true })
  }

  const updateFontSize = (value: number) => {
    updateOverride({ fontSize: round(clamp(value, 10, 160)) }, true)
  }

  const toggleValue = <TValue extends string>(
    key: keyof VisualLayerOverride,
    activeValue: TValue,
    inactiveValue: TValue,
  ) => {
    updateOverride(
      {
        [key]: override[key] === activeValue ? inactiveValue : activeValue,
      } as VisualLayerOverride,
      true,
    )
  }

  const boxStyle = getBoxStyle({ maxWidth, override })
  const contentStyle = getVisualContentStyle({ [fieldPath]: override }, fieldPath)

  return (
    <div
      aria-label={label}
      className={twMerge(
        displayBlock ? 'block' : 'inline-block align-middle',
        'group/visual-edit relative w-fit max-w-full',
        canEdit
          ? 'cursor-move select-none rounded-xl outline outline-1 outline-transparent transition-[outline,box-shadow] duration-200 hover:outline-[#8b5cf6]/55 hover:shadow-[0_0_0_4px_rgba(59,130,246,0.08)] [&_a]:pointer-events-none'
          : '',
        isActive
          ? 'outline-[#3b82f6] shadow-[0_0_0_4px_rgba(59,130,246,0.18),0_0_34px_rgba(139,92,246,0.22)]'
          : '',
        className,
      )}
      data-visual-edit-active={isActive ? 'true' : undefined}
      data-visual-edit-wrapper={wrapperId}
      onClick={(event) => {
        if (!canEdit) {
          return
        }

        event.preventDefault()
        event.stopPropagation()
        setActiveVisualEditId(wrapperId)
      }}
      onPointerDown={startMove}
      ref={wrapperRef}
      style={boxStyle}
    >
      <div
        className={getVisualContentClassName({ [fieldPath]: override }, fieldPath)}
        ref={contentRef}
        style={contentStyle}
      >
        {children}
      </div>

      {isActive ? (
        <>
          <div
            className="pointer-events-auto fixed z-[9999] flex -translate-x-1/2 -translate-y-full flex-wrap items-center gap-1 rounded-2xl border border-white/12 bg-[#111827]/94 p-1.5 text-white shadow-[0_22px_80px_rgba(0,0,0,0.35)] backdrop-blur-2xl"
            data-visual-edit-control
            onPointerDown={(event) => event.stopPropagation()}
            style={{
              left: toolbarPosition?.left ?? 0,
              maxWidth: 'min(94vw, 760px)',
              top: toolbarPosition?.top ?? 0,
            }}
          >
            <select
              aria-label="Fuente"
              className="h-8 rounded-lg border border-white/10 bg-white/8 px-2 text-xs font-semibold text-white outline-none transition hover:bg-white/12"
              onChange={(event) => updateOverride({ fontFamily: event.target.value }, true)}
              value={override.fontFamily ?? ''}
            >
              <option className="text-slate-950" value="">
                Fuente
              </option>
              {fontOptions.map((font) => (
                <option className="text-slate-950" key={font.value} value={font.value}>
                  {font.label}
                </option>
              ))}
            </select>
            <span className="mx-1 h-5 w-px bg-white/12" />
            <button
              aria-label="Reducir tamano"
              className={controlButtonClassName}
              onClick={(event) => {
                event.preventDefault()
                updateFontSize((override.fontSize ?? getCurrentFontSize(contentRef.current)) - 2)
              }}
              type="button"
            >
              <Minus size={14} strokeWidth={2.6} />
            </button>
            <input
              aria-label="Tamano de fuente"
              className="h-8 w-14 rounded-lg border border-white/10 bg-white/8 text-center text-xs font-bold text-white outline-none"
              max={160}
              min={10}
              onChange={(event) => updateFontSize(Number(event.target.value))}
              type="number"
              value={Math.round(override.fontSize ?? getCurrentFontSize(contentRef.current))}
            />
            <button
              aria-label="Aumentar tamano"
              className={controlButtonClassName}
              onClick={(event) => {
                event.preventDefault()
                updateFontSize((override.fontSize ?? getCurrentFontSize(contentRef.current)) + 2)
              }}
              type="button"
            >
              <Plus size={14} strokeWidth={2.6} />
            </button>
            <span className="mx-1 h-5 w-px bg-white/12" />
            <label className="grid h-8 w-8 cursor-pointer place-items-center rounded-lg border border-white/10 bg-white/8 text-[10px] font-black text-white/72 transition hover:bg-white/12 hover:text-white">
              T
              <input
                aria-label="Color de texto"
                className="sr-only"
                onChange={(event) => updateOverride({ color: event.target.value }, true)}
                type="color"
                value={override.color ?? '#ffffff'}
              />
            </label>
            <label className="grid h-8 w-8 cursor-pointer place-items-center rounded-lg border border-white/10 bg-white/8 text-[10px] font-black text-white/72 transition hover:bg-white/12 hover:text-white">
              BG
              <input
                aria-label="Color de fondo"
                className="sr-only"
                onChange={(event) => updateOverride({ backgroundColor: event.target.value }, true)}
                type="color"
                value={override.backgroundColor ?? '#000000'}
              />
            </label>
            <span className="mx-1 h-5 w-px bg-white/12" />
            <button
              aria-label="Negrita"
              className={twMerge(
                controlButtonClassName,
                override.fontWeight === 'bold' ? activeControlButtonClassName : '',
              )}
              onClick={(event) => {
                event.preventDefault()
                toggleValue('fontWeight', 'bold', 'normal')
              }}
              type="button"
            >
              <span className="text-sm font-black">B</span>
            </button>
            <button
              aria-label="Cursiva"
              className={twMerge(
                controlButtonClassName,
                override.fontStyle === 'italic' ? activeControlButtonClassName : '',
              )}
              onClick={(event) => {
                event.preventDefault()
                toggleValue('fontStyle', 'italic', 'normal')
              }}
              type="button"
            >
              <span className="font-serif text-sm italic">I</span>
            </button>
            <button
              aria-label="Subrayado"
              className={twMerge(
                controlButtonClassName,
                override.textDecoration === 'underline' ? activeControlButtonClassName : '',
              )}
              onClick={(event) => {
                event.preventDefault()
                updateOverride(
                  {
                    textDecoration:
                      override.textDecoration === 'underline' ? 'none' : 'underline',
                  },
                  true,
                )
              }}
              type="button"
            >
              <span className="text-sm underline">U</span>
            </button>
            <button
              aria-label="Tachado"
              className={twMerge(
                controlButtonClassName,
                override.textDecoration === 'line-through' ? activeControlButtonClassName : '',
              )}
              onClick={(event) => {
                event.preventDefault()
                updateOverride(
                  {
                    textDecoration:
                      override.textDecoration === 'line-through' ? 'none' : 'line-through',
                  },
                  true,
                )
              }}
              type="button"
            >
              <span className="text-sm line-through">S</span>
            </button>
            <button
              aria-label="Mayusculas"
              className={twMerge(
                controlButtonClassName,
                override.textTransform === 'uppercase' ? activeControlButtonClassName : '',
              )}
              onClick={(event) => {
                event.preventDefault()
                updateOverride(
                  {
                    textTransform:
                      override.textTransform === 'uppercase' ? 'none' : 'uppercase',
                  },
                  true,
                )
              }}
              type="button"
            >
              <span className="text-[11px] font-black">AA</span>
            </button>
            <button
              aria-label="Minusculas"
              className={twMerge(
                controlButtonClassName,
                override.textTransform === 'lowercase' ? activeControlButtonClassName : '',
              )}
              onClick={(event) => {
                event.preventDefault()
                updateOverride(
                  {
                    textTransform:
                      override.textTransform === 'lowercase' ? 'none' : 'lowercase',
                  },
                  true,
                )
              }}
              type="button"
            >
              <span className="text-[11px] font-black">aa</span>
            </button>
            <span className="mx-1 h-5 w-px bg-white/12" />
            <button
              aria-label="Alinear a la izquierda"
              className={twMerge(
                controlButtonClassName,
                override.textAlign === 'left' ? activeControlButtonClassName : '',
              )}
              onClick={(event) => {
                event.preventDefault()
                updateOverride({ textAlign: 'left' }, true)
              }}
              type="button"
            >
              <AlignLeft size={15} strokeWidth={2.4} />
            </button>
            <button
              aria-label="Alinear al centro"
              className={twMerge(
                controlButtonClassName,
                override.textAlign === 'center' ? activeControlButtonClassName : '',
              )}
              onClick={(event) => {
                event.preventDefault()
                updateOverride({ textAlign: 'center' }, true)
              }}
              type="button"
            >
              <AlignCenter size={15} strokeWidth={2.4} />
            </button>
            <button
              aria-label="Alinear a la derecha"
              className={twMerge(
                controlButtonClassName,
                override.textAlign === 'right' ? activeControlButtonClassName : '',
              )}
              onClick={(event) => {
                event.preventDefault()
                updateOverride({ textAlign: 'right' }, true)
              }}
              type="button"
            >
              <AlignRight size={15} strokeWidth={2.4} />
            </button>
            <span className="mx-1 h-5 w-px bg-white/12" />
            <label className="flex h-8 items-center gap-2 rounded-lg border border-white/10 bg-white/8 px-2 text-[11px] font-bold text-white/72">
              Op
              <input
                aria-label="Opacidad"
                className="w-20 accent-cyan-200"
                max={100}
                min={0}
                onChange={(event) => updateOverride({ opacity: Number(event.target.value) }, true)}
                type="range"
                value={override.opacity ?? 100}
              />
              <span className="w-7 text-right">{Math.round(override.opacity ?? 100)}</span>
            </label>
            <button
              aria-label="Resetear estilo y posicion"
              className={controlButtonClassName}
              onClick={(event) => {
                event.preventDefault()
                resetOverride()
              }}
              type="button"
            >
              <RotateCcw size={14} strokeWidth={2.4} />
            </button>
          </div>

          {(['nw', 'n', 'ne', 'e', 'se', 's', 'sw', 'w'] as const).map((handle) => (
            <button
              aria-label={`Redimensionar ${label ?? fieldPath}`}
              className={getHandleClassName(handle)}
              data-visual-edit-control
              key={handle}
              onPointerDown={startResize(handle)}
              type="button"
            />
          ))}
        </>
      ) : null}
    </div>
  )
}
