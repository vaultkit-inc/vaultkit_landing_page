import * as Dialog from "@radix-ui/react-dialog"
import { designPartnerForm as copy } from "@/content/designPartnerForm"
import { siteConfig } from "@/lib/config"
import { Button } from "@/components/ui/Button"

export function DesignPartnerSuccess() {
  const { bookingUrl } = siteConfig
  return (
    <div role="status" className="flex flex-col items-start gap-4 p-6 pr-14 sm:p-8 sm:pr-16">
      <span aria-hidden="true" className="flex size-12 items-center justify-center border border-allow text-allow">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12.5l4.5 4.5L19 7.5" />
        </svg>
      </span>
      <Dialog.Title className="m-0 font-serif text-title font-medium">{copy.success.title}</Dialog.Title>
      <p className="m-0 max-w-[400px] text-ink-soft">
        {copy.success.body}
        {bookingUrl && ` ${copy.success.bookingBody}`}
      </p>
      <div className="flex flex-wrap gap-2.5 pt-1">
        {bookingUrl && (
          <Button href={bookingUrl} variant="accent" target="_blank" rel="noopener noreferrer">
            {copy.success.bookingLabel}
          </Button>
        )}
        <Dialog.Close asChild>
          <Button variant="outline">
            {copy.close}
          </Button>
        </Dialog.Close>
      </div>
    </div>
  )
}
