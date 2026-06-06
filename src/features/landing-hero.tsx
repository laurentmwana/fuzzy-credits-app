import { ArrowRight, Sparkles } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { Link } from '@tanstack/react-router'

export function LandingHero() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      {/* Grille décorative subtile */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:48px_48px] opacity-40 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]"
      />

      <div className="relative mx-auto flex max-w-3xl flex-col items-center px-6 py-20 text-center md:py-28">
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
          <Sparkles className="size-3.5 text-primary" aria-hidden="true" />
          Logique floue appliquée au crédit
        </span>

        <h1 className="mt-6 text-balance text-4xl font-bold tracking-tight md:text-6xl">
          L&apos;évaluation de crédit, intelligente et transparente
        </h1>

        <p className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
          FuzzyCredit transforme des critères financiers complexes en une
          décision claire et justifiée, grâce à un moteur de logique floue qui
          raisonne comme un analyste expert — en moins de 30 secondes.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            to="/credits"
            className={buttonVariants({ size: 'xl', className: 'gap-1.5' })}
          >
            Simuler un crédit
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
          <Link
            to="/how-it-works"
            className={buttonVariants({ variant: 'outline', size: 'xl' })}
          >
            Comment ça marche ?
          </Link>
        </div>

        <p className="mt-5 text-xs text-muted-foreground">
          Gratuit · Instantané · Sans engagement
        </p>
      </div>
    </section>
  )
}
