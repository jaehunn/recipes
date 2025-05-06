import { AnyRouter, createRootRoute, Link, Outlet, useRouter } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

export const Route = createRootRoute({
  component: RouteComponent,
})

function RouteComponent() {
  const router = useRouter()
  const allRoutes = getAllRoutes(router)

  return (
    <>
      <ul>
        {allRoutes.map((route) => (
          <li key={route.id}>
            <Link to={route.path}>{route.path}</Link>
          </li>
        ))}
      </ul>
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  )
}

type Route = {
  id: string
  path: string
}

function getAllRoutes(router: AnyRouter): Route[] {
  const routes: Route[] = []

  function traverse(route: AnyRouter['routeTree']) {
    routes.push({
      id: route.id,
      path: route.fullPath,
    })

    const children = route.children ?? []

    children.forEach(traverse)
  }

  traverse(router.routeTree)

  return routes
}
