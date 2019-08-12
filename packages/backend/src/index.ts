import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import * as path from 'path'
import { ApolloServer, gql } from 'apollo-server-cloud-functions'
import { IncomingMessage } from 'http'
import { InvalidTokenError } from './errors'

interface ReqContext {
  req: IncomingMessage
}

async function initialize() {
  const jsonPath = path.join(path.resolve(), 'credential.json')
  // const jsonStr = await asyncReadFile(jsonPath, {encoding: "utf-8"})
  admin.initializeApp({
    credential: admin.credential.cert(jsonPath),
    databaseURL: 'https://okuparatest-91da0.firebaseio.com'
  })
}

initialize()
// const db = admin.firestore()

const typeDefs = gql`
  type Query {
    verify: User
  }
  type User {
    name: String
    avatarUrl: String
  }
`

const veriyfyToken = (token: string | undefined) => {
  if (!token) {
    throw new InvalidTokenError()
  }
  return admin
    .auth()
    .verifyIdToken(token)
    .catch(e => (console.log('EXPECTED??'), new InvalidTokenError()))
}

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers: {
    Query: {
      verify: (a, b, c, d) => (
        console.log(a, b, c, d),
        {
          name: 'oooooooooo',
          avatarUrl: 'jkjkjkfjkdjfkdjfdjfk'
        }
      )
    }
  },
  context: async ({ req }: ReqContext) => {
    // await veriyfyToken(req.headers.authorization)
  },
  playground: true,
  introspection: true
})

export const graphql = functions.https.onRequest(apolloServer.createHandler())
