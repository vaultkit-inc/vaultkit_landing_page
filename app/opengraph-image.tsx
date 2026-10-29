import { readFile } from "node:fs/promises"
import { join } from "node:path"
import { ImageResponse } from "next/og"
import { hero, meta } from "@/content/landing"
import { brand } from "@/lib/brand"

export const alt = meta.ogAlt
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

const interBold = () => readFile(join(process.cwd(), "node_modules/@fontsource/inter/files/inter-latin-700-normal.woff"))

// Rendered once at build time, like the page.
export default async function OpenGraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 80, background: brand.night, color: brand.white, fontFamily: "Inter" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ width: 72, height: 72, borderRadius: 18, background: brand.accent, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="44" height="44" viewBox="0 0 64 64" fill="none" stroke={brand.white} strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 11 L32 53 L54 11" strokeWidth="9" />
              <path d="M22 11 L32 31 L42 11" strokeWidth="5" />
            </svg>
          </div>
          <div style={{ fontSize: 40, fontWeight: 700 }}>VaultKit</div>
        </div>
        <div style={{ display: "flex", fontSize: 64, lineHeight: 1.1, fontWeight: 700, letterSpacing: "-0.03em", maxWidth: 1000 }}>{hero.heading}</div>
        <div style={{ display: "flex", fontSize: 28, color: brand.nightMuted }}>{hero.footnote}</div>
      </div>
    ),
    { ...size, fonts: [{ name: "Inter", data: await interBold(), weight: 700 }] },
  )
}
