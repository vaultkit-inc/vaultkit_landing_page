import { footer } from "@/content/landing"
import { siteConfig } from "@/lib/config"
import { resolveLinks } from "@/lib/links"
import { Container } from "@/components/ui/Container"

export function Footer() {
  const { contactEmail } = siteConfig
  return (
    <footer data-tone="dark" className="border-t border-night-line bg-night text-sm text-night-subtle">
      <Container className="flex flex-wrap justify-between gap-4 py-7">
        <p className="m-0">
          {footer.brand}
          {contactEmail && (
            <>
              {" · "}
              <a href={`mailto:${contactEmail}`} className="hover:text-paper">
                {contactEmail}
              </a>
            </>
          )}
        </p>
        <nav aria-label="Footer" className="flex flex-wrap gap-6">
          {resolveLinks(footer.links).map((link) => (
            <a key={link.label} href={link.href} className="hover:text-paper">
              {link.label}
            </a>
          ))}
        </nav>
      </Container>
    </footer>
  )
}
