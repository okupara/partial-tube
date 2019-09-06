import * as React from 'react'
import { FieldArray, Field } from 'formik/dist/index'
import Button from '@material-ui/core/Button'
import { makeStyles, Theme } from '@material-ui/core/styles'
import StartEndTimeArea from 'components/molecules/StartEndTimeArea'
import { concatNullable } from 'utils/ClassConcatinator'

type Props = {
  values: ReadonlyArray<{ start: number; end: number }>
  name: string
  className?: string
}

const useStyles = makeStyles((theme: Theme) => ({
  rangetime: {
    marginBottom: theme.spacing(2)
  }
}))

const TimerangeFieldArray = (props: Props) => {
  const classes = useStyles()
  return (
    <div className={concatNullable(props.className)}>
      <FieldArray
        name={props.name}
        render={arrayHelper => (
          <div>
            {props.values.map((v, index) => (
              <div key={index}>
                <Field
                  name={`${props.name}.${index}`}
                  render={() => (
                    <StartEndTimeArea
                      className={classes.rangetime}
                      currentTime={220}
                      startTime={v.start}
                      endTime={v.end}
                      removeRecord={() => arrayHelper.remove(index)}
                      hideRemoveButton={props.values.length === 1}
                    />
                  )}
                />
              </div>
            ))}
            <Button
              variant="outlined"
              onClick={() => arrayHelper.push({ start: 0, end: 0 })}
            >
              +
            </Button>
          </div>
        )}
      />
    </div>
  )
}

export default TimerangeFieldArray
