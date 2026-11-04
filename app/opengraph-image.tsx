import { readFile } from "node:fs/promises"
import { join } from "node:path"
import { ImageResponse } from "next/og"
import { headline, header, hero, meta } from "@/content/landing"
import { brand } from "@/lib/brand"

export const alt = meta.ogAlt
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

const font = (pkg: string, file: string) => readFile(join(process.cwd(), "node_modules/@fontsource", pkg, "files", file))

// Rendered once at build time, like the page.
export default async function OpenGraphImage() {
  const [serif, serifItalic, mono] = await Promise.all([
    font("ibm-plex-serif", "ibm-plex-serif-latin-500-normal.woff"),
    font("ibm-plex-serif", "ibm-plex-serif-latin-400-italic.woff"),
    font("ibm-plex-mono", "ibm-plex-mono-latin-400-normal.woff"),
  ])
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: brand.paper, color: brand.ink, padding: "0 60px" }}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "56px 48px", borderLeft: `1px solid ${brand.rule}`, borderRight: `1px solid ${brand.rule}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, fontFamily: "Plex Mono", fontSize: 24 }}>
            <svg width="36" height="36" viewBox="0 0 64 64" fill="none" stroke={brand.ink} strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 11 L32 53 L54 11" strokeWidth="9" />
              <path d="M22 11 L32 31 L42 11" strokeWidth="5" />
            </svg>
            <span>VaultKit</span>
            <span style={{ color: brand.muted }}>{header.version}</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", fontFamily: "Plex Serif", fontSize: 84, lineHeight: 1.1, letterSpacing: "-0.02em" }}>
            <span style={{ fontStyle: "normal", fontWeight: 500 }}>{headline.lead}</span>
            <span style={{ fontStyle: "italic", fontWeight: 400 }}>{headline.emphasis}</span>
          </div>
          <div style={{ display: "flex", fontFamily: "Plex Mono", fontSize: 24, color: brand.accent }}>{hero.marker.toUpperCase()}</div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Plex Serif", data: serif, weight: 500, style: "normal" },
        { name: "Plex Serif", data: serifItalic, weight: 400, style: "italic" },
        { name: "Plex Mono", data: mono, weight: 400, style: "normal" },
      ],
    },
  )
}
