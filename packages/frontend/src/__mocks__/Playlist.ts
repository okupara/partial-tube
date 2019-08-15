import { Playlist } from '@partial-tube/domain/lib/PlaylistCollection'
import { isLeft } from 'fp-ts/lib/Either'

export const pattern1 = () => {
  const res = Playlist.create({
    id: 'xxx111-111',
    title: 'sugoi title',
    description: 'an very happy something',
    items: [
      {
        id: 'xxx11-11212',
        videoId: 'ZhvElt6bqCY'
      }
    ]
  })
  if (isLeft(res)) {
    throw new Error('failed to create a mock')
  }
  return res.right
}
