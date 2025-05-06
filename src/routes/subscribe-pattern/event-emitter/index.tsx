import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'
import { CounterService } from './-services/counter-service'

export const Route = createFileRoute('/subscribe-pattern/event-emitter/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <h1>Event Emitter</h1>

      <App />
    </div>
  )
}

function App() {
  const counterService = useRef(new CounterService())
  const [count, setCount] = useState(counterService.current.getCount())

  useEffect(() => {
    const unsubscribe = counterService.current.subscribe((value) => {
      setCount(value)
    })

    return () => {
      unsubscribe()
    }
  }, [])

  return (
    <div>
      <button onClick={() => counterService.current.increment()}>Increment</button>
      <button onClick={() => counterService.current.decrement()}>Decrement</button>

      <p>Count: {count}</p>
    </div>
  )
}
