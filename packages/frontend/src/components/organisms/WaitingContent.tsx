import * as React from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import LinearProgress from '@material-ui/core/LinearProgress'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    paddingTop: theme.spacing(8)
  }
}))

const WaitingContent = () => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <LinearProgress />
    </div>
  )
}

export default WaitingContent
