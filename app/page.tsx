import { DecisionTable } from "@/components/landing/DecisionTable"
import { Footer } from "@/components/landing/Footer"
import { Header } from "@/components/landing/Header"
import { Hero } from "@/components/landing/Hero"
import { HowItFits } from "@/components/landing/HowItFits"
import { PartnerDialogProvider } from "@/components/landing/PartnerButton"
import { PartnerSection } from "@/components/landing/PartnerSection"
import { RoleVsGrant } from "@/components/landing/RoleVsGrant"
import { Frame } from "@/components/ui/Frame"

// Fully static: prerendered to HTML at build time. Only the CTAs and the dialog hydrate.
export const dynamic = "force-static"

export default function LandingPage() {
  return (
    <PartnerDialogProvider>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:bg-ink focus:px-4 focus:py-2 focus:text-paper">
        Skip to content
      </a>
      <Frame>
        <div id="top">
          <Header />
        </div>
        <main id="main">
          <Hero />
          <DecisionTable />
          <RoleVsGrant />
          <HowItFits />
          <PartnerSection />
        </main>
        <Footer />
      </Frame>
    </PartnerDialogProvider>
  )
}
