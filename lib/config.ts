/**
 * External links and contact details, read from env at build time.
 * An unset value hides the CTA that uses it rather than pointing it at "#".
 * Docs, GitHub and the contact email default to the links the old site used.
 * See .env.example for the full list.
 */

function optional(value: string | undefined): string | undefined {
  const trimmed = value?.trim()
  return trimmed ? trimmed : undefined
}

export const siteConfig = {
  siteUrl: optional(process.env.NEXT_PUBLIC_SITE_URL) ?? "https://www.vaultkit.io",
  bookingUrl: optional(process.env.NEXT_PUBLIC_BOOKING_URL),
  demoVideoUrl: optional(process.env.NEXT_PUBLIC_DEMO_VIDEO_URL),
  docsUrl: optional(process.env.NEXT_PUBLIC_DOCS_URL) ?? "https://docs.vaultkit.io",
  githubUrl: optional(process.env.NEXT_PUBLIC_GITHUB_URL) ?? "https://github.com/vaultkit-inc/vaultkitcli",
  ariUrl: optional(process.env.NEXT_PUBLIC_ARI_URL),
  contactEmail: optional(process.env.NEXT_PUBLIC_CONTACT_EMAIL) ?? "founders@vaultkit.io",
} as const

export type SiteConfig = typeof siteConfig
export type LinkKey = "docsUrl" | "githubUrl" | "ariUrl" | "demoVideoUrl" | "bookingUrl"
