import fs from 'node:fs/promises'

import { Themes, ThemesNames } from './libs/theme'

const themeNameRegex = /title: '(?<name>[^']*)',/gm

await run()

async function run() {
  const result = await fetch(
    'https://raw.githubusercontent.com/withastro/starlight/refs/heads/main/docs/src/content/docs/resources/themes.mdx',
  )

  if (!result.ok) {
    throw new Error(`Failed to fetch \`themes.mdx\`: ${result.statusText}`)
  }

  const text = await result.text()

  const onlineThemeNames: string[] = []
  let match: RegExpExecArray | null

  while ((match = themeNameRegex.exec(text)) !== null) {
    if (match.groups?.['name']) {
      onlineThemeNames.push(match.groups['name'])
    }
  }

  if (onlineThemeNames.length === 0) {
    throw new Error('Failed to extract theme names from `themes.mdx`.')
  }

  const knownThemeNamesMap = new Map<string, string>()
  for (const id of ThemesNames) knownThemeNamesMap.set(Themes[id].docName ?? Themes[id].name, id)

  const missing: string[] = []
  const outdated: string[] = []

  for (const name of onlineThemeNames) {
    if (!knownThemeNamesMap.has(name)) missing.push(name)
  }

  for (const name of knownThemeNamesMap.keys()) {
    if (!onlineThemeNames.includes(name)) outdated.push(name)
  }

  if (missing.length === 0 && outdated.length === 0) return

  // eslint-disable-next-line no-console
  console.info('- Missing Themes:', missing)
  // eslint-disable-next-line no-console
  console.info('- Outdated Themes:', outdated)

  let issueBody = 'The following theme updates were detected:'

  issueBody = updateIssueBody(issueBody, 'Missing Themes', missing)
  issueBody = updateIssueBody(issueBody, 'Outdated Themes', outdated)

  await fs.writeFile('updates.md', issueBody)
}

function updateIssueBody(body: string, section: string, entries: string[]) {
  if (entries.length === 0) return body

  const header = `## ${section}`
  const list = entries.map((e) => `- ${e}`).join('\n')

  body += `\n\n${header}\n\n${list}`

  return body
}
