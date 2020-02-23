import React from "react"
import { Box } from "@chakra-ui/core"

export const Margin = (storyfn: () => React.FC<{}>) => <Box p={4}>{storyfn()}</Box>
