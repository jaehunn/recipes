import { BehaviorSubject } from 'rxjs'

type Listener = () => void

export class CounterService {
  private count$: BehaviorSubject<number>

  constructor(initialValue = 0) {
    this.count$ = new BehaviorSubject(initialValue)
  }

  getCount() {
    return this.count$.getValue()
  }

  increment() {
    this.count$.next(this.getCount() + 1)
  }

  decrement() {
    this.count$.next(this.getCount() - 1)
  }

  subscribe(listener: Listener) {
    const subscription = this.count$.subscribe(listener)

    const unsubscribe = () => {
      subscription.unsubscribe()
    }

    return unsubscribe
  }
}
