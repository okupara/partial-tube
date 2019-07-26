import { left } from 'fp-ts/lib/Either'
import { emptyTokenError, Result } from './EnsureAuthedUser'

export const unAuthedMock: Result = left(emptyTokenError())
