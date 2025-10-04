import type { ViteUserConfig } from 'astro'

import type { ThemeId } from './theme'

export function vitePluginStarlightThemes(id?: ThemeId): VitePlugin {
  const modules = {
    'virtual:starlight-themes': `export default ${JSON.stringify({ currentId: id })}`,
  }

  const moduleResolutionMap = Object.fromEntries(
    (Object.keys(modules) as (keyof typeof modules)[]).map((key) => [resolveVirtualModuleId(key), key]),
  )

  return {
    name: 'vite-plugin-starlight-themes',
    load(id) {
      const moduleId = moduleResolutionMap[id]
      return moduleId ? modules[moduleId] : undefined
    },
    resolveId(id) {
      return id in modules ? resolveVirtualModuleId(id) : undefined
    },
  }
}

function resolveVirtualModuleId<TModuleId extends string>(id: TModuleId): `\0${TModuleId}` {
  return `\0${id}`
}

type VitePlugin = NonNullable<ViteUserConfig['plugins']>[number]
