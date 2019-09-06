import * as React from 'react'
import TextField from '@material-ui/core/TextField'
import { Field } from 'formik/dist/index'
import { concatNullable } from 'utils/ClassConcatinator'
import { makeStyles } from '@material-ui/core/styles'

// better rename to "DescriptionField" or something like that

type Props = {
  label: string
  className?: string
}

const useStyle = makeStyles(_ => ({
  text: {
    width: '100%'
  }
}))

const Description = (props: Props) => {
  const classes = useStyle()
  return (
    <div className={concatNullable(props.className)}>
      <Field
        name="description"
        render={() => (
          <TextField
            id="description"
            className={classes.text}
            label={props.label}
            rows={5}
            multiline
          />
        )}
      />
    </div>
  )
}

export default Description
