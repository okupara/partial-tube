import React from "react"
// import List from "../atomic/List"
// import { Stack } from "@chakra-ui/core"
import StackList from "../atomic/StackList"
import PartialVideoCard, { Props as PVProps } from "../molecules/PartialVideoCard"

type Props = {
  partialVideoList: ReadonlyArray<PVProps>
}

const PartialVideoList: React.FC<Props> = ({ partialVideoList }) => (
  <StackList spacing={8} list={partialVideoList} component={p => <PartialVideoCard {...p} />} />
)
//   <Stack spacing={8}>
//     {partialVideoList.map((a, i) => (
//       <PartialVideoCard key={`${i}`} {...a} />
//     ))}
//   </Stack>
// )

export default PartialVideoList
