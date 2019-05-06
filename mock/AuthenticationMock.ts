import {
  Authenticated,
  UnAuthenticated,
  AuthenticationType
} from "../src/domain"
import { UserMock } from "./UserMock"

export const UnAuthenticatedMock: UnAuthenticated = {
  type: AuthenticationType.UnAuthenticated
}
export const AuthenticatedMock: Authenticated = {
  type: AuthenticationType.Authenticated,
  user: UserMock
}
