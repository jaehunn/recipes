# Observer Pattern

- CounterService는 카운트 상태를 관리하는 모듈입니다.
- subscribe() 함수를 통해 외부에서 상태 변경을 구독할 수 있습니다.
- subscribe()는 전달받은 콜백(listener)을 내부에 저장하고,
  publish()가 호출되면 저장된 모든 listener를 실행합니다.
- unsubscribe() 함수는 등록된 listener를 제거하여 구독을 해제합니다.

---

- App 컴포넌트에서는 CounterService의 상태를 사용하기 위해 subscribe()로 내부 count 상태를 구독합니다.
- CounterService의 publish()가 호출될 때마다 count 값을 setCount()로 동기화하여 React 컴포넌트를 업데이트합니다.
