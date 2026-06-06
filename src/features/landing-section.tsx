import {
  Zap,
  Target,
  FileText,
  Wallet,
  Percent,
  Building2,
  TrendingUp,
  Banknote,
  CheckCircle2,
  AlertTriangle,
  XCircle
  
} from 'lucide-react'
import type {LucideIcon} from 'lucide-react';

/* ---------- Caractéristiques ---------- */

const features: { icon: LucideIcon; title: string; text: string }[] = [
  {
    icon: Zap,
    title: 'Rapide',
    text: 'Une décision rendue en moins de 30 secondes, sans file d\u2019attente ni traitement différé.',
  },
  {
    icon: Target,
    title: 'Précis',
    text: 'La logique floue capture les nuances d\u2019un dossier là où une règle binaire échoue.',
  },
  {
    icon: FileText,
    title: 'Transparent',
    text: 'Chaque décision s\u2019accompagne d\u2019une justification détaillée, traçable et défendable.',
  },
]

export function FeatureGrid() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
      <div className="mx-auto mb-12 max-w-2xl text-center">
        <h2 className="text-balance text-2xl font-semibold tracking-tight md:text-3xl">
          Une décision de crédit, repensée
        </h2>
        <p className="mt-3 text-pretty text-sm leading-relaxed text-muted-foreground md:text-base">
          Trois principes guident chaque évaluation réalisée par le moteur
          FuzzyCredit.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {features.map((f) => {
          const Icon = f.icon
          return (
            <article
              key={f.title}
              className="rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/40"
            >
              <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <h3 className="mt-4 text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">
                {f.text}
              </p>
            </article>
          )
        })}
      </div>
    </section>
  )
}

/* ---------- 5 critères ---------- */

const criteria: { icon: LucideIcon; label: string; unit: string }[] = [
  { icon: Wallet, label: 'Revenu', unit: 'Mensuel' },
  { icon: Percent, label: "Taux d'endettement", unit: '% des revenus' },
  { icon: Building2, label: 'Ancienneté', unit: 'Années' },
  { icon: TrendingUp, label: 'Score historique', unit: 'sur 100' },
  { icon: Banknote, label: 'Montant demandé', unit: 'En euros' },
]

export function CriteriaSection() {
  return (
    <section className="border-y border-border bg-muted/30">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="text-balance text-2xl font-semibold tracking-tight md:text-3xl">
            5 critères d&apos;évaluation
          </h2>
          <p className="mt-3 text-pretty text-sm leading-relaxed text-muted-foreground md:text-base">
            Le moteur analyse chaque dossier à partir de cinq variables clés,
            pondérées et fuzzifiées pour refléter la réalité du profil.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {criteria.map((c) => {
            const Icon = c.icon
            return (
              <div
                key={c.label}
                className="flex flex-col items-center gap-2 rounded-xl border border-border bg-card p-5 text-center"
              >
                <Icon className="size-5 text-primary" aria-hidden="true" />
                <div className="text-sm font-medium">{c.label}</div>
                <div className="text-xs text-muted-foreground">{c.unit}</div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ---------- 3 décisions ---------- */

const decisions = [
  {
    icon: CheckCircle2,
    label: 'ACCORD',
    text: 'Profil favorable : le crédit est accordé immédiatement.',
    classes:
      'border-emerald-500/30 bg-emerald-500/5 text-emerald-700 dark:text-emerald-400',
    iconClasses: 'text-emerald-600 dark:text-emerald-400',
  },
  {
    icon: AlertTriangle,
    label: 'RÉVISION',
    text: 'Cas ambigu : transmis à un analyste pour examen manuel.',
    classes:
      'border-amber-500/30 bg-amber-500/5 text-amber-700 dark:text-amber-400',
    iconClasses: 'text-amber-600 dark:text-amber-400',
  },
  {
    icon: XCircle,
    label: 'REFUS',
    text: 'Profil trop risqué : la demande ne peut être satisfaite.',
    classes: 'border-red-500/30 bg-red-500/5 text-red-700 dark:text-red-400',
    iconClasses: 'text-red-600 dark:text-red-400',
  },
]

export function DecisionSection() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
      <div className="mx-auto mb-12 max-w-2xl text-center">
        <h2 className="text-balance text-2xl font-semibold tracking-tight md:text-3xl">
          3 décisions possibles
        </h2>
        <p className="mt-3 text-pretty text-sm leading-relaxed text-muted-foreground md:text-base">
          À l&apos;issue de l&apos;inférence, FuzzyCredit rend l&apos;un de ces
          trois verdicts, accompagné de son score sur 100.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {decisions.map((d) => {
          const Icon = d.icon
          return (
            <article
              key={d.label}
              className={`rounded-2xl border p-6 text-center ${d.classes}`}
            >
              <Icon
                className={`mx-auto size-7 ${d.iconClasses}`}
                aria-hidden="true"
              />
              <div className="mt-3 text-base font-bold tracking-wide">
                {d.label}
              </div>
              <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">
                {d.text}
              </p>
            </article>
          )
        })}
      </div>
    </section>
  )
}
