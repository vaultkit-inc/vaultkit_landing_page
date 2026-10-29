import type { ElementType, HTMLAttributes, ReactNode } from "react"
import { cn } from "@/lib/utils"

type ContainerProps = HTMLAttributes<HTMLElement> & { as?: ElementType; children: ReactNode }

export function Container({ as: Tag = "div", className, children, ...rest }: ContainerProps) {
  return (
    <Tag className={cn("mx-auto w-full max-w-page px-gutter", className)} {...rest}>
      {children}
    </Tag>
  )
}
