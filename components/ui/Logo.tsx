import { cn } from "@/lib/utils"

/** The VaultKit mark (docs/redesign/logo/vaultkit-mark.svg). Colored by currentColor. */
export function Mark({ size = 20, className }: { size?: number; className?: string }) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
      <path d="M10 11 L32 53 L54 11" stroke="currentColor" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M22 11 L32 31 L42 11" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function Logo({ size = 20, className }: { size?: number; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <Mark size={size} />
      <span className="font-semibold">VaultKit</span>
    </span>
  )
}
