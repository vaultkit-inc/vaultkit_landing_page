import { cn } from "@/lib/utils"

type CodeBlockProps = {
  code: string
  /** "terminal" is a dark, horizontally scrolling block; "inline" sits on a light card. */
  variant?: "terminal" | "inline"
  label?: string
  className?: string
}

/** Lines starting with "#" render as comments. */
export function CodeBlock({ code, variant = "terminal", label, className }: CodeBlockProps) {
  const lines = code.split("\n")
  const isTerminal = variant === "terminal"
  return (
    <pre
      aria-label={label}
      tabIndex={isTerminal ? 0 : undefined}
      className={cn(
        "m-0 font-mono",
        isTerminal
          ? "overflow-x-auto rounded-button bg-code p-3.5 text-[12.5px] leading-5 text-code-text"
          : "text-sm leading-6 whitespace-pre-wrap text-inherit",
        className,
      )}
    >
      <code>
        {lines.map((line, i) => (
          <span key={i} className={cn("block", line.startsWith("#") && "text-code-comment")}>
            {line || " "}
          </span>
        ))}
      </code>
    </pre>
  )
}
