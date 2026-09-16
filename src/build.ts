import fs from 'node:fs/promises'

import { build } from 'astro'

import { getAstroConfig } from './libs/astro'
import { ThemesIds, type ThemeId } from './libs/theme'

const distDir = new URL('../dist/', import.meta.url)

await run()

async function run() {
  await buildStarlight()

  for (const id of ThemesIds) {
    const { outDir } = await buildStarlight(id)
    await fs.rename(outDir, new URL(id, distDir))
  }
}

async function buildStarlight(id?: ThemeId) {
  const { config, outDir } = await getAstroConfig('prod', id)

  // eslint-disable-next-line no-console
  console.info(
    `\u{1B}[32m▶\u{1B}[0m \u{1B}[34mBuilding Starlight\u{1B}[0m \u{1B}[2m(theme:\u{1B}[0m ${id ?? 'default'}\u{1B}[2m)\u{1B}[0m`,
  )

  await build(config)

  return { outDir }
}
