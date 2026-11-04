import type { ReactNode } from "react"

/**
 * The page frame: content at max-width with 1px vertical rules on both sides,
 * running the full height of the page.
 */
export function Frame({ children }: { children: ReactNode }) {
  return <div className="mx-auto min-h-dvh w-full max-w-frame border-x border-rule">{children}</div>
}

/** Horizontal padding every band inside the frame shares. */
export const gutter = "px-gutter-sm sm:px-gutter"
