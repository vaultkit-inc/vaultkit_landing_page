import type { NavLink } from "@/content/landing"
import { siteConfig } from "./config"

export type ResolvedLink = { label: string; href: string }

/** Resolves content links against config, dropping any whose URL isn't set. */
export function resolveLinks(links: NavLink[]): ResolvedLink[] {
  return links.flatMap((link) => {
    const href = "href" in link ? link.href : siteConfig[link.configKey]
    return href ? [{ label: link.label, href }] : []
  })
}
