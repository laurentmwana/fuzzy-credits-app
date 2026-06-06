import { createFileRoute } from '@tanstack/react-router'
import { BaseLayout } from '#/layouts/base-layout'
import { LandingHero } from '#/features/landing-hero'
import {
  CriteriaSection,
  DecisionSection,
  FeatureGrid,
} from '#/features/landing-section'
import { LandingCta } from '#/features/landing-cta'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return (
    <BaseLayout>
      <LandingHero />
      <FeatureGrid />
      <CriteriaSection />
      <DecisionSection />
      <LandingCta />
    </BaseLayout>
  )
}
