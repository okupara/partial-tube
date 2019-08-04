export interface Record {
  name: string
  avatarUrl: string | null
}

export const createUser = (n: string | null, u: string | null): Record => {
  const name = n ? n : 'anonymous'
  return {
    name,
    avatarUrl: u
  }
}
