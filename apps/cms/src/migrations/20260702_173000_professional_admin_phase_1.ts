import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
  DO $$ BEGIN
    CREATE TYPE "public"."enum_users_role" AS ENUM('superAdmin', 'admin', 'editor', 'marketing', 'viewer', 'client');
  EXCEPTION WHEN duplicate_object THEN NULL;
  END $$;

  DO $$ BEGIN
    CREATE TYPE "public"."enum_pages_page_type" AS ENUM('landing', 'service', 'legal', 'contact', 'internal', 'blog', 'portfolio');
  EXCEPTION WHEN duplicate_object THEN NULL;
  END $$;

  DO $$ BEGIN
    CREATE TYPE "public"."enum_pages_page_template" AS ENUM('default', 'landing', 'serviceDetail', 'legal', 'contact', 'portfolio');
  EXCEPTION WHEN duplicate_object THEN NULL;
  END $$;

  DO $$ BEGIN
    CREATE TYPE "public"."enum_pages_header_style" AS ENUM('inherit', 'solid', 'transparent');
  EXCEPTION WHEN duplicate_object THEN NULL;
  END $$;

  DO $$ BEGIN
    CREATE TYPE "public"."enum__pages_v_version_page_type" AS ENUM('landing', 'service', 'legal', 'contact', 'internal', 'blog', 'portfolio');
  EXCEPTION WHEN duplicate_object THEN NULL;
  END $$;

  DO $$ BEGIN
    CREATE TYPE "public"."enum__pages_v_version_page_template" AS ENUM('default', 'landing', 'serviceDetail', 'legal', 'contact', 'portfolio');
  EXCEPTION WHEN duplicate_object THEN NULL;
  END $$;

  DO $$ BEGIN
    CREATE TYPE "public"."enum__pages_v_version_header_style" AS ENUM('inherit', 'solid', 'transparent');
  EXCEPTION WHEN duplicate_object THEN NULL;
  END $$;

  DO $$ BEGIN
    CREATE TYPE "public"."enum_media_usage_type" AS ENUM('general', 'logo', 'hero', 'gallery', 'video', 'favicon', 'ogImage', 'download');
  EXCEPTION WHEN duplicate_object THEN NULL;
  END $$;

  DO $$ BEGIN
    CREATE TYPE "public"."enum_contact_submissions_priority" AS ENUM('low', 'normal', 'high', 'urgent');
  EXCEPTION WHEN duplicate_object THEN NULL;
  END $$;

  ALTER TYPE "public"."enum_media_media_type" ADD VALUE IF NOT EXISTS 'document';
  ALTER TYPE "public"."enum_contact_submissions_status" ADD VALUE IF NOT EXISTS 'contacted';
  ALTER TYPE "public"."enum_contact_submissions_status" ADD VALUE IF NOT EXISTS 'followUp';
  ALTER TYPE "public"."enum_contact_submissions_status" ADD VALUE IF NOT EXISTS 'won';
  ALTER TYPE "public"."enum_contact_submissions_status" ADD VALUE IF NOT EXISTS 'lost';

  ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "role" "public"."enum_users_role" DEFAULT 'editor' NOT NULL;

  ALTER TABLE "pages" ADD COLUMN IF NOT EXISTS "page_type" "public"."enum_pages_page_type" DEFAULT 'internal' NOT NULL;
  ALTER TABLE "pages" ADD COLUMN IF NOT EXISTS "page_template" "public"."enum_pages_page_template" DEFAULT 'default' NOT NULL;
  ALTER TABLE "pages" ADD COLUMN IF NOT EXISTS "is_featured" boolean DEFAULT false;
  ALTER TABLE "pages" ADD COLUMN IF NOT EXISTS "seo_canonical_url" varchar;
  ALTER TABLE "pages" ADD COLUMN IF NOT EXISTS "seo_no_index" boolean DEFAULT false;
  ALTER TABLE "pages" ADD COLUMN IF NOT EXISTS "seo_no_follow" boolean DEFAULT false;
  ALTER TABLE "pages" ADD COLUMN IF NOT EXISTS "header_style" "public"."enum_pages_header_style" DEFAULT 'inherit' NOT NULL;
  ALTER TABLE "pages" ADD COLUMN IF NOT EXISTS "hide_footer" boolean DEFAULT false;
  ALTER TABLE "pages" ADD COLUMN IF NOT EXISTS "enable_breadcrumbs" boolean DEFAULT true;
  ALTER TABLE "pages" ADD COLUMN IF NOT EXISTS "custom_class_name" varchar;

  ALTER TABLE "_pages_v" ADD COLUMN IF NOT EXISTS "version_page_type" "public"."enum__pages_v_version_page_type" DEFAULT 'internal';
  ALTER TABLE "_pages_v" ADD COLUMN IF NOT EXISTS "version_page_template" "public"."enum__pages_v_version_page_template" DEFAULT 'default';
  ALTER TABLE "_pages_v" ADD COLUMN IF NOT EXISTS "version_is_featured" boolean DEFAULT false;
  ALTER TABLE "_pages_v" ADD COLUMN IF NOT EXISTS "version_seo_canonical_url" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN IF NOT EXISTS "version_seo_no_index" boolean DEFAULT false;
  ALTER TABLE "_pages_v" ADD COLUMN IF NOT EXISTS "version_seo_no_follow" boolean DEFAULT false;
  ALTER TABLE "_pages_v" ADD COLUMN IF NOT EXISTS "version_header_style" "public"."enum__pages_v_version_header_style" DEFAULT 'inherit';
  ALTER TABLE "_pages_v" ADD COLUMN IF NOT EXISTS "version_hide_footer" boolean DEFAULT false;
  ALTER TABLE "_pages_v" ADD COLUMN IF NOT EXISTS "version_enable_breadcrumbs" boolean DEFAULT true;
  ALTER TABLE "_pages_v" ADD COLUMN IF NOT EXISTS "version_custom_class_name" varchar;

  ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "usage_type" "public"."enum_media_usage_type" DEFAULT 'general' NOT NULL;
  ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "folder" varchar;
  ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "credits" varchar;
  ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "copyright" varchar;
  ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "source_url" varchar;
  ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "sizes_thumbnail_url" varchar;
  ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "sizes_thumbnail_width" numeric;
  ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "sizes_thumbnail_height" numeric;
  ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "sizes_thumbnail_mime_type" varchar;
  ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "sizes_thumbnail_filesize" numeric;
  ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "sizes_thumbnail_filename" varchar;
  ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "sizes_card_url" varchar;
  ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "sizes_card_width" numeric;
  ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "sizes_card_height" numeric;
  ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "sizes_card_mime_type" varchar;
  ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "sizes_card_filesize" numeric;
  ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "sizes_card_filename" varchar;
  ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "sizes_hero_url" varchar;
  ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "sizes_hero_width" numeric;
  ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "sizes_hero_height" numeric;
  ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "sizes_hero_mime_type" varchar;
  ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "sizes_hero_filesize" numeric;
  ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "sizes_hero_filename" varchar;

  CREATE TABLE IF NOT EXISTS "media_tags" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "value" varchar NOT NULL
  );
  CREATE INDEX IF NOT EXISTS "media_tags_order_idx" ON "media_tags" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "media_tags_parent_id_idx" ON "media_tags" USING btree ("_parent_id");
  DO $$ BEGIN
    ALTER TABLE "media_tags" ADD CONSTRAINT "media_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL;
  END $$;

  ALTER TABLE "contact_submissions" ADD COLUMN IF NOT EXISTS "priority" "public"."enum_contact_submissions_priority" DEFAULT 'normal' NOT NULL;
  ALTER TABLE "contact_submissions" ADD COLUMN IF NOT EXISTS "assigned_to_id" integer;
  ALTER TABLE "contact_submissions" ADD COLUMN IF NOT EXISTS "internal_notes" varchar;
  ALTER TABLE "contact_submissions" ADD COLUMN IF NOT EXISTS "last_response_at" timestamp(3) with time zone;
  ALTER TABLE "contact_submissions" ADD COLUMN IF NOT EXISTS "next_action_at" timestamp(3) with time zone;
  ALTER TABLE "contact_submissions" ADD COLUMN IF NOT EXISTS "lost_reason" varchar;
  CREATE INDEX IF NOT EXISTS "contact_submissions_assigned_to_idx" ON "contact_submissions" USING btree ("assigned_to_id");
  DO $$ BEGIN
    ALTER TABLE "contact_submissions" ADD CONSTRAINT "contact_submissions_assigned_to_id_users_id_fk" FOREIGN KEY ("assigned_to_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL;
  END $$;

  CREATE TABLE IF NOT EXISTS "contact_submissions_lead_tags" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "value" varchar NOT NULL
  );
  CREATE INDEX IF NOT EXISTS "contact_submissions_lead_tags_order_idx" ON "contact_submissions_lead_tags" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "contact_submissions_lead_tags_parent_id_idx" ON "contact_submissions_lead_tags" USING btree ("_parent_id");
  DO $$ BEGIN
    ALTER TABLE "contact_submissions_lead_tags" ADD CONSTRAINT "contact_submissions_lead_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_submissions"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL;
  END $$;

  CREATE TABLE IF NOT EXISTS "contact_submissions_follow_up_history" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "date" timestamp(3) with time zone,
    "note" varchar NOT NULL,
    "next_action_at" timestamp(3) with time zone
  );
  CREATE INDEX IF NOT EXISTS "contact_submissions_follow_up_history_order_idx" ON "contact_submissions_follow_up_history" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "contact_submissions_follow_up_history_parent_id_idx" ON "contact_submissions_follow_up_history" USING btree ("_parent_id");
  DO $$ BEGIN
    ALTER TABLE "contact_submissions_follow_up_history" ADD CONSTRAINT "contact_submissions_follow_up_history_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_submissions"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL;
  END $$;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
  DROP TABLE IF EXISTS "contact_submissions_follow_up_history" CASCADE;
  DROP TABLE IF EXISTS "contact_submissions_lead_tags" CASCADE;
  DROP TABLE IF EXISTS "media_tags" CASCADE;

  ALTER TABLE "contact_submissions" DROP CONSTRAINT IF EXISTS "contact_submissions_assigned_to_id_users_id_fk";
  DROP INDEX IF EXISTS "contact_submissions_assigned_to_idx";
  ALTER TABLE "contact_submissions" DROP COLUMN IF EXISTS "lost_reason";
  ALTER TABLE "contact_submissions" DROP COLUMN IF EXISTS "next_action_at";
  ALTER TABLE "contact_submissions" DROP COLUMN IF EXISTS "last_response_at";
  ALTER TABLE "contact_submissions" DROP COLUMN IF EXISTS "internal_notes";
  ALTER TABLE "contact_submissions" DROP COLUMN IF EXISTS "assigned_to_id";
  ALTER TABLE "contact_submissions" DROP COLUMN IF EXISTS "priority";

  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_hero_filename";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_hero_filesize";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_hero_mime_type";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_hero_height";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_hero_width";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_hero_url";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_card_filename";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_card_filesize";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_card_mime_type";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_card_height";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_card_width";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_card_url";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_thumbnail_filename";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_thumbnail_filesize";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_thumbnail_mime_type";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_thumbnail_height";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_thumbnail_width";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_thumbnail_url";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "source_url";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "copyright";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "credits";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "folder";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "usage_type";

  ALTER TABLE "_pages_v" DROP COLUMN IF EXISTS "version_custom_class_name";
  ALTER TABLE "_pages_v" DROP COLUMN IF EXISTS "version_enable_breadcrumbs";
  ALTER TABLE "_pages_v" DROP COLUMN IF EXISTS "version_hide_footer";
  ALTER TABLE "_pages_v" DROP COLUMN IF EXISTS "version_header_style";
  ALTER TABLE "_pages_v" DROP COLUMN IF EXISTS "version_seo_no_follow";
  ALTER TABLE "_pages_v" DROP COLUMN IF EXISTS "version_seo_no_index";
  ALTER TABLE "_pages_v" DROP COLUMN IF EXISTS "version_seo_canonical_url";
  ALTER TABLE "_pages_v" DROP COLUMN IF EXISTS "version_is_featured";
  ALTER TABLE "_pages_v" DROP COLUMN IF EXISTS "version_page_template";
  ALTER TABLE "_pages_v" DROP COLUMN IF EXISTS "version_page_type";

  ALTER TABLE "pages" DROP COLUMN IF EXISTS "custom_class_name";
  ALTER TABLE "pages" DROP COLUMN IF EXISTS "enable_breadcrumbs";
  ALTER TABLE "pages" DROP COLUMN IF EXISTS "hide_footer";
  ALTER TABLE "pages" DROP COLUMN IF EXISTS "header_style";
  ALTER TABLE "pages" DROP COLUMN IF EXISTS "seo_no_follow";
  ALTER TABLE "pages" DROP COLUMN IF EXISTS "seo_no_index";
  ALTER TABLE "pages" DROP COLUMN IF EXISTS "seo_canonical_url";
  ALTER TABLE "pages" DROP COLUMN IF EXISTS "is_featured";
  ALTER TABLE "pages" DROP COLUMN IF EXISTS "page_template";
  ALTER TABLE "pages" DROP COLUMN IF EXISTS "page_type";

  ALTER TABLE "users" DROP COLUMN IF EXISTS "role";
  `)
}
