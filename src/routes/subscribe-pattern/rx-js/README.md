# RxJS 기반 구독 패턴

- `CounterService`는 `BehaviorSubject`를 사용해 내부 상태 `count$`를 Observable로 관리합니다.
- `subscribe()` 함수를 통해 외부에서 `count$`의 변경 사항을 실시간으로 구독할 수 있습니다.
- `increment()` 또는 `decrement()`가 호출되면 `next()`를 통해 새로운 값을 발행하고,
  구독 중인 모든 listener에 상태 변경이 전파됩니다.
