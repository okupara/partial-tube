// import * as E from 'fp-ts/lib/Either'
// import { Video, VideoCollection, PartialVideo } from 'containers/videos/model'

// const date = new Date()
// const timesec = date.getTime()

// export const rawPartials1 = [
//   {
//     id: 'akaslga-2kjksalga',
//     userId: 'userid-aksjdkjag',
//     start: 8,
//     end: 10,
//     description: 'Description 1',
//     created: new Date(timesec - 10000).toUTCString(),
//     order: 1
//   },
//   {
//     id: 'arhed2-asdg2455',
//     userId: 'userid-asag2',
//     start: 20.4,
//     end: 33.2,
//     description: 'Description 2',
//     created: new Date(timesec - 20000).toUTCString(),
//     order: 1
//   },
//   {
//     id: 'dsagdsss-9oajslag',
//     userId: 'userid-asdgy',
//     start: 102.4,
//     end: 200.2,
//     description: 'Description 3',
//     created: new Date(timesec - 30000).toUTCString(),
//     order: 1
//   }
// ]

// export const rawPartials2 = [
//   {
//     id: 'jIgas-8glasg',
//     userId: 'userid-aksjdkjag',
//     start: 8,
//     end: 10,
//     description: 'Description 4',
//     created: new Date(timesec - 10000).toUTCString(),
//     order: 1
//   },
//   {
//     id: '8glasj-sgL94',
//     userId: 'userid-asag2',
//     start: 20.4,
//     end: 33.2,
//     description: 'Description 5',
//     created: new Date(timesec - 20000).toUTCString(),
//     order: 1
//   },
//   {
//     id: 'Ytdw-0Olgss',
//     userId: 'userid-asdgy',
//     start: 102.4,
//     end: 200.2,
//     description: 'Description 6',
//     created: new Date(timesec - 30000).toUTCString(),
//     order: 1
//   }
// ]

// export const rawVideo1 = {
//   id: 'kjkjfkd',
//   videoId: 'ZhvElt6bqCY',
//   created: new Date(timesec - 10000).toUTCString(),
//   items: rawPartials1,
//   title: 'video title1'
// }

// export const rawVideo2 = {
//   id: 'kaglsk',
//   videoId: 'ZhvElt6bqCY',
//   created: new Date(timesec - 10000).toUTCString(),
//   items: rawPartials2,
//   title: 'video title2'
// }

// export const rawCollection = {
//   items: [rawVideo1, rawVideo2]
// }

// export const serialzedPartials = rawPartials1.map(a => {
//   const res = PartialVideo.decode(a)
//   if (E.isLeft(res)) throw new Error(`Couldn't deserialize the data ${a}`)
//   return res.right
// })

// const video = Video.decode(rawVideo1)
// if (E.isLeft(video)) {
//   throw new Error('something goes wrong.')
// }
// export const serializedVideo = video.right

// const result = VideoCollection.decode(rawCollection)
// if (E.isLeft(result)) {
//   throw new Error('something goes wrong.')
// }

// export const serializedCollection = result.right
