import * as React from "react"
import {
  AlertDialog as ChakraAlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  Button,
} from "@chakra-ui/core"

type Props = {
  title: string
  messageView: () => React.ReactNode
  isOpen: boolean
  isLoading?: boolean
  onClose: () => void
  onSubmit: () => void
}

const Component = ({
  isOpen,
  title,
  onClose,
  onSubmit,
  messageView,
  isLoading,
}: Props) => {
  const cancelRef = React.useRef<HTMLElement>(null)
  return (
    <ChakraAlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay />
      <AlertDialogContent>
        <AlertDialogHeader fontSize="lg" fontWeight="bold">
          {title}
        </AlertDialogHeader>
        <AlertDialogBody>{messageView()}</AlertDialogBody>
        <AlertDialogFooter>
          <Button isDisabled={!!isLoading} ref={cancelRef} onClick={onClose}>
            Cancel
          </Button>
          <Button
            isLoading={!!isLoading}
            loadingText="Delete"
            variantColor="red"
            onClick={onSubmit}
            ml={3}
          >
            Delete
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </ChakraAlertDialog>
  )
}

export const AlertDeleteDialog = React.memo(Component)
