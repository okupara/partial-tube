import * as React from "react"
import { MarginDecorator } from "../Decorators"
import { InputYoutubeVideo } from "../../src/components/Form/InputYoutubeVideo"

export const inputYoutubeVideo = () => {
  const [text, setText] = React.useState("")
  return <InputYoutubeVideo text={text} onChange={setText} />
}
export const inputYoutubeVideoWithError = () => {
  const [text, setText] = React.useState("")
  return <InputYoutubeVideo text={text} onChange={setText} errorMessage="error" />
}

export default {
  title: "Form",
  decorators: [MarginDecorator],
}
