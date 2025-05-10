import { createFileRoute } from '@tanstack/react-router'
import { SignupForm } from './-components/SignupForm'

export const Route = createFileRoute('/components/signup-form/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <h1>Signup Form</h1>
      <SignupForm />
    </>
  )
}
