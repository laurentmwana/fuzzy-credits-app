import { createFileRoute } from '@tanstack/react-router'
import { BaseLayout } from '#/layouts/base-layout'
import { SectionTitle } from '#/components/section-title'
import { Clock, ShieldCheck, Zap } from 'lucide-react'
import { HowItWorksTimeline } from '#/features/how-it-words-timeline'

export const Route = createFileRoute('/how-it-works')({
  component: HowitWorkds,
})

function HowitWorkds() {
  return (
    <BaseLayout>
      <div className="container container-spacing">
        <SectionTitle title="Comment ça marche ?" />

        <HowItWorksTimeline />

        <section>
          <div className="flex flex-col items-center gap-3 text-center">
            <span className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Clock className="size-6" aria-hidden="true" />
            </span>
            <h2 className="text-balance text-xl font-semibold md:text-2xl">
              Temps total : moins de 30 secondes
            </h2>
            <p className="max-w-xl text-pretty text-sm leading-relaxed text-muted-foreground">
              Du formulaire à la décision, FuzzyCredit traite chaque demande en
              temps réel avec une transparence totale et une justification
              claire pour chaque résultat.
            </p>
          </div>

          {/* Points clés */}
          <div className="mt-8 grid gap-4 border-t border-border pt-8 sm:grid-cols-3">
            <div className="flex flex-col items-center gap-2 text-center">
              <Zap className="size-5 text-primary" aria-hidden="true" />
              <p className="text-sm font-medium">Réponse instantanée</p>
              <p className="text-xs leading-relaxed text-muted-foreground">
                Un verdict en quelques secondes, sans attente.
              </p>
            </div>
            <div className="flex flex-col items-center gap-2 text-center">
              <ShieldCheck className="size-5 text-primary" aria-hidden="true" />
              <p className="text-sm font-medium">Décision traçable</p>
              <p className="text-xs leading-relaxed text-muted-foreground">
                Chaque résultat est documenté et conforme.
              </p>
            </div>
            <div className="flex flex-col items-center gap-2 text-center">
              <BrainBadge />
              <p className="text-sm font-medium">12 règles métier</p>
              <p className="text-xs leading-relaxed text-muted-foreground">
                Le raisonnement d&apos;un expert, automatisé.
              </p>
            </div>
          </div>
        </section>
      </div>
    </BaseLayout>
  )
}

function BrainBadge() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-5 text-primary"
      aria-hidden="true"
    >
      <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" />
      <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" />
    </svg>
  )
}
