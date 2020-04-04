import React from "react"
import * as User from "../models/User"

type NullableUser = User.Model | null
type ContextValue = {
  user: NullableUser
  setUser: (user: NullableUser) => void
}
type Props = {
  value: ContextValue
}
const UserContext = React.createContext<ContextValue | null>(null)

export const LoginUserProvider: React.FC<Props> = ({ children, value }) => (
  <UserContext.Provider value={value}>{children}</UserContext.Provider>
)
export function initUser() {
  console.log("INIT C", typeof window)
  const [user, setUser] = React.useState<NullableUser>(null)
  return {
    user,
    setUser,
  }
}

export const useLoginUser = () => {
  const context = React.useContext(UserContext)
  if (context === null) {
    throw new Error("Can not call useLoginUser outside of Provider")
  }
  return context
}
