import { Audience } from "@/components/landing/Audience"
import { Footer } from "@/components/landing/Footer"
import { GrantComparison } from "@/components/landing/GrantComparison"
import { Hero } from "@/components/landing/Hero"
import { HowItWorks } from "@/components/landing/HowItWorks"
import { IamGap } from "@/components/landing/IamGap"
import { Nav } from "@/components/landing/Nav"
import { Outcomes } from "@/components/landing/Outcomes"
import { PartnerCta } from "@/components/landing/PartnerCta"
import { PartnerDialogProvider } from "@/components/landing/PartnerButton"

// Fully static: prerendered to HTML at build time. Only the CTAs and the dialog hydrate.
export const dynamic = "force-static"

export default function LandingPage() {
  return (
    <PartnerDialogProvider>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-control focus:bg-paper focus:px-4 focus:py-2 focus:text-ink">
        Skip to content
      </a>
      <div id="top" data-tone="dark" className="bg-night text-paper">
        <Nav />
      </div>
      <main id="main">
        <div data-tone="dark" className="bg-night text-paper">
          <Hero />
        </div>
        <GrantComparison />
        <HowItWorks />
        <Outcomes />
        <IamGap />
        <Audience />
        <PartnerCta />
      </main>
      <Footer />
    </PartnerDialogProvider>
  )
}
