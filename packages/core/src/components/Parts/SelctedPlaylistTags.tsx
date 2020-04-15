import React from "react"
import { Stack, Tag, TagLabel, TagCloseButton } from "@chakra-ui/core"

type Props<T> = {
  list: ReadonlyArray<T>
  createTagFn: (elem: T) => TagProps
  onClickDelete: (key: string) => void
}
type TagProps = {
  title: string
  key: string
}

export const SelectedPlaylistTags = <T extends {}>({
  list,
  createTagFn,
  onClickDelete,
}: Props<T>) => (
  <Stack spacing={4} isInline>
    {list.map((elem) => {
      const tagInfo = createTagFn(elem)
      return (
        <Tag
          size="lg"
          key={tagInfo.key}
          rounded="full"
          variant="solid"
          variantColor="blue"
        >
          <TagLabel>{tagInfo.title}</TagLabel>
          <TagCloseButton onClick={() => onClickDelete(tagInfo.key)} />
        </Tag>
      )
    })}
  </Stack>
)
