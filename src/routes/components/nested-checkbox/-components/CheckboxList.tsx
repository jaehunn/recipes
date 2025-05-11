import { CheckboxInput, CheckboxValue } from './CheckboxInput'

type CheckboxListProps = Readonly<{
  items: CheckboxItem[]
  onCheck: (value: boolean, indices: ReadonlyArray<number>) => void
}>

export interface CheckboxItem {
  id: number
  name: string
  checked: CheckboxValue
  children?: CheckboxItem[]
}

/**
 * CheckboxList 는 계층적으로 체크박스를 렌더링합니다.
 * children 데이터가 있다면 CheckboxList 를 재귀적으로 렌더링합니다.
 *
 * 체크박스 경로를 onCheck 콜백에 전달합니다.
 *
 * CheckboxList
 *  CheckboxInput - (1)
 *  CheckboxList
 *    CheckboxInput - (2)
 */

export default function CheckboxList({ items, onCheck }: CheckboxListProps) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={item.id}>
          <div>
            <CheckboxInput
              checked={item.checked}
              label={item.name}
              onChange={(event) => {
                // (1) CheckboxList 부모 onCheck 으로 전달한다. [1]
                onCheck(event.target.checked, [index])
              }}
            />
          </div>
          {item.children && item.children.length > 0 && (
            <CheckboxList
              items={item.children}
              onCheck={(newValue, indices) => {
                // 부모 CheckboxList 가 있으면 경로를 담아가면서 전달되고,
                // 없으면 사용처로 전달된다.
                onCheck(newValue, [index, ...indices])
              }}
            />
          )}
        </li>
      ))}
    </ul>
  )
}
