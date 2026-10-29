/**
 * Design partner lead: one validator shared by the form (for UX) and the
 * API route (the real check before anything is saved).
 */
import { useCases } from "@/content/designPartnerForm"

export type LeadInput = {
  email: string
  company: string
  role: string
  useCases: string[]
  notes: string
}

export type LeadErrors = Partial<Record<"email" | "company" | "role" | "useCases" | "notes", string>>

export const LIMITS = { email: 320, company: 200, role: 200, notes: 4000 } as const

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const USE_CASE_IDS = new Set(useCases.map((u) => u.id))

function text(value: unknown): string {
  return typeof value === "string" ? value.trim() : ""
}

/** Normalises unknown input and returns either a clean lead or field errors. */
export function validateLead(raw: unknown): { lead: LeadInput; errors: LeadErrors } {
  const body = (typeof raw === "object" && raw !== null ? raw : {}) as Record<string, unknown>
  const lead: LeadInput = {
    email: text(body.email).toLowerCase(),
    company: text(body.company),
    role: text(body.role),
    useCases: Array.isArray(body.useCases) ? body.useCases.filter((u): u is string => typeof u === "string") : [],
    notes: text(body.notes),
  }

  const errors: LeadErrors = {}
  if (!lead.email) errors.email = "Enter your work email."
  else if (!EMAIL.test(lead.email) || lead.email.length > LIMITS.email) errors.email = "Enter a valid email address."
  if (!lead.company) errors.company = "Enter your company."
  else if (lead.company.length > LIMITS.company) errors.company = "Keep this under 200 characters."
  if (lead.role.length > LIMITS.role) errors.role = "Keep this under 200 characters."
  if (lead.notes.length > LIMITS.notes) errors.notes = "Keep this under 4,000 characters."
  if (lead.useCases.some((u) => !USE_CASE_IDS.has(u))) errors.useCases = "Pick from the listed options."

  return { lead, errors }
}

export function hasErrors(errors: LeadErrors): boolean {
  return Object.keys(errors).length > 0
}
