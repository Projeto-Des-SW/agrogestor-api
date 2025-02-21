import { config } from 'dotenv';
import { pathsToModuleNameMapper } from 'ts-jest';
import { compilerOptions } from '../tsconfig.json';

config({ path: '.env.test' });

export default {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '..',
  testEnvironment: 'node',
  testRegex: '.e2e-spec.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/',
  }),
  setupFilesAfterEnv: ['./test/setup.ts'],
};
