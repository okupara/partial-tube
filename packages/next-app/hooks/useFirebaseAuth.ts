// @TODO: can we consider tree shaking?
import { useEffect, useRef } from "react"
import getConfig from "next/config"
import firebase from "firebase"
import { Machine, assign } from "xstate"
import { useMachine } from "@xstate/react"
import * as User from "@partial-tube/core/lib/models/User"

type Mode = "browser" | "server"
type MachineContext = {
  user: User.Model
}

type MachineSchema = {
  states: {
    loading: {}
    loggedIn: {}
    notLoggedIn: {}
  }
}
export type StateTypes = keyof MachineSchema["states"]

type MachineEvents =
  | { type: "NOT_DETECTED_USER" }
  | { type: "DETECTED_USER"; user: User.Model }

export const AuthMachine = Machine<MachineContext, MachineSchema, MachineEvents>({
  id: "FBAuthMachine",
  initial: "loading",
  states: {
    loading: {
      on: {
        NOT_DETECTED_USER: "notLoggedIn",
        DETECTED_USER: {
          target: "loggedIn",
          actions: assign((_, userEvent) => ({ user: userEvent.user })),
        },
      },
    },
    loggedIn: {},
    notLoggedIn: {},
  },
})

type HooksReturnType = {
  user: User.Model | null
  state: StateTypes | null
  login: () => void
}
export const useFirebaseAuth = (): HooksReturnType => {
  const mode: Mode = typeof window === "undefined" ? "server" : "browser"

  // technically, this is against the hooks rules, thought...
  switch (mode) {
    case "browser":
      return createAuth()
    case "server":
    default:
      return createEmpty()
  }
}

function createEmpty() {
  return { login() {}, user: null, state: null }
}

function createAuth() {
  const mountedRef = useRef<boolean>(true)
  const providerRef = useRef<firebase.auth.GoogleAuthProvider | null>(null)
  const [machine, dispatchMachine] = useMachine(AuthMachine)

  const { publicRuntimeConfig } = getConfig()
  console.log(publicRuntimeConfig)

  useEffect(() => {
    firebase.initializeApp({
      apiKey: publicRuntimeConfig.apiKey,
      authDomain: publicRuntimeConfig.authDomain,
      databaseUrl: publicRuntimeConfig.databaseUrl,
      projectId: publicRuntimeConfig.projectId,
    })
    providerRef.current = new firebase.auth.GoogleAuthProvider()
    firebase.auth().onAuthStateChanged(
      (user) => {
        console.log("T", user)
        // TODO: we need prove if @xstate/react prevents memory-leaks when component unmounted
        if (user === null) {
          dispatchMachine({ type: "NOT_DETECTED_USER" })
        } else {
          dispatchMachine({
            type: "DETECTED_USER",
            user: { id: user.uid, avatarUrl: user.photoURL, name: user.displayName },
          })
        }
      },
      (error) => {
        console.error(error)
      },
      () => {
        console.log("complete")
      },
    )
    async function getRedirectInfo() {
      const res = await firebase.auth().getRedirectResult()
      if (!res.credential) {
        return
      }
      const user = firebase.auth().currentUser
      if (!user) {
        return
      }
    }
    getRedirectInfo()
    return () => {
      mountedRef.current = false
    }
  }, [])

  return {
    user: machine.context.user,
    state: machine.value as StateTypes,
    login() {
      firebase.auth().signInWithRedirect(providerRef.current!)
    },
  }
}
