import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/use-sync-external-store/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/use-sync-external-store/"!</div>
}
