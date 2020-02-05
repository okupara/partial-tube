// import { PartialVideo, Video, VideoCollection } from 'containers/videos/model'
// import * as E from 'fp-ts/lib/Either'
// import { rawPartials1, rawCollection, rawVideo1 } from '__mocks__/Videos'

// describe('videos/model', () => {
//   it('should be working with PartialVideo', () => {
//     const res1 = PartialVideo.decode(rawPartials1[0])
//     expect(E.isRight(res1)).toEqual(true)

//     if (!E.isRight(res1)) {
//       throw new Error('something goes wrong.')
//     }

//     expect(PartialVideo.encode(res1.right)).toStrictEqual(rawPartials1[0])

//     const err1 = Video.decode(null)
//     expect(E.isLeft(err1)).toEqual(true)

//     const err2 = PartialVideo.decode({ id: 'foobar' })
//     expect(E.isLeft(err2)).toEqual(true)
//   })

//   it('should be working with Video', () => {
//     const res1 = Video.decode(rawVideo1)
//     expect(E.isRight(res1)).toEqual(true)
//     if (!E.isRight(res1)) {
//       throw new Error('something goes wrong.')
//     }

//     expect(
//       E.isRight(
//         Video.decode({
//           id: 'hoge',
//           items: [],
//           videoId: 'askjga9',
//           title: 'super title',
//           created: new Date().toUTCString()
//         })
//       )
//     ).toEqual(true)

//     expect(Video.encode(res1.right)).toStrictEqual(rawVideo1)

//     expect(E.isLeft(Video.decode(null))).toEqual(true)
//     expect(E.isLeft(Video.decode({ items: [] }))).toEqual(true)
//   })

//   it('should be working wiht VideoCollection', () => {
//     const res1 = VideoCollection.decode(rawCollection)
//     expect(E.isRight(res1)).toEqual(true)
//     if (E.isLeft(res1)) {
//       throw new Error('something goes wrong')
//     }
//     expect(VideoCollection.encode(res1.right)).toStrictEqual(rawCollection)
//   })
// })
