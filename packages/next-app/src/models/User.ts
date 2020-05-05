export type Model = Readonly<{
  id: string
  name: string | null
  avatarUrl: string | null
}>

export const create = (params: Partial<Model>): Model => ({
  id: params.id || "",
  name: params.name || null,
  avatarUrl: params.avatarUrl || "",
})
