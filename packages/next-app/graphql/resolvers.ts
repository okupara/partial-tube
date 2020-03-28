import { QueryResolvers } from "./type-defs.graphqls"

const Query: Required<QueryResolvers> = {
  viewer() {
    return { id: String(1), name: "John Smith", status: "cached" }
  },
}

export default { Query }
