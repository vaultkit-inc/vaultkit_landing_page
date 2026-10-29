import { howItWorks, type Step } from "@/content/landing"
import { Card } from "@/components/ui/Card"
import { CodeBlock } from "@/components/ui/CodeBlock"
import { Section } from "@/components/ui/Section"

function StepCard({ step, index }: { step: Step; index: number }) {
  return (
    <Card as="li" variant="raised" className="gap-3.5">
      <span aria-hidden="true" className="flex size-8 items-center justify-center rounded-full bg-accent text-sm font-semibold text-paper">
        {index + 1}
      </span>
      <h3 className="m-0 text-xl leading-7 font-semibold">
        <span className="sr-only">Step {index + 1}: </span>
        {step.title}
      </h3>
      <p className="m-0 text-small text-ink-muted">{step.body}</p>
      <CodeBlock code={step.code} label={`${step.title} example`} className="mt-auto" />
    </Card>
  )
}

export function HowItWorks() {
  return (
    <Section intro={howItWorks.intro} tone="muted">
      <ol className="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))] gap-6 p-0">
        {howItWorks.steps.map((step, i) => (
          <StepCard key={step.title} step={step} index={i} />
        ))}
      </ol>
    </Section>
  )
}
