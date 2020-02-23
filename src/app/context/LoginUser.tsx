import React, { useContext } from "react"
import * as User from "../../models/User"

type NullableUser = null | User.Model
type UserContextValue = [NullableUser, (user: User.Model) => void]

// eslint-disable-next-line @typescript-eslint/no-empty-function
const initialValue: UserContextValue = [null, () => {}]

const UserContext = React.createContext<UserContextValue>(initialValue)

export const LoginUserProvider = UserContext.Provider

export const initLoginUser = (): UserContextValue => React.useState<NullableUser>(null)

export const useLoginUserContext = () => {
  const context = useContext(UserContext)
  if (typeof context === "undefined") {
    throw new Error("useUserContext must be used within a UserContext.Provider")
  }
  return context
}

export const isLoggedIn = (user: NullableUser): user is User.Model => user !== null
