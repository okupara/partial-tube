import { useCallback } from "react"
import { useToast as useChakraToast } from "@chakra-ui/core"

type Props = {
  title: string
  description?: string
}
export const useToast = () => {
  const toast = useChakraToast()
  const showToast = useCallback(({ title, description }: Props) => {
    toast({
      position: "bottom-right",
      title,
      description,
      status: "success",
      duration: 4000,
      isClosable: true,
    })
  }, [])
  return { showToast }
}
