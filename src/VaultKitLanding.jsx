"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import VaultKitLogo from "@/components/VaultKitLogo"

const FORMSPREE_URL = "https://formspree.io/f/xdanjdoy"

// ─── Governance Flow Data ───────────────────────────────────────────────────

const FLOWS = {
  mask: {
    label: "Field Masking",
    steps: [
      {
        type: "request",
        badge: "Request",
        actor: "Analytics-Agent",
        time: "10:23:45.121",
        body: (
          <pre className="bg-zinc-50 border border-zinc-200 rounded-md px-3 py-2.5 text-xs font-mono text-zinc-700 leading-relaxed overflow-x-auto whitespace-pre">
            <span className="text-blue-600">SELECT</span>{" "}id, email, total_spend, signup_source{"\n"}
            <span className="text-blue-600">FROM</span>{" "}customers{"\n"}
            <span className="text-blue-600">WHERE</span>{" "}segment = <span className="text-emerald-600">'enterprise'</span>
          </pre>
        ),
      },
      {
        type: "policy",
        badge: "Policy Evaluated",
        actor: "ai_mask_sensitive_for_agents",
        time: "10:23:45.122",
        body: (
          <div className="space-y-1.5">
            <Rule>
              <strong>email</strong> — tagged <Chip>pii</Chip> →{" "}
              <span className="text-amber-600 font-semibold">MASK</span>
            </Rule>
            <Rule>
              <strong>total_spend</strong> — tagged <Chip>financial</Chip> →{" "}
              <span className="text-amber-600 font-semibold">MASK</span>
            </Rule>
            <Rule>
              <strong>id, signup_source</strong> — tagged <Chip>internal</Chip> →{" "}
              <span className="text-emerald-600 font-semibold">ALLOW</span>
            </Rule>
          </div>
        ),
      },
      {
        type: "allow",
        badge: "Response · 3 rows",
        actor: "Masked",
        time: "10:23:45.126",
        body: (
          <>
            <pre className="bg-zinc-50 border border-zinc-200 rounded-md px-3 py-2.5 text-xs font-mono text-zinc-700 leading-relaxed overflow-x-auto whitespace-pre">
              {"{ id: 1, "}
              <span className="text-amber-600">email: "*****"</span>
              {", "}
              <span className="text-amber-600">total_spend: "*****"</span>
              {', signup_source: "organic" }\n'}
              {"{ id: 2, "}
              <span className="text-amber-600">email: "*****"</span>
              {", "}
              <span className="text-amber-600">total_spend: "*****"</span>
              {', signup_source: "google_ads" }'}
            </pre>
            <p className="text-xs text-zinc-400 mt-2 flex items-center gap-1.5">
              <span>🔒</span> Sensitive fields masked at execution — agent never sees raw PII
            </p>
          </>
        ),
      },
      {
        type: "audit",
        badge: "Audit Log",
        actor: "Cryptographically signed",
        time: "10:23:45.127",
        body: (
          <div className="space-y-0.5">
            <AuditRow k="actor" v="Analytics-Agent / role:agent" />
            <AuditRow k="masked_fields" v="email, total_spend" color="amber" />
            <AuditRow k="rows_returned" v="3" />
            <AuditRow k="signature" v="✓ verified" color="emerald" />
          </div>
        ),
      },
    ],
  },

  approval: {
    label: "Approval Required",
    steps: [
      {
        type: "request",
        badge: "Request",
        actor: "Finance-Agent",
        time: "14:07:22.301",
        body: (
          <pre className="bg-zinc-50 border border-zinc-200 rounded-md px-3 py-2.5 text-xs font-mono text-zinc-700 leading-relaxed overflow-x-auto whitespace-pre">
            <span className="text-blue-600">SELECT</span>{" "}transaction_id, amount, account_number{"\n"}
            <span className="text-blue-600">FROM</span>{" "}transactions{"\n"}
            <span className="text-blue-600">WHERE</span>{" "}status = <span className="text-emerald-600">'failed'</span>
          </pre>
        ),
      },
      {
        type: "policy",
        badge: "Policy Evaluated",
        actor: "fin_require_approval_financial_prod",
        time: "14:07:22.302",
        body: (
          <div className="space-y-1.5">
            <Rule>
              <strong>amount, account_number</strong> — tagged <Chip>financial</Chip> in <Chip>production</Chip> →{" "}
              <span className="text-violet-600 font-semibold">REQUIRE APPROVAL</span>
            </Rule>
            <Rule>Approver role: <strong>finance_manager</strong> · TTL: 1h</Rule>
          </div>
        ),
      },
      {
        type: "approval",
        badge: "Pending Approval",
        actor: "req_f1690364...fc12",
        time: "14:07:22.303",
        body: (
          <>
            <p className="text-xs text-zinc-500 mb-2 flex items-center gap-1.5">
              <span>⏳</span> Agent blocked. Finance manager notified for review.
            </p>
            <pre className="bg-zinc-50 border border-zinc-200 rounded-md px-3 py-2.5 text-xs font-mono text-zinc-700 leading-relaxed overflow-x-auto whitespace-pre">
              <span className="text-zinc-400 italic"># Approve via CLI{"\n"}</span>
              vkit approval:approve req_f1690364...fc12
            </pre>
          </>
        ),
      },
      {
        type: "allow",
        badge: "Approved · Data Returned",
        actor: "Masked · 12 rows",
        time: "14:09:14.881",
        body: (
          <>
            <pre className="bg-zinc-50 border border-zinc-200 rounded-md px-3 py-2.5 text-xs font-mono text-zinc-700 leading-relaxed overflow-x-auto whitespace-pre">
              {"{ transaction_id: \"txn_001\", "}
              <span className="text-amber-600">amount: "*****"</span>
              {", "}
              <span className="text-amber-600">account_number: "*****"</span>
              {" }\n"}
              <span className="text-zinc-400 italic">... 11 more rows</span>
            </pre>
            <p className="text-xs text-zinc-400 mt-2 flex items-center gap-1.5">
              <span>✅</span> Human approved. Sensitive fields still masked after approval.
            </p>
          </>
        ),
      },
      {
        type: "audit",
        badge: "Audit Log",
        actor: "Cryptographically signed",
        time: "14:09:14.882",
        body: (
          <div className="space-y-0.5">
            <AuditRow k="approved_by" v="finance.manager@company.com" />
            <AuditRow k="wait_time" v="1m 52s" />
            <AuditRow k="masked_fields" v="amount, account_number" color="amber" />
            <AuditRow k="signature" v="✓ verified" color="emerald" />
          </div>
        ),
      },
    ],
  },

  deny: {
    label: "Access Denied",
    steps: [
      {
        type: "request",
        badge: "Request",
        actor: "Support-Agent",
        time: "09:41:03.550",
        body: (
          <pre className="bg-zinc-50 border border-zinc-200 rounded-md px-3 py-2.5 text-xs font-mono text-zinc-700 leading-relaxed overflow-x-auto whitespace-pre">
            <span className="text-blue-600">SELECT</span>{" "}*{" "}
            <span className="text-blue-600">FROM</span>{" "}customers{" "}
            <span className="text-blue-600">WHERE</span>{" "}region = <span className="text-emerald-600">'EU'</span>
          </pre>
        ),
      },
      {
        type: "policy",
        badge: "Policy Evaluated",
        actor: "block_cross_region",
        time: "09:41:03.551",
        body: (
          <div className="space-y-1.5">
            <Rule>
              Requester region: <strong>US</strong> · Dataset region: <strong>EU</strong> →{" "}
              <span className="text-red-600 font-semibold">DENY</span>
            </Rule>
            <Rule>Cross-region PII access forbidden — GDPR Article 44</Rule>
          </div>
        ),
      },
      {
        type: "deny",
        badge: "Access Denied",
        actor: "0 bytes returned",
        time: "09:41:03.552",
        body: (
          <>
            <pre className="bg-red-50 border border-red-100 rounded-md px-3 py-2.5 text-xs font-mono text-red-600 leading-relaxed overflow-x-auto whitespace-pre">
              {"{ status: \"denied\",\n  policy_id: \"block_cross_region\",\n  reason: \"Cross-region data access is not permitted.\" }"}
            </pre>
            <p className="text-xs text-zinc-400 mt-2 flex items-center gap-1.5">
              <span>🚫</span> Zero bytes of EU customer data left the system.
            </p>
          </>
        ),
      },
      {
        type: "audit",
        badge: "Audit Log",
        actor: "Cryptographically signed",
        time: "09:41:03.553",
        body: (
          <div className="space-y-0.5">
            <AuditRow k="outcome" v="DENIED" color="red" />
            <AuditRow k="data_exfiltrated" v="0 bytes" color="emerald" />
            <AuditRow k="signature" v="✓ verified" color="emerald" />
          </div>
        ),
      },
    ],
  },

  kill: {
    label: "Grant Revoked",
    steps: [
      {
        type: "allow",
        badge: "Active Grant",
        actor: "expires 11:45",
        time: "11:30:00.000",
        body: (
          <div className="bg-emerald-50 border border-emerald-100 rounded-md px-3 py-2.5 font-mono text-xs space-y-1">
            <div className="flex justify-between"><span className="text-zinc-400">agent</span><span className="text-emerald-600">Analytics-Agent</span></div>
            <div className="flex justify-between"><span className="text-zinc-400">grant_ref</span><span className="text-emerald-600">grt_9f2a...e41c</span></div>
            <div className="flex justify-between"><span className="text-zinc-400">status</span><span className="text-emerald-600">active</span></div>
          </div>
        ),
      },
      {
        type: "deny",
        badge: "Kill Switch",
        actor: "security@company.com",
        time: "11:32:14.007",
        body: (
          <pre className="bg-zinc-50 border border-zinc-200 rounded-md px-3 py-2.5 text-xs font-mono text-zinc-700 leading-relaxed overflow-x-auto whitespace-pre">
            <span className="text-zinc-400 italic"># Revoke immediately{"\n"}</span>
            vkit grant:revoke --grant grt_9f2a...e41c{"\n"}
            {"  "}--reason <span className="text-emerald-600">"Suspicious access pattern"</span>
          </pre>
        ),
      },
      {
        type: "deny",
        badge: "Revoked",
        actor: "<2ms · No credential rotation",
        time: "11:32:14.009",
        body: (
          <>
            <pre className="bg-red-50 border border-red-100 rounded-md px-3 py-2.5 text-xs font-mono text-red-600 leading-relaxed overflow-x-auto whitespace-pre">
              {"{ status: \"denied\",\n  reason: \"Grant has been revoked.\",\n  revoked_by: \"security@company.com\" }"}
            </pre>
            <p className="text-xs text-zinc-400 mt-2 flex items-center gap-1.5">
              <span>⚡</span> Access terminated instantly. No database credential rotation required.
            </p>
          </>
        ),
      },
      {
        type: "audit",
        badge: "Audit Log",
        actor: "Cryptographically signed",
        time: "11:32:14.010",
        body: (
          <div className="space-y-0.5">
            <AuditRow k="revoked_by" v="security@company.com" />
            <AuditRow k="access_after_revoke" v="0 requests granted" color="red" />
            <AuditRow k="signature" v="✓ verified" color="emerald" />
          </div>
        ),
      },
    ],
  },
}

const DOT = {
  request:  "border-blue-400",
  policy:   "border-amber-400",
  allow:    "border-emerald-400",
  deny:     "border-red-400",
  approval: "border-violet-400",
  audit:    "border-zinc-300",
}

const BADGE = {
  request:  "bg-blue-50 text-blue-600 border-blue-100",
  policy:   "bg-amber-50 text-amber-600 border-amber-100",
  allow:    "bg-emerald-50 text-emerald-600 border-emerald-100",
  deny:     "bg-red-50 text-red-600 border-red-100",
  approval: "bg-violet-50 text-violet-600 border-violet-100",
  audit:    "bg-zinc-50 text-zinc-400 border-zinc-200",
}

const CARD_BORDER = {
  request:  "border-blue-100",
  policy:   "border-amber-100",
  allow:    "border-emerald-100",
  deny:     "border-red-100",
  approval: "border-violet-100",
  audit:    "border-zinc-200",
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function Rule({ children }) {
  return (
    <div className="flex items-start gap-2 text-sm bg-zinc-50 border border-zinc-200 rounded px-3 py-2">
      <span className="text-zinc-300 mt-0.5 flex-shrink-0">◈</span>
      <span className="text-zinc-600 leading-relaxed">{children}</span>
    </div>
  )
}

function Chip({ children }) {
  return (
    <code className="font-mono text-[11px] bg-zinc-100 border border-zinc-200 px-1.5 py-0.5 rounded text-zinc-500">
      {children}
    </code>
  )
}

function AuditRow({ k, v, color }) {
  const cls =
    color === "emerald" ? "text-emerald-600" :
    color === "amber"   ? "text-amber-600" :
    color === "red"     ? "text-red-600" :
    "text-zinc-700"

  return (
    <div className="flex justify-between gap-4 py-1.5 border-b border-zinc-100 last:border-0 text-xs">
      <span className="font-mono text-zinc-400">{k}</span>
      <span className={`font-mono ${cls}`}>{v}</span>
    </div>
  )
}

function GovernanceFlow() {
  const [active, setActive] = useState("mask")
  const flow = FLOWS[active]

  return (
    <div>
      {/* Tabs */}
      <div className="flex gap-0 border-b border-zinc-200 mb-8 overflow-x-auto">
        {Object.entries(FLOWS).map(([key, { label }]) => (
          <button
            key={key}
            onClick={() => setActive(key)}
            className={`px-4 py-2.5 text-xs font-mono whitespace-nowrap transition-colors border-b-2 mb-[-1px] bg-transparent cursor-pointer ${
              active === key
                ? "text-zinc-900 border-zinc-900"
                : "text-zinc-400 border-transparent hover:text-zinc-600"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Steps */}
      <div className="flex flex-col gap-0">
        {flow.steps.map((step, i) => (
          <div key={i} className="flex gap-4 items-stretch">

            {/* Timeline */}
            <div className="flex flex-col items-center w-8 flex-shrink-0">
              <div className={`w-2.5 h-2.5 rounded-full border-2 flex-shrink-0 mt-[18px] bg-white ${DOT[step.type]}`} />
              {i < flow.steps.length - 1 && (
                <div className="w-px flex-1 bg-zinc-100 my-1" />
              )}
            </div>

            {/* Card */}
            <div className={`flex-1 border rounded-lg bg-white mb-3 overflow-hidden ${CARD_BORDER[step.type]}`}>
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-zinc-100">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] text-zinc-400">{step.time}</span>
                  <span className={`font-mono text-[10px] font-semibold px-2 py-0.5 rounded border uppercase tracking-wider ${BADGE[step.type]}`}>
                    {step.badge}
                  </span>
                </div>
                <span className="font-mono text-[10px] text-zinc-400 hidden sm:block">{step.actor}</span>
              </div>
              <div className="p-4">{step.body}</div>
            </div>

          </div>
        ))}
      </div>
    </div>
  )
}

function Feature({ icon, title, desc }) {
  return (
    <div className="border border-zinc-100 rounded-xl p-6 hover:border-zinc-200 transition-colors">
      <div className="text-xl mb-3">{icon}</div>
      <h3 className="font-semibold text-zinc-900 mb-2 text-sm">{title}</h3>
      <p className="text-sm text-zinc-500 leading-relaxed">{desc}</p>
    </div>
  )
}

function Stat({ value, label }) {
  return (
    <div className="text-center">
      <div className="text-3xl font-bold text-zinc-900 mb-1">{value}</div>
      <div className="text-xs text-zinc-500 leading-relaxed">{label}</div>
    </div>
  )
}

// ─── Main Landing Page ───────────────────────────────────────────────────────

export default function VaultKitLanding() {
  const [earlyAccessOpen, setEarlyAccessOpen] = useState(false)
  const [founderOpen, setFounderOpen] = useState(false)

  const [email, setEmail] = useState("")
  const [company, setCompany] = useState("")
  const [useCase, setUseCase] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState(null)

  const resetEarlyAccess = () => {
    setEarlyAccessOpen(false)
    setEmail("")
    setCompany("")
    setUseCase("")
    setSubmitted(false)
    setError(null)
    setSubmitting(false)
  }

  const submitEarlyAccess = async (e) => {
    e.preventDefault()
    if (!email || !company || submitting) return
    setSubmitting(true)
    setError(null)
    try {
      const res = await fetch(FORMSPREE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ email: email.trim(), company: company.trim(), use_case: useCase.trim(), source: "vaultkit-landing", company_website: "" }),
      })
      if (!res.ok) throw new Error("Failed")
      setSubmitted(true)
    } catch {
      setError("Something went wrong. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-white text-zinc-900">

      {/* NAV */}
      <header className="border-b border-zinc-100 sticky top-0 bg-white/95 backdrop-blur-sm z-50">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <VaultKitLogo size={26} />
            <span className="text-base font-semibold tracking-tight">VaultKit</span>
          </div>
          <nav className="flex items-center gap-6">
            <a href="#how" className="hidden md:block text-sm text-zinc-500 hover:text-zinc-900 transition-colors">How it works</a>
            <a href="#features" className="hidden md:block text-sm text-zinc-500 hover:text-zinc-900 transition-colors">Features</a>
            <a href="https://docs.vaultkit.io" className="hidden md:block text-sm text-zinc-500 hover:text-zinc-900 transition-colors">Docs</a>
            <Button size="sm" onClick={() => setEarlyAccessOpen(true)}>
              Request Access
            </Button>
          </nav>
        </div>
      </header>

      {/* HERO */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 pt-20 pb-16 md:pt-28 md:pb-24 text-center">

        {/* Incident banner */}
        <div className="inline-flex items-start gap-3 bg-red-50 border border-red-100 rounded-lg px-4 py-3 mb-10 text-left max-w-2xl">
          <div className="w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0 mt-1.5 animate-pulse" />
          <p className="text-xs text-zinc-600 leading-relaxed">
            <strong className="text-zinc-900">May 2026 —</strong> An AI agent deleted a company's entire production database in 9 seconds. No approval layer. No audit trail. Backups gone too.
          </p>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-zinc-900 leading-[1.1] mb-6">
          Your AI agents need a<br className="hidden sm:block" /> governance layer.
        </h1>

        <p className="text-lg text-zinc-500 max-w-2xl mx-auto mb-10 leading-relaxed">
          VaultKit sits between your agents and production data — enforcing field-level masking, approval workflows, and signed audit trails without changing how agents query data.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-3">
          <Button size="lg" onClick={() => setEarlyAccessOpen(true)}>
            Join Design Partner Program
          </Button>
          <Button size="lg" variant="outline" onClick={() => setFounderOpen(true)}>
            Talk to the Founders
          </Button>
        </div>

        <p className="mt-6 text-xs text-zinc-400">
          We're onboarding companies running AI agents on production systems.
        </p>
      </section>

      {/* STATS */}
      <section className="border-t border-b border-zinc-100 py-12">
        <div className="max-w-3xl mx-auto px-6 grid grid-cols-3 gap-8">
          <Stat value="9s" label="Time for an unchecked agent to delete a production DB" />
          <Stat value="<2ms" label="VaultKit grant revocation response time" />
          <Stat value="0" label="Database credentials exposed to agents" />
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="max-w-4xl mx-auto px-4 sm:px-6 py-24">
        <div className="text-center mb-12">
          <p className="text-xs font-mono text-zinc-400 uppercase tracking-widest mb-3">How VaultKit works</p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 mb-4">
            Every request evaluated,<br className="hidden sm:block" /> enforced, and signed.
          </h2>
          <p className="text-zinc-500 max-w-xl mx-auto text-sm leading-relaxed">
            Policy lives in YAML, not in your application code. VaultKit evaluates every data request at runtime — before a single byte leaves the system.
          </p>
        </div>

        <GovernanceFlow />
      </section>

      {/* FEATURES */}
      <section id="features" className="bg-zinc-50 py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-mono text-zinc-400 uppercase tracking-widest mb-3">Core capabilities</p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900">
              Everything enforcement requires.
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            <Feature icon="🔒" title="Field-Level Masking" desc="Mask PII, financial, and sensitive fields at execution. Agents analyze patterns without touching raw data." />
            <Feature icon="✋" title="Approval Workflows" desc="Require human sign-off before sensitive data is returned. Gates that actually block — not just log." />
            <Feature icon="📋" title="Signed Audit Trail" desc="Every request logged with agent identity, policy decision, and a cryptographic signature. Tamper-proof by design." />
            <Feature icon="⚡" title="Grant Revocation" desc="Kill access in under 2ms with a single command. No credential rotation, no pipeline changes." />
            <Feature icon="🔍" title="Schema Drift Detection" desc="New sensitive column in production? VaultKit catches it immediately. Access blocked until policy is updated." />
            <Feature icon="📁" title="Policy-as-Code" desc="Policies live in YAML, versioned in Git. Deploy in seconds. Full history, review process, instant rollback." />
          </div>
        </div>
      </section>

      {/* WHO IT'S FOR */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-24">
        <div className="text-center mb-12">
          <p className="text-xs font-mono text-zinc-400 uppercase tracking-widest mb-3">Who it's for</p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900">
            Built for teams that can't afford surprises.
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="border border-zinc-200 rounded-xl p-6">
            <h3 className="font-semibold text-zinc-900 mb-4">Good fit</h3>
            <ul className="space-y-3 text-sm text-zinc-500">
              <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">✓</span> Teams exposing production data to AI agents</li>
              <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">✓</span> Security, platform, and data engineering teams</li>
              <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">✓</span> Companies with compliance, audit, or approval requirements</li>
              <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">✓</span> Fintech, healthtech, and crypto organizations</li>
            </ul>
          </div>
          <div className="border border-zinc-100 rounded-xl p-6 bg-zinc-50">
            <h3 className="font-semibold text-zinc-900 mb-4">Probably not a fit</h3>
            <ul className="space-y-3 text-sm text-zinc-500">
              <li className="flex items-start gap-2"><span className="text-zinc-300 mt-0.5">—</span> Personal projects or one-off scripts</li>
              <li className="flex items-start gap-2"><span className="text-zinc-300 mt-0.5">—</span> Teams without production data or access controls</li>
              <li className="flex items-start gap-2"><span className="text-zinc-300 mt-0.5">—</span> Use cases that don't require governance or auditability</li>
              <li className="flex items-start gap-2"><span className="text-zinc-300 mt-0.5">—</span> Pure experimentation without compliance needs</li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-zinc-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-24 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 mb-4">
            Ready to govern your AI agents?
          </h2>
          <p className="text-zinc-500 mb-10 leading-relaxed max-w-xl mx-auto">
            We're onboarding design partners — companies actively running AI agents on production systems where governance is a real requirement, not a someday problem.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <Button size="lg" onClick={() => setEarlyAccessOpen(true)}>
              Join Design Partner Program
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="https://docs.vaultkit.io">Read the Docs</a>
            </Button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-zinc-100 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <VaultKitLogo size={20} />
            <span className="text-sm text-zinc-400">VaultKit · founders@vaultkit.io</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="https://docs.vaultkit.io" className="text-xs text-zinc-400 hover:text-zinc-600 transition-colors">Docs</a>
            <a href="https://github.com/vaultkit-inc/vaultkitcli" className="text-xs text-zinc-400 hover:text-zinc-600 transition-colors">GitHub</a>
            <a href="mailto:founders@vaultkit.io" className="text-xs text-zinc-400 hover:text-zinc-600 transition-colors">Contact</a>
          </div>
        </div>
      </footer>

      {/* EARLY ACCESS MODAL */}
      <Dialog open={earlyAccessOpen} onOpenChange={resetEarlyAccess}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Join the Design Partner Program</DialogTitle>
            <DialogDescription>
              Tell us about your AI agent setup and what you're trying to govern.
            </DialogDescription>
          </DialogHeader>
          {submitted ? (
            <p className="text-sm text-zinc-600 py-2">
              Thanks — we'll be in touch shortly.
            </p>
          ) : (
            <form onSubmit={submitEarlyAccess} className="space-y-4">
              <Input placeholder="Work email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              <Input placeholder="Company" value={company} onChange={(e) => setCompany(e.target.value)} required />
              <Textarea placeholder="What are you trying to govern or protect?" value={useCase} onChange={(e) => setUseCase(e.target.value)} />
              <input type="text" name="company_website" tabIndex="-1" autoComplete="off" className="hidden" />
              {error && <p className="text-sm text-red-600">{error}</p>}
              <DialogFooter>
                <Button type="submit" disabled={submitting}>
                  {submitting ? "Submitting…" : "Submit"}
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* FOUNDER MODAL */}
      <Dialog open={founderOpen} onOpenChange={setFounderOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Talk to the Founders</DialogTitle>
            <DialogDescription>We'd love to learn about your use case.</DialogDescription>
          </DialogHeader>
          <p className="text-sm text-zinc-600">
            Email us at <strong>founders@vaultkit.io</strong> and we'll set up a call.
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setFounderOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </main>
  )
}