import * as React from 'react'
import StartEndTimeBox from 'components/molecules/StartEndTimeBox'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { concatNullable } from 'utils/ClassConcatinator'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    minWidth: 400
  },
  end: {
    paddingLeft: 20
  },
  deleteButtom: {
    marginLeft: theme.spacing(2)
  }
}))

type Props = {
  currentTime: number
  startTime: number
  endTime: number
  className?: string
  hideRemoveButton?: boolean
  removeRecord: () => void
}

const StartEndTimeArea = (props: Props) => {
  const classes = useStyles()
  return (
    <div className={concatNullable(classes.root, props.className)}>
      <StartEndTimeBox
        title="START"
        selectedTime={props.startTime}
        currentTime={props.currentTime}
      />
      <StartEndTimeBox
        title="END"
        selectedTime={props.endTime}
        currentTime={props.currentTime}
        className={classes.end}
      />
      {props.hideRemoveButton ? null : (
        <Button
          className={classes.deleteButtom}
          onClick={() => props.removeRecord()}
          variant="outlined"
        >
          -
        </Button>
      )}
    </div>
  )
}

export default StartEndTimeArea
