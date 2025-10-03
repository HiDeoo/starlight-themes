import hideoo from '@hideoo/eslint-config'

export default hideoo([
  {
    files: ['src/libs/theme.ts'],
    rules: {
      'unicorn/no-await-expression-member': 'off',
    },
  },
])
