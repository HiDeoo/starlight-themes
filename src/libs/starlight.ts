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

  astroConfig.integrations?.push(
    starlight({
      components: {
        PageFrame: './src/overrides/PageFrame.astro',
      },
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
