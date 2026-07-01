import * as migration_20260701_192729_initial from './20260701_192729_initial';

export const migrations = [
  {
    up: migration_20260701_192729_initial.up,
    down: migration_20260701_192729_initial.down,
    name: '20260701_192729_initial'
  },
];
