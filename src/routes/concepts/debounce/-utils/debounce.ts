type CallbackFn = (...args: unknown[]) => void

export function debounce(callback: CallbackFn, wait = 0) {
  let timer: NodeJS.Timeout | null = null
  let lastArgs: unknown[] = []
  let lastThis: unknown

  // arrow func 를 리턴하면 상위 스코프의 this 로 고정되므로
  // callback.apply() 시점에 동적으로 this 가 결정되도록 해야한다.
  function debounced(this: unknown, ...args: unknown[]) {
    // 상위 스코프의 this 를 바라보도록 setTImeout callback 을 arrow function 으로.
    // const context = this

    lastArgs = args

    // eslint-disable-next-line @typescript-eslint/no-this-alias
    lastThis = this

    if (timer != null) {
      clearTimeout(timer)
    }

    timer = setTimeout(() => {
      timer = null // 참조를 지우는 게 낫다.

      callback.apply(lastThis, lastArgs)
    }, wait)
  }

  debounced.cancel = () => {
    if (timer != null) {
      clearTimeout(timer)
      timer = null
    }
  }

  debounced.flush = () => {
    if (timer != null) {
      clearTimeout(timer)
      timer = null

      callback.apply(lastThis, lastArgs)
    }
  }

  return debounced
}

// 콜백 함수에서 this 를 활용하지 않으면 apply() 를 쓸 필요가 없다. 확장성 측면에서 this 를 적용.
