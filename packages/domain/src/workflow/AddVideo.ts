/*
  Here, I don't care about shorten urls like "youtu.be"
  this app assume users put video urls with copy and paste from the address bars.
  Youtube doesn't show users "youtu.be" when they access.
*/

import { Either, left, right, fold, isRight } from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/pipeable'
import { create as GqlYTVideoCreate } from '../YTVideo'

const reg = /https*:\/\/(m\.|www\.)*youtube\.com\/watch\?/
export const validateVideoId = (s: string) => {
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

export const validateStartEndSec = (startSec: number, endSec: number) =>
  startSec >= endSec

export const validateNumber = (sec: string) => !isNaN(parseFloat(sec))

type Status<T> = {
  tag: T
}
const buildStatusCreator = <T, S extends Status<T>>(tag: T): (() => S) => {
  return () => {
    const res = { tag }
    return res as S // mmm... I should figure out a better way...
  }
}

namespace InvalidVideoUrlError {
  const tag = 'InvalidVideoUrlError'
  export type Type = Status<typeof tag>
  export const create = buildStatusCreator<typeof tag, Type>(tag)
}

export type VideoUrlErrors = InvalidVideoUrlError.Type

export const validateVideoUrl = (
  value: string
): Either<VideoUrlErrors, string> => {
  const res = validateVideoId(value)
  if (res) {
    return right(res)
  }
  return left(InvalidVideoUrlError.create())
}

export namespace NeverLoadedVideo {
  const tag = 'NeverLoadedVideo'
  export type Type = Status<typeof tag>
  export const create = buildStatusCreator<typeof tag, Type>(tag)
}

export namespace NotExitedVideoError {
  const tag = 'NotExitedVideoError'
  export type Type = Status<typeof tag>
  export const create = buildStatusCreator<typeof tag, Type>(tag)
}

export namespace InvalidResponseError {
  const tag = 'InvalidResponseError'
  export type Type = Status<typeof tag>
  export const create = buildStatusCreator<typeof tag, Type>(tag)
}

export namespace NetworkError {
  const tag = 'NetworkError'
  export type Type = Status<typeof tag>
  export const create = buildStatusCreator<typeof tag, Type>(tag)
}

export namespace ExistedVideo {
  export const tag = 'ExistedVideo'
  export type Type = Status<typeof tag> & {value: string}
  export const create = buildStatusCreator<typeof tag, Type>(tag)
}

type ExistedVideoRight = NeverLoadedVideo.Type | ExistedVideo.Type
export type ExistedVideoLeft =
  | NotExitedVideoError.Type
  | NetworkError.Type
  | InvalidResponseError.Type
export type ExistedVideo = Either<ExistedVideoLeft, ExistedVideoRight>

export const validateGqlVideo = (responseData: unknown): ExistedVideo => {
  return pipe(
    GqlYTVideoCreate(responseData),
    fold(
      e => (console.log(e), left(InvalidResponseError.create())),
      _ => right(ExistedVideo.create())
    )
  )
}

export const createNetworkError = () => left(NetworkError.create())
export const createNeverLoadedVideo = () => right(NeverLoadedVideo.create())
export const createExistedVideo = () => right(ExistedVideo.create())

export const loadedExixtedVideo = (a: ExistedVideo): a is ExistedVideo =>
  isRight(a) && a.right.tag === ExistedVideo.tag
