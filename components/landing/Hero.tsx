import { hero } from "@/content/landing"
import { siteConfig } from "@/lib/config"
import { Badge } from "@/components/ui/Badge"
import { Button } from "@/components/ui/Button"
import { Container } from "@/components/ui/Container"
import { AgentFlowExample } from "./AgentFlowExample"
import { PartnerButton } from "./PartnerButton"

function PlayIcon() {
  return (
    <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M8 5.5v13l11-6.5z" />
    </svg>
  )
}

export function Hero() {
  return (
    <Container as="section" aria-labelledby="hero-heading" className="flex flex-wrap items-center gap-14 pt-12 pb-20 md:pt-18 md:pb-24">
      <div className="flex min-w-0 flex-[1_1_480px] flex-col gap-6">
        <Badge tone="glow">{hero.badge}</Badge>
        <h1 id="hero-heading" className="m-0 text-display-sm font-bold tracking-[-0.03em] text-balance md:text-display">
          {hero.heading}
        </h1>
        <p className="m-0 max-w-[560px] text-lead text-night-muted">{hero.body}</p>
        <div className="flex flex-wrap gap-3 pt-2">
          <PartnerButton size="lg" />
          {siteConfig.demoVideoUrl && (
            <Button href={siteConfig.demoVideoUrl} variant="outline" size="lg" icon={<PlayIcon />} className="font-medium">
              {hero.demoLabel}
            </Button>
          )}
        </div>
        <p className="m-0 text-caption text-night-subtle">{hero.footnote}</p>
      </div>
      <AgentFlowExample />
    </Container>
  )
}
