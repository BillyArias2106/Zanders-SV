'use client'

import type { CSSProperties, PointerEvent, ReactNode } from 'react'
import { useEffect, useId, useRef, useState } from 'react'
import { RotateCw } from 'lucide-react'
import { twMerge } from 'tailwind-merge'

import {
  clamp,
  getVisualContentClassName,
  getVisualContentStyle,
  normalizeLayerOverride,
  normalizeVisualOverrides,
  round,
  setActiveVisualEditElement,
  subscribeToVisualEdit,
  syncActiveVisualEditElement,
  updateVisualEditOverride,
  type VisualLayerOverride,
} from './visual-edit-store'

export { getVisualContentClassName, getVisualContentStyle }
export type { VisualLayerOverride }

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

type ResizeHandle = 'e' | 'n' | 'ne' | 'nw' | 's' | 'se' | 'sw' | 'w'

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
    typeof override.x === 'number' ||
    typeof override.y === 'number' ||
    typeof override.rotation === 'number'
      ? `translate(${override.x ?? 0}px, ${override.y ?? 0}px) rotate(${override.rotation ?? 0}deg)`
      : undefined,
  transformOrigin: 'center center',
  width: override.width ? `${override.width}px` : 'fit-content',
  zIndex:
    typeof override.x === 'number' ||
    typeof override.y === 'number' ||
    typeof override.rotation === 'number'
      ? 40
      : undefined,
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
    'pointer-events-auto absolute z-50 rounded-full border-2 border-white bg-[#7c3aed] shadow-[0_0_0_3px_rgba(124,58,237,0.2),0_0_20px_rgba(59,130,246,0.42)] transition-transform hover:scale-125',
    handle === 'n' ? '-top-1.5 left-1/2 h-3 w-8 -translate-x-1/2 cursor-ns-resize' : '',
    handle === 's' ? '-bottom-1.5 left-1/2 h-3 w-8 -translate-x-1/2 cursor-ns-resize' : '',
    handle === 'e' ? '-right-1.5 top-1/2 h-8 w-3 -translate-y-1/2 cursor-ew-resize' : '',
    handle === 'w' ? '-left-1.5 top-1/2 h-8 w-3 -translate-y-1/2 cursor-ew-resize' : '',
    handle === 'nw' ? '-left-2 -top-2 h-4 w-4 cursor-nwse-resize' : '',
    handle === 'ne' ? '-right-2 -top-2 h-4 w-4 cursor-nesw-resize' : '',
    handle === 'sw' ? '-bottom-2 -left-2 h-4 w-4 cursor-nesw-resize' : '',
    handle === 'se' ? '-bottom-2 -right-2 h-4 w-4 cursor-nwse-resize' : '',
  )

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
  const [activeId, setActiveId] = useState<string | null>(null)
  const [override, setOverride] = useState<VisualLayerOverride>(() =>
    normalizeLayerOverride(visualOverrides?.[fieldPath]),
  )
  const canEdit = isPreview && typeof sectionIndex === 'number'
  const isActive = canEdit && activeId === wrapperId

  const activate = () => {
    if (typeof sectionIndex !== 'number') {
      return
    }

    setActiveVisualEditElement({
      fieldPath,
      id: wrapperId,
      label,
      override,
      sectionIndex,
      visualOverrides,
    })
  }

  useEffect(
    () =>
      subscribeToVisualEdit((snapshot) => {
        setActiveId(snapshot.activeElement?.id ?? null)

        if (snapshot.activeElement?.id === wrapperId) {
          setOverride(snapshot.activeElement.override)
        }
      }),
    [wrapperId],
  )

  useEffect(() => {
    const nextOverride = normalizeLayerOverride(visualOverrides?.[fieldPath])

    setOverride(nextOverride)
    syncActiveVisualEditElement({
      fieldPath,
      id: wrapperId,
      label,
      sectionIndex,
      visualOverrides,
    })
  }, [fieldPath, label, sectionIndex, visualOverrides, wrapperId])

  useEffect(() => {
    if (!canEdit || !isActive) {
      return
    }

    const handleOutsidePointerDown = (event: globalThis.PointerEvent) => {
      const target = event.target as HTMLElement | null

      if (target?.closest('[data-visual-edit-control]')) {
        return
      }

      if (!wrapperRef.current?.contains(event.target as Node)) {
        setActiveVisualEditElement(null)
      }
    }

    window.addEventListener('pointerdown', handleOutsidePointerDown)
    return () => window.removeEventListener('pointerdown', handleOutsidePointerDown)
  }, [canEdit, isActive])

  const startMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!canEdit || event.button !== 0) {
      return
    }

    const target = event.target as HTMLElement

    event.preventDefault()
    event.stopPropagation()
    activate()

    if (target.closest('[data-visual-edit-control]')) {
      return
    }

    const startX = event.clientX
    const startY = event.clientY
    const currentX = override.x ?? 0
    const currentY = override.y ?? 0

    const handlePointerMove = (moveEvent: globalThis.PointerEvent) => {
      updateVisualEditOverride({
        x: round(clamp(currentX + moveEvent.clientX - startX, -3000, 3000)),
        y: round(clamp(currentY + moveEvent.clientY - startY, -3000, 3000)),
      })
    }

    const handlePointerUp = () => {
      updateVisualEditOverride({}, true)
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
    activate()

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

        patch.fontSize = round(
          clamp(startFontSize + deltaY * direction * 0.18 + diagonalBoost, 10, 160),
        )
      }

      updateVisualEditOverride(patch)
    }

    const handlePointerUp = () => {
      updateVisualEditOverride({}, true)
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerup', handlePointerUp)
    }

    window.addEventListener('pointermove', handlePointerMove)
    window.addEventListener('pointerup', handlePointerUp, { once: true })
  }

  const startRotate = (event: PointerEvent<HTMLButtonElement>) => {
    if (!canEdit || event.button !== 0) {
      return
    }

    event.preventDefault()
    event.stopPropagation()
    activate()

    const element = wrapperRef.current

    if (!element) {
      return
    }

    const rect = element.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const startAngle = Math.atan2(event.clientY - centerY, event.clientX - centerX)
    const startRotation = override.rotation ?? 0

    const handlePointerMove = (moveEvent: globalThis.PointerEvent) => {
      const angle = Math.atan2(moveEvent.clientY - centerY, moveEvent.clientX - centerX)
      const degrees = ((angle - startAngle) * 180) / Math.PI

      updateVisualEditOverride({
        rotation: round(clamp(startRotation + degrees, -360, 360)),
      })
    }

    const handlePointerUp = () => {
      updateVisualEditOverride({}, true)
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerup', handlePointerUp)
    }

    window.addEventListener('pointermove', handlePointerMove)
    window.addEventListener('pointerup', handlePointerUp, { once: true })
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
          ? 'outline-[#2563eb] shadow-[0_0_0_4px_rgba(37,99,235,0.18),0_0_34px_rgba(124,58,237,0.22)]'
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
        activate()
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

          <button
            aria-label={`Rotar ${label ?? fieldPath}`}
            className="pointer-events-auto absolute -bottom-12 left-1/2 z-50 grid h-8 w-8 -translate-x-1/2 place-items-center rounded-full border-2 border-white bg-white text-blue-700 shadow-[0_10px_30px_rgba(15,23,42,0.25)] transition hover:scale-110"
            data-visual-edit-control
            onPointerDown={startRotate}
            type="button"
          >
            <RotateCw size={16} strokeWidth={2.5} />
          </button>
          <div className="pointer-events-none absolute -bottom-4 left-1/2 h-4 w-px -translate-x-1/2 bg-blue-500/70" />
        </>
      ) : null}
    </div>
  )
}
