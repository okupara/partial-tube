import React from "react"
import TimeText from "../src/app/components/molecules/TimeText"
import TimeRangeText from "../src/app/components/molecules/TimeRangeText"

export const timeText = () => <TimeText sec={220} />

export const timeRangeText = () => <TimeRangeText start={220} end={330} />

export default {
  title: "TimeText",
}
