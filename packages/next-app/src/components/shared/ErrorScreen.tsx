import * as React from "react"
import {
  List,
  ListItem,
  Alert,
  AlertIcon,
  AlertDescription,
  AlertTitle,
  Text,
} from "@chakra-ui/core"

type Props = {
  title?: string | ReadonlyArray<string>
  description?: string
}

const Component = (props: Props) => (
  <Alert
    status="error"
    variant="subtle"
    flexDirection="column"
    justifyContent="center"
    textAlign="center"
    height="200px"
  >
    <AlertIcon size="40px" mr={0} />
    {props.title && (
      <AlertTitle mt={4} mb={1} fontSize="lg">
        {Array.isArray(props.title) && (
          <List>
            {props.title.map((t) => (
              <ListItem>{t}</ListItem>
            ))}
          </List>
        )}
        {!Array.isArray(props.title) && <Text>{props.title}</Text>}
      </AlertTitle>
    )}
    {props.description && (
      <AlertDescription maxWidth="sm">{props.description}</AlertDescription>
    )}
  </Alert>
)

export const ErrorScreen = React.memo(Component)
