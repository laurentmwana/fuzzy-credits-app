import { Link } from '@tanstack/react-router'
import { Phone, Mail } from 'lucide-react'

export type TeamMember = {
  name: string
  role: string
  category: 'Supervision' | 'Assistance' | 'Équipe'
  description: string
  phone: string
  phoneHref: string
  linkedin: string
  email?: string
}

export function TeamCard({ member }: { member: TeamMember }) {
  const initials = member.name
    .split(' ')
    .slice(0, 2)
    .map((part) => part.charAt(0))
    .join('')
    .toUpperCase()

  const categoryStyles: Record<TeamMember['category'], string> = {
    Supervision: 'bg-primary/10 text-primary',
    Assistance: 'bg-accent text-accent-foreground',
    Équipe: 'bg-secondary text-secondary-foreground',
  }

  return (
    <article className="flex flex-col rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/40">
      <div className="flex items-start gap-4">
        <span
          className="flex size-14 shrink-0 items-center justify-center rounded-full bg-primary/10 text-lg font-semibold text-primary"
          aria-hidden="true"
        >
          {initials}
        </span>
        <div className="min-w-0 space-y-1.5">
          <span
            className={`inline-block rounded-full px-2.5 py-0.5 text-[11px] font-medium ${categoryStyles[member.category]}`}
          >
            {member.category}
          </span>
          <h3 className="text-balance text-base font-semibold leading-tight">
            {member.name}
          </h3>
          <p className="text-sm text-muted-foreground">{member.role}</p>
        </div>
      </div>

      <p className="mt-4 text-pretty text-sm leading-relaxed text-muted-foreground">
        {member.description}
      </p>

      <div className="mt-5 flex flex-col gap-2 border-t border-border pt-4">
        <a
          href={member.phoneHref}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <Phone className="size-4 text-primary" aria-hidden="true" />
          {member.phone}
        </a>
        {member.email ? (
          <a
            href={`mailto:${member.email}`}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <Mail className="size-4 text-primary" aria-hidden="true" />
            {member.email}
          </a>
        ) : null}
        <Link
          to={member.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <LinkedinIcon />
          Profil LinkedIn
        </Link>
      </div>
    </article>
  )
}

function LinkedinIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="size-4 text-primary"
      aria-hidden="true"
    >
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
    </svg>
  )
}
