import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/concepts/debounce/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <h1>Debounce</h1>
      <App />
    </>
  )
}

function App() {
  return <div>Debounce</div>
}
