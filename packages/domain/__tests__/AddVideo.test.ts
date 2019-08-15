import { VideoId } from '../src/AddVideo'
import { isRight, isLeft } from 'fp-ts/lib/Either'

describe('AddVideo', () => {
  it('should be Right', () => {
    const res = VideoId.create('https://www.youtube.com/watch?v=JkF8AZeiY5E')
    expect(isRight(res)).toStrictEqual(true)
    if (isLeft(res)) {
      throw new Error('unexpected behaviour')
    }
    expect(res.right).toStrictEqual({
      tag: 'YoutubeVideoId',
      value: 'JkF8AZeiY5E'
    })
  })
})
