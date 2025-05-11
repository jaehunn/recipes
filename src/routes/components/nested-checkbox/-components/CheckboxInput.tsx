import { InputHTMLAttributes, useEffect, useId, useRef } from 'react'

interface CheckboxInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'checked'> {
  checked: CheckboxValue
  label: string
}

export type CheckboxValue = boolean | 'indeterminate'

/**
 * CheckboxInput 은 체크박스 상태를 반영합니다.
 *
 * HTML checked 속성은 true | false 두가지 값으로 표현되므로 <input> 요소를 사용처에서 그대로 쓸 수 없습니다.
 * indeterminate 속성을 추가적으로 사용해야합니다. (@see https://developer.mozilla.org/ko/docs/Web/HTML/Reference/Elements/input/checkbox#%EC%A4%91%EA%B0%84_%EC%83%81%ED%83%9C_%EC%B2%B4%ED%81%AC%EB%B0%95%EC%8A%A4)
 *
 * CheckboxInput 은 checked 상태를 추상화하여 indeterminate 속성을 업데이트하는 동작을 캡슐화합니다.
 */

export function CheckboxInput({ checked, label, ...props }: CheckboxInputProps) {
  const id = useId()
  const ref = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    if (!ref.current) {
      return
    }

    ref.current.indeterminate = checked === 'indeterminate'
  }, [checked])

  return (
    <div className="checkbox">
      <input
        id={id}
        ref={ref}
        type="checkbox"
        checked={checked === true || checked === false ? checked : false}
        {...props}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  )
}
