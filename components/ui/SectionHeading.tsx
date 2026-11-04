import type { ReactNode } from "react"
import { cn } from "@/lib/utils"
import { Marker } from "./Marker"

type SectionHeadingProps = {
  id: string
  marker: string
  children: ReactNode
  size?: "md" | "lg"
  className?: string
}

/** Marker plus serif h2. The h2 gets `${id}-heading` for aria-labelledby. */
export function SectionHeading({ id, marker, children, size = "md", className }: SectionHeadingProps) {
  return (
    <div className={cn("flex flex-col gap-2.5", className)}>
      <Marker>{marker}</Marker>
      <h2
        id={`${id}-heading`}
        className={cn(
          "m-0 font-serif font-medium text-balance",
          size === "lg" ? "text-heading sm:text-callout" : "text-heading-sm sm:text-heading",
        )}
      >
        {children}
      </h2>
    </div>
  )
}
