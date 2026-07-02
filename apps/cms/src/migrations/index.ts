import * as migration_20260701_192729_initial from './20260701_192729_initial';
import * as migration_20260701_200000_i18n from './20260701_200000_i18n';
import * as migration_20260701_213000_footer_in_company_and_english_seed from './20260701_213000_footer_in_company_and_english_seed';

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
];
