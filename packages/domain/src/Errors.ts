export namespace InvalidTokenError {
  const tag = 'InvalidTokenError'
  export type Type = {
    tag: typeof tag
    message: string
  }
  export const create = (): Type => ({
    tag,
    message: 'Your token is not valid'
  })
}

export namespace InvalidResponseError {
  const tag = 'InvalidResponseError'
  export type Type = {
    tag: typeof tag
    message: string
  }
  export const create = (): Type => ({
    tag,
    message: 'The response is not supposed to be'
  })
}
