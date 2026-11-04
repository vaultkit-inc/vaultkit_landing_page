import { partner } from "@/content/landing"
import { cn } from "@/lib/utils"
import { gutter } from "@/components/ui/Frame"
import { SectionHeading } from "@/components/ui/SectionHeading"
import { PartnerButton } from "./PartnerButton"

/** §4: the design partner call to action. */
export function PartnerSection() {
  const { id } = partner
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={cn("flex scroll-mt-4 flex-wrap items-end justify-between gap-8 border-b border-rule-strong py-16 sm:py-20", gutter)}
    >
      <div className="flex max-w-[660px] min-w-0 flex-[1_1_520px] flex-col gap-3.5">
        <SectionHeading id={id} marker={partner.marker} size="lg">
          {partner.heading.lead} <em className="font-normal">{partner.heading.emphasis}</em>
        </SectionHeading>
        <p className="m-0 text-ink-soft">{partner.body}</p>
      </div>
      <PartnerButton variant="accent" size="lg" />
    </section>
  )
}
