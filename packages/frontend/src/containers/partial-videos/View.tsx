import * as React from 'react'
import Grid from '@material-ui/core/Grid'
import { makeStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
  test1: {
      backgroundColor: "blue"
  },
  test2: {
      backgroundColor: "pink"
  }

}))

const View = () => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={3}>
          <div className={classes.test1}>hello1</div>
        </Grid>
        <Grid item xs>
          <div className={classes.test2}>hello2</div>
        </Grid>
      </Grid>
    </div>
  )
}

export default View
