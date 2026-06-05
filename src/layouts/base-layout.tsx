import { Navbar } from '#/components/navbar'
import type React from 'react'

export const BaseLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div>
      <Navbar />
      <main>{children}</main>
    </div>
  )
}
