const js = require('@eslint/js');
const globals = require('globals');
const reactHooks = require('eslint-plugin-react-hooks');
const reactRefresh = require('eslint-plugin-react-refresh');
const react = require('eslint-plugin-react');
const prettier = require('eslint-plugin-prettier');
const tseslint = require('typescript-eslint');
const jsxA11y = require('eslint-plugin-jsx-a11y');
const eslintImport = require('eslint-plugin-import');

module.exports = [
  {
    ignores: ['dist'],
  },
  js.configs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parser: tseslint.parser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        project: './tsconfig.json',
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      prettier,
      'jsx-a11y': jsxA11y,
      'import': eslintImport,
    },
    rules: {
      ...tseslint.configs.recommendedTypeChecked[0].rules,
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      'no-console': 'warn',
      'react/jsx-filename-extension': [1, { extensions: ['.tsx'] }],
      'prettier/prettier': ['error'],
      'react/react-in-jsx-scope': 'off',
      'import/prefer-default-export': 'off',
      'react/jsx-props-no-spreading': 'off',
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'import/no-extraneous-dependencies': ['error'],
      'jsx-a11y/alt-text': 'warn',
      'jsx-a11y/anchor-is-valid': 'warn',
      'jsx-a11y/no-static-element-interactions': 'warn',
      'no-use-before-define': ['error', { functions: false, classes: true, variables: true }],
      'react/destructuring-assignment': ['warn', 'always'],
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
];
