import type { Titled } from "@/content/landing"
import { Card } from "@/components/ui/Card"

type TitledCardProps = { item: Titled; variant?: "plain" | "raised"; padding?: "sm" | "md"; radius?: "tile" | "panel" }

/** A bold title over a short muted line. Used by the IAM questions and audience cards. */
export function TitledCard({ item, variant = "plain", padding = "md", radius = "panel" }: TitledCardProps) {
  return (
    <Card as="li" variant={variant} padding={padding} radius={radius} className="gap-1.5">
      <h3 className="m-0 text-body font-semibold">{item.title}</h3>
      <p className="m-0 text-small text-ink-muted">{item.body}</p>
    </Card>
  )
}
