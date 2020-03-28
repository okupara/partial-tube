import { NextPage, NextPageContext } from "next"
import Head from "next/head"
import { ApolloClient } from "apollo-client"
import { ApolloProvider } from "@apollo/react-hooks"
import { NormalizedCacheObject, InMemoryCache } from "apollo-cache-inmemory"

type TApolloClient = ApolloClient<NormalizedCacheObject>

type InitialProps = {
  apolloClient: ApolloClient<NormalizedCacheObject>
  apolloState: any
} & Record<string, any>

type WithApolloPageContext = {
  apolloClient: TApolloClient
} & NextPageContext

let globalApolloClient: TApolloClient

export const withApollo = (PageComponent: NextPage, { ssr = true } = {}) => {
  const WithApollo = ({ apolloClient, apolloState, ...pageProps }: InitialProps) => {
    const client = apolloClient || initApolloClient(apolloState)
    return (
      <ApolloProvider client={client}>
        <PageComponent {...pageProps} />
      </ApolloProvider>
    )
  }

  if (process.env.NODE_ENV !== "production") {
    const displayName =
      PageComponent.displayName || PageComponent.name || "Component"
    if (displayName === "App") {
      console.warn("This withApollo HOC only working with PageComponents")
    }
    WithApollo.displayName = `withApollo(${displayName})`
  }

  if (ssr || PageComponent.getInitialProps) {
    WithApollo.getInitialProps = async (ctx: WithApolloPageContext) => {
      const { AppTree } = ctx

      const apolloClient = (ctx.apolloClient = initApolloClient())

      let pageProps = {}
      if (PageComponent.getInitialProps) {
        pageProps = await PageComponent.getInitialProps(ctx)
      }

      if (isOnServer()) {
        if (ctx.res && ctx.res.finished) {
          return pageProps
        }

        if (ssr) {
          try {
            const { getDataFromTree } = await import("@apollo/react-ssr")
            await getDataFromTree(
              <AppTree
                pageProps={{
                  ...pageProps,
                  apolloClient,
                }}
              />,
            )
          } catch (error) {
            console.error("Error while running `getDataFromTree", error)
          }

          Head.rewind()
        }
      }
      const apolloState = apolloClient.extract()

      return {
        ...pageProps,
        apolloState,
      }
    }
  }
  return WithApollo
}

function initApolloClient(initialState?: any) {
  if (isOnServer()) {
    createApolloClient(initialState)
  }

  // Reuse client on the client side
  if (!globalApolloClient) {
    globalApolloClient = createApolloClient(initialState)
  }

  return globalApolloClient
}

function createApolloClient(initialState = {}) {
  const cache = new InMemoryCache().restore(initialState)
  return new ApolloClient({
    ssrMode: isOnServer(),
    link: createIsomorphLink(),
    cache,
  })
}

function createIsomorphLink() {
  if (isOnServer()) {
    const { SchemaLink } = require("apollo-link-schema")
    const { schema } = require("../graphql/schema")
    return new SchemaLink({ schema })
  } else {
    const { HttpLink } = require("apollo-link-http")
    return new HttpLink({
      uri: "/api/graphql",
      credentials: "same-origin",
    })
  }
}

// can be just const value?
function isOnServer() {
  return typeof window === "undefined"
}
