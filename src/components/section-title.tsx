import type React from 'react'

type SectionTitleProps = {
  title: string
  children?: React.ReactNode
  className?: string
}

export const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  className = 'mb-8',
  children,
}) => {
  return (
    <div className={className}>
      <h1 className="mt-4 text-4xl font-bold tracking-tight">{title}</h1>

      {children && (
        <p className="mt-3 max-w-3xl text-muted-foreground">{children}</p>
      )}
    </div>
  )
}
