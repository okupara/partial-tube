import React from "react"
import { MarginDecorator } from "./Decorators"
import { ItemCountText } from "../src/components/molecules/ItemCountText"

export const ItemCntTextAbove2 = () => <ItemCountText count={2} />
ItemCntTextAbove2.story = {
  name: "above 2",
}
export const ItemCntTextOne = () => <ItemCountText count={1} />
ItemCntTextOne.story = {
  name: "just 1",
}
export const ItemCntTextZero = () => <ItemCountText count={0} />
ItemCntTextZero.story = {
  name: "nothing",
}

export default {
  title: "Text/count",
  decorators: [MarginDecorator],
}
