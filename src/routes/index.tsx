import { createFileRoute } from '@tanstack/react-router'

import { ModeToggle } from '#/components/themes/mode-toggle'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return (
    <div className="p-8">
      <ModeToggle />
    </div>
  )
}
