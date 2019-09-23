import { withStyles } from '@material-ui/core/styles'
const FullSize = {
  width: '100%',
  height: '100%'
}

const Global = withStyles({
  '@global': {
    html: { ...FullSize },
    body: { ...FullSize },
    '#root': { ...FullSize }
  }
})(() => null)

export default Global
