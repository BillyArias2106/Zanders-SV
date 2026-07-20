import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "case_studies" (
      "id" serial PRIMARY KEY NOT NULL,
      "slug" varchar NOT NULL,
      "media_id" integer,
      "url" varchar,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "_status" varchar DEFAULT 'draft'
    );

    CREATE TABLE IF NOT EXISTS "case_studies_locales" (
      "title" varchar NOT NULL,
      "client" varchar,
      "summary" varchar,
      "challenge" varchar,
      "solution" varchar,
      "result" varchar,
      "id" serial PRIMARY KEY NOT NULL,
      "_locale" "public"."enum__locales" NOT NULL,
      "_parent_id" integer NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "_case_studies_v" (
      "id" serial PRIMARY KEY NOT NULL,
      "parent_id" integer,
      "version_slug" varchar,
      "version_media_id" integer,
      "version_url" varchar,
      "version_updated_at" timestamp(3) with time zone,
      "version_created_at" timestamp(3) with time zone,
      "version__status" varchar DEFAULT 'draft',
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "latest" boolean,
      "snapshot" boolean,
      "published_locale" "public"."enum__locales"
    );

    CREATE TABLE IF NOT EXISTS "_case_studies_v_locales" (
      "version_title" varchar,
      "version_client" varchar,
      "version_summary" varchar,
      "version_challenge" varchar,
      "version_solution" varchar,
      "version_result" varchar,
      "id" serial PRIMARY KEY NOT NULL,
      "_locale" "public"."enum__locales" NOT NULL,
      "_parent_id" integer NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "testimonials" (
      "id" serial PRIMARY KEY NOT NULL,
      "media_id" integer,
      "featured" boolean DEFAULT false,
      "url" varchar,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "_status" varchar DEFAULT 'draft'
    );

    CREATE TABLE IF NOT EXISTS "testimonials_locales" (
      "quote" varchar NOT NULL,
      "name" varchar NOT NULL,
      "role" varchar,
      "id" serial PRIMARY KEY NOT NULL,
      "_locale" "public"."enum__locales" NOT NULL,
      "_parent_id" integer NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "_testimonials_v" (
      "id" serial PRIMARY KEY NOT NULL,
      "parent_id" integer,
      "version_media_id" integer,
      "version_featured" boolean DEFAULT false,
      "version_url" varchar,
      "version_updated_at" timestamp(3) with time zone,
      "version_created_at" timestamp(3) with time zone,
      "version__status" varchar DEFAULT 'draft',
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "latest" boolean,
      "snapshot" boolean,
      "published_locale" "public"."enum__locales"
    );

    CREATE TABLE IF NOT EXISTS "_testimonials_v_locales" (
      "version_quote" varchar,
      "version_name" varchar,
      "version_role" varchar,
      "id" serial PRIMARY KEY NOT NULL,
      "_locale" "public"."enum__locales" NOT NULL,
      "_parent_id" integer NOT NULL
    );

    CREATE UNIQUE INDEX IF NOT EXISTS "case_studies_slug_idx"
      ON "case_studies" USING btree ("slug");
    CREATE INDEX IF NOT EXISTS "case_studies_media_idx"
      ON "case_studies" USING btree ("media_id");
    CREATE INDEX IF NOT EXISTS "case_studies_updated_at_idx"
      ON "case_studies" USING btree ("updated_at");
    CREATE INDEX IF NOT EXISTS "case_studies_created_at_idx"
      ON "case_studies" USING btree ("created_at");
    CREATE INDEX IF NOT EXISTS "case_studies__status_idx"
      ON "case_studies" USING btree ("_status");
    CREATE UNIQUE INDEX IF NOT EXISTS "case_studies_locales_locale_parent_id_unique"
      ON "case_studies_locales" USING btree ("_locale", "_parent_id");

    CREATE INDEX IF NOT EXISTS "_case_studies_v_parent_idx"
      ON "_case_studies_v" USING btree ("parent_id");
    CREATE INDEX IF NOT EXISTS "_case_studies_v_version_version_slug_idx"
      ON "_case_studies_v" USING btree ("version_slug");
    CREATE INDEX IF NOT EXISTS "_case_studies_v_version_version_media_idx"
      ON "_case_studies_v" USING btree ("version_media_id");
    CREATE INDEX IF NOT EXISTS "_case_studies_v_version_version_updated_at_idx"
      ON "_case_studies_v" USING btree ("version_updated_at");
    CREATE INDEX IF NOT EXISTS "_case_studies_v_version_version_created_at_idx"
      ON "_case_studies_v" USING btree ("version_created_at");
    CREATE INDEX IF NOT EXISTS "_case_studies_v_version_version__status_idx"
      ON "_case_studies_v" USING btree ("version__status");
    CREATE INDEX IF NOT EXISTS "_case_studies_v_created_at_idx"
      ON "_case_studies_v" USING btree ("created_at");
    CREATE INDEX IF NOT EXISTS "_case_studies_v_updated_at_idx"
      ON "_case_studies_v" USING btree ("updated_at");
    CREATE INDEX IF NOT EXISTS "_case_studies_v_latest_idx"
      ON "_case_studies_v" USING btree ("latest");
    CREATE INDEX IF NOT EXISTS "_case_studies_v_snapshot_idx"
      ON "_case_studies_v" USING btree ("snapshot");
    CREATE INDEX IF NOT EXISTS "_case_studies_v_published_locale_idx"
      ON "_case_studies_v" USING btree ("published_locale");
    CREATE UNIQUE INDEX IF NOT EXISTS "_case_studies_v_locales_locale_parent_id_unique"
      ON "_case_studies_v_locales" USING btree ("_locale", "_parent_id");

    CREATE INDEX IF NOT EXISTS "testimonials_media_idx"
      ON "testimonials" USING btree ("media_id");
    CREATE INDEX IF NOT EXISTS "testimonials_updated_at_idx"
      ON "testimonials" USING btree ("updated_at");
    CREATE INDEX IF NOT EXISTS "testimonials_created_at_idx"
      ON "testimonials" USING btree ("created_at");
    CREATE INDEX IF NOT EXISTS "testimonials__status_idx"
      ON "testimonials" USING btree ("_status");
    CREATE UNIQUE INDEX IF NOT EXISTS "testimonials_locales_locale_parent_id_unique"
      ON "testimonials_locales" USING btree ("_locale", "_parent_id");

    CREATE INDEX IF NOT EXISTS "_testimonials_v_parent_idx"
      ON "_testimonials_v" USING btree ("parent_id");
    CREATE INDEX IF NOT EXISTS "_testimonials_v_version_version_media_idx"
      ON "_testimonials_v" USING btree ("version_media_id");
    CREATE INDEX IF NOT EXISTS "_testimonials_v_version_version_updated_at_idx"
      ON "_testimonials_v" USING btree ("version_updated_at");
    CREATE INDEX IF NOT EXISTS "_testimonials_v_version_version_created_at_idx"
      ON "_testimonials_v" USING btree ("version_created_at");
    CREATE INDEX IF NOT EXISTS "_testimonials_v_version_version__status_idx"
      ON "_testimonials_v" USING btree ("version__status");
    CREATE INDEX IF NOT EXISTS "_testimonials_v_created_at_idx"
      ON "_testimonials_v" USING btree ("created_at");
    CREATE INDEX IF NOT EXISTS "_testimonials_v_updated_at_idx"
      ON "_testimonials_v" USING btree ("updated_at");
    CREATE INDEX IF NOT EXISTS "_testimonials_v_latest_idx"
      ON "_testimonials_v" USING btree ("latest");
    CREATE INDEX IF NOT EXISTS "_testimonials_v_snapshot_idx"
      ON "_testimonials_v" USING btree ("snapshot");
    CREATE INDEX IF NOT EXISTS "_testimonials_v_published_locale_idx"
      ON "_testimonials_v" USING btree ("published_locale");
    CREATE UNIQUE INDEX IF NOT EXISTS "_testimonials_v_locales_locale_parent_id_unique"
      ON "_testimonials_v_locales" USING btree ("_locale", "_parent_id");

    DO $$ BEGIN
      ALTER TABLE "case_studies"
        ADD CONSTRAINT "case_studies_media_id_media_id_fk"
        FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE "case_studies_locales"
        ADD CONSTRAINT "case_studies_locales_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE "_case_studies_v"
        ADD CONSTRAINT "_case_studies_v_parent_id_case_studies_id_fk"
        FOREIGN KEY ("parent_id") REFERENCES "public"."case_studies"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE "_case_studies_v"
        ADD CONSTRAINT "_case_studies_v_version_media_id_media_id_fk"
        FOREIGN KEY ("version_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE "_case_studies_v_locales"
        ADD CONSTRAINT "_case_studies_v_locales_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."_case_studies_v"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE "testimonials"
        ADD CONSTRAINT "testimonials_media_id_media_id_fk"
        FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE "testimonials_locales"
        ADD CONSTRAINT "testimonials_locales_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE "_testimonials_v"
        ADD CONSTRAINT "_testimonials_v_parent_id_testimonials_id_fk"
        FOREIGN KEY ("parent_id") REFERENCES "public"."testimonials"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE "_testimonials_v"
        ADD CONSTRAINT "_testimonials_v_version_media_id_media_id_fk"
        FOREIGN KEY ("version_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE "_testimonials_v_locales"
        ADD CONSTRAINT "_testimonials_v_locales_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."_testimonials_v"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE "payload_locked_documents_rels"
        ADD CONSTRAINT "payload_locked_documents_rels_case_studies_fk"
        FOREIGN KEY ("case_studies_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE "payload_locked_documents_rels"
        ADD CONSTRAINT "payload_locked_documents_rels_testimonials_fk"
        FOREIGN KEY ("testimonials_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_testimonials_fk";
    ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_case_studies_fk";

    DROP TABLE IF EXISTS "_testimonials_v_locales" CASCADE;
    DROP TABLE IF EXISTS "_testimonials_v" CASCADE;
    DROP TABLE IF EXISTS "testimonials_locales" CASCADE;
    DROP TABLE IF EXISTS "testimonials" CASCADE;

    DROP TABLE IF EXISTS "_case_studies_v_locales" CASCADE;
    DROP TABLE IF EXISTS "_case_studies_v" CASCADE;
    DROP TABLE IF EXISTS "case_studies_locales" CASCADE;
    DROP TABLE IF EXISTS "case_studies" CASCADE;
  `)
}
