import * as React from "react"
import { Grid, Box } from "@chakra-ui/core"

type Props = {
  iconView: () => React.ReactNode
  titleView: () => React.ReactNode
  descView: () => React.ReactNode
}

export const GridImageTitleDesc = ({ iconView, titleView, descView }: Props) => {
  return (
    <Grid
      gridTemplateColumns="200px 1fr"
      gridTemplateRows="min-content 1fr"
      gridTemplateAreas={`
      "areaA areaB"
      "areaA areaC"
    `}
      gridRowGap={2}
      gridColumnGap={4}
    >
      <Box gridArea="areaA">{iconView()}</Box>
      <Box gridArea="areaB">{titleView()}</Box>
      <Box gridArea="areaC">{descView()}</Box>
    </Grid>
  )
}
