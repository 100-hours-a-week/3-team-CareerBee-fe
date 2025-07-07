import js from '@eslint/js';
import next from 'eslint-config-next';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-plugin-prettier';
import jsxA11y from 'eslint-plugin-jsx-a11y';

export default [
  js.configs.recommended,
  ...next(),
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      prettier,
      'jsx-a11y': jsxA11y,
    },
    rules: {
      ...tseslint.configs.recommendedTypeChecked[0].rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      'no-console': 'warn',
      'react/jsx-filename-extension': [1, { extensions: ['.tsx'] }],
      'prettier/prettier': ['error', { endOfLine: 'auto' }],
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
  },
];