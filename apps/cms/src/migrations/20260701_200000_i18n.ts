import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
  CREATE TYPE "public"."enum__locales" AS ENUM('es', 'en');
  CREATE TYPE "public"."enum__pages_v_published_locale" AS ENUM('es', 'en');
  CREATE TYPE "public"."enum_company_settings_default_language" AS ENUM('es', 'en');

  CREATE TABLE "pages_locales" (
    "title" varchar,
    "excerpt" varchar,
    "content" jsonb,
    "seo_meta_title" varchar,
    "seo_meta_description" varchar,
    "seo_keywords" varchar,
    "navigation_label" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "public"."enum__locales" NOT NULL,
    "_parent_id" integer NOT NULL
  );
  INSERT INTO "pages_locales" ("title", "excerpt", "content", "seo_meta_title", "seo_meta_description", "seo_keywords", "navigation_label", "_locale", "_parent_id")
  SELECT "title", "excerpt", "content", "seo_meta_title", "seo_meta_description", "seo_keywords", "navigation_label", 'es', "id"
  FROM "pages";
  ALTER TABLE "pages" DROP COLUMN "title";
  ALTER TABLE "pages" DROP COLUMN "excerpt";
  ALTER TABLE "pages" DROP COLUMN "content";
  ALTER TABLE "pages" DROP COLUMN "seo_meta_title";
  ALTER TABLE "pages" DROP COLUMN "seo_meta_description";
  ALTER TABLE "pages" DROP COLUMN "seo_keywords";
  ALTER TABLE "pages" DROP COLUMN "navigation_label";
  CREATE UNIQUE INDEX "pages_locales_locale_parent_id_unique" ON "pages_locales" USING btree ("_locale", "_parent_id");
  ALTER TABLE "pages_locales" ADD CONSTRAINT "pages_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;

  ALTER TABLE "_pages_v" ADD COLUMN "snapshot" boolean;
  ALTER TABLE "_pages_v" ADD COLUMN "published_locale" "public"."enum__pages_v_published_locale";
  CREATE TABLE "_pages_v_locales" (
    "version_title" varchar,
    "version_excerpt" varchar,
    "version_content" jsonb,
    "version_seo_meta_title" varchar,
    "version_seo_meta_description" varchar,
    "version_seo_keywords" varchar,
    "version_navigation_label" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "public"."enum__locales" NOT NULL,
    "_parent_id" integer NOT NULL
  );
  INSERT INTO "_pages_v_locales" ("version_title", "version_excerpt", "version_content", "version_seo_meta_title", "version_seo_meta_description", "version_seo_keywords", "version_navigation_label", "_locale", "_parent_id")
  SELECT "version_title", "version_excerpt", "version_content", "version_seo_meta_title", "version_seo_meta_description", "version_seo_keywords", "version_navigation_label", 'es', "id"
  FROM "_pages_v";
  ALTER TABLE "_pages_v" DROP COLUMN "version_title";
  ALTER TABLE "_pages_v" DROP COLUMN "version_excerpt";
  ALTER TABLE "_pages_v" DROP COLUMN "version_content";
  ALTER TABLE "_pages_v" DROP COLUMN "version_seo_meta_title";
  ALTER TABLE "_pages_v" DROP COLUMN "version_seo_meta_description";
  ALTER TABLE "_pages_v" DROP COLUMN "version_seo_keywords";
  ALTER TABLE "_pages_v" DROP COLUMN "version_navigation_label";
  CREATE UNIQUE INDEX "_pages_v_locales_locale_parent_id_unique" ON "_pages_v_locales" USING btree ("_locale", "_parent_id");
  CREATE INDEX "_pages_v_snapshot_idx" ON "_pages_v" USING btree ("snapshot");
  CREATE INDEX "_pages_v_published_locale_idx" ON "_pages_v" USING btree ("published_locale");
  ALTER TABLE "_pages_v_locales" ADD CONSTRAINT "_pages_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;

  CREATE TABLE "media_locales" (
    "alt" varchar NOT NULL,
    "caption" varchar,
    "description" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "public"."enum__locales" NOT NULL,
    "_parent_id" integer NOT NULL
  );
  INSERT INTO "media_locales" ("alt", "caption", "description", "_locale", "_parent_id")
  SELECT COALESCE("alt", ''), "caption", "description", 'es', "id"
  FROM "media";
  ALTER TABLE "media" DROP COLUMN "alt";
  ALTER TABLE "media" DROP COLUMN "caption";
  ALTER TABLE "media" DROP COLUMN "description";
  CREATE UNIQUE INDEX "media_locales_locale_parent_id_unique" ON "media_locales" USING btree ("_locale", "_parent_id");
  ALTER TABLE "media_locales" ADD CONSTRAINT "media_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;

  CREATE TABLE "main_navigation_items_children_locales" (
    "label" varchar NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "public"."enum__locales" NOT NULL,
    "_parent_id" varchar NOT NULL
  );
  INSERT INTO "main_navigation_items_children_locales" ("label", "_locale", "_parent_id")
  SELECT COALESCE("label", ''), 'es', "id"
  FROM "main_navigation_items_children";
  ALTER TABLE "main_navigation_items_children" DROP COLUMN "label";
  CREATE UNIQUE INDEX "main_navigation_items_children_locales_locale_parent_id_uniq" ON "main_navigation_items_children_locales" USING btree ("_locale", "_parent_id");
  ALTER TABLE "main_navigation_items_children_locales" ADD CONSTRAINT "main_navigation_items_children_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."main_navigation_items_children"("id") ON DELETE cascade ON UPDATE no action;

  CREATE TABLE "main_navigation_items_locales" (
    "label" varchar NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "public"."enum__locales" NOT NULL,
    "_parent_id" varchar NOT NULL
  );
  INSERT INTO "main_navigation_items_locales" ("label", "_locale", "_parent_id")
  SELECT COALESCE("label", ''), 'es', "id"
  FROM "main_navigation_items";
  ALTER TABLE "main_navigation_items" DROP COLUMN "label";
  CREATE UNIQUE INDEX "main_navigation_items_locales_locale_parent_id_unique" ON "main_navigation_items_locales" USING btree ("_locale", "_parent_id");
  ALTER TABLE "main_navigation_items_locales" ADD CONSTRAINT "main_navigation_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."main_navigation_items"("id") ON DELETE cascade ON UPDATE no action;

  CREATE TABLE "footer_settings_columns_links_locales" (
    "label" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "public"."enum__locales" NOT NULL,
    "_parent_id" varchar NOT NULL
  );
  INSERT INTO "footer_settings_columns_links_locales" ("label", "_locale", "_parent_id")
  SELECT "label", 'es', "id"
  FROM "footer_settings_columns_links";
  ALTER TABLE "footer_settings_columns_links" DROP COLUMN "label";
  CREATE UNIQUE INDEX "footer_settings_columns_links_locales_locale_parent_id_uniqu" ON "footer_settings_columns_links_locales" USING btree ("_locale", "_parent_id");
  ALTER TABLE "footer_settings_columns_links_locales" ADD CONSTRAINT "footer_settings_columns_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_settings_columns_links"("id") ON DELETE cascade ON UPDATE no action;

  CREATE TABLE "footer_settings_columns_locales" (
    "title" varchar NOT NULL,
    "custom_text" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "public"."enum__locales" NOT NULL,
    "_parent_id" varchar NOT NULL
  );
  INSERT INTO "footer_settings_columns_locales" ("title", "custom_text", "_locale", "_parent_id")
  SELECT COALESCE("title", ''), "custom_text", 'es', "id"
  FROM "footer_settings_columns";
  ALTER TABLE "footer_settings_columns" DROP COLUMN "title";
  ALTER TABLE "footer_settings_columns" DROP COLUMN "custom_text";
  CREATE UNIQUE INDEX "footer_settings_columns_locales_locale_parent_id_unique" ON "footer_settings_columns_locales" USING btree ("_locale", "_parent_id");
  ALTER TABLE "footer_settings_columns_locales" ADD CONSTRAINT "footer_settings_columns_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_settings_columns"("id") ON DELETE cascade ON UPDATE no action;

  CREATE TABLE "footer_settings_social_links_locales" (
    "name" varchar NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "public"."enum__locales" NOT NULL,
    "_parent_id" varchar NOT NULL
  );
  INSERT INTO "footer_settings_social_links_locales" ("name", "_locale", "_parent_id")
  SELECT COALESCE("name", ''), 'es', "id"
  FROM "footer_settings_social_links";
  ALTER TABLE "footer_settings_social_links" DROP COLUMN "name";
  CREATE UNIQUE INDEX "footer_settings_social_links_locales_locale_parent_id_unique" ON "footer_settings_social_links_locales" USING btree ("_locale", "_parent_id");
  ALTER TABLE "footer_settings_social_links_locales" ADD CONSTRAINT "footer_settings_social_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_settings_social_links"("id") ON DELETE cascade ON UPDATE no action;

  CREATE TABLE "footer_settings_locales" (
    "company_name_override" varchar,
    "short_description" varchar,
    "additional_text" varchar,
    "copyright_text" varchar,
    "legal_text" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "public"."enum__locales" NOT NULL,
    "_parent_id" integer NOT NULL
  );
  INSERT INTO "footer_settings_locales" ("company_name_override", "short_description", "additional_text", "copyright_text", "legal_text", "_locale", "_parent_id")
  SELECT "company_name_override", "short_description", "additional_text", "copyright_text", "legal_text", 'es', "id"
  FROM "footer_settings";
  ALTER TABLE "footer_settings" DROP COLUMN "company_name_override";
  ALTER TABLE "footer_settings" DROP COLUMN "short_description";
  ALTER TABLE "footer_settings" DROP COLUMN "additional_text";
  ALTER TABLE "footer_settings" DROP COLUMN "copyright_text";
  ALTER TABLE "footer_settings" DROP COLUMN "legal_text";
  CREATE UNIQUE INDEX "footer_settings_locales_locale_parent_id_unique" ON "footer_settings_locales" USING btree ("_locale", "_parent_id");
  ALTER TABLE "footer_settings_locales" ADD CONSTRAINT "footer_settings_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_settings"("id") ON DELETE cascade ON UPDATE no action;

  ALTER TABLE "company_settings" ADD COLUMN "default_language" "public"."enum_company_settings_default_language" DEFAULT 'es' NOT NULL;
  CREATE TABLE "company_settings_locales" (
    "slogan" varchar,
    "short_description" varchar,
    "long_description" varchar,
    "address" varchar,
    "country_city" varchar,
    "business_hours" varchar,
    "contact_eyebrow" varchar DEFAULT 'Pongámonos en contacto',
    "contact_headline" varchar,
    "contact_intro" varchar,
    "default_meta_title" varchar DEFAULT 'New Site' NOT NULL,
    "default_meta_description" varchar DEFAULT 'Sitio web listo para configurar desde el panel de administración.' NOT NULL,
    "global_keywords" varchar,
    "copyright_text" varchar DEFAULT '© New Site. Todos los derechos reservados.',
    "privacy_policy" varchar,
    "terms_and_conditions" varchar,
    "footer_legal_text" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "public"."enum__locales" NOT NULL,
    "_parent_id" integer NOT NULL
  );
  INSERT INTO "company_settings_locales" ("slogan", "short_description", "long_description", "address", "country_city", "business_hours", "contact_eyebrow", "contact_headline", "contact_intro", "default_meta_title", "default_meta_description", "global_keywords", "copyright_text", "privacy_policy", "terms_and_conditions", "footer_legal_text", "_locale", "_parent_id")
  SELECT "slogan", "short_description", "long_description", "address", "country_city", "business_hours", "contact_eyebrow", "contact_headline", "contact_intro", "default_meta_title", "default_meta_description", "global_keywords", "copyright_text", "privacy_policy", "terms_and_conditions", "footer_legal_text", 'es', "id"
  FROM "company_settings";
  ALTER TABLE "company_settings" DROP COLUMN "slogan";
  ALTER TABLE "company_settings" DROP COLUMN "short_description";
  ALTER TABLE "company_settings" DROP COLUMN "long_description";
  ALTER TABLE "company_settings" DROP COLUMN "address";
  ALTER TABLE "company_settings" DROP COLUMN "country_city";
  ALTER TABLE "company_settings" DROP COLUMN "business_hours";
  ALTER TABLE "company_settings" DROP COLUMN "contact_eyebrow";
  ALTER TABLE "company_settings" DROP COLUMN "contact_headline";
  ALTER TABLE "company_settings" DROP COLUMN "contact_intro";
  ALTER TABLE "company_settings" DROP COLUMN "default_meta_title";
  ALTER TABLE "company_settings" DROP COLUMN "default_meta_description";
  ALTER TABLE "company_settings" DROP COLUMN "global_keywords";
  ALTER TABLE "company_settings" DROP COLUMN "copyright_text";
  ALTER TABLE "company_settings" DROP COLUMN "privacy_policy";
  ALTER TABLE "company_settings" DROP COLUMN "terms_and_conditions";
  ALTER TABLE "company_settings" DROP COLUMN "footer_legal_text";
  CREATE UNIQUE INDEX "company_settings_locales_locale_parent_id_unique" ON "company_settings_locales" USING btree ("_locale", "_parent_id");
  ALTER TABLE "company_settings_locales" ADD CONSTRAINT "company_settings_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."company_settings"("id") ON DELETE cascade ON UPDATE no action;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
  ALTER TABLE "pages" ADD COLUMN "title" varchar;
  ALTER TABLE "pages" ADD COLUMN "excerpt" varchar;
  ALTER TABLE "pages" ADD COLUMN "content" jsonb;
  ALTER TABLE "pages" ADD COLUMN "seo_meta_title" varchar;
  ALTER TABLE "pages" ADD COLUMN "seo_meta_description" varchar;
  ALTER TABLE "pages" ADD COLUMN "seo_keywords" varchar;
  ALTER TABLE "pages" ADD COLUMN "navigation_label" varchar;
  UPDATE "pages" SET
    "title" = "pages_locales"."title",
    "excerpt" = "pages_locales"."excerpt",
    "content" = "pages_locales"."content",
    "seo_meta_title" = "pages_locales"."seo_meta_title",
    "seo_meta_description" = "pages_locales"."seo_meta_description",
    "seo_keywords" = "pages_locales"."seo_keywords",
    "navigation_label" = "pages_locales"."navigation_label"
  FROM "pages_locales"
  WHERE "pages_locales"."_parent_id" = "pages"."id" AND "pages_locales"."_locale" = 'es';
  DROP TABLE "pages_locales" CASCADE;

  ALTER TABLE "_pages_v" ADD COLUMN "version_title" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_excerpt" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_content" jsonb;
  ALTER TABLE "_pages_v" ADD COLUMN "version_seo_meta_title" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_seo_meta_description" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_seo_keywords" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_navigation_label" varchar;
  UPDATE "_pages_v" SET
    "version_title" = "_pages_v_locales"."version_title",
    "version_excerpt" = "_pages_v_locales"."version_excerpt",
    "version_content" = "_pages_v_locales"."version_content",
    "version_seo_meta_title" = "_pages_v_locales"."version_seo_meta_title",
    "version_seo_meta_description" = "_pages_v_locales"."version_seo_meta_description",
    "version_seo_keywords" = "_pages_v_locales"."version_seo_keywords",
    "version_navigation_label" = "_pages_v_locales"."version_navigation_label"
  FROM "_pages_v_locales"
  WHERE "_pages_v_locales"."_parent_id" = "_pages_v"."id" AND "_pages_v_locales"."_locale" = 'es';
  DROP TABLE "_pages_v_locales" CASCADE;
  DROP INDEX IF EXISTS "_pages_v_snapshot_idx";
  DROP INDEX IF EXISTS "_pages_v_published_locale_idx";
  ALTER TABLE "_pages_v" DROP COLUMN "snapshot";
  ALTER TABLE "_pages_v" DROP COLUMN "published_locale";

  ALTER TABLE "media" ADD COLUMN "alt" varchar;
  ALTER TABLE "media" ADD COLUMN "caption" varchar;
  ALTER TABLE "media" ADD COLUMN "description" varchar;
  UPDATE "media" SET
    "alt" = "media_locales"."alt",
    "caption" = "media_locales"."caption",
    "description" = "media_locales"."description"
  FROM "media_locales"
  WHERE "media_locales"."_parent_id" = "media"."id" AND "media_locales"."_locale" = 'es';
  UPDATE "media" SET "alt" = '' WHERE "alt" IS NULL;
  ALTER TABLE "media" ALTER COLUMN "alt" SET NOT NULL;
  DROP TABLE "media_locales" CASCADE;

  ALTER TABLE "main_navigation_items_children" ADD COLUMN "label" varchar;
  UPDATE "main_navigation_items_children" SET "label" = "main_navigation_items_children_locales"."label"
  FROM "main_navigation_items_children_locales"
  WHERE "main_navigation_items_children_locales"."_parent_id" = "main_navigation_items_children"."id" AND "main_navigation_items_children_locales"."_locale" = 'es';
  UPDATE "main_navigation_items_children" SET "label" = '' WHERE "label" IS NULL;
  ALTER TABLE "main_navigation_items_children" ALTER COLUMN "label" SET NOT NULL;
  DROP TABLE "main_navigation_items_children_locales" CASCADE;

  ALTER TABLE "main_navigation_items" ADD COLUMN "label" varchar;
  UPDATE "main_navigation_items" SET "label" = "main_navigation_items_locales"."label"
  FROM "main_navigation_items_locales"
  WHERE "main_navigation_items_locales"."_parent_id" = "main_navigation_items"."id" AND "main_navigation_items_locales"."_locale" = 'es';
  UPDATE "main_navigation_items" SET "label" = '' WHERE "label" IS NULL;
  ALTER TABLE "main_navigation_items" ALTER COLUMN "label" SET NOT NULL;
  DROP TABLE "main_navigation_items_locales" CASCADE;

  ALTER TABLE "footer_settings_columns_links" ADD COLUMN "label" varchar;
  UPDATE "footer_settings_columns_links" SET "label" = "footer_settings_columns_links_locales"."label"
  FROM "footer_settings_columns_links_locales"
  WHERE "footer_settings_columns_links_locales"."_parent_id" = "footer_settings_columns_links"."id" AND "footer_settings_columns_links_locales"."_locale" = 'es';
  DROP TABLE "footer_settings_columns_links_locales" CASCADE;

  ALTER TABLE "footer_settings_columns" ADD COLUMN "title" varchar;
  ALTER TABLE "footer_settings_columns" ADD COLUMN "custom_text" varchar;
  UPDATE "footer_settings_columns" SET
    "title" = "footer_settings_columns_locales"."title",
    "custom_text" = "footer_settings_columns_locales"."custom_text"
  FROM "footer_settings_columns_locales"
  WHERE "footer_settings_columns_locales"."_parent_id" = "footer_settings_columns"."id" AND "footer_settings_columns_locales"."_locale" = 'es';
  UPDATE "footer_settings_columns" SET "title" = '' WHERE "title" IS NULL;
  ALTER TABLE "footer_settings_columns" ALTER COLUMN "title" SET NOT NULL;
  DROP TABLE "footer_settings_columns_locales" CASCADE;

  ALTER TABLE "footer_settings_social_links" ADD COLUMN "name" varchar;
  UPDATE "footer_settings_social_links" SET "name" = "footer_settings_social_links_locales"."name"
  FROM "footer_settings_social_links_locales"
  WHERE "footer_settings_social_links_locales"."_parent_id" = "footer_settings_social_links"."id" AND "footer_settings_social_links_locales"."_locale" = 'es';
  UPDATE "footer_settings_social_links" SET "name" = '' WHERE "name" IS NULL;
  ALTER TABLE "footer_settings_social_links" ALTER COLUMN "name" SET NOT NULL;
  DROP TABLE "footer_settings_social_links_locales" CASCADE;

  ALTER TABLE "footer_settings" ADD COLUMN "company_name_override" varchar;
  ALTER TABLE "footer_settings" ADD COLUMN "short_description" varchar;
  ALTER TABLE "footer_settings" ADD COLUMN "additional_text" varchar;
  ALTER TABLE "footer_settings" ADD COLUMN "copyright_text" varchar;
  ALTER TABLE "footer_settings" ADD COLUMN "legal_text" varchar;
  UPDATE "footer_settings" SET
    "company_name_override" = "footer_settings_locales"."company_name_override",
    "short_description" = "footer_settings_locales"."short_description",
    "additional_text" = "footer_settings_locales"."additional_text",
    "copyright_text" = "footer_settings_locales"."copyright_text",
    "legal_text" = "footer_settings_locales"."legal_text"
  FROM "footer_settings_locales"
  WHERE "footer_settings_locales"."_parent_id" = "footer_settings"."id" AND "footer_settings_locales"."_locale" = 'es';
  DROP TABLE "footer_settings_locales" CASCADE;

  ALTER TABLE "company_settings" ADD COLUMN "slogan" varchar;
  ALTER TABLE "company_settings" ADD COLUMN "short_description" varchar;
  ALTER TABLE "company_settings" ADD COLUMN "long_description" varchar;
  ALTER TABLE "company_settings" ADD COLUMN "address" varchar;
  ALTER TABLE "company_settings" ADD COLUMN "country_city" varchar;
  ALTER TABLE "company_settings" ADD COLUMN "business_hours" varchar;
  ALTER TABLE "company_settings" ADD COLUMN "contact_eyebrow" varchar DEFAULT 'Pongámonos en contacto';
  ALTER TABLE "company_settings" ADD COLUMN "contact_headline" varchar;
  ALTER TABLE "company_settings" ADD COLUMN "contact_intro" varchar;
  ALTER TABLE "company_settings" ADD COLUMN "default_meta_title" varchar DEFAULT 'New Site';
  ALTER TABLE "company_settings" ADD COLUMN "default_meta_description" varchar DEFAULT 'Sitio web listo para configurar desde el panel de administración.';
  ALTER TABLE "company_settings" ADD COLUMN "global_keywords" varchar;
  ALTER TABLE "company_settings" ADD COLUMN "copyright_text" varchar DEFAULT '© New Site. Todos los derechos reservados.';
  ALTER TABLE "company_settings" ADD COLUMN "privacy_policy" varchar;
  ALTER TABLE "company_settings" ADD COLUMN "terms_and_conditions" varchar;
  ALTER TABLE "company_settings" ADD COLUMN "footer_legal_text" varchar;
  UPDATE "company_settings" SET
    "slogan" = "company_settings_locales"."slogan",
    "short_description" = "company_settings_locales"."short_description",
    "long_description" = "company_settings_locales"."long_description",
    "address" = "company_settings_locales"."address",
    "country_city" = "company_settings_locales"."country_city",
    "business_hours" = "company_settings_locales"."business_hours",
    "contact_eyebrow" = "company_settings_locales"."contact_eyebrow",
    "contact_headline" = "company_settings_locales"."contact_headline",
    "contact_intro" = "company_settings_locales"."contact_intro",
    "default_meta_title" = "company_settings_locales"."default_meta_title",
    "default_meta_description" = "company_settings_locales"."default_meta_description",
    "global_keywords" = "company_settings_locales"."global_keywords",
    "copyright_text" = "company_settings_locales"."copyright_text",
    "privacy_policy" = "company_settings_locales"."privacy_policy",
    "terms_and_conditions" = "company_settings_locales"."terms_and_conditions",
    "footer_legal_text" = "company_settings_locales"."footer_legal_text"
  FROM "company_settings_locales"
  WHERE "company_settings_locales"."_parent_id" = "company_settings"."id" AND "company_settings_locales"."_locale" = 'es';
  ALTER TABLE "company_settings" ALTER COLUMN "default_meta_title" SET NOT NULL;
  ALTER TABLE "company_settings" ALTER COLUMN "default_meta_description" SET NOT NULL;
  DROP TABLE "company_settings_locales" CASCADE;
  ALTER TABLE "company_settings" DROP COLUMN "default_language";

  DROP TYPE "public"."enum_company_settings_default_language";
  DROP TYPE "public"."enum__pages_v_published_locale";
  DROP TYPE "public"."enum__locales";
  `)
}
