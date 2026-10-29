import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react"
import { cn } from "@/lib/utils"
import { Spinner } from "./Spinner"

const variants = {
  primary: "bg-accent text-paper hover:bg-accent-strong",
  inverse: "bg-paper text-night hover:bg-accent-tint",
  // Light by default; adapts inside any data-tone="dark" surface.
  outline:
    "border border-line-strong bg-paper text-ink hover:bg-paper-muted in-data-[tone=dark]:border-night-border in-data-[tone=dark]:bg-transparent in-data-[tone=dark]:text-paper in-data-[tone=dark]:hover:bg-night-line",
}

const sizes = {
  sm: "h-[38px] px-4 text-sm rounded-control",
  md: "h-11 px-5 rounded-button",
  lg: "h-12 px-[22px] rounded-button",
}

type Common = {
  variant?: keyof typeof variants
  size?: keyof typeof sizes
  icon?: ReactNode
  className?: string
  children: ReactNode
}

type AsButton = Common & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined; loading?: boolean }
type AsLink = Common & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }

export type ButtonProps = AsButton | AsLink

export function buttonClasses(variant: keyof typeof variants = "primary", size: keyof typeof sizes = "md") {
  return cn(
    "inline-flex shrink-0 cursor-pointer items-center justify-center gap-2.5 font-semibold whitespace-nowrap transition-colors",
    "disabled:cursor-not-allowed disabled:opacity-70",
    variants[variant],
    sizes[size],
  )
}

/** Renders a <button>, or an <a> when given an href. */
export function Button(props: ButtonProps) {
  if (props.href !== undefined) {
    const { variant, size, icon, className, children, ...rest } = props
    return (
      <a className={cn(buttonClasses(variant, size), className)} {...rest}>
        {icon}
        {children}
      </a>
    )
  }
  const { variant, size, icon, className, children, loading, disabled, type = "button", ...rest } = props
  return (
    <button
      type={type}
      className={cn(buttonClasses(variant, size), className)}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...rest}
    >
      {loading ? <Spinner /> : icon}
      {children}
    </button>
  )
}
