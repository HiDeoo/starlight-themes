import hideoo from '@hideoo/eslint-config'

export default hideoo([
  {
    files: ['src/libs/theme.ts', 'src/themes/components/ThemeImage.astro'],
    rules: {
      'unicorn/no-await-expression-member': 'off',
    },
  },
])
