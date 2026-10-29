/**
 * Every piece of copy on the landing page. Components only render this data,
 * so copy edits never touch component code. The dialog copy lives in
 * designPartnerForm.ts. Links that come from env are
 * referenced by their config key and hidden when unset.
 */
import type { LinkKey } from "@/lib/config"

export type Href = { href: string } | { configKey: LinkKey }
export type NavLink = { label: string } & Href
export type SectionIntro = { id?: string; eyebrow?: string; heading: string; body?: string }
export type Step = { title: string; body: string; code: string }
export type OutcomeTone = "allow" | "mask" | "warn" | "deny"
export type Outcome = { label: string; tone: OutcomeTone; body: string }
export type Titled = { title: string; body: string }
export type UseCase = { id: string; label: string }

export const meta = {
  title: "VaultKit · Approve exactly what your AI agents read",
  description:
    "Let AI agents query production. Policies in git decide what each request may return: allowed, masked, sent to a person for approval, or denied. Agents never hold database credentials.",
  ogAlt: "VaultKit: Let AI agents query production. Approve exactly what they read.",
}

export const partnerCtaLabel = "Become a design partner"

export const nav: { links: NavLink[] } = {
  links: [
    { label: "How it works", href: "#how" },
    { label: "Approvals", href: "#grants" },
    { label: "Docs", configKey: "docsUrl" },
    { label: "GitHub", configKey: "githubUrl" },
  ],
}

export const hero = {
  badge: "Works with Claude Code, Cursor and any MCP client",
  heading: "Let AI agents query production. Approve exactly what they read.",
  body: "VaultKit sits between your agents and your databases. Policies in git decide what each request may return: allowed, masked, sent to a person for approval, or denied. Agents never hold database credentials.",
  demoLabel: "Watch the 90-second demo",
  footnote: "Self-hosted. Your data and credentials never leave your infrastructure.",
}

export const agentFlow = {
  label: "Example: an agent asks for payment data through VaultKit",
  windowTitle: "Coding agent · connected to VaultKit over MCP",
  prompt: { speaker: "you", text: "Show me the last 10 failed payments, with the customer's email." },
  toolCall: "vaultkit_query · payments · read · 4 fields · last 24h",
  approval: {
    status: "approval required",
    detail: "payments_reviewer must approve this exact query. Purpose: INC-123 failed refunds.",
  },
  approvedBy: { name: "Ada", action: "approved it in the VaultKit console", expiry: "expires in 2h" },
  result: { status: "10 rows", detail: "customer_email masked" },
  table: {
    columns: ["id", "amount", "customer_email"],
    rows: [
      ["pay_2041", "482.10", "cus****"],
      ["pay_2038", "1,250.00", "ord****"],
      ["pay_2031", "96.40", "mia****"],
    ],
  },
  caption: "Illustrative. Run the same flow on your laptop with the demo in the docs.",
}

export const grants = {
  intro: {
    id: "grants",
    eyebrow: "What makes VaultKit different",
    heading: "An approval covers one question. Not a table, not a role.",
    body: "Database roles grant access to a table, indefinitely. VaultKit grants access to a single request: these fields, this time range, for this purpose, until it expires. Change the question and it needs approval again.",
  } satisfies SectionIntro,
  role: {
    label: "A database role",
    code: "GRANT SELECT ON payments TO agent_reader;",
    points: [
      "Every column, including ones added next month",
      "Every row, any time range",
      "No record of why the agent asked",
      "Valid until someone remembers to revoke it",
    ],
  },
  grant: {
    label: "A VaultKit grant",
    code: "support-agent may read id, amount, status\nand a masked customer_email from failed\npayments in the last 24 hours.",
    points: [
      "Bound to that exact request; a different question needs a new approval",
      "Approved by Ada for INC-123, and recorded",
      "Masking still applies after approval",
      "Expires in 2 hours, and stops working the moment the policy changes",
    ],
  },
}

export const howItWorks = {
  intro: {
    id: "how",
    eyebrow: "How it works",
    heading: "Configure it from your terminal. Approve from the console.",
  } satisfies SectionIntro,
  steps: [
    {
      title: "Connect a datasource",
      body: "VaultKit holds the credential and runs queries next to your data. Agents never see it.",
      code: "$ vkit datasource add --id prod_db …\n$ vkit scan",
    },
    {
      title: "Write policy as code",
      body: "Policies live in git, get reviewed like any other change, and deploy pinned to a commit.",
      code: "# policies/payments.yaml\nmatch:  { dataset: payments }\naction: require_approval\napproval:\n  approver_role: payments_reviewer",
    },
    {
      title: "Point your agents at VaultKit",
      body: "Through the MCP server, the Python SDK or the CLI. Approvers act from the console.",
      code: '"vaultkit": {\n  "command": "vaultkit-mcp",\n  "env": { "VAULTKIT_TOKEN": "…" }\n}',
    },
  ] satisfies Step[],
}

export const outcomes = {
  intro: {
    eyebrow: "Every request, four possible answers",
    heading: "Your policy decides before a single row leaves the database.",
  } satisfies SectionIntro,
  items: [
    { label: "Allow", tone: "allow", body: "Routine questions run straight away. Nothing changes for the developer." },
    { label: "Mask", tone: "mask", body: "Sensitive fields come back masked, even after a request is approved." },
    { label: "Require approval", tone: "warn", body: "A person in the right group approves the exact request. Nobody approves their own." },
    { label: "Deny", tone: "deny", body: "Some data is never returned. And there's no write path at all." },
  ] satisfies Outcome[],
}

export const iamGap = {
  intro: {
    eyebrow: "Why IAM isn't enough",
    heading: "IAM answers who may connect. Not what a specific question may return.",
    body: "Keep your database roles and IAM. VaultKit works at the layer they don't reach: individual requests, individual fields, and why the agent asked.",
  } satisfies SectionIntro,
  questions: [
    { title: "Which fields should this agent see?", body: "A table grant includes every column, even one a teammate added last week." },
    { title: "Does this request need a person to sign off?", body: "Roles are standing permissions. There's no way to approve one query and not the next." },
    { title: "Which agent asked, and why?", body: "The database sees a service account. VaultKit records which agent asked, with what token, and the purpose it gave." },
  ] satisfies Titled[],
}

export const audience = {
  intro: {
    eyebrow: "Who it's for",
    heading: "Teams whose agents ask questions nobody planned for.",
    body: "If your agents only call fixed internal APIs, you may not need VaultKit. If they write their own queries against production, you probably do.",
  } satisfies SectionIntro,
  cards: [
    { title: "Coding agents on production", body: "Claude Code or Cursor wired to a production database through an MCP server." },
    { title: "Analytics agents", body: "Agents that answer business questions by writing their own queries." },
    { title: "Incident response", body: "Agents digging through production data mid-incident, where speed and oversight both matter." },
    { title: "Teams with a homegrown workaround", body: "A read-only replica, a hand-rolled allowlist, or a reviewer pasting query results." },
  ] satisfies Titled[],
}

export const partnerCta = {
  heading: "Become a design partner.",
  body: "We're working closely with a small number of teams running agents on production data. You get hands-on setup with the founder and a direct say in the roadmap.",
  docsLabel: "Read the docs",
}

export const footer = {
  brand: "VaultKit",
  links: [
    { label: "Docs", configKey: "docsUrl" },
    { label: "GitHub", configKey: "githubUrl" },
    { label: "Agent Readiness Index", configKey: "ariUrl" },
  ] satisfies NavLink[],
}
