import sharp from 'sharp'
import { readFileSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const anySvg = readFileSync(join(root, 'public/favicon-app.svg'))
const maskableSvg = readFileSync(join(root, 'public/icons/icon-maskable.svg'))
const iconsDir = join(root, 'public/icons')
mkdirSync(iconsDir, { recursive: true })

async function writePng(svg, out, size) {
  await sharp(svg, { density: 384 })
    .resize(size, size, { fit: 'fill' })
    .png({ compressionLevel: 9 })
    .toFile(out)
  console.log('wrote', out, size)
}

await writePng(anySvg, join(root, 'public/apple-touch-icon.png'), 180)
await writePng(anySvg, join(iconsDir, 'icon-192.png'), 192)
await writePng(anySvg, join(iconsDir, 'icon-512.png'), 512)
await writePng(maskableSvg, join(iconsDir, 'icon-maskable-512.png'), 512)
console.log('done')
