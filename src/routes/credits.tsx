import { useState } from 'react'
import { CreditsForm } from '#/features/credits/credits-form'
import { BaseLayout } from '#/layouts/base-layout'
import { createFileRoute } from '@tanstack/react-router'
import type { DecisionOutput } from '#/fuzzy-credits'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '#/components/ui/card'
import { ChartArea } from 'lucide-react'

export const Route = createFileRoute('/credits')({
  component: RouteComponent,
})

function RouteComponent() {
  const [result, setResult] = useState<DecisionOutput | null>(null)

  const decisionStyles = {
    APPROVE: {
      border: 'border border-green-500 dark:border-green-200',
      badge:
        'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400',
      label: 'Approuvé',
      risk: 'Faible risque',
    },
    REVIEW: {
      border: 'border border-amber-600',
      badge:
        'bg-amber-100 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400',
      label: 'Analyse complémentaire requise',
      risk: 'Risque modéré',
    },
    REJECT: {
      border: 'border border-rose-600',
      badge: 'bg-rose-100 text-rose-700 dark:bg-rose-950/30 dark:text-rose-400',
      label: 'Refusé',
      risk: 'Risque élevé',
    },
  }

  return (
    <BaseLayout>
      <div className="container container-spacing">
        {/* Header */}
        <div className="mb-10">
          <div className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium tracking-wider uppercase text-muted-foreground">
            Système d'analyse de crédit
          </div>

          <h1 className="mt-4 text-4xl font-bold tracking-tight">
            Analyse de Solvabilité
          </h1>

          <p className="mt-3 max-w-3xl text-muted-foreground">
            Évaluation automatisée des demandes de crédit à l'aide d'un moteur
            de décision basé sur la logique floue. Le système fournit une
            estimation du risque, un score de solvabilité et une recommandation
            de décision.
          </p>
        </div>

        {/* Dashboard */}
        <div className="grid gap-8 xl:grid-cols-[1.2fr_0.8fr]">
          {/* Formulaire */}
          <Card>
            <CardHeader>
              <CardTitle>Informations du demandeur</CardTitle>
              <CardDescription>
                Renseignez les informations financières et personnelles afin de
                lancer l'évaluation du dossier.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CreditsForm onResult={setResult} />
            </CardContent>
          </Card>

          {/* Résultat */}

          <div className="space-y-6">
            <Card
              className={`${
                result ? decisionStyles[result.decision].border : ''
              }`}
            >
              <CardHeader>
                <CardTitle>Rapport d'évaluation</CardTitle>
                <CardDescription>
                  Résultat de l'analyse du dossier
                </CardDescription>
              </CardHeader>
              <CardContent>
                {result ? (
                  <div className="p-2">
                    {/* Décision */}
                    <div className="mb-8 flex items-start justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Décision recommandée
                        </p>

                        <h3 className="mt-1 text-2xl font-bold">
                          {decisionStyles[result.decision].label}
                        </h3>

                        <span
                          className={`mt-3 inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                            decisionStyles[result.decision].badge
                          }`}
                        >
                          {decisionStyles[result.decision].risk}
                        </span>
                      </div>

                      <div className="text-right">
                        <div className="text-5xl font-bold tracking-tight">
                          {result.score}
                        </div>

                        <div className="text-sm text-muted-foreground">
                          Score / 100
                        </div>
                      </div>
                    </div>

                    {/* KPI */}
                    <div className="mb-8 grid grid-cols-2 gap-4">
                      <div className="rounded-xl border p-4">
                        <p className="text-xs uppercase tracking-wide text-muted-foreground">
                          Confiance
                        </p>

                        <p className="mt-2 text-2xl font-semibold">
                          {Math.round(result.confidence * 100)}%
                        </p>
                      </div>

                      <div className="rounded-xl border p-4">
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

                      <p className="text-sm leading-relaxed">
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
                              className="rounded-full border px-3 py-1 text-xs"
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
                      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border bg-muted/40">
                        <ChartArea size={15} />
                      </div>

                      <h3 className="font-semibold">
                        Aucun rapport disponible
                      </h3>

                      <p className="mt-2 text-sm text-muted-foreground">
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
                <CardTitle>Méthodologie d'évaluation</CardTitle>
                <CardDescription>
                  L'analyse prend en compte plusieurs indicateurs financiers
                  tels que les revenus, la stabilité professionnelle, la charge
                  d'endettement et la capacité de remboursement afin de produire
                  une recommandation cohérente avec le profil du demandeur.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </div>
    </BaseLayout>
  )
}
