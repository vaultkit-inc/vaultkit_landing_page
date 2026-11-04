import { cn } from "@/lib/utils"

/** The mono "§n · TITLE" label above each section heading. */
export function Marker({ children, className }: { children: string; className?: string }) {
  return <p className={cn("m-0 font-mono text-label text-accent uppercase", className)}>{children}</p>
}
