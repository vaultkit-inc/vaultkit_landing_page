/**
 * Every piece of copy on the landing page. Components only render this data,
 * so copy edits never touch component code. The dialog copy lives in
 * designPartnerForm.ts. Links that come from env are
 * referenced by their config key and hidden when unset.
 */
import type { LinkKey } from "@/lib/config"

export type Href = { href: string } | { configKey: LinkKey }
export type NavLink = { label: string } & Href
export type UseCase = { id: string; label: string }
export type SpecRow = { term: string; value: string }
export type Decision = "allow" | "mask" | "approval" | "deny"
export type DecisionRow = { ask: string; aql: string; decision: Decision; label: string; result: string }
export type Step = { n: string; title: string; note: string; code: string; codeLabel: string }

export const headline = { lead: "Authorize the query,", emphasis: "not just the credential." }

export const meta = {
  title: `VaultKit · ${headline.lead} ${headline.emphasis}`,
  description:
    "Agents ask questions nobody planned for. VaultKit decides each one before it runs: allow, mask, require a person's approval, or deny. Policy lives in git. Credentials stay with VaultKit.",
  ogAlt: `VaultKit: ${headline.lead} ${headline.emphasis}`,
}

export const partnerCtaLabel = "Become a design partner"

export const header = {
  // Matches the control plane's VERSION (0.9.2-alpha).
  version: "v0.9 · alpha",
  links: [
    { label: "docs", configKey: "docsUrl" },
    { label: "github", configKey: "githubUrl" },
  ] satisfies NavLink[],
  partnerLink: { label: "design partners →", href: "#partner" },
}

export const hero = {
  marker: "§0 · Runtime access control for AI agents",
  body: "Agents ask questions nobody planned for. VaultKit decides each one before it runs: allow, mask, require a person's approval, or deny. Policy lives in git. Credentials stay with VaultKit.",
  specLabel: "read the spec →",
  specTableLabel: "VaultKit at a glance",
  spec: [
    { term: "deploys", value: "self-hosted, next to your data" },
    { term: "sources", value: "postgres today" },
    { term: "agents", value: "MCP, Python SDK, CLI" },
    { term: "policy", value: "YAML in git, pinned per deploy" },
    { term: "decisions", value: "allow · mask · approve · deny" },
    { term: "grants", value: "one exact query, time-boxed" },
    { term: "writes", value: "none. there is no write path" },
    { term: "audit", value: "agent, token, purpose, query" },
  ] satisfies SpecRow[],
}

export const incident = {
  id: "incident",
  marker: "§1 · One incident, three questions",
  heading: "Same agent, same table. Three different answers.",
  context: "incident-bot · INC-123 · production",
  caption: "Three requests from one agent during one incident, and what VaultKit decided for each",
  columns: ["the agent asks", "as AQL", "decision", "what comes back"],
  rows: [
    {
      ask: "How many payments failed in the last 15 minutes?",
      aql: "payments · aggregate\ncount(*) where status = failed\nrange now-15m",
      decision: "allow",
      label: "ALLOW",
      result: '{ "count": 142 }',
    },
    {
      ask: "Which customers were affected? Show their emails.",
      aql: "customers · read\nfields id, email\nwhere id in (failed, 15m)",
      decision: "mask",
      label: "MASK",
      result: "cus_8812  m***@acme.io\ncus_8790  j***@globex.com\n… 40 rows",
    },
    {
      ask: "Pull the full payment records for those customers.",
      aql: "payments · read\nfields id, amount, card_last4, email\nwhere status = failed",
      decision: "approval",
      label: "APPROVAL",
      result: "held for data_owner.\nada approves → this exact\nquery runs, for 1h.",
    },
  ] satisfies DecisionRow[],
  footnote: "Illustrative. Run it yourself: make demo.",
}

export const grants = {
  id: "grants",
  marker: "§2 · Why roles aren't enough",
  heading: "A role is a standing permission. A grant is one answer.",
  body: "Keep your database roles and IAM. They decide who may connect. VaultKit decides what a specific question may return, and remembers why it was asked.",
  role: {
    label: "database role",
    code: "GRANT SELECT ON payments TO agent_reader;",
    body: "Every column, every row, any time range, until someone revokes it. No record of why.",
  },
  grant: {
    label: "vaultkit grant",
    code: "payments{id, amount, status, customer_email:masked}\n where status = failed, last 24h · INC-123 · ttl 2h",
    body: "Bound to this exact query. Approved by Ada and recorded. Masking still applies. Expires on its own, or the moment the policy changes.",
  },
}

export const howItFits = {
  id: "how",
  marker: "§3 · How it fits",
  heading: "Configure it from the terminal. Review it in a pull request.",
  steps: [
    {
      n: "01",
      title: "Connect a datasource",
      note: "VaultKit holds the credential and runs queries next to your data.",
      codeLabel: "Terminal commands to register and scan a Postgres datasource",
      code: "$ vkit datasource add --id prod_db …\n$ vkit scan prod_db --mode apply",
    },
    {
      n: "02",
      title: "Write policy as code",
      note: "Reviewed like any change, deployed pinned to a commit.",
      codeLabel: "A policy file that sends payment reads for approval",
      code: "# policies/payments.yaml\nid: payments-need-approval\ndescription: Owners approve payments\nmatch:  { dataset: payments }\naction:\n  require_approval: true\n  approver_role: data_owner\n  reason: Payment records",
    },
    {
      n: "03",
      title: "Point your agents at it",
      note: "MCP, Python SDK or CLI. No database password in the agent.",
      codeLabel: "MCP client configuration for vaultkit-mcp",
      code: '"vaultkit": {\n  "command": "vaultkit-mcp",\n  "env": {\n    "VAULTKIT_BASE_URL": "https://…",\n    "VAULTKIT_ORG": "acme",\n    "VAULTKIT_TOKEN": "…"\n  }\n}',
    },
  ] satisfies Step[],
}

export const partner = {
  id: "partner",
  marker: "§4 · Design partners",
  heading: { lead: "Running agents on production data?", emphasis: "Let's talk." },
  body: "A small number of teams, hands-on setup with the founder, and a direct say in the roadmap.",
}

export const footer = {
  brand: "vaultkit",
  links: [
    { label: "docs", configKey: "docsUrl" },
    { label: "github", configKey: "githubUrl" },
    { label: "agent readiness index", configKey: "ariUrl" },
  ] satisfies NavLink[],
}
