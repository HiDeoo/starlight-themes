import type { StarlightPlugin } from '@astrojs/starlight/types'

export const Themes = {
  rapide: {
    link: '// TODO(HiDeoo) ',
    loader: async () => (await import('starlight-theme-rapide')).default,
    name: 'Starlight Rapide',
  },
} satisfies Record<string, Theme>

export function getAllThemeIds() {
  return Object.keys(Themes) as ThemeId[]
}

export type ThemeId = keyof typeof Themes

interface Theme {
  loader: () => Promise<() => StarlightPlugin>
  link: string
  name: string
}

export type ThemeVariant = 'light' | 'dark'
