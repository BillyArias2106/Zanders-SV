'use client'

import { FormEvent, useState } from 'react'

type RegisterResponse = {
  error?: string
  ok?: boolean
  redirectTo?: string
}

export function RegisterForm() {
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')
    setIsSubmitting(true)

    const formData = new FormData(event.currentTarget)
    const payload = {
      confirmPassword: formData.get('confirmPassword'),
      email: formData.get('email'),
      name: formData.get('name'),
      password: formData.get('password')
    }

    try {
      const response = await fetch('/admin-register/api', {
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST'
      })
      const data = (await response.json()) as RegisterResponse

      if (!response.ok || !data.ok) {
        if (data.redirectTo) {
          window.location.href = data.redirectTo
          return
        }

        setError(data.error ?? 'No se pudo crear el usuario.')
        return
      }

      window.location.href = data.redirectTo ?? '/admin/login?registered=1'
    } catch {
      setError('No se pudo conectar con el registro.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form className="app-register-form" onSubmit={handleSubmit}>
      <label>
        Nombre
        <input autoComplete="name" name="name" type="text" />
      </label>
      <label>
        Correo
        <input autoComplete="email" name="email" required type="email" />
      </label>
      <label>
        Contraseña
        <input
          autoComplete="new-password"
          minLength={8}
          name="password"
          required
          type="password"
        />
      </label>
      <label>
        Confirmar contraseña
        <input
          autoComplete="new-password"
          minLength={8}
          name="confirmPassword"
          required
          type="password"
        />
      </label>
      {error ? <p className="app-register-form__error">{error}</p> : null}
      <button disabled={isSubmitting} type="submit">
        {isSubmitting ? 'Creando...' : 'Crear usuario'}
      </button>
    </form>
  )
}
