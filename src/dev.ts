import { dev } from 'astro'

import { getAstroConfig } from './libs/astro'
import type { ThemeId } from './libs/theme'

await run()

async function run() {
  await devStarlight('nova')
}

async function devStarlight(id?: ThemeId) {
  const { config, outDir } = await getAstroConfig('dev', id)

  await dev(config)

  return { outDir }
}
