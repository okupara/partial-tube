import * as t from 'io-ts'

export const YTVideoSnippet = t.type({
  title: t.string,
  description: t.string
})

export const YTVideo = t.type({
  id: t.string,
  snippet: YTVideoSnippet
})

export const YTVideoResult = t.type({
  items: t.array(YTVideo)
})

export type YTVideoResult = t.TypeOf<typeof YTVideoResult>
export const create = YTVideoResult.decode
