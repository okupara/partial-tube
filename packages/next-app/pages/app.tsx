import React from "react"
import { withApollo } from "../compositions/withApollo"
import { ApolloTestContainer } from "../containers/ApolloTestContainer"

export const ApolloTest = (props: any) => {
  console.log(props)
  return (
    <div>
      <div>test</div>
      <ApolloTestContainer />
    </div>
  )
}

export default withApollo(ApolloTest)
