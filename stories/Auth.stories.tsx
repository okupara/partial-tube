import React from "react"
import { Authenticated } from "../src/app/components/Authenticated"
import { UnAuthenticated } from "../src/app/components/UnAuthenticated"

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
