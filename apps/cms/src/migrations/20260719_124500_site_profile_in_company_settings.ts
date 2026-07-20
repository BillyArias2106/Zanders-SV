import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    DO $$ BEGIN
      CREATE TYPE "public"."enum_site_settings_site_profile" AS ENUM(
        'government',
        'saas-apple',
        'agency',
        'ecommerce',
        'education'
      );
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;

    ALTER TABLE "company_settings"
      ADD COLUMN IF NOT EXISTS "site_profile" "public"."enum_site_settings_site_profile" DEFAULT 'agency' NOT NULL;
  `)

  await db.execute(sql`
    UPDATE "company_settings"
    SET "site_profile" = latest_site_settings."site_profile"
    FROM (
      SELECT "site_profile"
      FROM "site_settings"
      ORDER BY "updated_at" DESC NULLS LAST, "id" DESC
      LIMIT 1
    ) latest_site_settings
    WHERE latest_site_settings."site_profile" IS NOT NULL;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "company_settings" DROP COLUMN IF EXISTS "site_profile";
  `)
}
