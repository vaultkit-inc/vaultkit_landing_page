import { iamGap } from "@/content/landing"
import { Section } from "@/components/ui/Section"
import { TitledCard } from "./TitledCard"

export function IamGap() {
  return (
    <Section intro={iamGap.intro} tone="muted" layout="split" headingSize="md">
      <ul className="m-0 flex list-none flex-col gap-3.5 p-0">
        {iamGap.questions.map((q) => (
          <TitledCard key={q.title} item={q} variant="raised" padding="sm" radius="tile" />
        ))}
      </ul>
    </Section>
  )
}
