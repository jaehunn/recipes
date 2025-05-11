# Requirements

- 부모 체크박스 상태는 직계 자식 체크박스들의 상태에 따라 결정됩니다.
  - 모든 직계 자식 체크박스들이 선택되어 있으면, 부모 체크박스 상태는 선택(checked) 상태가 됩니다.
  - 부분 선택되어 있으면, 부분 선택(indeterminate) 상태가 됩니다.
  - 선택되어 있지 않으면, 선택 해제(unchecked) 상태가 됩니다.
- 부모 체크박스 상태를 선택 또는 선택 해제하면, 자손 체크박스들의 상태가 동일하게 적용됩니다.

# Data Format

```tsx
interface CheckboxItem {
  id: number
  name: string
  checked: boolean | 'indeterminate'
  children?: CheckboxItem[]
}
```
