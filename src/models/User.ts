export type Model = Readonly<{
  id: string
  name: string
  avatarUrl: string
}>

export const create = (params: Partial<Model>): Model => ({
  id: params.id || "",
  name: params.name || "",
  avatarUrl: params.avatarUrl || "",
})
