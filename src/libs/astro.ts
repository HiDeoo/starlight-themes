import { fileURLToPath } from 'node:url'

import type { AstroInlineConfig } from 'astro'
import { fontProviders } from 'astro/config'

import { addStarlightIntegration } from './starlight'
import type { ThemeId } from './theme'
import { vitePluginStarlightThemes } from './vite'

export async function getAstroConfig(mode: 'dev' | 'prod', id?: ThemeId) {
  const root = new URL('../../', import.meta.url)
  const outDir = new URL(id ? `dist-themes/${id}/` : `dist/`, root)

  const config: AstroInlineConfig = {
    configFile: false,
    experimental: {
      fonts: [
        {
          provider: fontProviders.bunny(),
          name: 'Patrick Hand',
          cssVariable: '--font-patrick-hand',
        },
      ],
    },
    integrations: [],
    mode: mode === 'dev' ? 'development' : 'production',
    outDir: fileURLToPath(outDir),
    site: getSite(),
    srcDir: './src/themes',
    trailingSlash: 'always',
    vite: {
      plugins: [vitePluginStarlightThemes(id)],
    },
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

export function getSite() {
  return (
    (process.env['CONTEXT'] === 'production' ? process.env['URL'] : process.env['DEPLOY_PRIME_URL']) ??
    'https://starlight-themes.netlify.app/'
  )
}
