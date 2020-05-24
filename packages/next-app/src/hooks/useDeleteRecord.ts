import * as React from "react"
import { useMutation } from "@apollo/react-hooks"
import { DocumentNode } from "graphql"

export const useDeleteRecord = (deleteQuery: DocumentNode) => {
  const [executeDelete, deleteState] = useMutation(deleteQuery)
  const [id, setId] = React.useState<string | null>(null)

  return {
    executeDelete() {
      if (id) {
        executeDelete({ variables: { id } })
      }
    },
    deleting: deleteState.loading,
    readyToDelete: id !== null,
    isDoneDelete: !!deleteState.data,
    id,
    setId(id: string) {
      setId(id)
    },
    resetId() {
      setId(null)
    },
  }
}
