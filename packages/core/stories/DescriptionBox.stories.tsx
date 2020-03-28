import React from "react"
import { MarginDecorator } from "./Decorators"
import { DescriptionBox } from "../src/components/molecules/DescriptionBox"

const foo = "aaaa\nbarrrrr"
const longSentence = `
hello
bababababa
testsstststststs
あああああああああああああああああ
だあだだあだだだっだd
うううううううううううううううう
momoo
げろげろげろ
`

export const normal = () => <DescriptionBox text={foo} />
export const withSize = () => (
  <DescriptionBox text={longSentence} maxHeight="100px" />
)

export default {
  title: "DescriptionBox",
  decorators: [MarginDecorator],
}
