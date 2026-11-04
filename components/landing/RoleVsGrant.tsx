import { grants } from "@/content/landing"
import { cn } from "@/lib/utils"
import { gutter } from "@/components/ui/Frame"
import { SectionHeading } from "@/components/ui/SectionHeading"

type ComparisonProps = { label: string; code: string; body: string; highlight?: boolean }

function Comparison({ label, code, body, highlight }: ComparisonProps) {
  return (
    <div className={cn("flex flex-col gap-2 py-7", gutter, highlight && "bg-paper-raised")}>
      <h3 className={cn("m-0 font-mono text-meta font-normal", highlight ? "text-accent" : "text-muted")}>{label}</h3>
      {/* Wraps instead of scrolling: these read as sentences, not code to copy. */}
      <code className="font-mono text-small break-words whitespace-pre-wrap">{code}</code>
      <p className="m-0 text-small text-ink-soft">{body}</p>
    </div>
  )
}

/** §2: a database role vs a VaultKit grant. */
export function RoleVsGrant() {
  const { id, role, grant } = grants
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className="grid scroll-mt-4 border-b border-rule lg:grid-cols-[minmax(0,11fr)_minmax(0,14fr)]">
      <div className={cn("flex min-w-0 flex-col gap-3.5 border-b border-rule py-section-sm sm:py-section lg:border-r lg:border-b-0", gutter)}>
        <SectionHeading id={id} marker={grants.marker}>
          {grants.heading}
        </SectionHeading>
        <p className="m-0 text-ink-soft">{grants.body}</p>
      </div>
      <div className="flex min-w-0 flex-col divide-y divide-rule">
        <Comparison {...role} />
        <Comparison {...grant} highlight />
      </div>
    </section>
  )
}
