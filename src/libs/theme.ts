import type { StarlightPlugin } from '@astrojs/starlight/types'

export const Themes = {
  rapide: {
    link: '// TODO(HiDeoo) ',
    loader: async () => (await import('starlight-theme-rapide')).default,
    name: 'Rapide',
  },
  catppuccin: {
    link: '// TODO(HiDeoo) ',
    loader: async () => (await import('@catppuccin/starlight')).default,
    name: 'Catppuccin',
  },
} satisfies Record<string, Theme>

export function getAllThemeIds() {
  return Object.keys(Themes) as ThemeId[]
}

export function getThemePathname(url: URL, id?: ThemeId) {
  const themeUrl = new URL(url)
  const [, baseSegment] = themeUrl.pathname.split('/')

  if (baseSegment && baseSegment in Themes) {
    themeUrl.pathname = id
      ? themeUrl.pathname.replace(baseSegment, id)
      : themeUrl.pathname.replace(`/${baseSegment}`, '')
  } else if (id) {
    themeUrl.pathname = `/${id}${themeUrl.pathname}`
  }

  return themeUrl.pathname
}

export type ThemeId = keyof typeof Themes

interface Theme {
  loader: () => Promise<() => StarlightPlugin>
  link: string
  name: string
}

export type ThemeVariant = 'light' | 'dark'
