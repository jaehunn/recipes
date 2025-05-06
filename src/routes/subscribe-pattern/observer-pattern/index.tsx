import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'
import { CounterService } from './-services/counter-service'

export const Route = createFileRoute('/subscribe-pattern/observer-pattern/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <h1>Observer Pattern</h1>

      <App />
    </div>
  )
}

function App() {
  const counterService = useRef(new CounterService())
  const [count, setCount] = useState(0)

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
      <div>
        {/**
         * onClick={counterService.current.increment} 로 작성하면 increment this.count 의 this 가 깨진다.
         * counterService 컨텍스트에서 실행되도록 () => counterService.current.increment() 형태로 호출하여야한다.
         */}

        <button type="button" onClick={() => counterService.current.increment()}>
          Increment
        </button>
        <button type="button" onClick={() => counterService.current.decrement()}>
          Decrement
        </button>
      </div>

      <div>Count: {count}</div>
    </div>
  )
}
