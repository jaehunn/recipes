import { useState } from 'react'
import CheckboxList, { CheckboxItem } from './CheckboxList'

interface NestedCheckboxesProps {
  defaultCheckboxData: CheckboxItem[]
}

export function NestedCheckboxes({ defaultCheckboxData }: NestedCheckboxesProps) {
  const [checkboxData, setCheckboxData] = useState(defaultCheckboxData)

  return (
    <CheckboxList
      items={checkboxData}
      onCheck={(checked, indices) => {
        // 새로운 데이터를 생성합니다.
        const newCheckboxData = JSON.parse(JSON.stringify(checkboxData))

        // 선택된 체크박스들의 경로를 받으면
        const nonFirstLevelIndices = indices.slice(1)

        // 선택된 체크박스를 찾습니다.
        // children[index] 에 재귀적으로 접근합니다.
        const modifiedCheckboxItem = nonFirstLevelIndices.reduce(
          (modifiedItem, index) => modifiedItem.children[index],
          newCheckboxData[indices[0]]
        )

        // 1. 선택된 체크박스부터 자손 체크박스 요소들의 상태를 반영합니다.
        updateCheckboxAndDescendants(modifiedCheckboxItem, checked)

        // 2. 선택된 체크박스의 부모 체크박스 요소들의 상태를 반영합니다.
        resolveCheckboxStates(newCheckboxData[indices[0]], nonFirstLevelIndices)

        setCheckboxData(newCheckboxData)
      }}
    />
  )
}

// 선택된 체크박스 아이템을 받으면, 상태를 업데이트합니다.
// 자식이 있으면 타고 내려가면서 동일한 체크 상태를 반영합니다.
// DFS 인데. 상태 처리를 먼저합니다. (pre-order)
function updateCheckboxAndDescendants(checkboxItem: CheckboxItem, checked: boolean) {
  checkboxItem.checked = checked
  if (!checkboxItem.children) {
    return
  }

  checkboxItem.children.forEach((childItem) => updateCheckboxAndDescendants(childItem, checked))
}

// 자식 상태를 기준으로 부모 상태를 계산시켜야합니다.
// bottom - up 방식을 사용해야합니다. leaf 체크박스까지 접근한 다음
// 자식들의 상태를 계산하고 반영합니다.
function resolveCheckboxStates(checkboxItem: CheckboxItem, indices: ReadonlyArray<number>) {
  if (indices.length > 0 && checkboxItem.children) {
    resolveCheckboxStates(checkboxItem.children[indices[0]], indices.slice(1))
  }

  if (!checkboxItem.children) {
    return
  }

  if (checkboxItem.children.every((child) => child.checked === true)) {
    checkboxItem.checked = true
  } else if (checkboxItem.children.every((child) => child.checked === false)) {
    checkboxItem.checked = false
  } else {
    checkboxItem.checked = 'indeterminate'
  }
}
