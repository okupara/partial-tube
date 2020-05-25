import * as React from "react"
import { AlertDeleteDialog } from "../../src/components/shared/AlertDeleteDialog"
import { Text } from "@chakra-ui/core"

export const alertDialog = () => (
  <AlertDeleteDialog
    isOpen
    title="Delete"
    messageView={() => <Text>really?????</Text>}
    onClose={() => {}}
    onSubmit={() => {}}
  />
)

alertDialog.story = {
  name: "alertDialog",
}

export default {
  title: "Parts",
}
