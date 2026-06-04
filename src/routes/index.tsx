import { createFileRoute } from '@tanstack/react-router'
import { BaseLayout } from '#/layouts/base-layout'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return (
    <BaseLayout>
      <div className="container container-spacing">Welcome</div>
    </BaseLayout>
  )
}
