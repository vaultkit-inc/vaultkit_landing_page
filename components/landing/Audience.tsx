import { audience } from "@/content/landing"
import { Section } from "@/components/ui/Section"
import { TitledCard } from "./TitledCard"

export function Audience() {
  return (
    <Section intro={audience.intro} layout="split" headingSize="md">
      <ul className="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(min(240px,100%),1fr))] gap-4 p-0">
        {audience.cards.map((card) => (
          <TitledCard key={card.title} item={card} />
        ))}
      </ul>
    </Section>
  )
}
