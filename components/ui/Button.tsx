import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react"
import { cn } from "@/lib/utils"
import { Spinner } from "./Spinner"

const variants = {
  /** The main action on paper: ink block. */
  ink: "bg-ink text-paper hover:bg-ink-soft",
  /** Reserved for actions that should stand out: burnt orange. */
  accent: "bg-accent text-on-accent hover:bg-accent-strong",
  /** Secondary, mono, outlined. */
  outline: "border border-rule-strong font-mono text-small text-ink hover:bg-paper-raised",
}

const sizes = {
  sm: "min-h-9 px-3.5 py-1.5 text-small",
  md: "min-h-12 px-[18px] py-2.5",
  lg: "min-h-[52px] px-[22px] py-3",
}

type Common = {
  variant?: keyof typeof variants
  size?: keyof typeof sizes
  className?: string
  children: ReactNode
}

type AsButton = Common & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined; loading?: boolean }
type AsLink = Common & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }

export type ButtonProps = AsButton | AsLink

export function buttonClasses(variant: keyof typeof variants = "ink", size: keyof typeof sizes = "md") {
  return cn(
    "inline-flex shrink-0 cursor-pointer items-center justify-center gap-2.5 font-medium no-underline transition-colors",
    "disabled:cursor-not-allowed disabled:opacity-70",
    sizes[size],
    variants[variant],
  )
}

/** Renders a <button>, or an <a> when given an href. Square, no shadow. */
export function Button(props: ButtonProps) {
  if (props.href !== undefined) {
    const { variant, size, className, children, ...rest } = props
    return (
      <a className={cn(buttonClasses(variant, size), className)} {...rest}>
        {children}
      </a>
    )
  }
  const { variant, size, className, children, loading, disabled, type = "button", ...rest } = props
  return (
    <button
      type={type}
      className={cn(buttonClasses(variant, size), className)}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...rest}
    >
      {loading && <Spinner />}
      {children}
    </button>
  )
}
