import * as React from "react"
import { styled } from "@material-ui/styles"
import Grid from "@material-ui/core/Grid"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
// import ListItemText from "@material-ui/core/ListItemText"
import Typography from "@material-ui/core/Typography"

const StyledList = styled(List)({
  width: 600
})

export default () => (
  <Grid container justify="center">
    <StyledList>
      <ListItem>
        <Grid container spacing={2}>
          <Grid item>
            <Typography>right</Typography>
          </Grid>
          <Grid item xs={12} sm container>
            <Typography>hello</Typography>
          </Grid>
        </Grid>
      </ListItem>
    </StyledList>
  </Grid>
)
