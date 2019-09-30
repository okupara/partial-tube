import { Video, Videos } from '../src/GraphQLTypes'
import * as E from 'fp-ts/lib/Either'

describe('GraphQLTypes', () => {
  it('should be working well with video types', () => {
    const r1 = Video.create({})
    expect(E.isLeft(r1)).toEqual(true)

    const correctData1 = {
      id: 'hxxxdkj',
      videoId: 'xkjk2la',
      title: 'title....',
      description: 'description...',
      playranges: [{ start: 3, end: 8 }, { start: 13, end: 21 }]
    }
    const r2 = Video.create(correctData1)
    expect(E.isRight(r2)).toEqual(true)

    const correctData2 = {
      id: 'akjglw2oijkdfa',
      videoId: 'aksjdgq',
      title: 'title2....',
      description: 'description2...',
      playranges: [{ start: 8, end: 12 }, { start: 22, end: 27 }]
    }
    const r3 = Videos.create([correctData1, correctData2])
    expect(E.isRight(r3)).toEqual(true)

    const wrongData1 = {
      id: 'id-of-wrong-data',
      videoId: 'vidoeid-of-wrong-data',
      title: 'titlewrong....',
      description: 'descriptionwrong...',
      playranges: { start: 8, end: 12 }
    }
    const r4 = Video.create(wrongData1)
    expect(E.isLeft(r4)).toEqual(true)

    const r5 = Videos.create([correctData1, correctData2, wrongData1])
    expect(E.isLeft(r5)).toEqual(true)
  })
})
