import { partnerCta } from "@/content/landing"
import { siteConfig } from "@/lib/config"
import { Button } from "@/components/ui/Button"
import { Section } from "@/components/ui/Section"
import { PartnerButton } from "./PartnerButton"

export function PartnerCta() {
  return (
    <Section
      intro={{ id: "partners", heading: partnerCta.heading, body: partnerCta.body }}
      tone="dark"
      layout="split"
      aside={
        <div className="flex flex-wrap gap-3">
          <PartnerButton variant="inverse" size="lg" />
          {siteConfig.docsUrl && (
            <Button href={siteConfig.docsUrl} variant="outline" size="lg" className="font-medium">
              {partnerCta.docsLabel}
            </Button>
          )}
        </div>
      }
    />
  )
}
