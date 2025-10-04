import type { StarlightPlugin } from '@astrojs/starlight/types'

export const ThemesNames = ['rapide', 'catppuccin', 'ion'] as const

export const Themes: Record<ThemeId, Theme> = {
  rapide: {
    link: '// TODO(HiDeoo) ',
    loader: async () => (await import('starlight-theme-rapide')).default,
    name: 'Rapide',
    docName: 'Starlight Rapide',
  },
  catppuccin: {
    link: '// TODO(HiDeoo) ',
    loader: async () => (await import('@catppuccin/starlight')).default,
    name: 'Catppuccin',
    docName: 'Catppuccin for Starlight',
  },
  ion: {
    link: '// TODO(HiDeoo) ',
    loader: async () => (await import('starlight-ion-theme')).ion,
    name: 'Ion',
  },
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

export type ThemeId = (typeof ThemesNames)[number]

interface Theme {
  loader: () => Promise<() => StarlightPlugin>
  link: string
  name: string
  // The name of the theme as shown in the Starlight documentation.
  docName?: string
}

export type ThemeVariant = 'light' | 'dark'
