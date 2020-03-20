import React from "react"
import { MarginDecorator } from "./Decorators"
import { AddPartialVideoListTitle } from "../src/app/components/molecules/AddPartialVideoListTitle"

export const addedListWithAnything = () => (
  <AddPartialVideoListTitle addedItemCount={3} />
)
export const addedListWithNothing = () => (
  <AddPartialVideoListTitle addedItemCount={0} />
)

export default {
  title: "AddPartialVideo",
  decorators: [MarginDecorator],
}
