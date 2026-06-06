import { ArrowRight } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { Link } from '@tanstack/react-router'

export function LandingCta() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-16 md:pb-24">
      <div className="relative overflow-hidden rounded-3xl border border-border bg-card px-6 py-14 text-center md:py-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,var(--color-primary)/8%,transparent_60%)]"
        />
        <div className="relative mx-auto max-w-xl">
          <h2 className="text-balance text-2xl font-semibold tracking-tight md:text-4xl">
            Prêt à évaluer un dossier ?
          </h2>
          <p className="mt-4 text-pretty text-sm leading-relaxed text-muted-foreground md:text-base">
            Lancez une simulation en quelques secondes et obtenez une décision
            argumentée, directement exploitable.
          </p>
          <div className="mt-8 flex justify-center">
            <Link
              to="/credits"
              className={buttonVariants({ size: 'lg', className: 'gap-1.5' })}
            >
              Commencer une simulation
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
          <p className="mt-5 text-xs text-muted-foreground">
            Gratuit · Instantané · Sans engagement
          </p>
        </div>
      </div>
    </section>
  )
}
