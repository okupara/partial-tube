import React from "react"
import { useLoginUser } from "@partial-tube/core/lib/contexts/LoginUser"

export const AppTest = () => {
  const user = useLoginUser()
  console.log(user)
  return <div>APP TEST</div>
}
