import { incident, type Decision } from "@/content/landing"
import { cn } from "@/lib/utils"
import { gutter } from "@/components/ui/Frame"
import { SectionHeading } from "@/components/ui/SectionHeading"

const decisionTone: Record<Decision, string> = {
  allow: "border-allow text-allow",
  mask: "border-mask text-mask",
  approval: "border-approval text-approval",
  deny: "border-deny text-deny",
}

const cell = "border-b border-rule p-4 align-top"
const mono = "font-mono text-snippet whitespace-pre-wrap"

/** §1: the same agent asks three questions; each gets a different decision. */
export function DecisionTable() {
  const { id, columns, rows } = incident
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className={cn("flex scroll-mt-4 flex-col gap-7 border-b border-rule py-section-sm sm:py-section", gutter)}>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionHeading id={id} marker={incident.marker} className="max-w-[640px]">
          {incident.heading}
        </SectionHeading>
        <p className="m-0 font-mono text-label text-muted">{incident.context}</p>
      </div>

      {/* Scrolls sideways inside its frame on narrow screens; focusable so keyboards can scroll it. */}
      <div role="region" aria-labelledby={`${id}-caption`} tabIndex={0} className="overflow-x-auto border border-rule-strong">
        <table className="w-full min-w-[820px] border-collapse text-small">
          <caption id={`${id}-caption`} className="sr-only">
            {incident.caption}
          </caption>
          <thead>
            <tr className="text-left font-mono text-meta text-muted">
              {columns.map((label, i) => (
                <th
                  key={label}
                  scope="col"
                  className={cn("border-b border-rule-strong px-4 py-2.5 font-medium", ["w-[30%]", "w-[30%]", "w-[16%]", ""][i])}
                >
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.label}>
                <th scope="row" className={cn(cell, "text-left font-normal")}>
                  {row.ask}
                </th>
                <td className={cn(cell, mono, "text-ink-soft")}>{row.aql}</td>
                <td className={cell}>
                  <span className={cn("inline-block border px-2 py-0.5 font-mono text-label font-medium", decisionTone[row.decision])}>{row.label}</span>
                </td>
                <td className={cn(cell, mono)}>{row.result}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="m-0 font-mono text-label text-muted">{incident.footnote}</p>
    </section>
  )
}
