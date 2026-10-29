import { outcomes, type Outcome } from "@/content/landing"
import { Badge } from "@/components/ui/Badge"
import { Card } from "@/components/ui/Card"
import { Section } from "@/components/ui/Section"

function OutcomeCard({ outcome }: { outcome: Outcome }) {
  return (
    <Card as="li" className="gap-2.5">
      <h3 className="m-0 flex">
        <Badge tone={outcome.tone}>{outcome.label}</Badge>
      </h3>
      <p className="m-0 text-small text-ink-muted">{outcome.body}</p>
    </Card>
  )
}

export function Outcomes() {
  return (
    <Section intro={outcomes.intro}>
      <ul className="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(min(240px,100%),1fr))] gap-5 p-0">
        {outcomes.items.map((outcome) => (
          <OutcomeCard key={outcome.label} outcome={outcome} />
        ))}
      </ul>
    </Section>
  )
}
