import { NextResponse, type NextRequest } from "next/server"
import { hasErrors, validateLead } from "@/lib/lead"
import { createRateLimiter } from "@/lib/rateLimit"
import { leadsClient } from "@/lib/supabase"

const allow = createRateLimiter({ limit: 5, windowMs: 10 * 60 * 1000 })

function clientIp(request: NextRequest): string {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown"
}

export async function POST(request: NextRequest) {
  if (!allow(clientIp(request))) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 })
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 })
  }

  // Honeypot filled in: pretend it worked and save nothing.
  const website = (body as { website?: unknown } | null)?.website
  if (typeof website === "string" && website.trim() !== "") {
    return NextResponse.json({ ok: true })
  }

  const { lead, errors } = validateLead(body)
  if (hasErrors(errors)) {
    return NextResponse.json({ error: "Invalid lead", fields: errors }, { status: 400 })
  }

  const supabase = leadsClient()
  if (!supabase) {
    console.error("[design-partner] SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY is not set")
    return NextResponse.json({ error: "Not configured" }, { status: 500 })
  }

  const { error } = await supabase.from("ari_leads").insert({
    source: "design_partner",
    email: lead.email,
    company: lead.company,
    role: lead.role || null,
    use_cases: lead.useCases,
    notes: lead.notes || null,
  })

  if (error) {
    console.error("[design-partner] Supabase insert error:", error.message)
    return NextResponse.json({ error: "Failed to save" }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
