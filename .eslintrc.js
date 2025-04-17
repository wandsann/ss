export const root = true;
export const parser = '@typescript-eslint/parser';
export const plugins = ['@typescript-eslint', 'react', 'react-hooks', 'import'];
export const extends = [
  'eslint:recommended',
  'plugin:@typescript-eslint/recommended',
  'plugin:react/recommended',
  'plugin:react-hooks/recommended',
  'plugin:import/errors',
  'plugin:import/warnings',
  'plugin:import/typescript',
];
export const settings = {
  react: {
    version: 'detect',
  },
  'import/resolver': {
    typescript: {},
    node: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
  },
};
export const rules = {
  'react/react-in-jsx-scope': 'off',
  'react/prop-types': 'off',
  '@typescript-eslint/explicit-module-boundary-types': 'off',
  '@typescript-eslint/no-explicit-any': 'warn',
  'import/order': [
    'error',
    {
      groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
      'newlines-between': 'always',
      alphabetize: {
        order: 'asc',
        caseInsensitive: true,
      },
    },
  ],
};
export const env = {
  browser: true,
  node: true,
  es6: true,
}; 