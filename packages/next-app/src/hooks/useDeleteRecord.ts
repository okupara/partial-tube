import * as React from "react"
import { useMutation } from "@apollo/react-hooks"
import { DocumentNode } from "graphql"

export const useDeleteRecord = <T extends {}>(deleteQuery: DocumentNode) => {
  const [executeDelete, deleteState] = useMutation(deleteQuery)
  const [parameters, setParameters] = React.useState<T | null>(null)

  return {
    executeDelete() {
      if (parameters) {
        executeDelete({ variables: parameters })
      }
    },
    deleting: deleteState.loading,
    readyToDelete: parameters !== null,
    isDoneDelete: !!deleteState.data,
    parameters,
    setParameters(parameters: T) {
      setParameters(parameters)
    },
    resetParameter() {
      setParameters(null)
    },
  }
}
