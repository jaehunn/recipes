import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/projects/testimonial-card/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <h1>Testimonial Card</h1>
      <App />
    </>
  )
}

function App() {
  return <div>TestimonialCard</div>
}
