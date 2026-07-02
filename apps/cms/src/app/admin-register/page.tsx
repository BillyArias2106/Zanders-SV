import config from '@payload-config'
import { redirect } from 'next/navigation'
import { getPayload } from 'payload'

import { RegisterForm } from './RegisterForm'
import './register.css'

export const dynamic = 'force-dynamic'

export default async function RegisterPage() {
  const payload = await getPayload({ config })
  const users = await payload.count({
    collection: 'users',
    overrideAccess: true
  })

  if (users.totalDocs === 0) {
    redirect('/admin/create-first-user')
  }

  return (
    <main className="app-register-page">
      <section className="app-register-panel">
        <p className="app-register-panel__eyebrow">CMS</p>
        <h1>Registrarse</h1>
        <p>
          Crea tu usuario para entrar al panel administrativo. Después podrás
          iniciar sesión normalmente.
        </p>
        <RegisterForm />
        <a className="app-register-panel__login" href="/admin/login">
          Ya tengo usuario
        </a>
      </section>
    </main>
  )
}
