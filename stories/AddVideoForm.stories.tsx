import React from "react"
import { MarginDecorator } from "./Decorators"
import AddPartialVideoForm from "../src/app/components/molecules/AddPartialVideoForm"

export const addPartialForm = () => <AddPartialVideoForm currentTime={180} />

export default {
  title: "PartialVideo/AddForm",
  decorators: [MarginDecorator],
}
