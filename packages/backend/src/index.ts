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
    databaseURL: 'https://partialtube-dev.firebaseio.com'
  })
}

initialize()
// const db = admin.firestore()

const typeDefs = gql`
  type Query {
    verify: User
    checkVideoExistance(videoId: String!): [Video]
  }
  type User {
    userId: String
    name: String
    avatarUrl: String
  }
  type Video {
    id: ID
    videoId: String
    title: String
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
      checkVideoExistance: async (parent, args, context, info) => {
        // console.log('Check::::::::', args)
        // const url = YTDataApiUrl(args.videoId)
        // console.log('URL::::', url)
        // const res = await fetch(url)
        // const data = await res.json()
        // console.log('RES::::', data)
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

const db = admin.firestore()
const playlistCollection = db.collection('playlist')

export const graphql = functions.https.onRequest(apolloServer.createHandler())

export const unko = functions.https.onRequest(async (request, response) => {
  const snapshot = await playlistCollection.get()
  // this object doesn't have map??
  const playlistsArray: any[] = []
  snapshot.forEach(r =>
    playlistsArray.push({ data: r.data(), ref: r, id: r.id })
  )
  console.log(playlistsArray[0].id)
  const aaa = db
    .collection('playlist')
    .doc(playlistsArray[0].id)
    .collection('items')
  const subSnap = await aaa.get()
  subSnap.forEach(s => console.log(s.data().videoId))

  response.send('okk')

  // console.log(db)
  // db.collection('playlist')
  //   .get()
  //   .then(snapshot => {
  //     let shots: any[] = []
  //     snapshot.forEach(record => {
  //       const r = record.data()
  //       console.log('HI*', r.gid.get)
  //       shots.push(r)
  //     })
  //     console.log('SHOTS', shots)
  //     shots[0].gid
  //       .get()
  //       .then((a: any) => {
  //         response.send('ok')
  //         console.log('TEST----', a.data())
  //       })
  //       .catch((e: any) => console.log('ERROR!!!', e))
  //   })
  //   .catch(e => console.log('EEEEEE:', e))
  // const ref = db.collection('testusers').doc('vkEYgJNGQPcrCmmZQ5Ks')
  // ref
  //   .get()
  //   .then(r => {
  //     console.log(r.data())
  //     response.send('ok')
  //   })
  //   .catch(e => console.log('error', e))
})
