import React from "react"
import { Authenticated } from "../src/components/Authenticated"
import { UnAuthenticated } from "../src/components/UnAuthenticated"

export const authenticated = () => (
  <Authenticated user={{ id: "x2jakg", name: "ken", avatarUrl: "" }}>
    <div>test</div>
  </Authenticated>
)

export const unauthenticated = () => (
  <UnAuthenticated>
    <div>test</div>
  </UnAuthenticated>
)

export default {
  title: "Auth",
}
