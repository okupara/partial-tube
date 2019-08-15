import * as t from 'io-ts'

/*
  Here, I don't care about shorten urls like "youtu.be"
  this app assume users put video urls with copy and paste from the address bars.
  Youtube doesn't show users "youtu.be" when they access.
*/
export namespace VideoId {
  const BaseType = t.type({ value: t.string, tag: t.literal('YoutubeVideoId') })
  type BaseType = t.TypeOf<typeof BaseType>
  const reg = /https*:\/\/(m\.|www\.)*youtube\.com\/watch\?/
  const getVideoId = (s: string): string | null => {
    if (s.match(reg)) {
      const splitted = s.split(reg)
      const targets = splitted[splitted.length - 1]
      return targets.split('&').reduce((p, c) => {
        const tmp = c.split('=')
        if (!tmp[1]) {
          return p
        }
        if (tmp[0] === 'v') {
          return tmp[1]
        }
        return p
      }, null)
    }
    return null
  }

  const runtimeVideoIdType = new t.Type<BaseType, string, string>(
    'RuntimeVideoIdType',
    BaseType.is,
    (i, c) => {
      const res = getVideoId(i)
      return res !== null
        ? t.success({ tag: 'YoutubeVideoId', value: res })
        : t.failure(i, c)
    },
    t => t.value
  )

  const runtimeType = t.string.pipe(runtimeVideoIdType)
  export const create = runtimeType.decode
}
