import { cn } from "@/lib/utils"

type CodeBlockProps = {
  code: string
  /** Describes the snippet for screen readers. */
  label: string
  className?: string
}

/**
 * Dark, square code block. Lines keep their layout and scroll sideways inside
 * the block on narrow screens; it is focusable so the keyboard can scroll it.
 * Lines starting with "#" render as comments.
 */
export function CodeBlock({ code, label, className }: CodeBlockProps) {
  return (
    <pre
      role="region"
      aria-label={label}
      tabIndex={0}
      className={cn("m-0 overflow-x-auto bg-code px-3.5 py-3 font-mono text-snippet text-code-text", className)}
    >
      <code>
        {code.split("\n").map((line, i) => (
          <span key={i} className={cn("block", line.startsWith("#") && "text-code-comment")}>
            {line || " "}
          </span>
        ))}
      </code>
    </pre>
  )
}
