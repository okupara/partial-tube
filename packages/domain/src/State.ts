export enum Tags {
  Init = 'Init',
  Error = 'Error',
  Waiting = 'Waiting',
  Done = 'Done'
}
export interface Init {
  tag: Tags.Init
}
export interface Error<E> {
  tag: Tags.Error
  error: E
}
export interface Waiting {
  tag: Tags.Waiting
}
export interface Done<T> {
  tag: Tags.Done
  result: T
}

export type Type<E, T> = Init | Done<T> | Error<E> | Waiting

export const init = (): Init => ({
  tag: Tags.Init
})

export const wait = (): Waiting => ({
  tag: Tags.Waiting
})

export const fail = <E>(error: E): Error<E> => ({
  tag: Tags.Error,
  error
})

export const complete = <T>(result: T): Done<T> => ({
  tag: Tags.Done,
  result
})

export interface Cases<E, T, J> {
  [Tags.Init]?: () => J
  [Tags.Waiting]?: () => J
  [Tags.Error]?: (error: E) => J
  [Tags.Done]?: (result: T) => J
}

export const notFinished = <E, T>(s: Type<E, T>): boolean =>
  s.tag === Tags.Init || s.tag === Tags.Waiting

export const isInit = <E, T>(s: Type<E, T>): s is Init => s.tag === Tags.Init
