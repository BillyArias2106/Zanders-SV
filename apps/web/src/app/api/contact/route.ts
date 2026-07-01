const getCmsBaseUrl = () =>
  process.env.CMS_INTERNAL_URL ??
  process.env.NEXT_PUBLIC_CMS_URL ??
  'http://localhost:3001'

export async function POST(request: Request) {
  const body = await request.text()

  try {
    const response = await fetch(`${getCmsBaseUrl()}/contact`, {
      body,
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': request.headers.get('user-agent') ?? ''
      },
      method: 'POST'
    })
    const data = await response.json().catch(() => ({
      ok: false,
      message: 'Respuesta inválida del servidor.'
    }))

    return Response.json(data, {
      status: response.status
    })
  } catch {
    return Response.json(
      {
        message: 'No se pudo conectar con el servidor de contacto.',
        ok: false
      },
      {
        status: 502
      }
    )
  }
}
