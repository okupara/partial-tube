import React from "react"
import { StackList } from "../List/StackList"
import { PartialVideoCard, Props as PVProps } from "../Card/PartialVideoCard"

export type Props = {
  partialVideoList: ReadonlyArray<PVProps>
  onClickCard?: (id: string) => void
}

export const PartialVideoCardList: React.FC<Props> = ({
  partialVideoList,
  onClickCard,
}) => (
  <StackList
    spacing={8}
    list={partialVideoList}
    component={(p) => <PartialVideoCard onClickCard={onClickCard} {...p} />}
  />
)
