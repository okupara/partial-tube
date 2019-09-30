import * as E from 'fp-ts/lib/Either'
import * as V from '../src/Videos'

describe('Videos', () => {
  it('should be Right', () => {
    const dummyVidoes = [
      {
        id: 'dummyIDHOGE',
        title: 'HOGE TITLE',
        description: 'HOGE DESCRIPTION',
        playranges: [
          {
            start: 8,
            end: 10
          },
          {
            start: 29,
            end: 44
          }
        ],
        videoId: 'jkkjdkfjkdj'
      }
    ]
    const res = V.Videos.create(dummyVidoes)
    expect(E.isRight(res)).toEqual(true)
    if (!E.isRight(res)) throw new Error('something wrong')
    const obj = res.right[0]
    expect(obj.id).toStrictEqual({ tag: 'VideoId', value: 'dummyIDHOGE' })

    const encoded = V.Videos.encode(res.right)
    expect(encoded).toStrictEqual(dummyVidoes)
    expect(encoded[0].id).toEqual(dummyVidoes[0].id)
  })
  it('should be left', () => {
    // some of fields lost
    const res = V.Videos.create([
      {
        id: 'dummyIDHOGE',
        description: 'HOGE DESCRIPTION',
        playranges: [
          {
            start: 8,
            end: 10
          },
          {
            start: 29,
            end: 44
          }
        ]
      }
    ])
    expect(E.isLeft(res)).toEqual(true)
  })
})
