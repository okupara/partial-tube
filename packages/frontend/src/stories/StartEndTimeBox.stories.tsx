import * as React from 'react'
import { storiesOf } from '@storybook/react'
import StartEndTimeBox from 'components/molecules/StartEndTimeBox'
import StartEndTimeArea from 'components/molecules/StartEndTimeArea'

storiesOf('StartEndBox', module)
  .add('START', () => {
    return (
      <StartEndTimeBox currentTime={250.2} selectedTime={0} title="START" />
    )
  })
  .add('END', () => {
    return <StartEndTimeBox currentTime={250.2} selectedTime={20} title="END" />
  })
  .add('AREA', () => {
    return (
      <StartEndTimeArea
        removeRecord={() => {}}
        startTime={0}
        endTime={10}
        currentTime={250.2}
      />
    )
  })
