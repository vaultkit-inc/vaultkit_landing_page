import { clsx, type ClassValue } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

// The custom type scale from app/tokens.css. Without this, tailwind-merge reads
// e.g. `text-label` as a colour and drops it when a `text-accent` follows.
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: ["display", "display-md", "display-sm", "callout", "heading", "heading-sm", "title", "lead", "body", "small", "spec", "snippet", "label", "meta"],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
