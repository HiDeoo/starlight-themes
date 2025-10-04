declare module 'virtual:starlight-themes' {
  const StarlightThemes: {
    currentId: import('./libs/theme').ThemeId | undefined
  }

  export default StarlightThemes
}
