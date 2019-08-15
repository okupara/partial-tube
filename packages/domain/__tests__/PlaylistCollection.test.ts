import { isRight, isLeft } from 'fp-ts/lib/Either'
import * as pc from '../src/PlaylistCollection'

describe('PlaylistCollection', () => {
  it('should be Right', () => {
    const mock = {
      items: [
        {
          id: 'xxx-1111',
          title: 'hogehogelist',
          description: 'a very happy something',
          items: [
            {
              id: 'xx-2323',
              videoId: 'visalk82ksj'
            },
            {
              id: 'xx-2324',
              videoId: '8as9w2kdjf'
            }
          ]
        }
      ],
      count: 12
    }
    const res = pc.create(mock)
    expect(isRight(res)).toEqual(true)
    if (isLeft(res)) {
      throw new Error('res should be Right in this case')
    }
    const right = res.right
    expect(right.count).toEqual(12)
    expect(right.items.length).toEqual(1)
    expect(right.items[0].items.length).toEqual(2)
    expect(right.items[0].items[0].id).toStrictEqual({
      tag: 'PlayItemId',
      value: 'xx-2323'
    })
  })
})
