import { createFileRoute } from '@tanstack/react-router'
import { BaseLayout } from '#/layouts/base-layout'

export const Route = createFileRoute('/how-it-works')({
  component: Home,
})

function Home() {
  return (
    <BaseLayout>
      <div className="container container-spacing">How It Works</div>
    </BaseLayout>
  )
}
