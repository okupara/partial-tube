import React from 'react'
import CSSBaseline from '@material-ui/core/CssBaseline'
// import PlaylistCollection from 'containers/PlaylistCollection'
import { ApolloProvider } from '@apollo/react-hooks'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
import Auth from 'containers/Auth'
import * as Header from 'components/organisms/Headers'
import Errors from 'containers/Errors'
import DefaultError from './DefaultError'

const inMemoryCache = new InMemoryCache()
const httpLink = createHttpLink({
  uri: '/graphql'
})

const client = new ApolloClient({
  link: httpLink,
  cache: inMemoryCache
})

export default () => (
  <ApolloProvider client={client}>
    <>
      <CSSBaseline />
      <DefaultError>
        <Auth
          default={() => <Header.Default />}
          notSignedIn={props => <Errors {...props} />}
          signedIn={signOut => <Header.Signed signOut={signOut} />}
        />
      </DefaultError>
    </>
  </ApolloProvider>
)
