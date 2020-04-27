import { useState, useCallback } from "react"

export const useIsOpen = (initValue?: boolean) => {
  const [isOpen, setIsOpen] = useState(
    typeof initValue === "boolean" ? initValue : false,
  ) // change it to a ?? b after update typescript 3.8

  const open = useCallback(() => setIsOpen(true), [isOpen])
  const close = useCallback(() => setIsOpen(false), [isOpen])
  const toggle = useCallback(() => setIsOpen(!isOpen), [isOpen])

  return {
    isOpen,
    open,
    toggle,
    close,
  }
}
