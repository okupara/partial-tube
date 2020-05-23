import React from "react"
import { Heading, Flex, Icon, Text } from "@chakra-ui/core"
import { Card } from "../Card/Card"
import { CommentIconText } from "../Text/CommentIconText"
import { PartialVideoThumb } from "../Thumbnail/PartialVideoThumb"
import { GridImageTitleDesc } from "../../components/Frames/GridImageTitleDesc"

export type Props = {
  id: string
  title: string
  start: number
  end: number
  videoId: string
  comment?: string | null
  onClickEditMenu?: (id: string) => void
  onClickDeleteMenu?: (id: string) => void
  onClickCard?: (id: string) => void // to move the update page
}

const EditLabel = () => (
  <Flex alignItems="center">
    <Icon name="edit" />
    <Text ml={1}>edit</Text>
  </Flex>
)

const DeleteLabel = () => (
  <Flex alignItems="center">
    <Icon name="delete" />
    <Text ml={1}>delete</Text>
  </Flex>
)

const Component = (props: Props) => {
  const menus = React.useMemo(
    () => [
      {
        label: <EditLabel />,
        onSelect: () => props.onClickEditMenu?.(props.id),
      },
      {
        label: <DeleteLabel />,
        onSelect: () => props.onClickDeleteMenu?.(props.id),
      },
    ],
    [],
  )
  return (
    <Card menus={menus}>
      <GridImageTitleDesc
        iconView={() => (
          <PartialVideoThumb
            videoId={props.videoId}
            start={props.start}
            end={props.end}
            timeFontSize="md"
          />
        )}
        titleView={() => (
          <Heading size="md" as="h3">
            {props.title}
          </Heading>
        )}
        descView={() => <CommentIconText text={props.comment ?? ""} />}
      />
    </Card>
  )
}

export const PartialVideoCard = React.memo(Component)
