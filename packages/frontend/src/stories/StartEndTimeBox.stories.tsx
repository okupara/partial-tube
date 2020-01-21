import * as React from 'react'
import StartEndTimeBox from 'components/molecules/StartEndTimeBox'
import StartEndTimeArea from 'components/molecules/StartEndTimeArea'

export const start = () => (
  <StartEndTimeBox currentTime={250.2} selectedTime={0} title="START" />
)
export const end = () => (
  <StartEndTimeBox currentTime={250.2} selectedTime={20} title="END" />
)
export const area = () => (
  <StartEndTimeArea
    removeRecord={() => {}}
    startTime={0}
    endTime={10}
    currentTime={250.2}
  />
)

export default {
  title: 'StartEndTime'
}
