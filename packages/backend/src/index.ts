import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import * as path from 'path'
import { ApolloServer, gql } from 'apollo-server-cloud-functions'
import { IncomingMessage } from 'http'
import { InvalidTokenError } from './errors'
// import { Videos } from '@partial-tube/domain/lib/GraphQLTypes'
import { Videos } from '@partial-tube/domain/lib/Videos'
import * as E from 'fp-ts/lib/Either'

interface ReqContext {
  req: IncomingMessage
}

async function initialize() {
  const jsonPath = path.join(path.resolve(), 'credential.json')
  // const jsonStr = await asyncReadFile(jsonPath, {encoding: "utf-8"})
  admin.initializeApp({
    credential: admin.credential.cert(jsonPath),
    databaseURL: 'https://partialtube-dev.firebaseio.com'
  })
}

initialize()
const db = admin.firestore()

const typeDefs = gql`
  type Query {
    verify: User
    checkVideoExistance(videoId: String!): [Video]
    getVideos: [Video]!
  }
  type User {
    userId: String
    name: String
    avatarUrl: String
  }
  type TimeRange {
    start: Float
    end: Float
  }
  type Video {
    id: ID!
    title: String!
    playranges: [TimeRange]!
    description: String
    created: String
    videoId: String!
  }
`

const verifyToken = (token: string | undefined) => {
  if (!token) {
    throw new InvalidTokenError()
  }
  return admin
    .auth()
    .verifyIdToken(token.replace('Bearer ', '').trim())
    .catch(e => {
      console.log('verification error:', e)
      return null
    })
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
      }),
      getVideos: async (parent, args, context, info) => {
        const snapshots = await db.collection('videos').get()
        const array = snapshots.docs.map(v => {
          const data = v.data()
          return {
            ...data,
            created: data.created.toDate().toUTCString(),
            id: v.id
          }
        })
        console.log('Array', array)
        // means, just validation so far
        const res = Videos.create(array)
        if (E.isLeft(res)) throw new Error('')
        return Videos.encode(res.right)
      },
      checkVideoExistance: async (parent, args, context, info) => {
        return [
          {
            id: 'hohohoho',
            videoId: 'hoge',
            title: 'hogehogeo'
          }
        ]
      }
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
