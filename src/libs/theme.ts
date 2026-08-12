import type { StarlightPlugin } from '@astrojs/starlight/types'

export const ThemesIds = [
  'rapide',
  'catppuccin',
  'ion',
  'black',
  'flexoki',
  'nova',
  'nextjs',
  'galaxy',
  'page',
  'gruvbox',
  'six',
  'vintage',
  'rose-pine',
  'nord',
  'terminal',
  'celestia',
  'lucode',
  'md3',
  'mdbook',
] as const

export const Themes: Record<ThemeId, Theme> = {
  rapide: {
    link: 'https://starlight-theme-rapide.vercel.app/',
    loader: async () => (await import('starlight-theme-rapide')).default,
    name: 'Rapide',
    docName: 'Starlight Rapide',
  },
  catppuccin: {
    link: 'https://starlight.catppuccin.com/',
    loader: async () => (await import('@catppuccin/starlight')).default,
    name: 'Catppuccin',
    docName: 'Catppuccin for Starlight',
  },
  ion: {
    link: 'https://louisescher.github.io/starlight-ion-theme/',
    loader: async () => (await import('starlight-ion-theme')).ion,
    name: 'Ion',
  },
  black: {
    link: 'https://starlight-theme-black.vercel.app/',
    loader: async () => (await import('starlight-theme-black')).default,
    name: 'Black',
    docName: 'Starlight Black',
    options: {},
    overrides: {
      Head: true,
    },
  },
  flexoki: {
    link: 'https://delucis.github.io/starlight-theme-flexoki/',
    loader: async () => (await import('starlight-theme-flexoki')).default,
    name: 'Flexoki',
    docName: 'Starlight Flexoki',
  },
  nova: {
    link: 'https://starlight-theme-nova.pages.dev/',
    loader: async () => (await import('starlight-theme-nova')).default,
    name: 'Nova',
    docName: 'Starlight Nova',
  },
  nextjs: {
    link: 'https://starlight-theme-next.trueberryless.org/',
    loader: async () => (await import('starlight-theme-next')).default,
    name: 'Next.js',
    docName: 'Starlight Next.js',
  },
  galaxy: {
    link: 'https://frostybee.github.io/starlight-theme-galaxy/',
    loader: async () => (await import('starlight-theme-galaxy')).default,
    name: 'Galaxy',
    docName: 'Starlight Galaxy',
  },
  page: {
    link: 'https://pelagornis-page.netlify.app/',
    loader: async () => (await import('@pelagornis/page')).default,
    name: 'Page',
    docName: 'Starlight Page',
  },
  gruvbox: {
    link: 'https://starlight-theme-gruvbox.otterlord.dev/',
    loader: async () => (await import('starlight-theme-gruvbox')).default,
    name: 'Gruvbox',
    docName: 'Starlight Gruvbox',
  },
  six: {
    link: 'https://six-tech.github.io/Six.StarlightTheme/',
    loader: async () => (await import('@six-tech/starlight-theme-six')).default,
    name: 'Six',
    docName: 'Starlight Six',
    options: {},
  },
  vintage: {
    link: 'https://starlight-theme-vintage.netlify.app/',
    loader: async () => (await import('starlight-theme-vintage')).default,
    name: 'Vintage',
    docName: 'Starlight Vintage',
  },
  'rose-pine': {
    link: 'https://starlight-theme-rose-pine.trueberryless.org/',
    loader: async () => (await import('starlight-theme-rose-pine')).default,
    name: 'Rosé Pine',
    docName: 'Starlight Rosé Pine',
  },
  nord: {
    link: 'https://kazettique.github.io/starlight-theme-nord/',
    loader: async () => (await import('starlight-theme-nord')).default,
    name: 'Nord',
    docName: 'Starlight Nord',
  },
  terminal: {
    link: 'https://madlinux7.github.io/starlight-theme-terminal/',
    loader: async () => (await import('starlight-theme-terminal')).default,
    name: 'Terminal',
    docName: 'Starlight Terminal',
  },
  celestia: {
    link: 'https://starlight-theme-celestia.devxy.codefloe.page/',
    loader: async () => (await import('starlight-theme-celestia')).default,
    name: 'Celestia',
    docName: 'Starlight Celestia',
    overrides: {
      Head: true,
    },
  },
  lucode: {
    link: 'https://lucas-labs.github.io/lucode-starlight-theme/',
    loader: async () => (await import('lucode-starlight')).default,
    name: 'Lucode',
    docName: 'Starlight Lucode',
  },
  md3: {
    link: 'https://axiaobo7788.github.io/starlight-material-design-theme/',
    loader: async () => (await import('starlight-theme-md3')).default,
    name: 'MD3',
    docName: 'Starlight MD3',
  },
  mdbook: {
    link: 'https://starlight-theme-mdbook.netlify.app/',
    loader: async () => (await import('starlight-theme-mdbook')).default,
    name: 'mdBook',
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
  overrides?: {
    Head?: true
  }
  // The name of the theme as shown in the Starlight documentation.
  docName?: string
}

export type ThemeVariant = 'light' | 'dark'
