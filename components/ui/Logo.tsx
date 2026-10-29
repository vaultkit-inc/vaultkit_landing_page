import { cn } from "@/lib/utils"

type LogoProps = {
  /** Mark size in px. With `tile`, this is the tile size. */
  size?: number
  /** Draws the mark in white on an accent tile, as in the nav. */
  tile?: boolean
  wordmark?: boolean
  className?: string
}

/** The refined VaultKit mark (docs/redesign/logo/vaultkit-mark.svg). Colored by currentColor. */
export function Mark({ size = 24, className }: { size?: number; className?: string }) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
      <path d="M10 11 L32 53 L54 11" stroke="currentColor" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M22 11 L32 31 L42 11" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function Logo({ size = 30, tile = false, wordmark = false, className }: LogoProps) {
  const mark = tile ? (
    <span
      className="flex items-center justify-center rounded-control bg-accent text-paper"
      style={{ width: size, height: size }}
    >
      <Mark size={Math.round(size * 0.6)} />
    </span>
  ) : (
    <Mark size={size} />
  )
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      {mark}
      {wordmark ? <span className="text-[17px] font-semibold">VaultKit</span> : <span className="sr-only">VaultKit</span>}
    </span>
  )
}
