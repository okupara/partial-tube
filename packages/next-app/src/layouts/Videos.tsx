import React from "react"
import {
  PartialVideoCardList,
  Props as PartialVideoProps,
} from "../components/List/PartialVideoCardList"
import { useLoginUser } from "../contexts/LoginUser"
import { Authenticated } from "../components/Authenticated"
import { Box } from "@chakra-ui/core"

type Props = {
  onClickCard?: (id: string) => void
} & PartialVideoProps

export const Videos = (props: Props) => {
  const userContext = useLoginUser()
  if (!userContext.user) throw new Error("Unexpectedly, user is null")

  return (
    <Authenticated user={userContext.user}>
      <Box mt={24} px={6}>
        <PartialVideoCardList partialVideoList={props.partialVideoList} />
      </Box>
    </Authenticated>
  )
}
