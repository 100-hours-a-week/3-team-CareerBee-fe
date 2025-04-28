module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    extends: [
      'airbnb',
      'airbnb-typescript',
      'airbnb/hooks',
      'plugin:@typescript-eslint/recommended',
      'plugin:react/recommended',
      'plugin:react-hooks/recommended',
      'prettier',
    ],
    parserOptions: {
      project: './tsconfig.app.json',
    },
    rules: {
      'react/react-in-jsx-scope': 'off', 
      'import/prefer-default-export': 'off',
      'react/jsx-props-no-spreading': 'off', 
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  };