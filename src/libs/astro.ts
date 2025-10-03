import { fileURLToPath } from 'node:url'

import type { AstroInlineConfig } from 'astro'

import { addStarlightIntegration } from './starlight'
import type { ThemeId } from './theme'

export async function getAstroConfig(mode: 'dev' | 'prod', id?: ThemeId) {
  const root = new URL('../../', import.meta.url)
  const outDir = new URL(id ? `dist-themes/${id}/` : `dist/`, root)

  const config: AstroInlineConfig = {
    configFile: false,
    integrations: [],
    mode: mode === 'dev' ? 'development' : 'production',
    outDir: fileURLToPath(outDir),
    srcDir: './src/themes',
    trailingSlash: 'always',
  }

  if (mode === 'prod') {
    config.logLevel = 'error'
  }

  if (id) {
    config.base = `/${id}`
  }

  await addStarlightIntegration(config, id)

  return { config, outDir }
}
