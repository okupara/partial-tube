export const enum ErrorTypes {
  NoStoredTokenError = 'NoStoredTokenError'
}

export interface NoStoredTokenError {
  code: ErrorTypes.NoStoredTokenError
  message: string
}

export const createNoStoredTokenError = () => ({
  code: ErrorTypes.NoStoredTokenError,
  message: "Your token isn't stored in the storage."
})

export type PTError = NoStoredTokenError
