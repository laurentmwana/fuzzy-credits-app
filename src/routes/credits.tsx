import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { ChartArea, ShieldCheck } from 'lucide-react'
import { CreditsForm } from '@/features/credits-form'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import type { DecisionOutput, Decision } from '@/fuzzy-credits'
import { BaseLayout } from '#/layouts/base-layout'

export const Route = createFileRoute('/credits')({
  component: Credits,
})

const decisionStyles: Record<
  Decision,
  { border: string; badge: string; label: string; risk: string }
> = {
  APPROVE: {
    border: 'border-emerald-500/50 dark:border-emerald-400/40',
    badge:
      'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400',
    label: 'Approuvé',
    risk: 'Faible risque',
  },
  REVIEW: {
    border: 'border-amber-500/50 dark:border-amber-400/40',
    badge:
      'bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400',
    label: 'Analyse complémentaire requise',
    risk: 'Risque modéré',
  },
  REJECT: {
    border: 'border-rose-500/50 dark:border-rose-400/40',
    badge: 'bg-rose-100 text-rose-700 dark:bg-rose-950/40 dark:text-rose-400',
    label: 'Refusé',
    risk: 'Risque élevé',
  },
}

export function Credits() {
  const [result, setResult] = useState<DecisionOutput | null>(null)

  return (
    <BaseLayout>
      <div className="container container-spacing">
        <div>
          <div className="mb-10">
            <div className="inline-flex items-center rounded-full border border-border px-3 py-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Système d&apos;analyse de crédit
            </div>
            <h1 className="mt-4 text-balance text-3xl font-bold tracking-tight md:text-4xl">
              Analyse de solvabilité
            </h1>
            <p className="mt-3 max-w-2xl text-pretty text-sm leading-relaxed text-muted-foreground md:text-base">
              Évaluation automatisée des demandes de crédit à l&apos;aide
              d&apos;un moteur de décision basé sur la logique floue. Le système
              fournit une estimation du risque, un score de solvabilité et une
              recommandation de décision.
            </p>
          </div>

          {/* Dashboard */}
          <div className="grid gap-8 xl:grid-cols-[1.2fr_0.8fr]">
            {/* Formulaire */}
            <Card>
              <CardHeader>
                <CardTitle>Informations du demandeur</CardTitle>
                <CardDescription>
                  Renseignez les informations financières et personnelles afin
                  de lancer l&apos;évaluation du dossier.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CreditsForm onResult={setResult} />
              </CardContent>
            </Card>

            {/* Résultat */}
            <div className="space-y-6">
              <Card
                className={result ? decisionStyles[result.decision].border : ''}
              >
                <CardHeader>
                  <CardTitle>Rapport d&apos;évaluation</CardTitle>
                  <CardDescription>
                    Résultat de l&apos;analyse du dossier
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {result ? (
                    <div>
                      {/* Décision */}
                      <div className="mb-8 flex items-start justify-between gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Décision recommandée
                          </p>
                          <h3 className="mt-1 text-pretty text-2xl font-bold">
                            {decisionStyles[result.decision].label}
                          </h3>
                          <span
                            className={`mt-3 inline-flex rounded-full px-3 py-1 text-xs font-medium ${decisionStyles[result.decision].badge}`}
                          >
                            {decisionStyles[result.decision].risk}
                          </span>
                        </div>
                        <div className="text-right">
                          <div className="text-5xl font-bold tracking-tight tabular-nums">
                            {result.score}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Score / 100
                          </div>
                        </div>
                      </div>

                      {/* KPI */}
                      <div className="mb-8 grid grid-cols-2 gap-4">
                        <div className="rounded-xl border border-border p-4">
                          <p className="text-xs uppercase tracking-wide text-muted-foreground">
                            Confiance
                          </p>
                          <p className="mt-2 text-2xl font-semibold tabular-nums">
                            {Math.round(result.confidence * 100)}%
                          </p>
                        </div>
                        <div className="rounded-xl border border-border p-4">
                          <p className="text-xs uppercase tracking-wide text-muted-foreground">
                            Niveau de risque
                          </p>
                          <p className="mt-2 text-lg font-semibold">
                            {decisionStyles[result.decision].risk}
                          </p>
                        </div>
                      </div>

                      {/* Justification */}
                      <div className="rounded-xl bg-muted/40 p-4">
                        <p className="mb-2 text-xs uppercase tracking-wide text-muted-foreground">
                          Justification de la décision
                        </p>
                        <p className="text-pretty text-sm leading-relaxed">
                          {result.justification}
                        </p>
                      </div>

                      {/* Règles */}
                      {result.activeRules.length > 0 && (
                        <div className="mt-6">
                          <p className="mb-3 text-xs uppercase tracking-wide text-muted-foreground">
                            Critères pris en compte
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {result.activeRules.map((rule) => (
                              <span
                                key={rule}
                                className="rounded-full border border-border px-3 py-1 text-xs"
                              >
                                {rule}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="flex min-h-[420px] items-center justify-center p-8">
                      <div className="text-center">
                        <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full border border-border bg-muted/40 text-muted-foreground">
                          <ChartArea className="size-6" aria-hidden="true" />
                        </div>
                        <h3 className="font-semibold">
                          Aucun rapport disponible
                        </h3>
                        <p className="mx-auto mt-2 max-w-xs text-sm text-muted-foreground">
                          Complétez le formulaire afin de générer une analyse de
                          solvabilité et obtenir une recommandation de crédit.
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Carte informative */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ShieldCheck
                      className="size-5 text-primary"
                      aria-hidden="true"
                    />
                    Méthodologie d&apos;évaluation
                  </CardTitle>
                  <CardDescription>
                    L&apos;analyse prend en compte plusieurs indicateurs
                    financiers tels que les revenus, la stabilité
                    professionnelle, la charge d&apos;endettement et la capacité
                    de remboursement afin de produire une recommandation
                    cohérente avec le profil du demandeur.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </BaseLayout>
  )
}
