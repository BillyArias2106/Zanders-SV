import config from '@payload-config'
import { getPayload } from 'payload'

type QueryResult<Row> = {
  rows: Row[]
}

type QueryablePool = {
  query<Row>(query: string, values?: unknown[]): Promise<QueryResult<Row>>
}

type CompanySettingsRow = {
  commercial_name: string | null
  default_meta_title: string | null
  main_email: string | null
  main_phone: string | null
  row_count: string | number
  whatsapp: string | null
}

const genericNames = new Set(['new site'])

const normalizeText = (value: unknown) =>
  typeof value === 'string' ? value.trim() : ''

const isFilled = (value: unknown) => normalizeText(value).length > 0

const isGenericName = (value: unknown) =>
  genericNames.has(normalizeText(value).toLowerCase())

const getPool = (payload: Awaited<ReturnType<typeof getPayload>>) =>
  (payload.db as unknown as { pool?: QueryablePool }).pool

export async function GET(request: Request) {
  const payload = await getPayload({ config })
  const { user } = await payload.auth({
    headers: request.headers
  })

  if (!user) {
    return Response.json({ authenticated: false }, { status: 401 })
  }

  const pool = getPool(payload)

  if (!pool) {
    return Response.json(
      {
        authenticated: true,
        error: 'No se pudo revisar el estado de configuración.'
      },
      { status: 500 }
    )
  }

  const companyResult = await pool.query<CompanySettingsRow>(`
      SELECT
        COUNT(*) OVER() AS row_count,
        cs.commercial_name,
        cs.main_email,
        cs.main_phone,
        cs.whatsapp,
        csl.default_meta_title
      FROM company_settings cs
      LEFT JOIN company_settings_locales csl
        ON csl._parent_id = cs.id
        AND csl._locale = 'es'
      ORDER BY cs.id ASC
      LIMIT 1
    `)

  const company = companyResult.rows[0]
  const missingCompanyFields: string[] = []
  const hasCompanyRow = Number(company?.row_count ?? 0) > 0

  if (!hasCompanyRow) {
    missingCompanyFields.push('generalSettings')
  }

  if (!isFilled(company?.commercial_name) || isGenericName(company?.commercial_name)) {
    missingCompanyFields.push('commercialName')
  }

  if (
    !isFilled(company?.main_email) &&
    !isFilled(company?.main_phone) &&
    !isFilled(company?.whatsapp)
  ) {
    missingCompanyFields.push('contact')
  }

  if (!isFilled(company?.default_meta_title) || isGenericName(company?.default_meta_title)) {
    missingCompanyFields.push('defaultMetaTitle')
  }

  const companyComplete = missingCompanyFields.length === 0
  const step = !companyComplete ? 'company' : 'complete'

  return Response.json({
    authenticated: true,
    companyComplete,
    missingCompanyFields,
    nextPath:
      step === 'company'
        ? '/admin/globals/company-settings?onboarding=company'
        : null,
    step
  })
}
