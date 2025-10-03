import { fileURLToPath } from 'node:url'

import starlight from '@astrojs/starlight'
import type { StarlightUserConfig } from '@astrojs/starlight/types'
import { build, type AstroInlineConfig } from 'astro'

import { Themes, type ThemeId } from './theme'

export async function buildStarlight(id?: ThemeId) {
  const root = new URL('../../', import.meta.url)
  const outDir = new URL(id ? `dist-themes/${id}/` : `dist/`, root)

  const config: AstroInlineConfig = {
    configFile: false,
    integrations: [],
    logLevel: 'error',
    outDir: fileURLToPath(outDir),
    srcDir: './src/themes',
  }

  const plugins: StarlightUserConfig['plugins'] = []

  if (id) {
    config.base = `/${id}`

    const plugin = await Themes[id]()
    plugins.push(plugin())
  }

  config.integrations?.push(
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

  // eslint-disable-next-line no-console
  console.info(
    `\u001B[32m▶\u001B[0m \u001B[34mBuilding Starlight\u001B[0m \u001B[2m(theme:\u001B[0m ${id ?? 'default'}\u001B[2m)\u001B[0m`,
  )
  await build(config)

  return { outDir }
}
