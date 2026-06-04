import { createFileRoute } from '@tanstack/react-router'
import { BaseLayout } from '#/layouts/base-layout'

export const Route = createFileRoute('/about')({
  component: Home,
})

function Home() {
  return (
    <BaseLayout>
      <div className="container container-spacing">About</div>
    </BaseLayout>
  )
}
