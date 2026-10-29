import type { ElementType, ReactNode } from "react"
import { cn } from "@/lib/utils"

const variants = {
  plain: "border border-line",
  raised: "border border-line bg-paper",
  muted: "border border-line bg-paper-muted",
  highlight: "border-2 border-accent bg-paper shadow-accent",
}

const paddings = { sm: "px-5 py-[18px]", md: "p-[22px]", lg: "p-6", xl: "p-7" }
const radii = { tile: "rounded-tile", panel: "rounded-panel", card: "rounded-card" }

type CardProps = {
  as?: ElementType
  variant?: keyof typeof variants
  padding?: keyof typeof paddings
  radius?: keyof typeof radii
  className?: string
  children: ReactNode
}

export function Card({ as: Tag = "div", variant = "plain", padding = "lg", radius = "card", className, children }: CardProps) {
  return <Tag className={cn("flex min-w-0 flex-col", variants[variant], paddings[padding], radii[radius], className)}>{children}</Tag>
}
