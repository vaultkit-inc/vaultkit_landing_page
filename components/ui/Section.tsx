import type { ReactNode } from "react"
import type { SectionIntro } from "@/content/landing"
import { cn } from "@/lib/utils"
import { Container } from "./Container"

const tones = {
  light: "bg-paper text-ink",
  muted: "border-y border-line-soft bg-paper-muted text-ink",
  dark: "bg-night text-paper",
}

type SectionProps = {
  intro: SectionIntro
  tone?: keyof typeof tones
  /** "stack" puts content under the intro; "split" puts it beside the intro on wide screens. */
  layout?: "stack" | "split"
  headingSize?: "lg" | "md"
  className?: string
  /** Extra content rendered after the intro, e.g. CTA buttons in the split layout. */
  aside?: ReactNode
  children?: ReactNode
}

function slug(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 40)
}

export function Section({ intro, tone = "light", layout = "stack", headingSize = "lg", className, aside, children }: SectionProps) {
  const headingId = `${intro.id ?? slug(intro.heading)}-heading`
  const isDark = tone === "dark"
  const split = layout === "split"
  return (
    <section
      id={intro.id}
      aria-labelledby={headingId}
      data-tone={isDark ? "dark" : undefined}
      className={cn("scroll-mt-4", tones[tone], className)}
    >
      <Container
        className={cn(
          "flex py-section",
          split ? "flex-wrap items-center justify-between gap-12 lg:gap-14" : "flex-col gap-12",
        )}
      >
        <div className={cn("flex flex-col gap-4", split ? "min-w-0 flex-[1_1_380px]" : "max-w-prose")}>
          {intro.eyebrow && <p className="text-sm font-semibold text-accent">{intro.eyebrow}</p>}
          <h2
            id={headingId}
            className={cn(
              "m-0 font-bold tracking-[-0.02em] text-balance",
              headingSize === "lg" ? "text-heading-xs md:text-heading" : "text-heading-xs md:text-heading-sm",
            )}
          >
            {intro.heading}
          </h2>
          {intro.body && (
            <p className={cn("m-0 max-w-[620px]", split ? "text-[17px] leading-7" : "text-intro", isDark ? "text-night-muted" : "text-ink-muted")}>
              {intro.body}
            </p>
          )}
        </div>
        {aside}
        {children && <div className={cn("min-w-0", split && "flex-[1_1_480px]")}>{children}</div>}
      </Container>
    </section>
  )
}
