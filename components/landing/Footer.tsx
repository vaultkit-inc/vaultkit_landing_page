import { footer } from "@/content/landing"
import { siteConfig } from "@/lib/config"
import { resolveLinks } from "@/lib/links"
import { cn } from "@/lib/utils"
import { gutter } from "@/components/ui/Frame"

const link = "text-ink no-underline hover:underline"

export function Footer() {
  const { contactEmail } = siteConfig
  return (
    <footer className={cn("flex flex-wrap justify-between gap-5 pt-5 pb-10 font-mono text-label text-muted", gutter)}>
      <p className="m-0">
        {footer.brand}
        {contactEmail && (
          <>
            {" · "}
            <a href={`mailto:${contactEmail}`} className={link}>
              {contactEmail}
            </a>
          </>
        )}
      </p>
      <nav aria-label="Footer" className="flex flex-wrap gap-x-[18px] gap-y-2">
        {resolveLinks(footer.links).map((item) => (
          <a key={item.label} href={item.href} className={link}>
            {item.label}
          </a>
        ))}
      </nav>
    </footer>
  )
}
