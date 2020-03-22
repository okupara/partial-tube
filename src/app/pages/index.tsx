import React from "react"
import AuthApp from "../components/AuthApp"
import fetch from "isomorphic-unfetch"
// import App from "../components/App"
// import { LoginUserProvider } from "../context/LoginUser"

const Index = () => (
  <div>
    <AuthApp>
      <div>konnnichiha!</div>
    </AuthApp>
  </div>
)

Index.getInitialProps = async () => {
  const response = await fetch("http://localhost:3000/api/graphql", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ query: "{ users { name } }" }),
  })

  const {
    data: { users },
  } = await response.json()
  console.log("test", users)

  return { users }
}

export default Index
