import { describe, expect, it } from "vitest"
import { cn } from "./utils"

describe("cn", () => {
  it("treats the custom type scale as font sizes, not colours", () => {
    expect(cn("text-snippet text-code-text")).toBe("text-snippet text-code-text")
    expect(cn("text-label text-accent")).toBe("text-label text-accent")
  })

  it("still lets a later size win", () => {
    expect(cn("text-small", "text-body")).toBe("text-body")
  })
})
