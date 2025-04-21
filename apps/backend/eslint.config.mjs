import simpleImportSort from 'eslint-plugin-simple-import-sort';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import typescriptParser from '@typescript-eslint/parser';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default [
  {
    files: ['**/*.ts'], // Apply to all TypeScript files
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': import('@typescript-eslint/eslint-plugin'),
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
    },
  },
  {
    files: ['**/*.js'], // Apply to all JavaScript files
    ignores: ['.eslintrc.js'], // Ignore specific files
  },
];
