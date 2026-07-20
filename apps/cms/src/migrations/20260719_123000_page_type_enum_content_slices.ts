import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

const pageTypeValues = [
  'home',
  'product',
  'institutional',
  'news',
  'education',
  'event',
  'free',
] as const

export async function up({ db }: MigrateUpArgs): Promise<void> {
  for (const value of pageTypeValues) {
    await db.execute(sql.raw(`ALTER TYPE "public"."enum_pages_page_type" ADD VALUE IF NOT EXISTS '${value}'`))
    await db.execute(sql.raw(`ALTER TYPE "public"."enum__pages_v_version_page_type" ADD VALUE IF NOT EXISTS '${value}'`))
  }
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`SELECT 1`)
}
