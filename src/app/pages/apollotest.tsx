import React from "react"
import { withApollo } from "../lib/withApollo"
import { ApolloTest as ApolloTestContainer } from "../containers/ApolloTest"

export const ApolloTest = () => (
  <div>
    <ApolloTestContainer />
  </div>
)

export default withApollo()(ApolloTest)
