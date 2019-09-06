import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { Form, Formik } from 'formik/dist/index'
import TimerangeArrayField from 'components/molecules/TimerangeFieldArray'

storiesOf('TimerageFieldArray', module).add('default', () => {
  return (
    <Formik
      onSubmit={() => {}}
      initialValues={{
        test: [{ start: 0, end: 0 }]
      }}
      render={({ values }) => (
        <Form>
          <TimerangeArrayField values={values.test} name="test" />
        </Form>
      )}
    />
  )
})
