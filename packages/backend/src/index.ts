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
    userId: String
    name: String
    avatarUrl: String
  }
`

const verifyToken = (token: string | undefined) => {
  if (!token) {
    throw new InvalidTokenError()
  }
  return admin
    .auth()
    .verifyIdToken(token.replace('Bearer ', '').trim())
    .catch(_ => null)
}

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers: {
    Query: {
      // basically, doesnt check authentication in this block, it's supposed to be finished before comes here.
      verify: (parent, args, context, info) => ({
        userId: context.user_id,
        name: context.name,
        avatarUrl: context.picture
      })
    }
  },
  context: async ({ req }: ReqContext) => {
    const authInfo = await verifyToken(req.headers.authorization)
    if (authInfo === null) {
      throw new InvalidTokenError()
    }
    console.log('authInfo:', authInfo)
    return authInfo
  },
  plugins: [
    {
      requestDidStart() {
        return {
          didEncounterErrors({ response, errors }) {}
        }
      }
    }
  ],
  playground: true,
  introspection: true
})

export const graphql = functions.https.onRequest(apolloServer.createHandler())
