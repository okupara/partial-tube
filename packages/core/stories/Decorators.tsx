import React from "react"
import { Box } from "@chakra-ui/core"
import { LoginUserProvider, initUser } from "../src/contexts/LoginUser"

export const MarginDecorator = (storyfn: () => React.FC<{}>) => (
  <Box m={4}>{storyfn()}</Box>
)

export const UserDecorator = (storyfn: () => React.FC<{}>) => (
  <LoginUserProvider
    value={initUser({
      id: "hogehoge",
      name: "kensuke okuhara",
      avatarUrl: "",
    })}
  >
    {storyfn()}
  </LoginUserProvider>
)
