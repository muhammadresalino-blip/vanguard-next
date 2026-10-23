#!/usr/bin/env node
// Post-build script: rewrite asset paths for GitHub Pages project site
// Changes /_next/static/... to /vanguard-next/_next/static/...

import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs'
import { join } from 'path'

const REPO = 'vanguard-next'
const OUT_DIR = 'out'
const PREFIX = `/${REPO}`

function walk(dir) {
  let files = []
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)
    if (statSync(full).isDirectory()) files.push(...walk(full))
    else files.push(full)
  }
  return files
}

const htmlFiles = walk(OUT_DIR).filter(f => f.endsWith('.html'))
let fixed = 0

for (const file of htmlFiles) {
  let content = readFileSync(file, 'utf8')
  const original = content
  // Rewrite absolute _next/static/ paths to include repo prefix
  content = content.replace(/(href|src)="\/_next\/static\//g, `$1="${PREFIX}/_next/static/`)
  // Also handle preload/prefetch links
  content = content.replace(/href="\/_next\/static\//g, `href="${PREFIX}/_next/static/`)
  if (content !== original) {
    writeFileSync(file, content)
    fixed++
    console.log(`Fixed: ${file}`)
  }
}
console.log(`Done. Fixed ${fixed} files.`)