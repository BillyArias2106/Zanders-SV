import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
  CREATE TYPE "public"."enum_company_settings_footer_columns_content_type" AS ENUM('publishedPages', 'mainNavigation', 'manualLinks', 'socialLinks', 'contact', 'customText');
  CREATE TYPE "public"."enum_company_settings_footer_social_links_type" AS ENUM('facebook', 'instagram', 'tiktok', 'linkedin', 'youtube', 'twitter', 'whatsapp', 'website', 'other');

  ALTER TABLE "company_settings" ADD COLUMN "footer_is_enabled" boolean DEFAULT true;
  ALTER TABLE "company_settings" ADD COLUMN "footer_show_logo" boolean DEFAULT true;
  ALTER TABLE "company_settings" ADD COLUMN "footer_logo_id" integer;
  ALTER TABLE "company_settings" ADD COLUMN "footer_show_company_name" boolean DEFAULT true;
  ALTER TABLE "company_settings" ADD COLUMN "footer_use_company_settings" boolean DEFAULT true;
  ALTER TABLE "company_settings" ADD COLUMN "footer_email" varchar;
  ALTER TABLE "company_settings" ADD COLUMN "footer_phone" varchar;
  ALTER TABLE "company_settings" ADD COLUMN "footer_whatsapp" varchar;
  ALTER TABLE "company_settings" ADD COLUMN "footer_country" varchar;
  ALTER TABLE "company_settings" ADD COLUMN "footer_city" varchar;
  ALTER TABLE "company_settings" ADD COLUMN "footer_privacy_page_id" integer;
  ALTER TABLE "company_settings" ADD COLUMN "footer_terms_page_id" integer;
  ALTER TABLE "company_settings" ADD CONSTRAINT "company_settings_footer_logo_id_media_id_fk" FOREIGN KEY ("footer_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "company_settings" ADD CONSTRAINT "company_settings_footer_privacy_page_id_pages_id_fk" FOREIGN KEY ("footer_privacy_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "company_settings" ADD CONSTRAINT "company_settings_footer_terms_page_id_pages_id_fk" FOREIGN KEY ("footer_terms_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "company_settings_footer_logo_idx" ON "company_settings" USING btree ("footer_logo_id");
  CREATE INDEX "company_settings_footer_privacy_page_idx" ON "company_settings" USING btree ("footer_privacy_page_id");
  CREATE INDEX "company_settings_footer_terms_page_idx" ON "company_settings" USING btree ("footer_terms_page_id");

  ALTER TABLE "company_settings_locales" ADD COLUMN "footer_company_name_override" varchar;
  ALTER TABLE "company_settings_locales" ADD COLUMN "footer_short_description" varchar;
  ALTER TABLE "company_settings_locales" ADD COLUMN "footer_additional_text" varchar;
  ALTER TABLE "company_settings_locales" ADD COLUMN "footer_address" varchar;
  ALTER TABLE "company_settings_locales" ADD COLUMN "footer_business_hours" varchar;
  ALTER TABLE "company_settings_locales" ADD COLUMN "footer_copyright_text" varchar;
  ALTER TABLE "company_settings_locales" ADD COLUMN "footer_legal_text_override" varchar;

  CREATE TABLE "company_settings_footer_columns" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "content_type" "public"."enum_company_settings_footer_columns_content_type" DEFAULT 'manualLinks' NOT NULL,
    "order" numeric DEFAULT 0,
    "is_active" boolean DEFAULT true
  );
  CREATE INDEX "company_settings_footer_columns_order_idx" ON "company_settings_footer_columns" USING btree ("_order");
  CREATE INDEX "company_settings_footer_columns_parent_id_idx" ON "company_settings_footer_columns" USING btree ("_parent_id");
  ALTER TABLE "company_settings_footer_columns" ADD CONSTRAINT "company_settings_footer_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."company_settings"("id") ON DELETE cascade ON UPDATE no action;

  CREATE TABLE "company_settings_footer_columns_locales" (
    "title" varchar NOT NULL,
    "custom_text" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "public"."enum__locales" NOT NULL,
    "_parent_id" varchar NOT NULL
  );
  CREATE UNIQUE INDEX "company_settings_footer_columns_locales_locale_parent_id_uni" ON "company_settings_footer_columns_locales" USING btree ("_locale", "_parent_id");
  ALTER TABLE "company_settings_footer_columns_locales" ADD CONSTRAINT "company_settings_footer_columns_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."company_settings_footer_columns"("id") ON DELETE cascade ON UPDATE no action;

  CREATE TABLE "company_settings_footer_columns_links" (
    "_order" integer NOT NULL,
    "_parent_id" varchar NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "url" varchar,
    "open_in_new_tab" boolean DEFAULT false,
    "is_active" boolean DEFAULT true,
    "order" numeric DEFAULT 0
  );
  CREATE INDEX "company_settings_footer_columns_links_order_idx" ON "company_settings_footer_columns_links" USING btree ("_order");
  CREATE INDEX "company_settings_footer_columns_links_parent_id_idx" ON "company_settings_footer_columns_links" USING btree ("_parent_id");
  ALTER TABLE "company_settings_footer_columns_links" ADD CONSTRAINT "company_settings_footer_columns_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."company_settings_footer_columns"("id") ON DELETE cascade ON UPDATE no action;

  CREATE TABLE "company_settings_footer_columns_links_locales" (
    "label" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "public"."enum__locales" NOT NULL,
    "_parent_id" varchar NOT NULL
  );
  CREATE UNIQUE INDEX "company_settings_footer_columns_links_locales_locale_parent_" ON "company_settings_footer_columns_links_locales" USING btree ("_locale", "_parent_id");
  ALTER TABLE "company_settings_footer_columns_links_locales" ADD CONSTRAINT "company_settings_footer_columns_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."company_settings_footer_columns_links"("id") ON DELETE cascade ON UPDATE no action;

  CREATE TABLE "company_settings_footer_social_links" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "type" "public"."enum_company_settings_footer_social_links_type" DEFAULT 'other' NOT NULL,
    "url" varchar NOT NULL,
    "icon_name" varchar,
    "show_in_footer" boolean DEFAULT true,
    "show_in_header" boolean DEFAULT false,
    "open_in_new_tab" boolean DEFAULT true,
    "is_active" boolean DEFAULT true,
    "order" numeric DEFAULT 0
  );
  CREATE INDEX "company_settings_footer_social_links_order_idx" ON "company_settings_footer_social_links" USING btree ("_order");
  CREATE INDEX "company_settings_footer_social_links_parent_id_idx" ON "company_settings_footer_social_links" USING btree ("_parent_id");
  ALTER TABLE "company_settings_footer_social_links" ADD CONSTRAINT "company_settings_footer_social_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."company_settings"("id") ON DELETE cascade ON UPDATE no action;

  CREATE TABLE "company_settings_footer_social_links_locales" (
    "name" varchar NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "public"."enum__locales" NOT NULL,
    "_parent_id" varchar NOT NULL
  );
  CREATE UNIQUE INDEX "company_settings_footer_social_links_locales_locale_parent_i" ON "company_settings_footer_social_links_locales" USING btree ("_locale", "_parent_id");
  ALTER TABLE "company_settings_footer_social_links_locales" ADD CONSTRAINT "company_settings_footer_social_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."company_settings_footer_social_links"("id") ON DELETE cascade ON UPDATE no action;

  UPDATE "company_settings" AS cs
  SET
    "footer_is_enabled" = fs."is_enabled",
    "footer_show_logo" = fs."show_logo",
    "footer_logo_id" = fs."logo_id",
    "footer_show_company_name" = fs."show_company_name",
    "footer_use_company_settings" = fs."use_company_settings",
    "footer_email" = fs."email",
    "footer_phone" = fs."phone",
    "footer_whatsapp" = fs."whatsapp",
    "footer_country" = fs."country",
    "footer_city" = fs."city",
    "footer_privacy_page_id" = fs."privacy_page_id",
    "footer_terms_page_id" = fs."terms_page_id"
  FROM "footer_settings" AS fs
  WHERE fs."id" = (SELECT "id" FROM "footer_settings" ORDER BY "id" LIMIT 1);

  UPDATE "company_settings_locales" AS csl
  SET
    "footer_company_name_override" = fsl."company_name_override",
    "footer_short_description" = fsl."short_description",
    "footer_additional_text" = fsl."additional_text",
    "footer_copyright_text" = fsl."copyright_text",
    "footer_legal_text_override" = fsl."legal_text"
  FROM "footer_settings_locales" AS fsl
  WHERE csl."_locale" = fsl."_locale"
    AND fsl."_parent_id" = (SELECT "id" FROM "footer_settings" ORDER BY "id" LIMIT 1);

  INSERT INTO "company_settings_footer_columns" ("_order", "_parent_id", "id", "content_type", "order", "is_active")
  SELECT "_order", (SELECT "id" FROM "company_settings" ORDER BY "id" LIMIT 1), "id", "content_type"::text::"public"."enum_company_settings_footer_columns_content_type", "order", "is_active"
  FROM "footer_settings_columns"
  ON CONFLICT ("id") DO NOTHING;

  INSERT INTO "company_settings_footer_columns_locales" ("title", "custom_text", "_locale", "_parent_id")
  SELECT COALESCE("title", ''), "custom_text", "_locale", "_parent_id"
  FROM "footer_settings_columns_locales";

  INSERT INTO "company_settings_footer_columns_links" ("_order", "_parent_id", "id", "url", "open_in_new_tab", "is_active", "order")
  SELECT "_order", "_parent_id", "id", "url", "open_in_new_tab", "is_active", "order"
  FROM "footer_settings_columns_links"
  ON CONFLICT ("id") DO NOTHING;

  INSERT INTO "company_settings_footer_columns_links_locales" ("label", "_locale", "_parent_id")
  SELECT "label", "_locale", "_parent_id"
  FROM "footer_settings_columns_links_locales";

  INSERT INTO "company_settings_footer_social_links" ("_order", "_parent_id", "id", "type", "url", "icon_name", "show_in_footer", "show_in_header", "open_in_new_tab", "is_active", "order")
  SELECT "_order", (SELECT "id" FROM "company_settings" ORDER BY "id" LIMIT 1), "id", "type"::text::"public"."enum_company_settings_footer_social_links_type", "url", "icon_name", "show_in_footer", "show_in_header", "open_in_new_tab", "is_active", "order"
  FROM "footer_settings_social_links"
  ON CONFLICT ("id") DO NOTHING;

  INSERT INTO "company_settings_footer_social_links_locales" ("name", "_locale", "_parent_id")
  SELECT COALESCE("name", ''), "_locale", "_parent_id"
  FROM "footer_settings_social_links_locales";

  INSERT INTO "company_settings_locales" (
    "slogan",
    "short_description",
    "long_description",
    "address",
    "country_city",
    "business_hours",
    "contact_eyebrow",
    "contact_headline",
    "contact_intro",
    "footer_company_name_override",
    "footer_short_description",
    "footer_additional_text",
    "footer_address",
    "footer_business_hours",
    "footer_copyright_text",
    "footer_legal_text_override",
    "default_meta_title",
    "default_meta_description",
    "global_keywords",
    "copyright_text",
    "privacy_policy",
    "terms_and_conditions",
    "footer_legal_text",
    "_locale",
    "_parent_id"
  )
  SELECT
    NULL,
    NULL,
    "long_description",
    "address",
    NULL,
    "business_hours",
    'Let''s get in touch',
    'Tell us what you need',
    "contact_intro",
    "footer_company_name_override",
    "footer_short_description",
    "footer_additional_text",
    "footer_address",
    "footer_business_hours",
    '© New Site. All rights reserved.',
    "footer_legal_text_override",
    'New Site',
    'Website ready to configure from the admin panel.',
    "global_keywords",
    '© New Site. All rights reserved.',
    "privacy_policy",
    "terms_and_conditions",
    "footer_legal_text",
    'en',
    "_parent_id"
  FROM "company_settings_locales" es
  WHERE es."_locale" = 'es'
    AND NOT EXISTS (
      SELECT 1
      FROM "company_settings_locales" en
      WHERE en."_locale" = 'en'
        AND en."_parent_id" = es."_parent_id"
    );
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
  DROP TABLE "company_settings_footer_social_links_locales" CASCADE;
  DROP TABLE "company_settings_footer_social_links" CASCADE;
  DROP TABLE "company_settings_footer_columns_links_locales" CASCADE;
  DROP TABLE "company_settings_footer_columns_links" CASCADE;
  DROP TABLE "company_settings_footer_columns_locales" CASCADE;
  DROP TABLE "company_settings_footer_columns" CASCADE;

  DROP INDEX IF EXISTS "company_settings_footer_terms_page_idx";
  DROP INDEX IF EXISTS "company_settings_footer_privacy_page_idx";
  DROP INDEX IF EXISTS "company_settings_footer_logo_idx";
  ALTER TABLE "company_settings" DROP CONSTRAINT IF EXISTS "company_settings_footer_terms_page_id_pages_id_fk";
  ALTER TABLE "company_settings" DROP CONSTRAINT IF EXISTS "company_settings_footer_privacy_page_id_pages_id_fk";
  ALTER TABLE "company_settings" DROP CONSTRAINT IF EXISTS "company_settings_footer_logo_id_media_id_fk";
  ALTER TABLE "company_settings" DROP COLUMN "footer_terms_page_id";
  ALTER TABLE "company_settings" DROP COLUMN "footer_privacy_page_id";
  ALTER TABLE "company_settings" DROP COLUMN "footer_city";
  ALTER TABLE "company_settings" DROP COLUMN "footer_country";
  ALTER TABLE "company_settings" DROP COLUMN "footer_whatsapp";
  ALTER TABLE "company_settings" DROP COLUMN "footer_phone";
  ALTER TABLE "company_settings" DROP COLUMN "footer_email";
  ALTER TABLE "company_settings" DROP COLUMN "footer_use_company_settings";
  ALTER TABLE "company_settings" DROP COLUMN "footer_show_company_name";
  ALTER TABLE "company_settings" DROP COLUMN "footer_logo_id";
  ALTER TABLE "company_settings" DROP COLUMN "footer_show_logo";
  ALTER TABLE "company_settings" DROP COLUMN "footer_is_enabled";

  ALTER TABLE "company_settings_locales" DROP COLUMN "footer_legal_text_override";
  ALTER TABLE "company_settings_locales" DROP COLUMN "footer_copyright_text";
  ALTER TABLE "company_settings_locales" DROP COLUMN "footer_business_hours";
  ALTER TABLE "company_settings_locales" DROP COLUMN "footer_address";
  ALTER TABLE "company_settings_locales" DROP COLUMN "footer_additional_text";
  ALTER TABLE "company_settings_locales" DROP COLUMN "footer_short_description";
  ALTER TABLE "company_settings_locales" DROP COLUMN "footer_company_name_override";

  DROP TYPE "public"."enum_company_settings_footer_social_links_type";
  DROP TYPE "public"."enum_company_settings_footer_columns_content_type";
  `)
}
