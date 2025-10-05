import type { StarlightPlugin } from '@astrojs/starlight/types'

export const ThemesIds = ['rapide', 'catppuccin', 'ion', 'black', 'flexoki', 'nova', 'nextjs'] as const

// TODO(HiDeoo) test updates with issue closed
// TODO(HiDeoo) CTA to add themes to the list

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
  black: {
    link: '// TODO(HiDeoo) ',
    loader: async () => (await import('starlight-theme-black')).default,
    name: 'Black',
    options: {},
  },
  flexoki: {
    link: '// TODO(HiDeoo) ',
    loader: async () => (await import('starlight-theme-flexoki')).default,
    name: 'Flexoki',
  },
  nova: {
    link: '// TODO(HiDeoo) ',
    loader: async () => (await import('starlight-theme-nova')).default,
    name: 'Nova',
  },
  nextjs: {
    link: '// TODO(HiDeoo) ',
    loader: async () => (await import('starlight-theme-next')).default,
    name: 'Next.js',
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

export type ThemeId = (typeof ThemesIds)[number]

interface Theme {
  loader: () => Promise<(...args: any[]) => StarlightPlugin>
  link: string
  name: string
  options?: Record<string, unknown>
  // The name of the theme as shown in the Starlight documentation.
  docName?: string
}

export type ThemeVariant = 'light' | 'dark'
