import EventEmitter from 'eventemitter3'

type Listener = (value: number) => void

export class CounterService extends EventEmitter {
  private count: number

  constructor(initialValue = 0) {
    super()

    this.count = initialValue
  }

  getCount() {
    return this.count
  }

  increment() {
    this.count += 1

    this.emit('change', this.count)
  }

  decrement() {
    this.count -= 1

    this.emit('change', this.count)
  }

  subscribe(listener: Listener) {
    this.on('change', listener)

    const unsubscribe = () => this.off('change', listener)

    return unsubscribe
  }
}
