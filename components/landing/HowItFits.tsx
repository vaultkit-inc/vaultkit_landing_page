import { howItFits, type Step } from "@/content/landing"
import { cn } from "@/lib/utils"
import { CodeBlock } from "@/components/ui/CodeBlock"
import { gutter } from "@/components/ui/Frame"
import { SectionHeading } from "@/components/ui/SectionHeading"

function StepCard({ step }: { step: Step }) {
  return (
    <li className="flex min-w-0 flex-col gap-2.5 p-[22px]">
      <span aria-hidden="true" className="font-mono text-label text-muted">
        {step.n}
      </span>
      <h3 className="m-0 text-body font-semibold">
        <span className="sr-only">Step {Number(step.n)}: </span>
        {step.title}
      </h3>
      <p className="m-0 text-small text-ink-soft">{step.note}</p>
      <CodeBlock code={step.code} label={step.codeLabel} />
    </li>
  )
}

/** §3: three steps, each with the command or config it takes. */
export function HowItFits() {
  const { id, steps } = howItFits
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className={cn("flex scroll-mt-4 flex-col gap-7 border-b border-rule py-section-sm sm:py-section", gutter)}>
      <SectionHeading id={id} marker={howItFits.marker} className="max-w-[640px]">
        {howItFits.heading}
      </SectionHeading>
      <ol className="m-0 grid list-none divide-y divide-rule border border-rule p-0 lg:grid-cols-3 lg:divide-x lg:divide-y-0">
        {steps.map((step) => (
          <StepCard key={step.n} step={step} />
        ))}
      </ol>
    </section>
  )
}
