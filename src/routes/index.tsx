import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <ul>
        <li>
          <Link to="/quick-start">Quick Start</Link>
        </li>
      </ul>
    </div>
  )
}
