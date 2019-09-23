import * as React from 'react'
import CSSBaseline from '@material-ui/core/CssBaseline'
// import PlaylistCollection from 'containers/PlaylistCollection'
import { ApolloProvider } from '@apollo/react-hooks'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
import { from } from 'apollo-link'
import { RestLink } from 'apollo-link-rest'
import Auth from 'containers/Auth'
// import * as Header from 'components/organisms/Headers'
// import Errors from 'containers/Errors'
import DefaultError from './DefaultError'
import AuthHeader from 'apollo/Verification'
import HandleError from 'apollo/Errors'
// import AddVideo from 'components/pages/AddVideo'
import { create } from '@partial-tube/domain/lib/YTVideo'
import { isLeft } from 'fp-ts/lib/Either'
import AuthWaiting from 'containers/AuthWaiting'
import GlobalCss from './GlobalCss'
// import { BrowserRouter as Router, Route } from 'react-router-dom'
import { resolvers, initialData } from './apollo/Resolvers'

const inMemoryCache = new InMemoryCache()
const httpLink = createHttpLink({
  uri: '/graphql'
})

const restLink = new RestLink({
  uri: 'https://www.googleapis.com/youtube/v3',
  typePatcher: {
    YTVideoResult: (data: any) => {
      const result = create(data)
      if (isLeft(result)) {
        throw new Error('Youtube returns unexpected response.')
      }
      // TODO: should move to anywhere?
      const convertedData = {
        ...result.right,
        __typename: 'YTVideoResult',
        items: result.right.items.map(r => ({
          __typename: 'YTVideo',
          id: r.id,
          snippet: {
            __typename: 'YTVideoSnippet',
            title: r.snippet.title,
            description: r.snippet.description
          }
        }))
      }
      return convertedData
    }
  }
})

const client = new ApolloClient({
  link: from([HandleError, AuthHeader, restLink, httpLink]),
  cache: inMemoryCache,
  resolvers
})
inMemoryCache.writeData(initialData)

// const App = () => (
//   <>
//     <Router>
//       <Route path="/" component={() => <div>App</div>} />
//     </Router>
//   </>
// )

export default () => (
  <ApolloProvider client={client}>
    <>
      <CSSBaseline />
      <GlobalCss />
      <DefaultError>
        <Auth
          waiting={() => <AuthWaiting />}
          failed={() => <div>failed</div>}
          success={() => <div>success</div>}
        />
      </DefaultError>
    </>
  </ApolloProvider>
)
