import React from "react"
import { useQuery } from "@apollo/react-hooks"
import gql from "graphql-tag"

const query = gql`
  query {
    viewer {
      id
      name
    }
  }
`

export const ApolloTestContainer = () => {
  const { loading, error, data } = useQuery(query, {
    notifyOnNetworkStatusChange: true,
  })
  if (error) {
    console.log("ERROR!!!!!", error)
    return <div>ERROR!!</div>
  }
  if (loading) {
    return <div>loading</div>
  }

  const { viewer } = data

  return (
    <div>
      {viewer.name}
      {/* {viewer.map((v: any, i: any) => (
        <div key={i}>{v.name}</div>
      ))} */}
    </div>
  )
}
