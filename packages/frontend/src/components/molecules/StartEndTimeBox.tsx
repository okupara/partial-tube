import * as React from 'react'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/styles'
import Button from '@material-ui/core/Button'
import { secToColoned } from 'utils/TimeConverter'

const useStyles = makeStyles(_ => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: 400,
    minWidth: 150
  },
  typography: {
    marginRight: 10
  }
}))

type Props = {
  currentTime: number
  selectedTime: number
  title: string
  className?: string
}

const StartEndTimeBox = (props: Props) => {
  const classes = useStyles()
  return (
    <div className={`${classes.root} ${props.className}`}>
      <Typography className={classes.typography}>
        {props.title} : {secToColoned(props.selectedTime)}
      </Typography>
      <Button variant="outlined">
        SET AS {secToColoned(props.currentTime)}
      </Button>
    </div>
  )
}

export default StartEndTimeBox
