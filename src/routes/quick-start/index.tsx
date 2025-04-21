import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/quick-start/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div></div>
}
