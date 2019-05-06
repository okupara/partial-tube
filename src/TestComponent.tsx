import * as React from "react"
import Button from "@material-ui/core/Button"

interface Props {
  title: string
}

const TestComponent = (props: Props) => {
  return <Button>{props.title}</Button>
}
export default TestComponent
