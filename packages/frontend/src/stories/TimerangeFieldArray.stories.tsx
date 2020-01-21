import * as React from 'react'
import { Form, Formik } from 'formik/dist/index'
import TimerangeArrayField from 'components/molecules/TimerangeFieldArray'

export const form = () => (
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

export default {
  title: 'TimerangeFieldArray',
  component: TimerangeArrayField
}
