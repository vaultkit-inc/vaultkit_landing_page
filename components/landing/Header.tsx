import { header } from "@/content/landing"
import { resolveLinks } from "@/lib/links"
import { gutter } from "@/components/ui/Frame"
import { Logo } from "@/components/ui/Logo"
import { cn } from "@/lib/utils"

export function Header() {
  return (
    <header className={cn("flex flex-wrap items-center justify-between gap-x-4 gap-y-3 border-b border-rule-strong py-[18px]", gutter)}>
      <div className="flex items-center gap-2.5">
        <a href="#top" className="text-ink no-underline" aria-label="VaultKit home">
          <Logo />
        </a>
        <span className="ml-1.5 font-mono text-meta text-muted">{header.version}</span>
      </div>
      <nav aria-label="Main" className="flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-spec">
        {resolveLinks(header.links).map((link) => (
          <a key={link.label} href={link.href} className="text-ink no-underline hover:underline">
            {link.label}
          </a>
        ))}
        <a
          href={header.partnerLink.href}
          className="bg-accent px-3.5 py-[7px] text-on-accent no-underline transition-colors hover:bg-accent-strong"
        >
          {header.partnerLink.label}
        </a>
      </nav>
    </header>
  )
}
