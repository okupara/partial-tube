import * as FP from 'fp-ts/lib/Either'
import * as AS from '../core/AbstractState'
import * as FirebaseModel from './Firebase'
import * as ApolloModel from '../ApolloState'

export namespace Init {
  export const tag = 'AuthInit'
  export type Type = AS.Status<typeof tag>
  export const create = AS.buildStatusCreator<typeof tag, Type>(tag)
}

export namespace Success {
  export const tag = 'AuthSuccess'
  export type Type = AS.Status<typeof tag>
  export const create = AS.buildStatusCreator<typeof tag, Type>(tag)
}

export namespace ReadyToSaveInfo {
  export const tag = 'AuthReadyToSaveInfo'
  export type Type = AS.ValueStatus<typeof tag, FirebaseModel.Record>
  export const create = AS.buildValueStatusCreator<
    typeof tag,
    FirebaseModel.Record,
    Type
  >(tag)
}

export namespace AuthError {
  export const tag = 'AuthError'
  export type Type = AS.ErrorStatus<typeof tag>
  export const create = AS.buildErrorStatusCreator<typeof tag, Type>(
    tag,
    'hello',
    'AUE'
  )
}

export type RightState =
  | Init.Type
  | FirebaseModel.InProgress.Type
  | ApolloModel.InProgress.Type
  | ReadyToSaveInfo.Type
  | Success.Type
export type LeftState = AuthError.Type
export type State = FP.Either<LeftState, RightState>

export const createState = <V>(
  firebaseState: FirebaseModel.State,
  apolloState: ApolloModel.State<V>
): State => {
  if (
    FirebaseModel.isSucceeded(firebaseState) &&
    ApolloModel.isSucceeded(apolloState)
  ) {
    return FP.right(Success.create())
  }
  if (FirebaseModel.isInProgress(firebaseState))
    return FP.right(FirebaseModel.InProgress.create())

  if (
    FirebaseModel.isSucceeded(firebaseState) &&
    ApolloModel.isInit(apolloState)
  )
    return FP.right(ReadyToSaveInfo.create(firebaseState.right.value))

  if (ApolloModel.isInProgress(apolloState))
    return FP.right(ApolloModel.InProgress.create())

  // TODO: Implement failed cases...

  return FP.right(Init.create())
}

type MatchFuncs<T> = {
  waiting: () => T
  success: () => T
  failed: (error: AS.PTError) => T
}

export const isReadyToSave = (
  state: State
): state is FP.Right<ReadyToSaveInfo.Type> =>
  FP.isRight(state) ? state.right.tag === ReadyToSaveInfo.tag : false

export const match = <T>(state: State, funcs: MatchFuncs<T>): T => {
  if (FP.isLeft(state)) {
    return funcs.failed(new AS.PTError('test', 'SSSS'))
  }
  switch (state.right.tag) {
    case Success.tag:
      return funcs.success()
    default:
      return funcs.waiting()
  }
}
