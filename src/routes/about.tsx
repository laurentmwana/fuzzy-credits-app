import { createFileRoute, Link  } from '@tanstack/react-router'
import { ArrowLeft, Info, Layers, GitBranch, Sparkles } from 'lucide-react'
import { TeamCard  } from '@/features/team-card'
import type {TeamMember} from '@/features/team-card';
import { ModeToggle } from '#/components/themes/mode-toggle'
import { BaseLayout } from '#/layouts/base-layout'

const team: TeamMember[] = [
  {
    name: 'Professeur Kafunda',
    role: 'Superviseur · Cours de Logique Floue',
    category: 'Supervision',
    description:
      "Encadrant du projet, il a guidé la conception scientifique du système et veillé à la rigueur mathématique de la modélisation floue appliquée à l'évaluation de crédit.",
    phone: '+243 000 000 000',
    phoneHref: 'tel:+243000000000',
    linkedin: 'https://www.linkedin.com/',
    email: 'kafunda@example.com',
  },
  {
    name: 'Gradi',
    role: 'Assistant doctorant',
    category: 'Assistance',
    description:
      "Assistant du cours, il a accompagné l'équipe au quotidien sur l'implémentation des règles d'inférence et la validation des résultats du moteur flou.",
    phone: '+243 000 000 000',
    phoneHref: 'tel:+243000000000',
    linkedin: 'https://www.linkedin.com/',
    email: 'gradi@example.com',
  },
  {
    name: 'Mwanamputu Labeya Laurent',
    role: 'Président de groupe · Développeur',
    category: 'Équipe',
    description:
      "Responsable du projet, il a coordonné l'équipe et participé à la conception du moteur de fuzzification, d'inférence et de défuzzification.",
    phone: '+243 000 000 000',
    phoneHref: 'tel:+243000000000',
    linkedin: 'https://www.linkedin.com/',
    email: 'laurent@example.com',
  },
  {
    name: 'Kiambundama Lema Jorthan',
    role: 'Membre · Développeur',
    category: 'Équipe',
    description:
      "Contributeur clé du projet, il a travaillé sur les règles métier, l'interface du simulateur et les tests des différents scénarios de crédit.",
    phone: '+243 000 000 000',
    phoneHref: 'tel:+243000000000',
    linkedin: 'https://www.linkedin.com/',
    email: 'jorthan@example.com',
  },
]

export const Route = createFileRoute('/about')({
  component: About,
})

const algorithms = [
  {
    icon: Layers,
    title: 'Fuzzification',
    text: "Transformation des valeurs précises (revenu, taux d'endettement, etc.) en degrés d'appartenance à des ensembles flous.",
  },
  {
    icon: GitBranch,
    title: 'Inférence floue',
    text: 'Application de 12 règles métier « SI… ALORS… » pour évaluer le niveau de risque du dossier.',
  },
  {
    icon: Sparkles,
    title: 'Défuzzification',
    text: 'Conversion des résultats flous en décision finale claire : ACCORD, RÉVISION ou REFUS.',
  },
]

const concepts = [
  "Ensembles flous et fonctions d'appartenance",
  'Règles « SI… ALORS… » pour l\u2019inférence floue',
  'Algorithmes de défuzzification (centroïde, maximum)',
  'Architecture moderne avec Next.js et TypeScript',
]

function About() {
  return (
    <BaseLayout>
      <div className="container container-spacing">
        {/* En-tête */}
        <header className="mb-12 md:mb-16">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-3">
              <h1 className="text-balance text-3xl font-semibold tracking-tight md:text-4xl">
                À propos de FuzzyCredit
              </h1>
              <p className="max-w-2xl text-pretty text-sm leading-relaxed text-muted-foreground md:text-base">
                Un système d&apos;évaluation de crédit innovant basé sur la
                logique floue, développé dans le cadre du cours de Logique Floue
                (LF).
              </p>
            </div>
          </div>
        </header>

        {/* Présentation */}
        <section className="space-y-4 text-pretty text-sm leading-relaxed text-muted-foreground md:text-base">
          <p>
            FuzzyCredit démontre comment les concepts avancés de modélisation
            floue peuvent être appliqués à un cas concret du secteur bancaire et
            financier. Contrairement aux systèmes traditionnels qui utilisent
            des seuils binaires (accepté / refusé), FuzzyCredit évalue les
            demandes de crédit avec plus de nuance et de transparence.
          </p>
          <p>
            Chaque critère est analysé selon des degrés d&apos;appartenance,
            permettant une décision plus juste et adaptée à chaque profil. Le
            système repose sur trois algorithmes fondamentaux.
          </p>
        </section>

        {/* Algorithmes */}
        <section className="mt-8 grid gap-4 sm:grid-cols-3">
          {algorithms.map((algo) => {
            const Icon = algo.icon
            return (
              <div
                key={algo.title}
                className="rounded-2xl border border-border bg-card p-5"
              >
                <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <h3 className="mt-4 text-base font-semibold">{algo.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {algo.text}
                </p>
              </div>
            )
          })}
        </section>

        {/* Équipe */}
        <section className="mt-14 md:mt-20">
          <div className="mb-8 space-y-2 text-center">
            <h2 className="text-balance text-2xl font-semibold tracking-tight md:text-3xl">
              L&apos;équipe du projet
            </h2>
            <p className="mx-auto max-w-2xl text-pretty text-sm leading-relaxed text-muted-foreground">
              Réalisé sous supervision pédagogique par une équipe
              d&apos;étudiants passionnés par l&apos;intelligence artificielle
              floue.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {team.map((member) => (
              <TeamCard key={member.name} member={member} />
            ))}
          </div>
        </section>

        {/* Concepts clés */}
        <section className="mt-14 rounded-2xl border border-border bg-card p-6 md:mt-20 md:p-8">
          <h2 className="text-balance text-xl font-semibold md:text-2xl">
            Concepts clés mis en œuvre
          </h2>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {concepts.map((concept) => (
              <li
                key={concept}
                className="flex items-start gap-2.5 text-sm leading-relaxed text-muted-foreground"
              >
                <span
                  className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary"
                  aria-hidden="true"
                />
                {concept}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-pretty text-sm leading-relaxed text-muted-foreground">
            FuzzyCredit démontre qu&apos;il est possible de moderniser
            l&apos;évaluation de crédit en alliant rigueur mathématique,
            transparence algorithmique et expérience utilisateur optimale — une
            base solide pour l&apos;intégration de l&apos;intelligence
            artificielle floue dans les systèmes financiers du futur.
          </p>
        </section>
      </div>
    </BaseLayout>
  )
}
