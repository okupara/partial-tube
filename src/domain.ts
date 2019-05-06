export interface User {
  name: string
  avatarUrl: string
}

export enum AuthenticationType {
  Authenticated = "Authenticated",
  UnAuthenticated = "UnAuthenticated"
}

export interface Authenticated {
  type: AuthenticationType.Authenticated
  user: User
}

export interface UnAuthenticated {
  type: AuthenticationType.UnAuthenticated
}

export type Authentication = Authenticated | UnAuthenticated

export const isAuthenticated = (auth: Authentication): auth is Authenticated =>
  auth.type === AuthenticationType.Authenticated
