import * as React from 'react'
import Typography from '@material-ui/core/Typography'
import { concatNullable } from 'utils/ClassConcatinator'

type Props = {
  className?: string
}

const WaitingContent = (props: Props) => (
  <div className={concatNullable(props.className)}>
    <Typography variant="h6">Authorizing...</Typography>
  </div>
)

export default WaitingContent
