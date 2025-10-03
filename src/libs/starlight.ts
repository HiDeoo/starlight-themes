import { fileURLToPath } from 'node:url'

import starlight from '@astrojs/starlight'
import type { StarlightUserConfig } from '@astrojs/starlight/types'
import { build, type AstroInlineConfig } from 'astro'

import { Themes, type ThemeId } from './theme'

export async function addStarlightIntegration(astroConfig: AstroInlineConfig, id?: ThemeId) {
  const plugins: StarlightUserConfig['plugins'] = []

  if (id) {
    const plugin = await Themes[id]()
    plugins.push(plugin())
  }

  astroConfig.integrations?.push(
    // TODO(HiDeoo)
    starlight({
      title: 'My Docs',
      plugins,
      social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/withastro/starlight' }],
      sidebar: [
        {
          label: 'Guides',
          items: [
            // Each item here is one entry in the navigation menu.
            { label: 'Example Guide', slug: 'guides/example' },
          ],
        },
        {
          label: 'Reference',
          autogenerate: { directory: 'reference' },
        },
      ],
    }),
  )
}
