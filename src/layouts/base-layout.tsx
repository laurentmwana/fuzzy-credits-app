import { Navbar } from '#/components/navbar'
import type React from 'react'

export const BaseLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>{children}</main>
      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-8 text-center sm:flex-row sm:text-left">
          <p className="text-sm font-medium">FuzzyCredit</p>
          <p className="text-xs text-muted-foreground">
            Évaluation de crédit par logique floue · Démonstrateur académique
          </p>
        </div>
      </footer>
    </div>
  )
}
