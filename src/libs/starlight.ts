import starlight from '@astrojs/starlight'
import type { StarlightUserConfig } from '@astrojs/starlight/types'
import type { AstroInlineConfig } from 'astro'

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
        if (config.components?.Head)
          throw new Error(`The theme '${id}' overrides the 'Head' component, which is not supported.`)
        if (config.components?.SkipLink)
          throw new Error(`The theme '${id}' overrides the 'SkipLink' component, which is not supported.`)

        // Overrides are added in a plugin running after the theme rather than in the Starlight configuration to work
        // around themes not preserving user-defined overrides.
        updateConfig({
          components: {
            ...config.components,
            Head: './src/overrides/Head.astro',
            SkipLink: './src/overrides/SkipLink.astro',
          },
        })
      },
    },
  })

  astroConfig.integrations?.push(
    starlight({
      plugins,
      // TODO(HiDeoo)
      sidebar: [
        {
          label: 'Guides',
          items: [
            // Each item here is one entry in the navigation menu.
            { label: 'Example Guide', slug: 'guides/example' },
          ],
        },
        { label: 'Examples', autogenerate: { directory: 'examples' } },
      ],
      social: [
        { icon: 'starlight', label: 'Documentation', href: 'https://starlight.astro.build/' },
        { icon: 'github', label: 'GitHub', href: 'https://github.com/withastro/starlight' },
        { icon: 'discord', label: 'Discord', href: 'https://astro.build/chat' },
      ],
      title: 'Starlight Themes',
    }),
  )
}
