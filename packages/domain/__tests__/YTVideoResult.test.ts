import { create } from '../src/YTVideo'
import { isLeft, isRight } from 'fp-ts/lib/Either'

describe('YTVideoResult', () => {
  it('should be Right', () => {
    const mock = {
      kind: 'youtube#videoListResponse',
      etag: '"8jEFfXBrqiSrcF6Ee7MQuz8XuAM/2PzBe7H87uDwwE3etcpnE_Yob_0"',
      pageInfo: {
        totalResults: 1,
        resultsPerPage: 1
      },
      items: [
        {
          kind: 'youtube#video',
          etag: '"8jEFfXBrqiSrcF6Ee7MQuz8XuAM/nNChbdB-NyDP-6FVuGBisTQmmpQ"',
          id: 'w2_VxYNZG5Y',
          snippet: {
            publishedAt: '2019-08-17T12:00:08.000Z',
            channelId: 'UC4kUV8uGKmoQUs1HLzf7jsg',
            title: 'MOGURA : DOTAMAについて',
            description:
              '撮影場所『BAN×KARA ZONE-DS 歌舞伎町店』\n\nアーティスト情報\n\n北海道札幌市出身。北嶺高等学校卒、慶應義塾大学法学部政治学科在学中。中高を通して6年間、野球部に所属。また、BAZOOKA!!! 高校生RAP選手権出場したり、政治家に取材したりと活動は多岐に渡る。\n\nTwitter - https://mobile.twitter.com/mogura_2000_\nInstagram - https://www.instagram.com/mogura_2000_/\n\n\nニートtokyo@every 9pm\n\n■ニートtokyo■\n□twitter□\nhttps://twitter.com/neettokyo\n\n□instagram□\nhttps://www.instagram.com/neettokyo/',
            thumbnails: {
              default: {
                url: 'https://i.ytimg.com/vi/w2_VxYNZG5Y/default.jpg',
                width: 120,
                height: 90
              },
              medium: {
                url: 'https://i.ytimg.com/vi/w2_VxYNZG5Y/mqdefault.jpg',
                width: 320,
                height: 180
              },
              high: {
                url: 'https://i.ytimg.com/vi/w2_VxYNZG5Y/hqdefault.jpg',
                width: 480,
                height: 360
              },
              standard: {
                url: 'https://i.ytimg.com/vi/w2_VxYNZG5Y/sddefault.jpg',
                width: 640,
                height: 480
              },
              maxres: {
                url: 'https://i.ytimg.com/vi/w2_VxYNZG5Y/maxresdefault.jpg',
                width: 1280,
                height: 720
              }
            },
            channelTitle: 'ニートtokyo',
            tags: ['ニート東京', 'ラッパー', '刑務所'],
            categoryId: '22',
            liveBroadcastContent: 'none',
            localized: {
              title: 'MOGURA : DOTAMAについて',
              description:
                '撮影場所『BAN×KARA ZONE-DS 歌舞伎町店』\n\nアーティスト情報\n\n北海道札幌市出身。北嶺高等学校卒、慶應義塾大学法学部政治学科在学中。中高を通して6年間、野球部に所属。また、BAZOOKA!!! 高校生RAP選手権出場したり、政治家に取材したりと活動は多岐に渡る。\n\nTwitter - https://mobile.twitter.com/mogura_2000_\nInstagram - https://www.instagram.com/mogura_2000_/\n\n\nニートtokyo@every 9pm\n\n■ニートtokyo■\n□twitter□\nhttps://twitter.com/neettokyo\n\n□instagram□\nhttps://www.instagram.com/neettokyo/'
            },
            defaultAudioLanguage: 'ja'
          }
        }
      ]
    }
    const res = create(mock)
    expect(isRight(res)).toEqual(true)
    if (isLeft(res)) {
      throw new Error('an unexpected behaviour')
    }
    expect(res.right.items[0].id).toEqual('w2_VxYNZG5Y')
  })
})
