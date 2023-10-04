module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/typescript",
    "prettier"
  ],
  parser: '@typescript-eslint/parser',
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module', ecmaFeatures: { 'jsx': true } },
  settings: {
    react: { version: '18.2' }, 'import/resolver': {
      'typescript': {}
    }
  },
  plugins: ['react-refresh', 'react', 'prettier', 'react-hooks', '@typescript-eslint'],
  rules: {
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'import/prefer-default-export': 'off',
    'react/prop-types': 'off',
    'no-shadow': 'off',
    'no-useless-escape': 'off',
    'import/no-unresolved': 'off',
    'no-multiple-empty-lines': ['error', { 'max': 1 }],
    'max-len': ['error', { 'code': 120, 'ignoreStrings': true, 'ignoreTemplateLiterals': true }],
    'max-statements-per-line': 'error',
    'quotes': ['error', 'double'],
    'no-void': 'error',
    'keyword-spacing': ['error', { 'before': true, 'after': true }],
    'no-trailing-spaces': 'error',
    'comma-dangle': ['error', 'always-multiline'],
    'array-bracket-spacing': ['error', 'never'],
    'object-curly-spacing': ['error', 'always'],
    'newline-before-return': 'error',
    'no-console': 'warn',
    'no-debugger': 'warn',
    'eqeqeq': 'error',
    'semi': 'error',
    'eol-last': 'error',
    'space-before-function-paren': ['error', { 'anonymous': 'ignore', 'named': 'ignore', 'asyncArrow': 'always' }],
    '@typescript-eslint/member-delimiter-style': ['error', {
      'multiline': {
        'delimiter': 'semi',
        'requireLast': true
      },
      'singleline': {
        'delimiter': 'comma',
        'requireLast': false
      }
    }],

    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/ban-tslint-comment': 'error',
    '@typescript-eslint/no-unused-vars': ['warn', { 'argsIgnorePattern': '^_' }],
    '@typescript-eslint/ban-types': [
      'error',
      {
        'types': {
          'Function': false,
          'object': false,
          '{}': false
        },
        'extendDefaults': true
      }
    ],
    "@typescript-eslint/no-explicit-any": "warn"
  },
}
