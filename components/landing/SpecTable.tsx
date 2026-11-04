import type { SpecRow } from "@/content/landing"
import { cn } from "@/lib/utils"

/** The hero's term/value spec sheet. Values wrap rather than overflow on narrow screens. */
export function SpecTable({ rows, label, className }: { rows: SpecRow[]; label: string; className?: string }) {
  return (
    <dl
      aria-label={label}
      className={cn(
        "m-0 grid min-w-0 grid-cols-[88px_minmax(0,1fr)] content-start gap-x-4 gap-y-3.5 font-mono text-spec sm:grid-cols-[120px_minmax(0,1fr)]",
        className,
      )}
    >
      {rows.map((row) => (
        <div key={row.term} className="contents">
          <dt className="text-muted">{row.term}</dt>
          <dd className="m-0 break-words">{row.value}</dd>
        </div>
      ))}
    </dl>
  )
}
