import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    DO $$ BEGIN
      CREATE TYPE "public"."enum_pages_page_purpose" AS ENUM('home', 'service', 'product', 'about', 'caseStudy', 'contact');
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;

    DO $$ BEGIN
      CREATE TYPE "public"."enum_pages_primary_goal" AS ENUM('generateLeads', 'requestDemo', 'explainOffer', 'buildTrust', 'showCase');
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;

    DO $$ BEGIN
      CREATE TYPE "public"."enum_pages_visual_style" AS ENUM('corporate', 'futurist', 'editorial');
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;

    DO $$ BEGIN
      CREATE TYPE "public"."enum_pages_content_density" AS ENUM('compact', 'balanced', 'spacious');
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;

    DO $$ BEGIN
      CREATE TYPE "public"."enum_pages_motion_intensity" AS ENUM('none', 'subtle', 'expressive');
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;

    DO $$ BEGIN
      CREATE TYPE "public"."enum__pages_v_version_page_purpose" AS ENUM('home', 'service', 'product', 'about', 'caseStudy', 'contact');
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;

    DO $$ BEGIN
      CREATE TYPE "public"."enum__pages_v_version_primary_goal" AS ENUM('generateLeads', 'requestDemo', 'explainOffer', 'buildTrust', 'showCase');
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;

    DO $$ BEGIN
      CREATE TYPE "public"."enum__pages_v_version_visual_style" AS ENUM('corporate', 'futurist', 'editorial');
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;

    DO $$ BEGIN
      CREATE TYPE "public"."enum__pages_v_version_content_density" AS ENUM('compact', 'balanced', 'spacious');
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;

    DO $$ BEGIN
      CREATE TYPE "public"."enum__pages_v_version_motion_intensity" AS ENUM('none', 'subtle', 'expressive');
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;

    ALTER TABLE "pages" ADD COLUMN IF NOT EXISTS "page_purpose" "public"."enum_pages_page_purpose" DEFAULT 'service' NOT NULL;
    ALTER TABLE "pages" ADD COLUMN IF NOT EXISTS "primary_goal" "public"."enum_pages_primary_goal" DEFAULT 'generateLeads' NOT NULL;
    ALTER TABLE "pages" ADD COLUMN IF NOT EXISTS "primary_action_url" varchar;
    ALTER TABLE "pages" ADD COLUMN IF NOT EXISTS "visual_style" "public"."enum_pages_visual_style" DEFAULT 'corporate' NOT NULL;
    ALTER TABLE "pages" ADD COLUMN IF NOT EXISTS "content_density" "public"."enum_pages_content_density" DEFAULT 'balanced' NOT NULL;
    ALTER TABLE "pages" ADD COLUMN IF NOT EXISTS "motion_intensity" "public"."enum_pages_motion_intensity" DEFAULT 'subtle' NOT NULL;
    ALTER TABLE "pages" ADD COLUMN IF NOT EXISTS "show_in_navigation" boolean DEFAULT false NOT NULL;
    CREATE INDEX IF NOT EXISTS "pages_show_in_navigation_idx" ON "pages" USING btree ("show_in_navigation");

    ALTER TABLE "pages_locales" ADD COLUMN IF NOT EXISTS "audience" varchar;
    ALTER TABLE "pages_locales" ADD COLUMN IF NOT EXISTS "primary_action_label" varchar;
    ALTER TABLE "pages_locales" ADD COLUMN IF NOT EXISTS "sections" jsonb;

    ALTER TABLE "_pages_v" ADD COLUMN IF NOT EXISTS "version_page_purpose" "public"."enum__pages_v_version_page_purpose" DEFAULT 'service';
    ALTER TABLE "_pages_v" ADD COLUMN IF NOT EXISTS "version_primary_goal" "public"."enum__pages_v_version_primary_goal" DEFAULT 'generateLeads';
    ALTER TABLE "_pages_v" ADD COLUMN IF NOT EXISTS "version_primary_action_url" varchar;
    ALTER TABLE "_pages_v" ADD COLUMN IF NOT EXISTS "version_visual_style" "public"."enum__pages_v_version_visual_style" DEFAULT 'corporate';
    ALTER TABLE "_pages_v" ADD COLUMN IF NOT EXISTS "version_content_density" "public"."enum__pages_v_version_content_density" DEFAULT 'balanced';
    ALTER TABLE "_pages_v" ADD COLUMN IF NOT EXISTS "version_motion_intensity" "public"."enum__pages_v_version_motion_intensity" DEFAULT 'subtle';
    ALTER TABLE "_pages_v" ADD COLUMN IF NOT EXISTS "version_show_in_navigation" boolean DEFAULT false;

    ALTER TABLE "_pages_v_locales" ADD COLUMN IF NOT EXISTS "version_audience" varchar;
    ALTER TABLE "_pages_v_locales" ADD COLUMN IF NOT EXISTS "version_primary_action_label" varchar;
    ALTER TABLE "_pages_v_locales" ADD COLUMN IF NOT EXISTS "version_sections" jsonb;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "_pages_v_locales" DROP COLUMN IF EXISTS "version_sections";
    ALTER TABLE "_pages_v_locales" DROP COLUMN IF EXISTS "version_primary_action_label";
    ALTER TABLE "_pages_v_locales" DROP COLUMN IF EXISTS "version_audience";

    ALTER TABLE "_pages_v" DROP COLUMN IF EXISTS "version_motion_intensity";
    ALTER TABLE "_pages_v" DROP COLUMN IF EXISTS "version_content_density";
    ALTER TABLE "_pages_v" DROP COLUMN IF EXISTS "version_visual_style";
    ALTER TABLE "_pages_v" DROP COLUMN IF EXISTS "version_show_in_navigation";
    ALTER TABLE "_pages_v" DROP COLUMN IF EXISTS "version_primary_action_url";
    ALTER TABLE "_pages_v" DROP COLUMN IF EXISTS "version_primary_goal";
    ALTER TABLE "_pages_v" DROP COLUMN IF EXISTS "version_page_purpose";

    ALTER TABLE "pages_locales" DROP COLUMN IF EXISTS "sections";
    ALTER TABLE "pages_locales" DROP COLUMN IF EXISTS "primary_action_label";
    ALTER TABLE "pages_locales" DROP COLUMN IF EXISTS "audience";

    DROP INDEX IF EXISTS "pages_show_in_navigation_idx";
    ALTER TABLE "pages" DROP COLUMN IF EXISTS "show_in_navigation";
    ALTER TABLE "pages" DROP COLUMN IF EXISTS "motion_intensity";
    ALTER TABLE "pages" DROP COLUMN IF EXISTS "content_density";
    ALTER TABLE "pages" DROP COLUMN IF EXISTS "visual_style";
    ALTER TABLE "pages" DROP COLUMN IF EXISTS "primary_action_url";
    ALTER TABLE "pages" DROP COLUMN IF EXISTS "primary_goal";
    ALTER TABLE "pages" DROP COLUMN IF EXISTS "page_purpose";

    DROP TYPE IF EXISTS "public"."enum__pages_v_version_motion_intensity";
    DROP TYPE IF EXISTS "public"."enum__pages_v_version_content_density";
    DROP TYPE IF EXISTS "public"."enum__pages_v_version_visual_style";
    DROP TYPE IF EXISTS "public"."enum__pages_v_version_primary_goal";
    DROP TYPE IF EXISTS "public"."enum__pages_v_version_page_purpose";
    DROP TYPE IF EXISTS "public"."enum_pages_motion_intensity";
    DROP TYPE IF EXISTS "public"."enum_pages_content_density";
    DROP TYPE IF EXISTS "public"."enum_pages_visual_style";
    DROP TYPE IF EXISTS "public"."enum_pages_primary_goal";
    DROP TYPE IF EXISTS "public"."enum_pages_page_purpose";
  `)
}
