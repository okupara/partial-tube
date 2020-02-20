import React from "react"
import AppHeader from "../src/app/components/organisms/AppHeader"
import UserAvatar from "../src/app/components/molecules/UserAvatar"
import LoginButton from "../src/app/components/molecules/LoginButton"

export const unAuthenticated = () => <AppHeader component={<LoginButton />} />

unAuthenticated.story = {
  name: "un-authenticated",
}

export const authenticated = () => <AppHeader component={<UserAvatar name="Kola Tioluwani" />} />

authenticated.story = {
  name: "authenticated",
}

export default {
  title: "AppHeader",
}
