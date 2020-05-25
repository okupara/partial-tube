import React from "react"
import { Authenticated } from "../../src/components/auth/Authenticated"
import { UnAuthenticated } from "../../src/components/auth/UnAuthenticated"
import { LetsLogin } from "../../src/components/auth/LetsLogin"

export const authenticated = () => (
  <Authenticated
    currentMenu="playlists"
    user={{ id: "x2jakg", name: "ken", avatarUrl: "" }}
  >
    <div>test</div>
  </Authenticated>
)

export const unauthenticated = () => (
  <UnAuthenticated>
    <LetsLogin />
  </UnAuthenticated>
)

export default {
  title: "auth",
}
