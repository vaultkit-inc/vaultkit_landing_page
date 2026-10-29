import { NextRequest } from "next/server"
import { beforeEach, describe, expect, it, vi } from "vitest"

const insert = vi.fn()
vi.mock("server-only", () => ({}))
const leadsClient = vi.fn()
vi.mock("@/lib/supabase", () => ({ leadsClient: () => leadsClient() }))

const { POST } = await import("./route")

let ip = 0
function post(body: unknown) {
  ip += 1
  return POST(
    new NextRequest("http://localhost/api/design-partner", {
      method: "POST",
      headers: { "content-type": "application/json", "x-forwarded-for": `10.0.0.${ip}` },
      body: JSON.stringify(body),
    }),
  )
}

const valid = { email: " Ada@Example.com ", company: "Acme", role: "", useCases: ["analytics_agents"], notes: "", website: "" }

describe("POST /api/design-partner", () => {
  beforeEach(() => {
    vi.restoreAllMocks()
    insert.mockReset()
    insert.mockResolvedValue({ error: null })
    leadsClient.mockReturnValue({ client: { from: () => ({ insert }) } })
  })

  it("saves a valid lead with source design_partner", async () => {
    const res = await post(valid)
    expect(res.status).toBe(200)
    expect(insert).toHaveBeenCalledWith({
      source: "design_partner",
      email: "ada@example.com",
      company: "Acme",
      role: null,
      use_cases: ["analytics_agents"],
      notes: null,
    })
  })

  it("rejects missing required fields and unknown use cases", async () => {
    const res = await post({ ...valid, company: " ", useCases: ["mining"] })
    expect(res.status).toBe(400)
    expect((await res.json()).fields).toMatchObject({ company: expect.any(String), useCases: expect.any(String) })
    expect(insert).not.toHaveBeenCalled()
  })

  it("silently drops honeypot submissions", async () => {
    const res = await post({ ...valid, website: "https://spam.example" })
    expect(res.status).toBe(200)
    expect(insert).not.toHaveBeenCalled()
  })

  it("returns 500 when the insert fails", async () => {
    insert.mockResolvedValue({ error: { message: "boom" } })
    vi.spyOn(console, "error").mockImplementation(() => {})
    expect((await post(valid)).status).toBe(500)
  })

  it("logs why storage isn't configured and answers with JSON", async () => {
    leadsClient.mockReturnValue({ problem: "SUPABASE_URL is not a valid URL" })
    const log = vi.spyOn(console, "error").mockImplementation(() => {})
    const res = await post(valid)
    expect(res.status).toBe(500)
    expect(await res.json()).toEqual({ error: "Not configured" })
    expect(log).toHaveBeenCalledWith("[design-partner] Not configured: SUPABASE_URL is not a valid URL")
    expect(insert).not.toHaveBeenCalled()
  })

  it("answers with JSON when the insert throws", async () => {
    insert.mockRejectedValue(new Error("fetch failed"))
    const log = vi.spyOn(console, "error").mockImplementation(() => {})
    const res = await post(valid)
    expect(res.status).toBe(500)
    expect(await res.json()).toEqual({ error: "Failed to save" })
    expect(log).toHaveBeenCalledWith("[design-partner] Supabase insert error:", "fetch failed")
  })

  it("rate limits repeated submissions from one address", async () => {
    const send = () =>
      POST(new NextRequest("http://localhost/api/design-partner", { method: "POST", headers: { "x-forwarded-for": "10.9.9.9" }, body: JSON.stringify(valid) }))
    const statuses = []
    for (let i = 0; i < 6; i++) statuses.push((await send()).status)
    expect(statuses).toEqual([200, 200, 200, 200, 200, 429])
  })
})
