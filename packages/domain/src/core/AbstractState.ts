export type Status<T> = {
  tag: T
}
export const buildStatusCreator = <T, S extends Status<T>>(
  tag: T
): (() => S) => {
  return () => {
    const res = { tag }
    return res as S // mmm... I should figure out a better way...
  }
}

export class PTError extends Error {
  code: string
  constructor(message: string, code: string) {
    super(message)
    this.code = code
  }
}

export type ErrorStatus<T> = {
  tag: T
  error: PTError
}

export const buildErrorStatusCreator = <T, S extends ErrorStatus<T>>(
  tag: T,
  errorMessage: string,
  errorCode: string
): (() => S) => {
  return () => {
    const res = { tag, error: new PTError(errorMessage, errorCode) }
    return res as S
  }
}

export type ValueStatus<T, V> = {
  tag: T
  value: V
}

export const buildValueStatusCreator = <T, V, S extends ValueStatus<T, V>>(
  tag: T
): ((value: V) => S) => {
  return (value: V) => {
    const res = { tag, value }
    return res as S
  }
}
