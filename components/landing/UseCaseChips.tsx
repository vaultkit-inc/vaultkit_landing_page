import type { UseCase } from "@/content/landing"
import { cn } from "@/lib/utils"

type UseCaseChipsProps = {
  legend: string
  hint: string
  options: UseCase[]
  value: string[]
  onChange: (value: string[]) => void
  error?: string
}

/** Multi-select toggle chips. Each chip is a button with aria-pressed. */
export function UseCaseChips({ legend, hint, options, value, onChange, error }: UseCaseChipsProps) {
  function toggle(id: string) {
    onChange(value.includes(id) ? value.filter((v) => v !== id) : [...value, id])
  }
  return (
    <fieldset className="m-0 flex flex-col gap-2.5 border-0 p-0">
      <legend className="mb-2.5 p-0 font-mono text-label font-medium">
        {legend} <span className="font-normal text-muted">{hint}</span>
      </legend>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const on = value.includes(option.id)
          return (
            <button
              key={option.id}
              type="button"
              aria-pressed={on}
              onClick={() => toggle(option.id)}
              className={cn(
                "inline-flex min-h-9 cursor-pointer items-center gap-1.5 border px-3 text-small",
                on ? "border-ink bg-ink text-paper" : "border-muted bg-paper-raised text-ink hover:border-ink",
              )}
            >
              {on && (
                <svg aria-hidden="true" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12.5l4.5 4.5L19 7.5" />
                </svg>
              )}
              {option.label}
            </button>
          )
        })}
      </div>
      {error && <p className="m-0 text-small text-deny">{error}</p>}
    </fieldset>
  )
}
