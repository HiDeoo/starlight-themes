# Contributing to Starlight Themes 🎭

Thanks for taking the time to contribute! To keep the project maintainable, please follow this streamlined guide.

## 🛠️ Local Development

This project uses `pnpm`. In order to get started, fork and clone the repository and run `pnpm install`.

## 🎨 Adding a New Theme

Follow these steps to add a new theme to the gallery:

### 1. Install the Theme Package

Run the following in the project root: `pnpm add <theme-package-name>`

### 2. Update the Theme Library

Modify `src/lib/theme.ts`:

* **Add the ID**: Add your theme's unique identifier to the `ThemesIds` array.
* **Add the Configuration**: Add a new entry to the `Themes` object:

```javascript
export const Themes: Record<ThemeId, Theme> = {
  // ... existing themes
  yourtheme: {
    link: 'https://link-to-theme-docs.com/',
    loader: async () => (await import('your-theme-package')).default,
    name: 'Display Name',
    docName: 'Official Theme Name', // Optional
  },
}
```

### 3. Add Preview Screenshots

Place two images (light and dark mode) under: `src/themes/assets/themes/`

### 4. Verify

Run `pnpm build` and then `pnpm preview` to ensure your theme loads correctly and the routes are generated as expected.

---

## 🤝 Pull Request Process

1. **Submit**: Open a PR with a brief description of the theme you are adding.
2. **Legal**: By contributing, you agree that your content is yours to share and falls under the **MIT License**.

## License

Licensed under the MIT License, Copyright © HiDeoo.

See [LICENSE](https://github.com/HiDeoo/starlight-themes/blob/main/LICENSE) for more information.
