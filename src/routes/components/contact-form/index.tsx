import { createFileRoute } from '@tanstack/react-router'
import { ContactForm } from './-components/ContactForm'

export const Route = createFileRoute('/components/contact-form/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <h1>Contact Form</h1>
      <ContactForm />
    </>
  )
}
