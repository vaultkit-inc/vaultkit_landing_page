import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"

vi.mock("server-only", () => ({}))

const KEY = "sb_secret_test_value"

async function load() {
  vi.resetModules()
  return (await import("./supabase")).leadsClient
}

describe("leadsClient", () => {
  beforeEach(() => {
    vi.stubEnv("SUPABASE_URL", "https://abcd1234.supabase.co")
    vi.stubEnv("SUPABASE_SERVICE_ROLE_KEY", KEY)
  })
  afterEach(() => vi.unstubAllEnvs())

  it("creates a client from a valid URL and key", async () => {
    const result = (await load())()
    expect(result.problem).toBeUndefined()
    expect(result.client).toBeDefined()
  })

  it("trims stray whitespace around pasted values", async () => {
    vi.stubEnv("SUPABASE_URL", " https://abcd1234.supabase.co\n")
    vi.stubEnv("SUPABASE_SERVICE_ROLE_KEY", `${KEY}\n`)
    expect((await load())().client).toBeDefined()
  })

  it("names the variables that aren't set", async () => {
    vi.stubEnv("SUPABASE_URL", "")
    expect((await load())().problem).toBe("SUPABASE_URL is not set")
    vi.stubEnv("SUPABASE_SERVICE_ROLE_KEY", "")
    expect((await load())().problem).toBe("SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are not set")
  })

  it.each([
    ["without https://", "abcd1234.supabase.co"],
    ["wrapped in quotes", '"https://abcd1234.supabase.co"'],
    ["with another scheme", "postgres://abcd1234.supabase.co"],
  ])("explains a URL %s instead of throwing", async (_, url) => {
    vi.stubEnv("SUPABASE_URL", url)
    const result = (await load())()
    expect(result.client).toBeUndefined()
    expect(result.problem).toMatch(/^SUPABASE_URL is not a valid URL/)
  })

  it("never puts the key in a problem message", async () => {
    vi.stubEnv("SUPABASE_URL", "not a url")
    expect((await load())().problem).not.toContain(KEY)
  })
})
