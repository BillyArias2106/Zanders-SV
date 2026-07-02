import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__pages_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_media_media_type" AS ENUM('image', 'video', 'other');
  CREATE TYPE "public"."enum_contact_submissions_status" AS ENUM('new', 'inProgress', 'replied', 'archived');
  CREATE TYPE "public"."enum_main_navigation_items_children_link_type" AS ENUM('page', 'external', 'anchor', 'container');
  CREATE TYPE "public"."enum_main_navigation_items_link_type" AS ENUM('page', 'external', 'anchor', 'container');
  CREATE TYPE "public"."enum_footer_settings_columns_content_type" AS ENUM('publishedPages', 'mainNavigation', 'manualLinks', 'socialLinks', 'contact', 'customText');
  CREATE TYPE "public"."enum_footer_settings_social_links_type" AS ENUM('facebook', 'instagram', 'tiktok', 'linkedin', 'youtube', 'twitter', 'whatsapp', 'website', 'other');
  CREATE TABLE "pages_navbar_links" (
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL,
  "id" varchar PRIMARY KEY NOT NULL,
  "label" varchar,
  "href" varchar,
  "open_in_new_tab" boolean DEFAULT false
  );
  
  CREATE TABLE "pages" (
  "id" serial PRIMARY KEY NOT NULL,
  "title" varchar,
  "excerpt" varchar,
  "slug" varchar,
  "status" "enum_pages_status" DEFAULT 'draft',
  "featured_image_id" integer,
  "content" jsonb,
  "seo_meta_title" varchar,
  "seo_meta_description" varchar,
  "seo_keywords" varchar,
  "seo_og_image_id" integer,
  "show_in_main_navigation" boolean DEFAULT false,
  "navigation_label" varchar,
  "parent_page_id" integer,
  "show_in_footer" boolean DEFAULT true,
  "navigation_order" numeric DEFAULT 0,
  "hero_title" varchar,
  "hero_subtitle" varchar,
  "video_background_id" integer,
  "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  "_status" "enum_pages_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_pages_v_version_navbar_links" (
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL,
  "id" serial PRIMARY KEY NOT NULL,
  "label" varchar,
  "href" varchar,
  "open_in_new_tab" boolean DEFAULT false,
  "_uuid" varchar
  );
  
  CREATE TABLE "_pages_v" (
  "id" serial PRIMARY KEY NOT NULL,
  "parent_id" integer,
  "version_title" varchar,
  "version_excerpt" varchar,
  "version_slug" varchar,
  "version_status" "enum__pages_v_version_status" DEFAULT 'draft',
  "version_featured_image_id" integer,
  "version_content" jsonb,
  "version_seo_meta_title" varchar,
  "version_seo_meta_description" varchar,
  "version_seo_keywords" varchar,
  "version_seo_og_image_id" integer,
  "version_show_in_main_navigation" boolean DEFAULT false,
  "version_navigation_label" varchar,
  "version_parent_page_id" integer,
  "version_show_in_footer" boolean DEFAULT true,
  "version_navigation_order" numeric DEFAULT 0,
  "version_hero_title" varchar,
  "version_hero_subtitle" varchar,
  "version_video_background_id" integer,
  "version_updated_at" timestamp(3) with time zone,
  "version_created_at" timestamp(3) with time zone,
  "version__status" "enum__pages_v_version_status" DEFAULT 'draft',
  "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  "latest" boolean
  );
  
  CREATE TABLE "media" (
  "id" serial PRIMARY KEY NOT NULL,
  "alt" varchar NOT NULL,
  "caption" varchar,
  "media_type" "enum_media_media_type" DEFAULT 'image' NOT NULL,
  "poster_id" integer,
  "description" varchar,
  "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  "url" varchar,
  "thumbnail_u_r_l" varchar,
  "filename" varchar,
  "mime_type" varchar,
  "filesize" numeric,
  "width" numeric,
  "height" numeric,
  "focal_x" numeric,
  "focal_y" numeric
  );
  
  CREATE TABLE "contact_submissions_email_recipients" (
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL,
  "id" varchar PRIMARY KEY NOT NULL,
  "email" varchar
  );
  
  CREATE TABLE "contact_submissions" (
  "id" serial PRIMARY KEY NOT NULL,
  "first_name" varchar NOT NULL,
  "last_name" varchar,
  "full_name" varchar,
  "phone" varchar NOT NULL,
  "email" varchar NOT NULL,
  "subject" varchar NOT NULL,
  "message" varchar NOT NULL,
  "status" "enum_contact_submissions_status" DEFAULT 'new' NOT NULL,
  "email_sent" boolean DEFAULT false,
  "email_error" varchar,
  "source" varchar,
  "user_agent" varchar,
  "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "users_sessions" (
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL,
  "id" varchar PRIMARY KEY NOT NULL,
  "created_at" timestamp(3) with time zone,
  "expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  "id" serial PRIMARY KEY NOT NULL,
  "name" varchar,
  "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  "email" varchar NOT NULL,
  "reset_password_token" varchar,
  "reset_password_expiration" timestamp(3) with time zone,
  "salt" varchar,
  "hash" varchar,
  "login_attempts" numeric DEFAULT 0,
  "lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "payload_kv" (
  "id" serial PRIMARY KEY NOT NULL,
  "key" varchar NOT NULL,
  "data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  "id" serial PRIMARY KEY NOT NULL,
  "global_slug" varchar,
  "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  "id" serial PRIMARY KEY NOT NULL,
  "order" integer,
  "parent_id" integer NOT NULL,
  "path" varchar NOT NULL,
  "pages_id" integer,
  "media_id" integer,
  "contact_submissions_id" integer,
  "users_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  "id" serial PRIMARY KEY NOT NULL,
  "key" varchar,
  "value" jsonb,
  "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  "id" serial PRIMARY KEY NOT NULL,
  "order" integer,
  "parent_id" integer NOT NULL,
  "path" varchar NOT NULL,
  "users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  "id" serial PRIMARY KEY NOT NULL,
  "name" varchar,
  "batch" numeric,
  "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "main_navigation_items_children" (
  "_order" integer NOT NULL,
  "_parent_id" varchar NOT NULL,
  "id" varchar PRIMARY KEY NOT NULL,
  "label" varchar NOT NULL,
  "link_type" "enum_main_navigation_items_children_link_type" DEFAULT 'page' NOT NULL,
  "page_id" integer,
  "manual_url" varchar,
  "open_in_new_tab" boolean DEFAULT false,
  "is_active" boolean DEFAULT true,
  "order" numeric DEFAULT 0
  );
  
  CREATE TABLE "main_navigation_items" (
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL,
  "id" varchar PRIMARY KEY NOT NULL,
  "label" varchar NOT NULL,
  "link_type" "enum_main_navigation_items_link_type" DEFAULT 'page' NOT NULL,
  "page_id" integer,
  "manual_url" varchar,
  "open_in_new_tab" boolean DEFAULT false,
  "is_active" boolean DEFAULT true,
  "order" numeric DEFAULT 0
  );
  
  CREATE TABLE "main_navigation" (
  "id" serial PRIMARY KEY NOT NULL,
  "updated_at" timestamp(3) with time zone,
  "created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "footer_settings_columns_links" (
  "_order" integer NOT NULL,
  "_parent_id" varchar NOT NULL,
  "id" varchar PRIMARY KEY NOT NULL,
  "label" varchar,
  "url" varchar,
  "open_in_new_tab" boolean DEFAULT false,
  "is_active" boolean DEFAULT true,
  "order" numeric DEFAULT 0
  );
  
  CREATE TABLE "footer_settings_columns" (
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL,
  "id" varchar PRIMARY KEY NOT NULL,
  "title" varchar NOT NULL,
  "content_type" "enum_footer_settings_columns_content_type" DEFAULT 'manualLinks' NOT NULL,
  "custom_text" varchar,
  "order" numeric DEFAULT 0,
  "is_active" boolean DEFAULT true
  );
  
  CREATE TABLE "footer_settings_social_links" (
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL,
  "id" varchar PRIMARY KEY NOT NULL,
  "name" varchar NOT NULL,
  "type" "enum_footer_settings_social_links_type" DEFAULT 'other' NOT NULL,
  "url" varchar NOT NULL,
  "icon_name" varchar,
  "show_in_footer" boolean DEFAULT true,
  "show_in_header" boolean DEFAULT false,
  "open_in_new_tab" boolean DEFAULT true,
  "is_active" boolean DEFAULT true,
  "order" numeric DEFAULT 0
  );
  
  CREATE TABLE "footer_settings" (
  "id" serial PRIMARY KEY NOT NULL,
  "is_enabled" boolean DEFAULT true,
  "show_logo" boolean DEFAULT true,
  "logo_id" integer,
  "show_company_name" boolean DEFAULT true,
  "company_name_override" varchar,
  "short_description" varchar,
  "additional_text" varchar,
  "use_company_settings" boolean DEFAULT true,
  "email" varchar,
  "phone" varchar,
  "whatsapp" varchar,
  "address" varchar,
  "business_hours" varchar,
  "country" varchar,
  "city" varchar,
  "copyright_text" varchar,
  "privacy_page_id" integer,
  "terms_page_id" integer,
  "legal_text" varchar,
  "updated_at" timestamp(3) with time zone,
  "created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "company_settings_contact_recipients" (
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL,
  "id" varchar PRIMARY KEY NOT NULL,
  "email" varchar NOT NULL
  );
  
  CREATE TABLE "company_settings" (
  "id" serial PRIMARY KEY NOT NULL,
  "commercial_name" varchar DEFAULT 'New Site' NOT NULL,
  "legal_name" varchar,
  "slogan" varchar,
  "short_description" varchar,
  "long_description" varchar,
  "main_email" varchar,
  "main_phone" varchar,
  "whatsapp" varchar,
  "address" varchar,
  "country_city" varchar,
  "business_hours" varchar,
  "logo_primary_id" integer,
  "logo_secondary_id" integer,
  "favicon_id" integer,
  "og_image_id" integer,
  "color_primary" varchar DEFAULT '#8DE1E8' NOT NULL,
  "color_secondary" varchar DEFAULT '#1A6B80' NOT NULL,
  "color_accent" varchar DEFAULT '#45ACBF' NOT NULL,
  "color_background" varchar DEFAULT '#02080C' NOT NULL,
  "color_text_primary" varchar DEFAULT '#F8FAFC' NOT NULL,
  "color_text_secondary" varchar DEFAULT '#C7D1D6' NOT NULL,
  "facebook_url" varchar,
  "instagram_url" varchar,
  "tiktok_url" varchar,
  "linkedin_url" varchar,
  "youtube_url" varchar,
  "twitter_url" varchar,
  "whatsapp_url" varchar,
  "contact_eyebrow" varchar DEFAULT 'Pongámonos en contacto',
  "contact_headline" varchar,
  "contact_intro" varchar,
  "default_meta_title" varchar DEFAULT 'New Site' NOT NULL,
  "default_meta_description" varchar DEFAULT 'Sitio web listo para configurar desde el panel de administración.' NOT NULL,
  "global_keywords" varchar,
  "canonical_base_url" varchar DEFAULT 'http://localhost:3000',
  "copyright_text" varchar DEFAULT '© New Site. Todos los derechos reservados.',
  "privacy_policy" varchar,
  "terms_and_conditions" varchar,
  "footer_legal_text" varchar,
  "updated_at" timestamp(3) with time zone,
  "created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "pages_navbar_links" ADD CONSTRAINT "pages_navbar_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_featured_image_id_media_id_fk" FOREIGN KEY ("featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_parent_page_id_pages_id_fk" FOREIGN KEY ("parent_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_video_background_id_media_id_fk" FOREIGN KEY ("video_background_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_version_navbar_links" ADD CONSTRAINT "_pages_v_version_navbar_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_parent_id_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_featured_image_id_media_id_fk" FOREIGN KEY ("version_featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_seo_og_image_id_media_id_fk" FOREIGN KEY ("version_seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_parent_page_id_pages_id_fk" FOREIGN KEY ("version_parent_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_video_background_id_media_id_fk" FOREIGN KEY ("version_video_background_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "media" ADD CONSTRAINT "media_poster_id_media_id_fk" FOREIGN KEY ("poster_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "contact_submissions_email_recipients" ADD CONSTRAINT "contact_submissions_email_recipients_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_submissions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_contact_submissions_fk" FOREIGN KEY ("contact_submissions_id") REFERENCES "public"."contact_submissions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "main_navigation_items_children" ADD CONSTRAINT "main_navigation_items_children_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "main_navigation_items_children" ADD CONSTRAINT "main_navigation_items_children_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."main_navigation_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "main_navigation_items" ADD CONSTRAINT "main_navigation_items_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "main_navigation_items" ADD CONSTRAINT "main_navigation_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."main_navigation"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_settings_columns_links" ADD CONSTRAINT "footer_settings_columns_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_settings_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_settings_columns" ADD CONSTRAINT "footer_settings_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_settings_social_links" ADD CONSTRAINT "footer_settings_social_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_settings" ADD CONSTRAINT "footer_settings_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "footer_settings" ADD CONSTRAINT "footer_settings_privacy_page_id_pages_id_fk" FOREIGN KEY ("privacy_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "footer_settings" ADD CONSTRAINT "footer_settings_terms_page_id_pages_id_fk" FOREIGN KEY ("terms_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "company_settings_contact_recipients" ADD CONSTRAINT "company_settings_contact_recipients_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."company_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "company_settings" ADD CONSTRAINT "company_settings_logo_primary_id_media_id_fk" FOREIGN KEY ("logo_primary_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "company_settings" ADD CONSTRAINT "company_settings_logo_secondary_id_media_id_fk" FOREIGN KEY ("logo_secondary_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "company_settings" ADD CONSTRAINT "company_settings_favicon_id_media_id_fk" FOREIGN KEY ("favicon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "company_settings" ADD CONSTRAINT "company_settings_og_image_id_media_id_fk" FOREIGN KEY ("og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "pages_navbar_links_order_idx" ON "pages_navbar_links" USING btree ("_order");
  CREATE INDEX "pages_navbar_links_parent_id_idx" ON "pages_navbar_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_slug_idx" ON "pages" USING btree ("slug");
  CREATE INDEX "pages_featured_image_idx" ON "pages" USING btree ("featured_image_id");
  CREATE INDEX "pages_seo_seo_og_image_idx" ON "pages" USING btree ("seo_og_image_id");
  CREATE INDEX "pages_parent_page_idx" ON "pages" USING btree ("parent_page_id");
  CREATE INDEX "pages_video_background_idx" ON "pages" USING btree ("video_background_id");
  CREATE INDEX "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX "pages_created_at_idx" ON "pages" USING btree ("created_at");
  CREATE INDEX "pages__status_idx" ON "pages" USING btree ("_status");
  CREATE INDEX "_pages_v_version_navbar_links_order_idx" ON "_pages_v_version_navbar_links" USING btree ("_order");
  CREATE INDEX "_pages_v_version_navbar_links_parent_id_idx" ON "_pages_v_version_navbar_links" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_parent_idx" ON "_pages_v" USING btree ("parent_id");
  CREATE INDEX "_pages_v_version_version_slug_idx" ON "_pages_v" USING btree ("version_slug");
  CREATE INDEX "_pages_v_version_version_featured_image_idx" ON "_pages_v" USING btree ("version_featured_image_id");
  CREATE INDEX "_pages_v_version_seo_version_seo_og_image_idx" ON "_pages_v" USING btree ("version_seo_og_image_id");
  CREATE INDEX "_pages_v_version_version_parent_page_idx" ON "_pages_v" USING btree ("version_parent_page_id");
  CREATE INDEX "_pages_v_version_version_video_background_idx" ON "_pages_v" USING btree ("version_video_background_id");
  CREATE INDEX "_pages_v_version_version_updated_at_idx" ON "_pages_v" USING btree ("version_updated_at");
  CREATE INDEX "_pages_v_version_version_created_at_idx" ON "_pages_v" USING btree ("version_created_at");
  CREATE INDEX "_pages_v_version_version__status_idx" ON "_pages_v" USING btree ("version__status");
  CREATE INDEX "_pages_v_created_at_idx" ON "_pages_v" USING btree ("created_at");
  CREATE INDEX "_pages_v_updated_at_idx" ON "_pages_v" USING btree ("updated_at");
  CREATE INDEX "_pages_v_latest_idx" ON "_pages_v" USING btree ("latest");
  CREATE INDEX "media_poster_idx" ON "media" USING btree ("poster_id");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "contact_submissions_email_recipients_order_idx" ON "contact_submissions_email_recipients" USING btree ("_order");
  CREATE INDEX "contact_submissions_email_recipients_parent_id_idx" ON "contact_submissions_email_recipients" USING btree ("_parent_id");
  CREATE INDEX "contact_submissions_updated_at_idx" ON "contact_submissions" USING btree ("updated_at");
  CREATE INDEX "contact_submissions_created_at_idx" ON "contact_submissions" USING btree ("created_at");
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_contact_submissions_id_idx" ON "payload_locked_documents_rels" USING btree ("contact_submissions_id");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "main_navigation_items_children_order_idx" ON "main_navigation_items_children" USING btree ("_order");
  CREATE INDEX "main_navigation_items_children_parent_id_idx" ON "main_navigation_items_children" USING btree ("_parent_id");
  CREATE INDEX "main_navigation_items_children_page_idx" ON "main_navigation_items_children" USING btree ("page_id");
  CREATE INDEX "main_navigation_items_order_idx" ON "main_navigation_items" USING btree ("_order");
  CREATE INDEX "main_navigation_items_parent_id_idx" ON "main_navigation_items" USING btree ("_parent_id");
  CREATE INDEX "main_navigation_items_page_idx" ON "main_navigation_items" USING btree ("page_id");
  CREATE INDEX "footer_settings_columns_links_order_idx" ON "footer_settings_columns_links" USING btree ("_order");
  CREATE INDEX "footer_settings_columns_links_parent_id_idx" ON "footer_settings_columns_links" USING btree ("_parent_id");
  CREATE INDEX "footer_settings_columns_order_idx" ON "footer_settings_columns" USING btree ("_order");
  CREATE INDEX "footer_settings_columns_parent_id_idx" ON "footer_settings_columns" USING btree ("_parent_id");
  CREATE INDEX "footer_settings_social_links_order_idx" ON "footer_settings_social_links" USING btree ("_order");
  CREATE INDEX "footer_settings_social_links_parent_id_idx" ON "footer_settings_social_links" USING btree ("_parent_id");
  CREATE INDEX "footer_settings_logo_idx" ON "footer_settings" USING btree ("logo_id");
  CREATE INDEX "footer_settings_privacy_page_idx" ON "footer_settings" USING btree ("privacy_page_id");
  CREATE INDEX "footer_settings_terms_page_idx" ON "footer_settings" USING btree ("terms_page_id");
  CREATE INDEX "company_settings_contact_recipients_order_idx" ON "company_settings_contact_recipients" USING btree ("_order");
  CREATE INDEX "company_settings_contact_recipients_parent_id_idx" ON "company_settings_contact_recipients" USING btree ("_parent_id");
  CREATE INDEX "company_settings_logo_primary_idx" ON "company_settings" USING btree ("logo_primary_id");
  CREATE INDEX "company_settings_logo_secondary_idx" ON "company_settings" USING btree ("logo_secondary_id");
  CREATE INDEX "company_settings_favicon_idx" ON "company_settings" USING btree ("favicon_id");
  CREATE INDEX "company_settings_og_image_idx" ON "company_settings" USING btree ("og_image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_navbar_links" CASCADE;
  DROP TABLE "pages" CASCADE;
  DROP TABLE "_pages_v_version_navbar_links" CASCADE;
  DROP TABLE "_pages_v" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "contact_submissions_email_recipients" CASCADE;
  DROP TABLE "contact_submissions" CASCADE;
  DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "main_navigation_items_children" CASCADE;
  DROP TABLE "main_navigation_items" CASCADE;
  DROP TABLE "main_navigation" CASCADE;
  DROP TABLE "footer_settings_columns_links" CASCADE;
  DROP TABLE "footer_settings_columns" CASCADE;
  DROP TABLE "footer_settings_social_links" CASCADE;
  DROP TABLE "footer_settings" CASCADE;
  DROP TABLE "company_settings_contact_recipients" CASCADE;
  DROP TABLE "company_settings" CASCADE;
  DROP TYPE "public"."enum_pages_status";
  DROP TYPE "public"."enum__pages_v_version_status";
  DROP TYPE "public"."enum_media_media_type";
  DROP TYPE "public"."enum_contact_submissions_status";
  DROP TYPE "public"."enum_main_navigation_items_children_link_type";
  DROP TYPE "public"."enum_main_navigation_items_link_type";
  DROP TYPE "public"."enum_footer_settings_columns_content_type";
  DROP TYPE "public"."enum_footer_settings_social_links_type";`)
}
