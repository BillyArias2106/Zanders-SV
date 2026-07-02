import config from '@payload-config'
import { getPayload } from 'payload'

type RegisterPayload = {
  confirmPassword?: unknown
  email?: unknown
  name?: unknown
  password?: unknown
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const normalizeText = (value: unknown) =>
  typeof value === 'string' ? value.trim() : ''

export async function POST(request: Request) {
  const payload = await getPayload({ config })
  const users = await payload.count({
    collection: 'users',
    overrideAccess: true
  })

  if (users.totalDocs === 0) {
    return Response.json(
      {
        error: 'Primero crea el usuario principal.',
        ok: false,
        redirectTo: '/admin/create-first-user'
      },
      { status: 409 }
    )
  }

  const body = (await request.json().catch(() => ({}))) as RegisterPayload
  const email = normalizeText(body.email).toLowerCase()
  const name = normalizeText(body.name)
  const password = normalizeText(body.password)
  const confirmPassword = normalizeText(body.confirmPassword)

  if (!emailPattern.test(email)) {
    return Response.json(
      { error: 'Escribe un correo válido.', ok: false },
      { status: 400 }
    )
  }

  if (password.length < 8) {
    return Response.json(
      { error: 'La contraseña debe tener al menos 8 caracteres.', ok: false },
      { status: 400 }
    )
  }

  if (password !== confirmPassword) {
    return Response.json(
      { error: 'Las contraseñas no coinciden.', ok: false },
      { status: 400 }
    )
  }

  const existingUser = await payload.find({
    collection: 'users',
    limit: 1,
    overrideAccess: true,
    pagination: false,
    where: {
      email: {
        equals: email
      }
    }
  })

  if (existingUser.docs.length > 0) {
    return Response.json(
      { error: 'Ya existe un usuario con ese correo.', ok: false },
      { status: 409 }
    )
  }

  await payload.create({
    collection: 'users',
    data: {
      email,
      name,
      password
    },
    overrideAccess: true
  })

  return Response.json({
    ok: true,
    redirectTo: '/admin/login?registered=1'
  })
}
