import React from "react"
import { AddPartialVideoForm } from "../molecules/AddPartialVideoForm"

type Props = {
  videoId: string
}

const AddPartialVideos = (props: Props) => <AddPartialVideoForm currentTime={300} />

export default AddPartialVideos
