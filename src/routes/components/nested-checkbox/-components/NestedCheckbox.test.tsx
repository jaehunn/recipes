import { CheckboxItem } from './CheckboxList'
import { NestedCheckboxes } from './NestedCheckboxes'
import { screen, render } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'

const sampleData: CheckboxItem[] = [
  {
    id: 1,
    name: 'Electronics',
    checked: false,
    children: [
      {
        id: 2,
        name: 'Mobile phones',
        checked: false,
        children: [
          { id: 4, name: 'iPhone', checked: false },
          { id: 5, name: 'Galaxy', checked: false },
        ],
      },
      {
        id: 3,
        name: 'Laptops',
        checked: false,
        children: [
          { id: 6, name: 'MacBook', checked: false },
          { id: 7, name: 'Dell', checked: true },
        ],
      },
    ],
  },
]
describe('NestedCheckbox', () => {
  test('현재 체크 상태가 반영되어야합니다.', () => {
    render(<NestedCheckboxes defaultCheckboxData={sampleData} />)
    expect(screen.getByLabelText('Electronics')).not.toBeChecked()

    expect(screen.getByLabelText('Dell')).toBeChecked()
  })

  test('체크박스 상태가 자손 체크박스들에 동일하게 적용됩니다.', async () => {
    render(<NestedCheckboxes defaultCheckboxData={sampleData} />)

    await userEvent.click(await screen.findByLabelText('Laptops'))
    expect(await screen.findByLabelText('Laptops')).toBeChecked()

    expect(await screen.findByLabelText('MacBook')).toBeChecked()
    expect(await screen.findByLabelText('Dell')).toBeChecked()
  })

  test('체크박스 상태에 따라 부모 체크박스 상태가 반영됩니다.', async () => {
    render(<NestedCheckboxes defaultCheckboxData={sampleData} />)

    await userEvent.click(await screen.findByLabelText('iPhone'))
    expect(await screen.findByLabelText('iPhone')).toBeChecked()

    expect(((await screen.findByLabelText('Mobile phones')) as HTMLInputElement).indeterminate).toBe(true)
    expect(await screen.findByLabelText('Mobile phones')).not.toBeChecked()

    await userEvent.click(await screen.findByLabelText('Galaxy'))
    expect(await screen.findByLabelText('Galaxy')).toBeChecked()
    expect(await screen.findByLabelText('Mobile phones')).toBeChecked()

    await userEvent.click(await screen.findByLabelText('Galaxy'))
    expect(await screen.findByLabelText('Galaxy')).not.toBeChecked()
    expect(await screen.findByLabelText('Mobile phones')).not.toBeChecked()
  })

  test('[Tab] 키로 체크박스를 이동할 수 있고, [Space] 키로 체크박스 상태를 반영할 수 있습니다.', async () => {
    render(<NestedCheckboxes defaultCheckboxData={sampleData} />)

    const rootCheckbox = screen.getByLabelText('Electronics')

    await userEvent.tab()
    expect(rootCheckbox).toHaveFocus()

    const childCheckbox = screen.getByLabelText('Mobile phones')

    await userEvent.tab()
    expect(childCheckbox).toHaveFocus()

    await userEvent.keyboard('[Space]')

    expect(childCheckbox).toBeChecked()
    expect(await screen.findByLabelText('iPhone')).toBeChecked()
    expect(await screen.findByLabelText('Galaxy')).toBeChecked()
  })
})
