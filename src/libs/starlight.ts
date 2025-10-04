import starlight from '@astrojs/starlight'
import type { StarlightUserConfig } from '@astrojs/starlight/types'
import type { AstroInlineConfig } from 'astro'

import { Themes, type ThemeId } from './theme'

export async function addStarlightIntegration(astroConfig: AstroInlineConfig, id?: ThemeId) {
  const plugins: StarlightUserConfig['plugins'] = []

  if (id) {
    const plugin = await Themes[id].loader()
    plugins.push(plugin())
  }

  plugins.push({
    name: 'starlight-themes-overrides',
    hooks: {
      'config:setup'({ config, updateConfig }) {
        // Overrides are added in a plugin running after the theme rather than in the Starlight configuration to work
        // around themes not preserving user-defined overrides.
        updateConfig({
          components: {
            ...config.components,
            Head: './src/overrides/Head.astro',
            PageFrame: './src/overrides/PageFrame.astro',
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
