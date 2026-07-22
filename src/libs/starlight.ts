import starlight from '@astrojs/starlight'
import type { StarlightUserConfig } from '@astrojs/starlight/types'
import type { AstroInlineConfig } from 'astro'

import { getSite } from './astro'
import { Themes, type ThemeId } from './theme'

export async function addStarlightIntegration(astroConfig: AstroInlineConfig, id?: ThemeId) {
  const plugins: StarlightUserConfig['plugins'] = []

  if (id) {
    const theme = Themes[id]
    const plugin = await theme.loader()
    if (theme.options) plugins.push(plugin(theme.options))
    else plugins.push(plugin())
  }

  plugins.push({
    name: 'starlight-themes-overrides',
    hooks: {
      'config:setup'({ config, updateConfig }) {
        const theme = id ? Themes[id] : undefined
        const headOverride =
          id && theme?.overrides?.Head ? `./src/overrides/themes/${id}/Head.astro` : './src/overrides/Head.astro'

        if (config.components?.Head && !theme?.overrides?.Head)
          throw new Error(`The theme '${id}' overrides the 'Head' component, which is not supported.`)
        if (config.components?.SkipLink)
          throw new Error(`The theme '${id}' overrides the 'SkipLink' component, which is not supported.`)

        // Overrides are added in a plugin running after the theme rather than in the Starlight configuration to work
        // around themes not preserving user-defined overrides.
        updateConfig({
          components: {
            ...config.components,
            Head: headOverride,
            SkipLink: './src/overrides/SkipLink.astro',
          },
        })
      },
    },
  })

  const site = getSite()

  const config: StarlightUserConfig = {
    description: 'The one place to preview all Starlight themes.',
    editLink: {
      baseUrl: 'https://github.com/HiDeoo/starlight-themes/edit/main/',
    },
    head: [
      {
        tag: 'meta',
        attrs: { property: 'og:image', content: new URL('og.jpg', site).href },
      },
      { tag: 'meta', attrs: { property: 'og:image:alt', content: 'The one place to preview all Starlight themes.' } },
    ],
    lastUpdated: true,
    plugins,
    routeMiddleware: './src/themes/routeData.ts',
    sidebar: [
      {
        label: 'Start Here',
        items: ['kitchen-sink'],
      },
      { label: 'Examples', items: [{ autogenerate: { directory: 'examples' } }] },
    ],
    social: [
      { icon: 'starlight', label: 'Documentation', href: 'https://starlight.astro.build/' },
      { icon: 'github', label: 'GitHub', href: 'https://github.com/withastro/starlight' },
      { icon: 'discord', label: 'Discord', href: 'https://astro.build/chat' },
    ],
    title: 'Starlight Themes',
  }

  // Some themes disable Expressive Code by default if not explicitly configured so this prevents rendering the
  // examples using the `<Code>` component.
  if (id === 'nova' || id === 'celestia') config.expressiveCode = true

  astroConfig.integrations?.push(starlight(config))
}
