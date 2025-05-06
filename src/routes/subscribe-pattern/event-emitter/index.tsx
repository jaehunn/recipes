import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/subscribe-pattern/event-emitter/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/subscribe-pattern/event-emitter/"!</div>
}
