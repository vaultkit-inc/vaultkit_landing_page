"use client"

import { useState, useEffect } from "react"
import { Send, ShieldCheck, UserCheck, Zap, Lock } from "lucide-react"

const STEPS = [
  {
    id: 0,
    icon: Send,
    label: "Request submitted",
    actor: "AI Agent",
    color: "text-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-200",
    detail: (
      <pre className="text-xs font-mono text-zinc-700 leading-relaxed whitespace-pre">
{`vkit.request({
  aql: { source_table: "customers",
         columns: ["email", "address"] },
  env: "production",
  requester: "agent-crm-v2"
})`}
      </pre>
    ),
  },
  {
    id: 1,
    icon: ShieldCheck,
    label: "Policy evaluated",
    actor: "VaultKit",
    color: "text-amber-600",
    bg: "bg-amber-50",
    border: "border-amber-200",
    detail: (
      <ul className="text-xs text-zinc-600 space-y-1.5 font-mono">
        <li><span className="text-green-600">✓</span> env=production allowed</li>
        <li><span className="text-green-600">✓</span> requester identity verified</li>
        <li><span className="text-amber-600">!</span> PII columns → approval required</li>
      </ul>
    ),
  },
  {
    id: 2,
    icon: UserCheck,
    label: "Human approves",
    actor: "Reviewer",
    color: "text-violet-600",
    bg: "bg-violet-50",
    border: "border-violet-200",
    detail: (
      <div className="text-xs text-zinc-600 space-y-1.5">
        <p>Slack notification sent to <strong>#data-approvals</strong></p>
        <p className="font-mono text-green-700 font-medium">→ Approved by @sarah in 4m 12s</p>
        <p className="text-zinc-400">Reason: CRM enrichment batch #291</p>
      </div>
    ),
  },
  {
    id: 3,
    icon: Zap,
    label: "Query executed",
    actor: "FUNL",
    color: "text-sky-600",
    bg: "bg-sky-50",
    border: "border-sky-200",
    detail: (
      <ul className="text-xs text-zinc-600 space-y-1.5 font-mono">
        <li><span className="text-green-600">✓</span> AQL compiled to SQL</li>
        <li><span className="text-green-600">✓</span> Run against prod replica</li>
        <li><span className="text-green-600">✓</span> Result encrypted in transit</li>
      </ul>
    ),
  },
  {
    id: 4,
    icon: Lock,
    label: "Result masked & delivered",
    actor: "VaultKit",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    detail: (
      <pre className="text-xs font-mono text-zinc-700 leading-relaxed whitespace-pre">
{`{ "email": "s***@acme.com",
  "address": "*** *** St, NYC",
  "_sig": "vk_sig_a3f9c2..." }`}
      </pre>
    ),
  },
]

export default function GovernanceFlow() {
  const [active, setActive] = useState(0)
  const [running, setRunning] = useState(true)

  useEffect(() => {
    if (!running) return
    const id = setInterval(() => {
      setActive((prev) => (prev + 1) % STEPS.length)
    }, 2600)
    return () => clearInterval(id)
  }, [running])

  const step = STEPS[active]

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Step bar */}
      <div className="flex items-center justify-between mb-10 overflow-x-auto gap-1">
        {STEPS.map((s, i) => {
          const Icon = s.icon
          const isActive = i === active
          const isPast = i < active
          return (
            <button
              key={s.id}
              onClick={() => { setActive(i); setRunning(false) }}
              className={`flex flex-col items-center gap-1.5 px-3 py-2 rounded-xl transition-all flex-1 min-w-[72px] border ${
                isActive
                  ? `${s.bg} ${s.border} shadow-sm`
                  : isPast
                  ? "bg-zinc-50 border-zinc-200 opacity-60"
                  : "bg-white border-zinc-100 opacity-40"
              }`}
            >
              <div
                className={`h-8 w-8 flex items-center justify-center rounded-lg ${
                  isActive ? s.bg : "bg-zinc-100"
                }`}
              >
                <Icon
                  size={16}
                  className={isActive ? s.color : "text-zinc-400"}
                />
              </div>
              <span
                className={`text-[10px] font-medium text-center leading-tight hidden sm:block ${
                  isActive ? "text-zinc-900" : "text-zinc-400"
                }`}
              >
                {s.label}
              </span>
            </button>
          )
        })}
      </div>

      {/* Active step card */}
      <div
        className={`rounded-2xl border p-6 transition-all duration-300 ${step.bg} ${step.border}`}
      >
        <div className="flex items-start gap-4">
          <div
            className={`h-10 w-10 flex-shrink-0 flex items-center justify-center rounded-xl bg-white border ${step.border} shadow-sm`}
          >
            <step.icon size={20} className={step.color} />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-3">
              <span className={`text-xs font-semibold uppercase tracking-wide ${step.color}`}>
                {step.actor}
              </span>
              <span className="text-zinc-300">·</span>
              <span className="text-sm font-medium text-zinc-800">
                {step.label}
              </span>
            </div>

            <div className="bg-white rounded-xl border border-white/80 shadow-sm px-4 py-3">
              {step.detail}
            </div>
          </div>
        </div>
      </div>

      {/* Progress dots */}
      <div className="flex justify-center gap-2 mt-6">
        {STEPS.map((s, i) => (
          <button
            key={s.id}
            onClick={() => { setActive(i); setRunning(false) }}
            className={`h-1.5 rounded-full transition-all ${
              i === active ? `w-6 ${s.color.replace("text-", "bg-")}` : "w-1.5 bg-zinc-200"
            }`}
          />
        ))}
      </div>

      {/* Replay */}
      {!running && (
        <div className="flex justify-center mt-4">
          <button
            onClick={() => { setActive(0); setRunning(true) }}
            className="text-xs text-zinc-400 hover:text-zinc-600 underline underline-offset-2 transition"
          >
            Replay animation
          </button>
        </div>
      )}
    </div>
  )
}
