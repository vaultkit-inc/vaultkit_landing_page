import { headline, hero } from "@/content/landing"
import { siteConfig } from "@/lib/config"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/Button"
import { gutter } from "@/components/ui/Frame"
import { Marker } from "@/components/ui/Marker"
import { PartnerButton } from "./PartnerButton"
import { SpecTable } from "./SpecTable"

export function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="grid border-b border-rule lg:grid-cols-[minmax(0,1fr)_minmax(340px,40%)]">
      <div className={cn("flex min-w-0 flex-col gap-[26px] border-b border-rule pt-12 pb-12 sm:pt-hero sm:pb-16 lg:border-r lg:border-b-0", gutter)}>
        <Marker>{hero.marker}</Marker>
        <h1 id="hero-heading" className="m-0 font-serif text-display-sm font-medium sm:text-display-md xl:text-display">
          {headline.lead}
          <br />
          <em className="font-normal">{headline.emphasis}</em>
        </h1>
        <p className="m-0 max-w-[560px] text-lead text-ink-soft">{hero.body}</p>
        <div className="flex flex-wrap gap-3">
          <PartnerButton variant="ink" />
          <Button href={siteConfig.docsUrl} variant="outline">
            {hero.specLabel}
          </Button>
        </div>
      </div>
      <SpecTable rows={hero.spec} label={hero.specTableLabel} className={cn("py-12 sm:pt-hero sm:pb-16", gutter)} />
    </section>
  )
}
