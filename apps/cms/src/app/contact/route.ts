import config from '@payload-config'
import { getPayload } from 'payload'
import nodemailer from 'nodemailer'
import type SMTPTransport from 'nodemailer/lib/smtp-transport'

type ContactPayload = {
  email?: unknown
  firstName?: unknown
  lastName?: unknown
  message?: unknown
  phone?: unknown
  subject?: unknown
}

type CompanySettingsWithContact = {
  contactRecipients?: { email?: string | null }[] | null
  mainEmail?: string | null
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const jsonResponse = (body: unknown, status = 200) =>
  Response.json(body, {
    status,
    headers: {
      'Access-Control-Allow-Origin': process.env.WEB_PUBLIC_URL ?? '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'POST, OPTIONS'
    }
  })

const normalizeText = (value: unknown) =>
  typeof value === 'string' ? value.trim() : ''

const getSmtpPort = () => {
  const port = Number.parseInt(process.env.SMTP_PORT ?? '587', 10)

  return Number.isFinite(port) ? port : 587
}

const getMailTransport = () => {
  const host = process.env.SMTP_HOST
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASS

  if (!host || !user || !pass) {
    throw new Error(
      'Faltan variables SMTP_HOST, SMTP_USER o SMTP_PASS para enviar correos.'
    )
  }

  const options: SMTPTransport.Options = {
    auth: {
      pass,
      user
    },
    host,
    port: getSmtpPort(),
    secure: process.env.SMTP_SECURE === 'true'
  }

  return nodemailer.createTransport(options)
}

const getRecipients = (settings: CompanySettingsWithContact) => {
  const configuredRecipients = (settings.contactRecipients ?? [])
    .map((recipient) => normalizeText(recipient.email))
    .filter((email) => emailPattern.test(email))

  if (configuredRecipients.length > 0) {
    return configuredRecipients
  }

  const fallbackEmail = normalizeText(settings.mainEmail)

  return emailPattern.test(fallbackEmail) ? [fallbackEmail] : []
}

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')

export function OPTIONS() {
  return jsonResponse(null)
}

export async function POST(request: Request) {
  const payload = await getPayload({ config })
  const body = (await request.json().catch(() => ({}))) as ContactPayload
  const firstName = normalizeText(body.firstName)
  const lastName = normalizeText(body.lastName)
  const phone = normalizeText(body.phone)
  const email = normalizeText(body.email)
  const subject = normalizeText(body.subject)
  const message = normalizeText(body.message)
  const errors: Record<string, string> = {}

  if (!firstName) {
    errors.firstName = 'Escribe tu nombre.'
  }

  if (!phone) {
    errors.phone = 'Escribe tu número de contacto.'
  }

  if (!emailPattern.test(email)) {
    errors.email = 'Escribe un correo válido.'
  }

  if (!subject) {
    errors.subject = 'Escribe el asunto.'
  }

  if (!message) {
    errors.message = 'Escribe tu mensaje.'
  }

  if (Object.keys(errors).length > 0) {
    return jsonResponse(
      {
        errors,
        ok: false
      },
      400
    )
  }

  const settings = (await payload.findGlobal({
    slug: 'company-settings'
  })) as CompanySettingsWithContact
  const recipients = getRecipients(settings)
  const submission = await payload.create({
    collection: 'contact-submissions',
    data: {
      email,
      emailRecipients: recipients.map((recipientEmail) => ({
        email: recipientEmail
      })),
      emailSent: false,
      firstName,
      lastName,
      message,
      phone,
      source: 'Formulario web',
      status: 'new',
      subject,
      userAgent: request.headers.get('user-agent') ?? ''
    }
  })

  if (recipients.length === 0) {
    await payload.update({
      id: submission.id,
      collection: 'contact-submissions',
      data: {
        emailError:
          'No hay destinatarios configurados en Configuración General > Contacto.'
      }
    })

    return jsonResponse({
      ok: true,
      warning:
        'Mensaje guardado, pero no hay correos destinatarios configurados.'
    })
  }

  try {
    const transporter = getMailTransport()
    const fromEmail = process.env.SMTP_FROM_EMAIL ?? process.env.SMTP_USER
    const fromName = process.env.SMTP_FROM_NAME ?? 'Zanders SV'
    const safeSubject = escapeHtml(subject)
    const safeMessage = escapeHtml(message).replace(/\n/g, '<br />')
    const fullName = [firstName, lastName].filter(Boolean).join(' ')

    await transporter.sendMail({
      from: `"${fromName}" <${fromEmail}>`,
      html: `
        <h2>Nuevo mensaje de contacto</h2>
        <p><strong>Nombre:</strong> ${escapeHtml(fullName)}</p>
        <p><strong>Teléfono:</strong> ${escapeHtml(phone)}</p>
        <p><strong>Correo:</strong> ${escapeHtml(email)}</p>
        <p><strong>Asunto:</strong> ${safeSubject}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${safeMessage}</p>
      `,
      replyTo: email,
      subject: `Nuevo contacto: ${subject}`,
      text: [
        'Nuevo mensaje de contacto',
        `Nombre: ${fullName}`,
        `Teléfono: ${phone}`,
        `Correo: ${email}`,
        `Asunto: ${subject}`,
        '',
        message
      ].join('\n'),
      to: recipients
    })

    await payload.update({
      id: submission.id,
      collection: 'contact-submissions',
      data: {
        emailError: null,
        emailSent: true
      }
    })

    return jsonResponse({ ok: true })
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'No se pudo enviar el correo.'

    await payload.update({
      id: submission.id,
      collection: 'contact-submissions',
      data: {
        emailError: errorMessage,
        emailSent: false
      }
    })

    return jsonResponse({
      ok: true,
      warning:
        'Mensaje guardado en el admin, pero no se pudo enviar el correo.'
    })
  }
}
