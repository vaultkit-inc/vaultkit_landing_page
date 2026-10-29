"use client"

import * as Dialog from "@radix-ui/react-dialog"
import { useRef, useState, type FormEvent } from "react"
import { designPartnerForm as copy, useCases } from "@/content/designPartnerForm"
import { siteConfig } from "@/lib/config"
import { hasErrors, validateLead, type LeadErrors, type LeadInput } from "@/lib/lead"
import { Button } from "@/components/ui/Button"
import { TextArea, TextField } from "@/components/ui/Field"
import { UseCaseChips } from "./UseCaseChips"

const FIELD_ORDER = ["email", "company", "role", "notes"] as const

export async function submitLead(lead: LeadInput & { website: string }): Promise<boolean> {
  try {
    const res = await fetch("/api/design-partner", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lead),
    })
    return res.ok
  } catch {
    return false
  }
}

export function DesignPartnerForm({ onSent }: { onSent: () => void }) {
  const formRef = useRef<HTMLFormElement>(null)
  const [picks, setPicks] = useState<string[]>([])
  const [errors, setErrors] = useState<LeadErrors>({})
  const [status, setStatus] = useState<"idle" | "pending" | "error">("idle")
  const { fields, optional } = copy

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (status === "pending") return
    const data = new FormData(event.currentTarget)
    const { lead, errors: found } = validateLead({ ...Object.fromEntries(data), useCases: picks })
    setErrors(found)
    if (hasErrors(found)) {
      const first = FIELD_ORDER.find((name) => found[name])
      if (first) formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus()
      return
    }
    setStatus("pending")
    const ok = await submitLead({ ...lead, website: String(data.get("website") ?? "") })
    if (ok) onSent()
    else setStatus("error")
  }

  return (
    <form ref={formRef} noValidate onSubmit={handleSubmit} className="flex flex-col gap-5 p-6 sm:p-8">
      <div className="flex flex-col gap-1.5 pr-8">
        <Dialog.Title className="m-0 text-2xl leading-[30px] font-bold tracking-[-0.01em]">{copy.title}</Dialog.Title>
        <p className="m-0 text-ink-muted">{copy.intro}</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <TextField id="dp-email" name="email" type="email" required autoComplete="email" placeholder={fields.email.placeholder} label={fields.email.label} error={errors.email} />
        <TextField id="dp-company" name="company" required autoComplete="organization" placeholder={fields.company.placeholder} label={fields.company.label} error={errors.company} />
      </div>
      <TextField id="dp-role" name="role" autoComplete="organization-title" placeholder={fields.role.placeholder} label={fields.role.label} optionalLabel={optional} error={errors.role} />
      <UseCaseChips legend={fields.useCases.label} hint={fields.useCases.hint} options={useCases} value={picks} onChange={setPicks} error={errors.useCases} />
      <TextArea id="dp-notes" name="notes" rows={3} autoComplete="off" placeholder={fields.notes.placeholder} label={fields.notes.label} optionalLabel={optional} error={errors.notes} />

      {/* Honeypot: hidden from people and assistive tech; bots that fill it are dropped server-side. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="dp-website">Website</label>
        <input id="dp-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {status === "error" && (
        <p role="alert" className="m-0 rounded-control bg-deny-tint px-3 py-2.5 text-deny">
          {copy.error}{" "}
          <a className="font-semibold underline" href={`mailto:${siteConfig.contactEmail}`}>
            {siteConfig.contactEmail}
          </a>
          .
        </p>
      )}

      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
        <p className="m-0 max-w-[300px] text-xs text-ink-subtle">{copy.privacy}</p>
        <Button type="submit" loading={status === "pending"}>
          {status === "pending" ? copy.pending : copy.submit}
        </Button>
      </div>
    </form>
  )
}
