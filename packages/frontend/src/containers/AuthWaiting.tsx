import * as React from 'react'
import Header from 'components/organisms/Header'
import { makeStyles, Theme } from '@material-ui/core/styles'
import WaitingContent from 'components/organisms/WaitingContent'

const useStyles = makeStyles((theme: Theme) => ({
  content: {
    paddingTop: theme.spacing(8)
  }
}))

const AuthWaiting = () => {
  const classes = useStyles()
  return (
    <>
      <Header />
      <WaitingContent className={classes.content} />
    </>
  )
}

export default AuthWaiting
