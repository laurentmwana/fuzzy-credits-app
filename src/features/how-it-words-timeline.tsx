import type { LucideIcon } from 'lucide-react'
import {
  ClipboardList,
  Waves,
  BrainCircuit,
  BarChart3,
  CheckCircle2,
} from 'lucide-react'

type Step = {
  number: number
  title: string
  badge: string
  description: string
  detail: string
  icon: LucideIcon
}

const steps: Step[] = [
  {
    number: 1,
    title: 'Saisie des données',
    badge: 'Entrée',
    icon: ClipboardList,
    description:
      "L'agent de crédit saisit les 5 informations principales du client : revenu mensuel, taux d'endettement, ancienneté professionnelle, score historique et montant demandé.",
    detail:
      'Une interface guidée valide chaque champ en temps réel pour éviter toute erreur de saisie avant le traitement.',
  },
  {
    number: 2,
    title: 'Fuzzification',
    badge: 'Transformation',
    icon: Waves,
    description:
      'Les valeurs précises sont transformées en degrés d\'appartenance à des ensembles flous. Par exemple, un endettement de 42% sera considéré comme "modéré" à 53% et "faible" à 0%.',
    detail:
      "Chaque variable est projetée sur des fonctions d'appartenance (faible, modéré, élevé) pour refléter la réalité nuancée d'un dossier.",
  },
  {
    number: 3,
    title: 'Inférence floue',
    badge: 'Raisonnement',
    icon: BrainCircuit,
    description:
      'Le système applique 12 règles métier "SI... ALORS...". Chaque règle s\'active avec un certain degré pour déterminer si le profil tend vers ACCORD, RÉVISION ou REFUS.',
    detail:
      "Le moteur combine les règles activées et pondère leur influence, reproduisant le raisonnement d'un analyste expérimenté.",
  },
  {
    number: 4,
    title: 'Défuzzification',
    badge: 'Synthèse',
    icon: BarChart3,
    description:
      'Les résultats flous sont convertis en décision finale avec un score sur 100. Le système affiche ACCORD (vert), RÉVISION (orange) ou REFUS (rouge) avec une justification détaillée.',
    detail:
      'La méthode du centre de gravité agrège les sorties pour produire un score unique, lisible et défendable auprès du client.',
  },
  {
    number: 5,
    title: 'Décision finale',
    badge: 'Résultat',
    icon: CheckCircle2,
    description:
      "L'agent obtient une réponse instantanée : ACCORD pour les bons profils, REFUS pour les profils risqués, ou RÉVISION pour les cas ambigus nécessitant une analyse humaine approfondie.",
    detail:
      "Chaque décision est tracée et documentée, garantissant transparence et conformité réglementaire pour l'établissement.",
  },
]

export function HowItWorksTimeline() {
  return (
    <ol className="relative mx-auto max-w-5xl">
      {/* Ligne verticale continue */}
      <div
        aria-hidden="true"
        className="absolute left-5 top-2 bottom-2 w-px bg-gradient-to-b from-border via-border to-transparent md:left-6"
      />

      {steps.map((step) => {
        const Icon = step.icon
        return (
          <li
            key={step.number}
            className="relative pb-10 pl-16 last:pb-0 md:pl-20"
          >
            {/* Pastille avec icône */}
            <span className="absolute left-0 top-0 flex size-10 items-center justify-center rounded-full border border-border bg-card text-primary shadow-sm md:size-12">
              <Icon className="size-5 md:size-6" aria-hidden="true" />
            </span>

            <article className="rounded-xl border border-border bg-card p-5 shadow-sm transition-colors hover:border-primary/40 md:p-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                  Étape {step.number}
                </span>
                <span className="inline-flex items-center rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                  {step.badge}
                </span>
              </div>

              <h3 className="mt-3 text-lg font-semibold text-card-foreground md:text-xl">
                {step.title}
              </h3>

              <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>

              <p className="mt-3 border-l-2 border-primary/30 pl-3 text-pretty text-sm leading-relaxed text-muted-foreground/80">
                {step.detail}
              </p>
            </article>
          </li>
        )
      })}
    </ol>
  )
}
