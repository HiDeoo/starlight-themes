import fs from 'node:fs/promises'

import { buildStarlight } from './libs/starlight'
import { getAllThemeIds } from './libs/theme'

// TODO(HiDeoo) ensure all links in content work no matter the theme
// TODO(HiDeoo) make sure we enable most features in Starlight
// TODO(HiDeoo) edit links
// TODO(HiDeoo) dual header logo: home + theme home

const distDir = new URL('../dist/', import.meta.url)

await buildStarlight()

for (const theme of getAllThemeIds()) {
  const { outDir } = await buildStarlight(theme)
  await fs.rename(outDir, new URL(theme, distDir))
}
