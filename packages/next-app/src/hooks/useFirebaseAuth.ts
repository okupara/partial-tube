import { useEffect, useRef } from "react"
import getConfig from "next/config"
import firebase from "firebase"
import { Machine } from "xstate"
import { useMachine } from "@xstate/react"
import { useLoginUser, useLogoutUser } from "../contexts/LoginUser"
import * as User from "../models/User"
import fetch from "isomorphic-unfetch"
import { useToast } from "../hooks/useToast"

type Mode = "browser" | "server"
type MachineContext = {}

type MachineSchema = {
  states: {
    loading: {}
    loggedIn: {}
    notLoggedIn: {}
  }
}
export type StateTypes = keyof MachineSchema["states"]

type MachineEvents = { type: "NOT_DETECTED_USER" } | { type: "DETECTED_USER" }

export const initAuthMachine = (initState: StateTypes) =>
  Machine<MachineContext, MachineSchema, MachineEvents>({
    id: "FBAuthMachine",
    initial: initState,
    states: {
      loading: {
        on: {
          NOT_DETECTED_USER: "notLoggedIn",
          DETECTED_USER: "loggedIn",
        },
      },
      loggedIn: {
        on: {
          NOT_DETECTED_USER: "notLoggedIn",
        },
      },
      notLoggedIn: {}, // waits for nothing because that login flow needs moving page to Google
    },
  })

export type HooksReturnType = {
  user: User.Model | null
  state: StateTypes | null
  login: () => void
  logout: () => void
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
  const userContext = useLoginUser()
  const state: StateTypes = userContext.user ? "loggedIn" : "loading"
  return { login() {}, logout() {}, user: userContext.user, state }
}

function createAuth() {
  const mountedRef = useRef<boolean>(true)
  const providerRef = useRef<firebase.auth.GoogleAuthProvider | null>(null)
  const userContext = useLoginUser()
  const logoutUser = useLogoutUser()
  const { showToast } = useToast()

  const [machine, dispatchMachine] = useMachine(
    initAuthMachine(userContext.user ? "loggedIn" : "loading"),
  )

  const { publicRuntimeConfig } = getConfig()

  useEffect(() => {
    console.log("DO FIREBASE!!!!")
    if (firebase.apps.length === 0) {
      firebase.initializeApp({
        apiKey: publicRuntimeConfig.apiKey,
        authDomain: publicRuntimeConfig.authDomain,
        databaseUrl: publicRuntimeConfig.databaseUrl,
        projectId: publicRuntimeConfig.projectId,
      })
    }
    providerRef.current = new firebase.auth.GoogleAuthProvider()
    firebase.auth().onAuthStateChanged(
      (user) => {
        console.log("from?", userContext)
        console.log("Goggle auth state is changed", user)
        console.warn("[TODO] It should be proved that ther's no memory leak")
        if (user === null) {
          dispatchMachine({ type: "NOT_DETECTED_USER" })
        } else {
          dispatchMachine({
            type: "DETECTED_USER",
          })
          if (userContext.user === null) {
            userContext.setUser({
              id: user.uid,
              avatarUrl: user.photoURL,
              name: user.displayName,
            })
            // doing nothing for now when error happens...(just shows errors on the console)
            activeSession(user)
          }
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
    user: userContext.user,
    state: machine.value as StateTypes,
    login() {
      firebase.auth().signInWithRedirect(providerRef.current!)
    },
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => postLogout())
        .then(() => {
          logoutUser()
          showToast({
            title: "You successfully logged out.",
            description: "I hope you come back here soon!",
          })
        })
        .catch((error) => console.error("Error occured at loggingout", error))
    },
  }
}

async function activeSession(fbUser: firebase.User) {
  const token = await fbUser.getIdToken()
  if (!token) throw new Error("Token is unexpectedly undefined")

  const res = await postLogin(token)
  if (!res.result) throw new Error("The server-response is unexpectedly 'false'")
}

type AuthAPIResponse = {
  result: boolean
}

const postLogin = (token: string): Promise<AuthAPIResponse> => {
  return fetch("/api/login", {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    method: "POST",
    body: JSON.stringify({ token }),
  }).then((response) => response.json())
}

const postLogout = (): Promise<AuthAPIResponse> =>
  fetch("/api/logout", {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    method: "POST",
  })
    .then((response) => response.json())
    .catch((error) => console.log("Error occurs at loggingout", error))
