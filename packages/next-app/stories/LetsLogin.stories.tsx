import React from "react"
import { LetsLogin } from "../src/components/Parts/LetsLogin"
import { MarginDecorator } from "./Decorators"

export const letsLogin = () => <LetsLogin />

export default {
  title: "Layouts",
  decorators: [MarginDecorator],
}
