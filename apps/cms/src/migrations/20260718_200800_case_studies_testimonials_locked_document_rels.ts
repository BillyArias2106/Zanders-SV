import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "payload_locked_documents_rels"
      ADD COLUMN IF NOT EXISTS "case_studies_id" integer,
      ADD COLUMN IF NOT EXISTS "testimonials_id" integer;

    CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_case_studies_id_idx"
      ON "payload_locked_documents_rels" USING btree ("case_studies_id");

    CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_testimonials_id_idx"
      ON "payload_locked_documents_rels" USING btree ("testimonials_id");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP INDEX IF EXISTS "payload_locked_documents_rels_testimonials_id_idx";
    DROP INDEX IF EXISTS "payload_locked_documents_rels_case_studies_id_idx";

    ALTER TABLE "payload_locked_documents_rels"
      DROP COLUMN IF EXISTS "testimonials_id",
      DROP COLUMN IF EXISTS "case_studies_id";
  `)
}
