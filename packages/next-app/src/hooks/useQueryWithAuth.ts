import { useRef, useEffect } from "react"
import { DocumentNode } from "graphql"
import { useQuery } from "@apollo/react-hooks"
import * as User from "../models/User"

type Props = {
  query: DocumentNode
  user: User.Model | null
  id: string
}

export const useQueryWithAuth = <T>({ query, user, id }: Props) => {
  const authRef = useRef<User.Model | null>(user)
  const { data, error, loading, refetch } = useQuery<T>(query, {
    variables: { id },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: "network-only",
  })

  useEffect(() => {
    if (user && authRef.current === null) {
      refetch()
    }
    if (user === null && authRef.current) {
      refetch()
    }
    authRef.current = user
  }, [user])

  return {
    error,
    data,
    loading,
  }
}
