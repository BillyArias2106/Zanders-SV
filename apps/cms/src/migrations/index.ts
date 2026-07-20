import * as migration_20260701_192729_initial from './20260701_192729_initial'
import * as migration_20260701_200000_i18n from './20260701_200000_i18n'
import * as migration_20260701_213000_footer_in_company_and_english_seed from './20260701_213000_footer_in_company_and_english_seed'
import * as migration_20260702_173000_professional_admin_phase_1 from './20260702_173000_professional_admin_phase_1'
import * as migration_20260715_220000_guided_page_composer from './20260715_220000_guided_page_composer'
import * as migration_20260716_050000_page_section_library from './20260716_050000_page_section_library'
import * as migration_20260718_200800_case_studies_testimonials_locked_document_rels from './20260718_200800_case_studies_testimonials_locked_document_rels'
import * as migration_20260718_201200_case_studies_testimonials_tables from './20260718_201200_case_studies_testimonials_tables'
import * as migration_20260719_120000_site_settings from './20260719_120000_site_settings'
import * as migration_20260719_123000_page_type_enum_content_slices from './20260719_123000_page_type_enum_content_slices'
import * as migration_20260719_124500_site_profile_in_company_settings from './20260719_124500_site_profile_in_company_settings'

export const migrations = [
  {
    up: migration_20260701_192729_initial.up,
    down: migration_20260701_192729_initial.down,
    name: '20260701_192729_initial'
  },
  {
    up: migration_20260701_200000_i18n.up,
    down: migration_20260701_200000_i18n.down,
    name: '20260701_200000_i18n'
  },
  {
    up: migration_20260701_213000_footer_in_company_and_english_seed.up,
    down: migration_20260701_213000_footer_in_company_and_english_seed.down,
    name: '20260701_213000_footer_in_company_and_english_seed'
  },
  {
    up: migration_20260702_173000_professional_admin_phase_1.up,
    down: migration_20260702_173000_professional_admin_phase_1.down,
    name: '20260702_173000_professional_admin_phase_1'
  },
  {
    up: migration_20260715_220000_guided_page_composer.up,
    down: migration_20260715_220000_guided_page_composer.down,
    name: '20260715_220000_guided_page_composer'
  },
  {
    up: migration_20260716_050000_page_section_library.up,
    down: migration_20260716_050000_page_section_library.down,
    name: '20260716_050000_page_section_library'
  },
  {
    up: migration_20260718_200800_case_studies_testimonials_locked_document_rels.up,
    down: migration_20260718_200800_case_studies_testimonials_locked_document_rels.down,
    name: '20260718_200800_case_studies_testimonials_locked_document_rels'
  },
  {
    up: migration_20260718_201200_case_studies_testimonials_tables.up,
    down: migration_20260718_201200_case_studies_testimonials_tables.down,
    name: '20260718_201200_case_studies_testimonials_tables'
  },
  {
    up: migration_20260719_120000_site_settings.up,
    down: migration_20260719_120000_site_settings.down,
    name: '20260719_120000_site_settings'
  },
  {
    up: migration_20260719_123000_page_type_enum_content_slices.up,
    down: migration_20260719_123000_page_type_enum_content_slices.down,
    name: '20260719_123000_page_type_enum_content_slices'
  },
  {
    up: migration_20260719_124500_site_profile_in_company_settings.up,
    down: migration_20260719_124500_site_profile_in_company_settings.down,
    name: '20260719_124500_site_profile_in_company_settings'
  }
]
