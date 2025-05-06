import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/subscribe-pattern/rx-js/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/subscribe-pattern/rx-js/"!</div>
}
