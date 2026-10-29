"use client"

import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from "react"
import { partnerCtaLabel } from "@/content/landing"
import { Button, type ButtonProps } from "@/components/ui/Button"
import { DesignPartnerDialog } from "./DesignPartnerDialog"

type PartnerDialogApi = { open: (opener: HTMLElement) => void }

const PartnerDialogContext = createContext<PartnerDialogApi | null>(null)

/** Owns the single design partner dialog and remembers which CTA opened it. */
export function PartnerDialogProvider({ children }: { children: ReactNode }) {
  const [isOpen, setOpen] = useState(false)
  const openerRef = useRef<HTMLElement | null>(null)
  const open = useCallback((opener: HTMLElement) => {
    openerRef.current = opener
    setOpen(true)
  }, [])

  return (
    <PartnerDialogContext.Provider value={{ open }}>
      {children}
      <DesignPartnerDialog open={isOpen} onOpenChange={setOpen} returnFocusTo={openerRef} />
    </PartnerDialogContext.Provider>
  )
}

type PartnerButtonProps = Pick<ButtonProps, "variant" | "size" | "className">

/** Any "Become a design partner" CTA. Server-rendered as a plain button, opens the dialog once hydrated. */
export function PartnerButton(props: PartnerButtonProps) {
  const api = useContext(PartnerDialogContext)
  return (
    <Button {...props} aria-haspopup="dialog" onClick={(e) => api?.open(e.currentTarget)}>
      {partnerCtaLabel}
    </Button>
  )
}
