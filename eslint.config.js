import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    plugins: { react },
    settings: {
      react: { version: 'detect' },
    },
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
      // Ensina o ESLint que usar um identificador dentro de JSX conta como
      // uso. Sem isso, `function C({ icon: Icon })` seguido de `<Icon />`
      // era reportado como variavel nao usada. Ligada isolada de proposito:
      // o preset recommended do plugin traria prop-types junto, que acusaria
      // todos os componentes deste projeto.
      'react/jsx-uses-vars': 'error',
    },
  },
  {
    // Globals do Vitest nos arquivos de teste (globals: true no vite.config.js).
    files: ['**/*.test.{js,jsx}', 'src/**/__tests__/**/*.{js,jsx}'],
    languageOptions: {
      globals: { ...globals.browser, ...globals.vitest },
    },
  },
])
