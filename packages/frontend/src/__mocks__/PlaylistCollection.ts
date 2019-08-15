import * as Collection from '@partial-tube/domain/lib/PlaylistCollection'
import { isLeft } from 'fp-ts/lib/Either'

export const createUsual = () => {
  const res = Collection.create({
    items: [
      {
        id: 'xxx111-111',
        title: 'sugoi title',
        description: 'an very happy something',
        items: [
          {
            id: 'xxx11-11212',
            videoId: 'ZhvElt6bqCY'
          }
        ]
      },
      {
        id: 'xxx111-112',
        title: 'sugoi title 2',
        description: 'an very sad on something',
        items: [
          {
            id: 'xxx11-11212',
            videoId: 'ZhvElt6bqCY'
          }
        ]
      }
    ],
    count: 3
  })
  if (isLeft(res)) {
    throw new Error('something is missing during creating a mock')
  }
  return res.right
}
