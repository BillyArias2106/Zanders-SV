import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    DO $$ BEGIN
      CREATE TYPE "public"."enum_pages_page_type" AS ENUM(
        'home',
        'landing',
        'service',
        'product',
        'institutional',
        'news',
        'education',
        'event',
        'contact',
        'free'
      );
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;

    DO $$ BEGIN
      CREATE TYPE "public"."enum__pages_v_version_page_type" AS ENUM(
        'home',
        'landing',
        'service',
        'product',
        'institutional',
        'news',
        'education',
        'event',
        'contact',
        'free'
      );
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;

    ALTER TABLE "pages" ADD COLUMN IF NOT EXISTS "page_type" "public"."enum_pages_page_type" DEFAULT 'free';
    ALTER TABLE "_pages_v" ADD COLUMN IF NOT EXISTS "version_page_type" "public"."enum__pages_v_version_page_type" DEFAULT 'free';
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "_pages_v" DROP COLUMN IF EXISTS "version_page_type";
    ALTER TABLE "pages" DROP COLUMN IF EXISTS "page_type";
    DROP TYPE IF EXISTS "public"."enum__pages_v_version_page_type";
    DROP TYPE IF EXISTS "public"."enum_pages_page_type";
  `)
}
