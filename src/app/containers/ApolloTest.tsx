import React from "react"
import { useQuery } from "@apollo/react-hooks"
import gql from "graphql-tag"

const query = gql`
  query {
    users {
      name
    }
  }
`

export const ApolloTest = () => {
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

  const { users } = data

  return (
    <div>
      {users.map((user, i) => (
        <div key={i}>{user.name}</div>
      ))}
    </div>
  )
}
