import React from "react"
import {
  Modal as ChakraModal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/core"

type Props = {
  content?: () => JSX.Element
  footer?: () => JSX.Element
  title?: () => JSX.Element
  onClose?: () => () => void
  isOpen?: boolean
}

export const Modal = (props: Props) => {
  return (
    <ChakraModal isOpen={props.isOpen} onClose={props.onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Save to...</ModalHeader>
        <ModalCloseButton />
        {props.content ? <ModalBody>{props.content()}</ModalBody> : null}
        {props.footer ? <ModalFooter>{props.footer()}</ModalFooter> : null}
      </ModalContent>
    </ChakraModal>
  )
}
