type Listener = () => void

export class CounterService {
  private count: number
  private listeners: Listener[] = []

  constructor(initialValue = 0) {
    this.count = initialValue
    this.listeners = []
  }

  getCount() {
    return this.count
  }

  subscribe(listener: Listener) {
    this.listeners.push(listener)

    const unsubscribe = () => {
      this.listeners = this.listeners.filter((l) => l !== listener)
    }

    return unsubscribe
  }

  publish() {
    this.listeners.forEach((listener) => listener())
  }

  increment() {
    this.count += 1

    this.publish()
  }

  decrement() {
    this.count -= 1

    this.publish()
  }
}
