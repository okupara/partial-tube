export interface User {
  name: string
  avatarUrl: string
}

export const createUser = (name: string, avatarUrl: string): User => ({
  name,
  avatarUrl
})
