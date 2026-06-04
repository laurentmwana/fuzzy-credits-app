import { createFileRoute } from '@tanstack/react-router'
import { Navbar } from '#/components/navbar'

export const Route = createFileRoute('/about')({
  component: Home,
})

function Home() {
  return (
    <div>
      <Navbar />
    </div>
  )
}
