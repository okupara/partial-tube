import React from "react"
import { MarginDecorator } from "./Decorators"
import ItemCountText from "../src/app/components/molecules/ItemCountText"

export const ItemCntTextAbove2 = () => <ItemCountText cnt={2}>hello</ItemCountText>
ItemCntTextAbove2.story = {
  name: "above 2",
}
export const ItemCntTextOne = () => <ItemCountText cnt={1}>hello</ItemCountText>
ItemCntTextOne.story = {
  name: "just 1",
}
export const ItemCntTextZero = () => <ItemCountText cnt={0}>hello</ItemCountText>
ItemCntTextZero.story = {
  name: "nothing",
}

export default {
  title: "Text/count",
  decorators: [MarginDecorator],
}
