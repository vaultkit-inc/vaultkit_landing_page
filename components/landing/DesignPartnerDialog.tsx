"use client"

import * as Dialog from "@radix-ui/react-dialog"
import { useState, type RefObject } from "react"
import { designPartnerForm as copy } from "@/content/designPartnerForm"
import { DesignPartnerForm } from "./DesignPartnerForm"
import { DesignPartnerSuccess } from "./DesignPartnerSuccess"

type DesignPartnerDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  /** The CTA that opened the dialog; focus goes back to it on close. */
  returnFocusTo: RefObject<HTMLElement | null>
}

/** Radix handles the focus trap, Esc and outside clicks. */
export function DesignPartnerDialog({ open, onOpenChange, returnFocusTo }: DesignPartnerDialogProps) {
  const [sent, setSent] = useState(false)
  // Bumped after a successful send so the next open starts from an empty form.
  // Closing without sending keeps what was typed.
  const [formKey, setFormKey] = useState(0)

  function handleOpenChange(next: boolean) {
    if (!next && sent) {
      setSent(false)
      setFormKey((k) => k + 1)
    }
    onOpenChange(next)
  }

  return (
    <Dialog.Root open={open} onOpenChange={handleOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-scrim" />
        <Dialog.Content
          aria-describedby={undefined}
          onCloseAutoFocus={(event) => {
            event.preventDefault()
            returnFocusTo.current?.focus()
          }}
          className="fixed top-1/2 left-1/2 z-50 max-h-[calc(100dvh-32px)] w-[calc(100%-32px)] max-w-[560px] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-card bg-paper text-small text-ink shadow-dialog"
        >
          <Dialog.Close
            aria-label={copy.close}
            className="absolute top-4 right-4 flex size-9 cursor-pointer items-center justify-center rounded-control text-ink-muted hover:bg-paper-muted"
          >
            <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M6 6l12 12" />
              <path d="M18 6L6 18" />
            </svg>
          </Dialog.Close>
          {sent ? <DesignPartnerSuccess /> : <DesignPartnerForm key={formKey} onSent={() => setSent(true)} />}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
