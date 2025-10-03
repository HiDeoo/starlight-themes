export const Themes = {
  rapide: async () => (await import('starlight-theme-rapide')).default,
}

export function getAllThemeIds() {
  return Object.keys(Themes) as ThemeId[]
}

export type ThemeId = keyof typeof Themes
