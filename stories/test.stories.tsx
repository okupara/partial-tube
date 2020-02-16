import React from "react";
import AppHeader from "../src/app/components/AppHeader"
import {Button, Avatar} from "@chakra-ui/core"

export const unAuthenticated = () => 
    <AppHeader component={<Button>Login</Button>} />

unAuthenticated.story = {
    name: "un-authenticated"
}

export const authenticated = () =>
    <AppHeader component={<Avatar size="sm" name="Kola Tioluwani" />} />

authenticated.story = {
    name: "authenticated"
}

export default {
    title: "AppHeader"
}
