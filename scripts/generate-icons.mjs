// Regenerates the favicon and touch icon from docs/redesign/logo.
// Run with `npm run icons` after changing the logo files.
import { copyFile, readFile } from "node:fs/promises"
import sharp from "sharp"

const logo = (name) => new URL(`../docs/redesign/logo/${name}`, import.meta.url)
const out = (name) => new URL(`../public/${name}`, import.meta.url)

await copyFile(logo("vaultkit-favicon.svg"), out("favicon.svg"))

const favicon = await readFile(logo("vaultkit-favicon.svg"))
await sharp(favicon, { density: 384 }).resize(32, 32).png().toFile(out("favicon-32.png").pathname)

// iOS draws its own rounded corners, so the touch icon is a full-bleed square.
const appIcon = (await readFile(logo("vaultkit-app-icon.svg"), "utf8")).replace(/ rx="\d+"/, "")
await sharp(Buffer.from(appIcon)).resize(180, 180).png().toFile(out("apple-touch-icon.png").pathname)

console.log("Wrote public/favicon.svg, public/favicon-32.png, public/apple-touch-icon.png")
