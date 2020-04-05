/// <reference types="next" />
/// <reference types="next/types/global" />

declare module "*.graphqls" {
  import { DocumentNode } from "graphql"
  export default typeof DocumentNode
}

type FirebaseType = import("firebase")
type FireStoreType = import("firebase").firestore.Firestore

type RequestWithSession = import("http").IncomingMessage & {
  session?: {
    user: User.Model
  }
}
