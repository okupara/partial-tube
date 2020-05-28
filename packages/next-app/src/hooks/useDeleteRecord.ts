import * as React from "react"
import { useMutation } from "@apollo/react-hooks"
import { DocumentNode } from "graphql"

export const useDeleteRecord = <T extends {}>(deleteQuery: DocumentNode) => {
  const [executeDelete, deleteState] = useMutation(deleteQuery)
  const [deleteParameter, setDeleteParameter] = React.useState<T | null>(null)

  return {
    executeDelete() {
      if (deleteParameter) {
        executeDelete({ variables: deleteParameter })
      }
    },
    deleting: deleteState.loading,
    readyToDelete: deleteParameter !== null,
    isDoneDelete: !!deleteState.data,
    deleteParameter,
    setDeleteParameter(parameter: T) {
      setDeleteParameter(parameter)
    },
    resetParameter() {
      console.log("cALLLBACK")
      setDeleteParameter(null)
    },
  }
}
