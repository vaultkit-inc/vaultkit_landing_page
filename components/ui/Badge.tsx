import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

const tones = {
  allow: "bg-allow-tint text-allow",
  mask: "bg-accent-tint text-accent-strong",
  warn: "bg-warn-tint text-warn",
  deny: "bg-deny-tint text-deny",
  glow: "rounded-full bg-accent-glow/12 px-3 py-1 font-medium text-accent-soft",
}

export type BadgeTone = keyof typeof tones

export function Badge({ tone, className, children }: { tone: BadgeTone; className?: string; children: ReactNode }) {
  return (
    <span className={cn("inline-flex self-start rounded-md px-2.5 py-0.5 text-caption font-semibold", tones[tone], className)}>
      {children}
    </span>
  )
}
