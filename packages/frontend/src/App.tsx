import React from 'react'
import CSSBaseline from '@material-ui/core/CssBaseline'
import { Provider as AuthContextProvider } from 'context/Auth'
import PlaylistCollection from 'containers/PlaylistCollection'

export default () => (
  <AuthContextProvider>
    <>
      <CSSBaseline />
      <PlaylistCollection />
    </>
  </AuthContextProvider>
)
