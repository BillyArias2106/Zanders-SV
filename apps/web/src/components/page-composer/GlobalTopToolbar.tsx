'use client'

import { useEffect, useState } from 'react'
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Minus,
  Plus,
  RotateCcw,
} from 'lucide-react'
import { twMerge } from 'tailwind-merge'

import {
  clamp,
  resetVisualEditOverride,
  round,
  subscribeToVisualEdit,
  type TextAlign,
  updateVisualEditOverride,
  type VisualEditSnapshot,
} from './visual-edit-store'

const fontOptions = [
  { label: 'Open Sans', value: '"Open Sans", Inter, ui-sans-serif, system-ui, sans-serif' },
  { label: 'Inter', value: 'Inter, ui-sans-serif, system-ui, sans-serif' },
  { label: 'Montserrat', value: 'Montserrat, Inter, ui-sans-serif, system-ui, sans-serif' },
  { label: 'Serif', value: 'Georgia, Cambria, "Times New Roman", Times, serif' },
  { label: 'Mono', value: '"SFMono-Regular", Consolas, "Liberation Mono", monospace' },
]

const textAlignCycle: TextAlign[] = ['left', 'center', 'right', 'justify']

const buttonClassName =
  'grid h-9 min-w-9 place-items-center rounded-lg border border-slate-200 bg-white px-2 text-sm font-bold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50'

const activeButtonClassName = 'border-blue-500 bg-blue-50 text-blue-700'

const getNextAlign = (align: TextAlign | undefined) => {
  const index = textAlignCycle.indexOf(align ?? 'left')

  return textAlignCycle[(index + 1) % textAlignCycle.length]
}

const AlignIcon = ({ align }: { align?: TextAlign }) => {
  if (align === 'center') {
    return <AlignCenter size={17} strokeWidth={2.2} />
  }

  if (align === 'right') {
    return <AlignRight size={17} strokeWidth={2.2} />
  }

  if (align === 'justify') {
    return <AlignJustify size={17} strokeWidth={2.2} />
  }

  return <AlignLeft size={17} strokeWidth={2.2} />
}

export function GlobalTopToolbar() {
  const [snapshot, setSnapshot] = useState<VisualEditSnapshot>({ activeElement: null })
  const activeElement = snapshot.activeElement
  const override = activeElement?.override ?? {}
  const fontSize = Math.round(override.fontSize ?? 18)

  useEffect(() => subscribeToVisualEdit(setSnapshot), [])

  if (!activeElement) {
    return null
  }

  const updateFontSize = (value: number) => {
    updateVisualEditOverride({ fontSize: round(clamp(value, 10, 160)) }, true)
  }

  return (
    <div
      className="fixed left-0 top-0 z-[10000] flex min-h-14 w-full flex-nowrap items-center gap-2 overflow-x-auto border-b border-slate-200 bg-white px-3 py-2 text-slate-900 shadow-sm"
      data-visual-edit-control
      onPointerDown={(event) => event.stopPropagation()}
    >
      <div className="mr-1 min-w-28 text-xs font-bold uppercase tracking-[0.14em] text-slate-400">
        {activeElement.label ?? activeElement.fieldPath}
      </div>

      <select
        aria-label="Fuente"
        className="h-9 w-36 rounded-lg border border-slate-200 bg-white px-2 text-sm font-semibold outline-none transition hover:border-slate-300"
        onChange={(event) => updateVisualEditOverride({ fontFamily: event.target.value }, true)}
        value={override.fontFamily ?? ''}
      >
        <option value="">Fuente</option>
        {fontOptions.map((font) => (
          <option key={font.value} value={font.value}>
            {font.label}
          </option>
        ))}
      </select>

      <div className="flex items-center rounded-lg border border-slate-200 bg-white">
        <button
          aria-label="Reducir tamano"
          className="grid h-9 w-9 place-items-center text-slate-700 hover:bg-slate-50"
          onClick={() => updateFontSize(fontSize - 2)}
          type="button"
        >
          <Minus size={15} strokeWidth={2.5} />
        </button>
        <input
          aria-label="Tamano de fuente"
          className="h-9 w-14 border-x border-slate-200 text-center text-sm font-bold outline-none"
          max={160}
          min={10}
          onChange={(event) => updateFontSize(Number(event.target.value))}
          type="number"
          value={fontSize}
        />
        <button
          aria-label="Aumentar tamano"
          className="grid h-9 w-9 place-items-center text-slate-700 hover:bg-slate-50"
          onClick={() => updateFontSize(fontSize + 2)}
          type="button"
        >
          <Plus size={15} strokeWidth={2.5} />
        </button>
      </div>

      <div className="h-8 w-px bg-slate-200" />

      <button
        aria-label="Negrita"
        className={twMerge(buttonClassName, override.fontWeight === 'bold' ? activeButtonClassName : '')}
        onClick={() =>
          updateVisualEditOverride(
            { fontWeight: override.fontWeight === 'bold' ? 'normal' : 'bold' },
            true,
          )
        }
        type="button"
      >
        B
      </button>
      <button
        aria-label="Cursiva"
        className={twMerge(buttonClassName, override.fontStyle === 'italic' ? activeButtonClassName : '')}
        onClick={() =>
          updateVisualEditOverride(
            { fontStyle: override.fontStyle === 'italic' ? 'normal' : 'italic' },
            true,
          )
        }
        type="button"
      >
        <span className="font-serif italic">I</span>
      </button>
      <button
        aria-label="Subrayado"
        className={twMerge(
          buttonClassName,
          override.textDecoration === 'underline' ? activeButtonClassName : '',
        )}
        onClick={() =>
          updateVisualEditOverride(
            {
              textDecoration: override.textDecoration === 'underline' ? 'none' : 'underline',
            },
            true,
          )
        }
        type="button"
      >
        <span className="underline">U</span>
      </button>
      <button
        aria-label="Mayusculas o minusculas"
        className={twMerge(
          buttonClassName,
          override.textTransform && override.textTransform !== 'none' ? activeButtonClassName : '',
        )}
        onClick={() => {
          const next =
            override.textTransform === 'uppercase'
              ? 'lowercase'
              : override.textTransform === 'lowercase'
                ? 'none'
                : 'uppercase'

          updateVisualEditOverride({ textTransform: next }, true)
        }}
        type="button"
      >
        Aa
      </button>

      <button
        aria-label="Alineacion"
        className={buttonClassName}
        onClick={() => updateVisualEditOverride({ textAlign: getNextAlign(override.textAlign) }, true)}
        type="button"
      >
        <AlignIcon align={override.textAlign} />
      </button>

      <div className="h-8 w-px bg-slate-200" />

      <label className="flex h-9 items-center gap-2 rounded-lg border border-slate-200 bg-white px-2 text-xs font-bold text-slate-600">
        Texto
        <input
          aria-label="Color de texto"
          className="h-6 w-7 cursor-pointer border-0 bg-transparent p-0"
          onChange={(event) => updateVisualEditOverride({ color: event.target.value }, true)}
          type="color"
          value={override.color ?? '#111827'}
        />
      </label>
      <label className="flex h-9 items-center gap-2 rounded-lg border border-slate-200 bg-white px-2 text-xs font-bold text-slate-600">
        Fondo
        <input
          aria-label="Color de fondo"
          className="h-6 w-7 cursor-pointer border-0 bg-transparent p-0"
          onChange={(event) =>
            updateVisualEditOverride({ backgroundColor: event.target.value }, true)
          }
          type="color"
          value={override.backgroundColor ?? '#ffffff'}
        />
      </label>

      <div className="h-8 w-px shrink-0 bg-slate-200" />

      <label className="flex h-9 shrink-0 items-center gap-2 rounded-lg border border-slate-200 bg-white px-2 text-xs font-bold text-slate-600">
        Espacio
        <input
          aria-label="Espaciado entre letras"
          className="w-24 accent-blue-600"
          max={30}
          min={-10}
          onChange={(event) =>
            updateVisualEditOverride({ letterSpacing: Number(event.target.value) }, true)
          }
          step={0.5}
          type="range"
          value={override.letterSpacing ?? 0}
        />
      </label>
      <label className="flex h-9 shrink-0 items-center gap-2 rounded-lg border border-slate-200 bg-white px-2 text-xs font-bold text-slate-600">
        Alto
        <input
          aria-label="Altura de linea"
          className="w-24 accent-blue-600"
          max={3}
          min={0.75}
          onChange={(event) =>
            updateVisualEditOverride({ lineHeight: Number(event.target.value) }, true)
          }
          step={0.05}
          type="range"
          value={override.lineHeight ?? 1.1}
        />
      </label>
      <label className="flex h-9 shrink-0 items-center gap-2 rounded-lg border border-slate-200 bg-white px-2 text-xs font-bold text-slate-600">
        Opacidad
        <input
          aria-label="Transparencia"
          className="w-24 accent-blue-600"
          max={100}
          min={0}
          onChange={(event) =>
            updateVisualEditOverride({ opacity: Number(event.target.value) }, true)
          }
          type="range"
          value={override.opacity ?? 100}
        />
        <span className="w-7 text-right">{Math.round(override.opacity ?? 100)}</span>
      </label>

      <button
        aria-label="Resetear"
        className={buttonClassName}
        onClick={() => resetVisualEditOverride()}
        type="button"
      >
        <RotateCcw size={16} strokeWidth={2.3} />
      </button>
    </div>
  )
}
