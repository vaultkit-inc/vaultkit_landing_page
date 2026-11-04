import type { Metadata, Viewport } from "next"
import { IBM_Plex_Mono, IBM_Plex_Sans, IBM_Plex_Serif } from "next/font/google"
import { meta } from "@/content/landing"
import { brand } from "@/lib/brand"
import { siteConfig } from "@/lib/config"
import "./globals.css"

// next/font self-hosts these at build time and sizes the fallback fonts to match, so swapping in doesn't shift layout.
const serif = IBM_Plex_Serif({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-plex-serif",
  display: "swap",
})
const sans = IBM_Plex_Sans({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-plex-sans", display: "swap" })
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-plex-mono", display: "swap" })

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: meta.title,
  description: meta.description,
  alternates: { canonical: "/" },
  // Bump ?v= when the icons change: browsers and Cloudflare keep favicons for a long time.
  icons: {
    icon: [
      { url: "/favicon.ico?v=2", sizes: "48x48" },
      { url: "/favicon.svg?v=2", type: "image/svg+xml" },
    ],
    apple: { url: "/apple-touch-icon.png?v=2", sizes: "180x180" },
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "VaultKit",
    title: meta.title,
    description: meta.description,
  },
  twitter: { card: "summary_large_image", title: meta.title, description: meta.description },
}

export const viewport: Viewport = { themeColor: brand.paper }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  )
}
