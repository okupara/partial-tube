import React from "react"
import { LetsLogin } from "../../src/components/auth/LetsLogin"
import { MarginDecorator } from "../Decorators"

export const letsLogin = () => <LetsLogin />

export default {
  title: "auth|parts",
  decorators: [MarginDecorator],
}
