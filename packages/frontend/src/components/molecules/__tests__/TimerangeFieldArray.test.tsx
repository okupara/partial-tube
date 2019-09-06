import * as React from 'react'
import TimerangeFieldArray from '../TimerangeFieldArray'
import { Formik, Form } from 'formik/dist/index'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

describe('TimerangeFieldArray', () => {
  const clickElement = (element: HTMLElement) => {
    fireEvent(
      element,
      new MouseEvent('click', { cancelable: true, bubbles: true })
    )
  }
  type Props = {
    initialValues: {
      timers: ReadonlyArray<{ start: number; end: number }>
    }
  }
  const TestForm = (props: Props) => (
    <Formik
      initialValues={props.initialValues}
      onSubmit={() => {}}
      render={({ values }) => (
        <Form>
          <TimerangeFieldArray name="timers" values={values.timers} />
        </Form>
      )}
    />
  )

  it('should be able to add a new time range field', () => {
    const { queryByText, queryAllByText } = render(
      <TestForm initialValues={{ timers: [{ start: 0, end: 0 }] }} />
    )
    const button = queryByText('+')
    expect(button).toBeTruthy()
    if (button === null) {
      throw new Error('an unexpected behavior')
    }
    // click "+" button two times
    clickElement(button)
    clickElement(button)

    const removeButtons = queryAllByText('-')
    expect(removeButtons.length).toEqual(3)
  })

  it('should be able to remove existed time range records', () => {
    const mock = {
      timers: [
        { start: 0, end: 0 },
        { start: 10, end: 12 },
        { start: 22, end: 32 }
      ]
    }
    const { queryAllByText } = render(<TestForm initialValues={mock} />)
    const removeButtons = queryAllByText('-')
    expect(removeButtons.length).toEqual(mock.timers.length)

    clickElement(removeButtons[0])
    expect(queryAllByText('-').length).toEqual(mock.timers.length - 1)

    clickElement(removeButtons[0])
    // expects 0 because the button isn't rendered when there is only one time range record
    expect(queryAllByText('-').length).toEqual(0)

    // there is only one record left
    expect(queryAllByText(/START/).length).toEqual(1)
  })
})
