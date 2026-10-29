import { NextRequest } from "next/server"
import { beforeEach, describe, expect, it, vi } from "vitest"

const insert = vi.fn()
vi.mock("server-only", () => ({}))
vi.mock("@/lib/supabase", () => ({ leadsClient: () => ({ from: () => ({ insert }) }) }))

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
    insert.mockReset()
    insert.mockResolvedValue({ error: null })
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

  it("rate limits repeated submissions from one address", async () => {
    const send = () =>
      POST(new NextRequest("http://localhost/api/design-partner", { method: "POST", headers: { "x-forwarded-for": "10.9.9.9" }, body: JSON.stringify(valid) }))
    const statuses = []
    for (let i = 0; i < 6; i++) statuses.push((await send()).status)
    expect(statuses).toEqual([200, 200, 200, 200, 200, 429])
  })
})
