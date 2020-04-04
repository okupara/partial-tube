import React from "react"
// import { Authenticated } from "@partial-tube/core/lib/components/Authenticated"
// import { UnAuthenticated } from "@partial-tube/core/lib/components/UnAuthenticated"
import { useLoginUser } from "@partial-tube/core/lib/contexts/UserProvider"

export const RequireAuth: React.FC<{}> = ({ children }) => {
  const userContext = useLoginUser()
  console.log(userContext)
  return (
    <div>
      hello require<div>{children}</div>
    </div>
  )
}
