import { grants } from "@/content/landing"
import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/Card"
import { CodeBlock } from "@/components/ui/CodeBlock"
import { Section } from "@/components/ui/Section"

type Side = (typeof grants)["role"]

function GrantCard({ side, highlight }: { side: Side; highlight?: boolean }) {
  return (
    <Card variant={highlight ? "highlight" : "muted"} padding="xl" className="flex-[1_1_420px] gap-4">
      <h3 className={cn("m-0 text-caption font-semibold tracking-[0.02em] uppercase", highlight ? "text-accent" : "text-ink-subtle")}>
        {side.label}
      </h3>
      <CodeBlock variant="inline" code={side.code} className={highlight ? "text-ink" : "text-ink-body"} />
      <ul className={cn("m-0 flex list-none flex-col gap-2.5 p-0 text-small", highlight ? "text-ink-body" : "text-ink-muted")}>
        {side.points.map((point) => (
          <li key={point}>{point}</li>
        ))}
      </ul>
    </Card>
  )
}

export function GrantComparison() {
  return (
    <Section intro={grants.intro} className="md:pt-28">
      <div className="flex flex-wrap items-stretch gap-6">
        <GrantCard side={grants.role} />
        <GrantCard side={grants.grant} highlight />
      </div>
    </Section>
  )
}
