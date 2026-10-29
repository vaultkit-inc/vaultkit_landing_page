/** Copy and options for the design partner dialog. */
import type { UseCase } from "./landing"

export const useCases: UseCase[] = [
  { id: "coding_agents", label: "Coding agents on production" },
  { id: "analytics_agents", label: "Analytics agents" },
  { id: "incident_response", label: "Incident response" },
  { id: "support_agents", label: "Customer support agents" },
  { id: "other", label: "Something else" },
]

export const designPartnerForm = {
  title: "Become a design partner",
  intro: "Tell us a little about your setup. Nnamdi, the founder, replies personally within two business days.",
  fields: {
    email: { label: "Work email", placeholder: "you@company.com" },
    company: { label: "Company", placeholder: "Acme" },
    role: { label: "Your role", placeholder: "Platform engineer, security lead, CTO…" },
    useCases: { label: "What are your agents doing with production data?", hint: "Pick any" },
    notes: { label: "Anything else?", placeholder: "Which databases, what you use today to keep agents in check, what worries you." },
  },
  optional: "(optional)",
  privacy: "We only use this to get in touch about VaultKit.",
  submit: "Send",
  pending: "Sending…",
  close: "Close",
  error: "Something went wrong and your details weren't sent. Please try again, or email us at",
  success: {
    title: "Thanks, it's on its way",
    body: "Nnamdi will reply within two business days.",
    bookingBody: "If you'd rather not wait, pick a time for a 30-minute call now.",
    bookingLabel: "Pick a time",
  },
}
