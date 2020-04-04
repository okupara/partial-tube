import { useLoginUser } from "@partial-tube/core/lib/contexts/LoginUser"

export const useTest = () => {
  const a = useLoginUser()
  return a
}
