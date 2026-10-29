import { nav } from "@/content/landing"
import { resolveLinks } from "@/lib/links"
import { Container } from "@/components/ui/Container"
import { Logo } from "@/components/ui/Logo"
import { PartnerButton } from "./PartnerButton"

export function Nav() {
  return (
    <Container as="header" className="flex h-nav items-center justify-between gap-6">
      <a href="#top" className="rounded-control text-paper" aria-label="VaultKit home">
        <Logo tile wordmark />
      </a>
      <nav aria-label="Main" className="flex items-center gap-7 text-[15px]">
        {resolveLinks(nav.links).map((link) => (
          <a key={link.label} href={link.href} className="hidden text-night-muted hover:text-paper md:inline">
            {link.label}
          </a>
        ))}
        <PartnerButton variant="inverse" size="sm" />
      </nav>
    </Container>
  )
}
