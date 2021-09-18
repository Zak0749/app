module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
  ],
  rules: {
    'no-unused-vars': 'warn',
    'import/extensions': ['error', 'never'],
    'no-underscore-dangle': [2, { allow: ['_id'] }],
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],
    'max-len': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'import/no-extraneous-dependencies': [2, { devDependencies: ['**/test.tsx', '**/test.ts'] }],
    '@typescript-eslint/indent': [2, 2],
    'no-undef': 'off',
    'import/no-unresolved': 'off',
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.tsx', '.jsx'] }],
    'react/self-closing-comp': 'off',
    'linebreak-style': 'off',
  },

  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },

  ignorePatterns: ['build/*', 'scripts/*', 'config/*', '**/*.d.ts'],
};
