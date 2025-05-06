import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { useEffect } from 'react'
import { useRef } from 'react'
import { CounterService } from './-services/CounterService'

export const Route = createFileRoute('/subscribe-pattern/rx-js/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <h1>RxJS</h1>

      <App />
    </div>
  )
}

export function App() {
  const counterService = useRef(new CounterService())
  const [count, setCount] = useState(counterService.current.getCount())

  useEffect(() => {
    const unsubscribe = counterService.current.subscribe(() => {
      setCount(counterService.current.getCount())
    })

    return () => {
      unsubscribe()
    }
  }, [])

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => counterService.current.increment()}>Increment</button>
      <button onClick={() => counterService.current.decrement()}>Decrement</button>
    </div>
  )
}
