import React from 'react'
import TextField from '@material-ui/core/TextField'
import { FieldProps } from 'formik'
// import { makeStyles } from '@material-ui/styles'

export type Props = {
  error: boolean
  errorMessage?: string | null
  field: FieldProps['field']
  className?: string
}

// const useStyle = makeStyles(_ => ({
//   endButton: {
//     padding: '1px 16px'
//   }
// }))

const URLTextField = (props: Props) => {
  //   props.setField("url", props.existedVideo)
  return (
    <TextField
      id="youtube-url"
      {...props.field}
      error={props.error}
      helperText={
        props.error && !!props.errorMessage ? props.errorMessage : null
      }
      className={props.className}
      label="test"

      //   InputProps={{
      //     endAdornment: (
      //       <InputAdornment position="end">
      //         <Button
      //           className={classes.endButton}
      //           variant="outlined"
      //           onClick={() => {}}
      //         >
      //           Load
      //         </Button>
      //       </InputAdornment>
      //     )
      //   }}
    />
  )
}

export default URLTextField
