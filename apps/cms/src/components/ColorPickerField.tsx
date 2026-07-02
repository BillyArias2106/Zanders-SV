'use client'

import type { TextFieldClientComponent } from 'payload'

import { FieldLabel, useField } from '@payloadcms/ui'

import './color-picker-field.css'

const hexColorPattern = /^#(?:[0-9A-Fa-f]{6})$/

const brandColors = [
  { label: 'Plata', value: '#D8D9DD' },
  { label: 'Azul oscuro', value: '#456B7E' },
  { label: 'Azul medio', value: '#578CA2' },
  { label: 'Azul claro', value: '#67A9BE' },
  { label: 'Aqua', value: '#76C2D0' },
  { label: 'Aqua brillante', value: '#8DE1E8' },
  { label: 'Fondo', value: '#1C2A33' }
]

const normalizeHexValue = (value: unknown) => {
  if (typeof value !== 'string') {
    return '#8DE1E8'
  }

  const trimmedValue = value.trim()

  if (!trimmedValue) {
    return '#8DE1E8'
  }

  return trimmedValue.startsWith('#') ? trimmedValue : `#${trimmedValue}`
}

const toColorInputValue = (value: string) =>
  hexColorPattern.test(value) ? value : '#8DE1E8'

export const ColorPickerField: TextFieldClientComponent = (props) => {
  const { field, path: pathFromProps, readOnly } = props
  const { label, required } = field
  const { path, setValue, showError, value } = useField<string>({
    potentiallyStalePath: pathFromProps
  })
  const normalizedValue = normalizeHexValue(value)
  const colorInputValue = toColorInputValue(normalizedValue)

  const updateColor = (nextValue: string) => {
    setValue(normalizeHexValue(nextValue).toUpperCase())
  }

  return (
    <div className="app-color-picker-field">
      <FieldLabel label={label} path={path} required={required} />
      <div className="app-color-picker-field__control">
        <input
          aria-label={`${label} selector`}
          className="app-color-picker-field__native"
          disabled={readOnly}
          onChange={(event) => updateColor(event.target.value)}
          type="color"
          value={colorInputValue}
        />
        <input
          aria-invalid={showError}
          className="app-color-picker-field__hex"
          disabled={readOnly}
          onChange={(event) => updateColor(event.target.value)}
          placeholder="#8DE1E8"
          type="text"
          value={normalizedValue}
        />
        <span
          aria-hidden="true"
          className="app-color-picker-field__preview"
          style={{ backgroundColor: colorInputValue }}
        />
      </div>
      <div
        aria-label={`${label} paleta de marca`}
        className="app-color-picker-field__swatches"
      >
        {brandColors.map((color) => (
          <button
            aria-label={`${color.label} ${color.value}`}
            className="app-color-picker-field__swatch"
            disabled={readOnly}
            key={color.value}
            onClick={() => updateColor(color.value)}
            style={{ backgroundColor: color.value }}
            title={`${color.label} ${color.value}`}
            type="button"
          />
        ))}
      </div>
    </div>
  )
}
