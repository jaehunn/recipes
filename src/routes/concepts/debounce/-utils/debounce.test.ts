import { debounce } from './debounce'

describe('debounce', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.clearAllTimers()
  })

  it('지정된 대기 시간 이후에 콜백 함수는 한 번만 실행되어야한다.', () => {
    let i = 0
    const callback = vi.fn(() => {
      i += 1
    })

    const debounced = debounce(callback, 100)

    debounced()
    debounced()
    debounced()

    // 아직 대기 시간 100ms가 지나지 않았으므로 콜백은 실행되지 않아야 함
    vi.advanceTimersByTime(50)
    expect(i).toBe(0)
    expect(callback).not.toHaveBeenCalled()

    // 이제 총 100ms 경과 → 마지막 호출 기준으로 실행되어야 함
    vi.advanceTimersByTime(50)
    expect(i).toBe(1)
    expect(callback).toHaveBeenCalledTimes(1)
  })

  it('flush 를 호출하면, 콜백 함수는 즉시 실행되어야한다.', () => {
    let i = 0
    const callback = vi.fn(() => {
      i += 1
    })

    const debounced = debounce(callback, 100)

    debounced()

    expect(i).toBe(0)

    debounced.flush()

    expect(i).toBe(1)
    expect(callback).toHaveBeenCalledTimes(1)
  })

  it('cancel 을 호출하면, 콜백 함수는 취소된다.', () => {
    let i = 0
    const callback = vi.fn(() => {
      i += 1
    })

    const debounced = debounce(callback, 100)

    debounced()

    expect(i).toBe(0)

    debounced.cancel()

    expect(i).toBe(0)
    expect(callback).toHaveBeenCalledTimes(0)
  })
})
