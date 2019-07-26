import { User } from '@partial-tube/domain'
import * as functions from 'firebase-functions'

const user = User('hello', 'htttp://yahoo.com')
console.log(user)

export const helloWorld = functions
  .region('asia-northeast1')
  .https.onRequest((_, response) => {
    response.send(`Hello ${user.pictureUrl}`)
  })
