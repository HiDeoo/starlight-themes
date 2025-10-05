import { defineRouteMiddleware } from '@astrojs/starlight/route-data'
import starlightThemes from 'virtual:starlight-themes'

import { Themes } from '../libs/theme'

export const onRequest = defineRouteMiddleware((context) => {
  const { starlightRoute } = context.locals
  const { entry, head, id } = starlightRoute

  const title = head.find((item) => item.tag === 'title')
  if (!title) return

  const theme = starlightThemes.currentId ? Themes[starlightThemes.currentId] : undefined
  const themeName = theme ? (theme.docName ?? theme.name) : 'Starlight Default Theme'

  starlightRoute.siteTitle = themeName
  title.content = id ? `${entry.data.title} | ${themeName}` : themeName
})
