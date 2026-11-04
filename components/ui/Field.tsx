import type { InputHTMLAttributes, ReactNode, TextareaHTMLAttributes } from "react"
import { cn } from "@/lib/utils"

const control =
  "w-full border border-muted bg-paper-raised px-3 text-body text-ink placeholder:text-muted hover:border-ink focus-visible:border-ink aria-invalid:border-deny"

type FieldShellProps = { id: string; label: string; optionalLabel?: string; error?: string; children: ReactNode }

function FieldShell({ id, label, optionalLabel, error, children }: FieldShellProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="font-mono text-label font-medium">
        {label} {optionalLabel && <span className="font-normal text-muted">{optionalLabel}</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="m-0 text-small text-deny">
          {error}
        </p>
      )}
    </div>
  )
}

type Shared = { id: string; label: string; optionalLabel?: string; error?: string }

export function TextField({ id, label, optionalLabel, error, className, ...input }: Shared & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <FieldShell id={id} label={label} optionalLabel={optionalLabel} error={error}>
      <input
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(control, "h-11", className)}
        {...input}
      />
    </FieldShell>
  )
}

export function TextArea({ id, label, optionalLabel, error, className, ...input }: Shared & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <FieldShell id={id} label={label} optionalLabel={optionalLabel} error={error}>
      <textarea
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(control, "resize-y py-2.5", className)}
        {...input}
      />
    </FieldShell>
  )
}
