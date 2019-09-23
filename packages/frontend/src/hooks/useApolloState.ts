// import { useEffect, useState } from 'react'
import { MutationTuple } from '@apollo/react-hooks'
import * as AS from '@partial-tube/domain/lib/ApolloState'
import { QueryResult } from '@apollo/react-common'
import { QueryLazyOptions } from '@apollo/react-hooks'

export const useStateMutation = <TData, TValiables>(
  mutationHookRes: MutationTuple<TData, TValiables>
) => {
  const [dispatcher, result] = mutationHookRes
  const state = useApolloResultState(result)
  return {
    dispatcher,
    state
  }
}

type LazyDispatcher<TValiables> = (option: QueryLazyOptions<TValiables>) => void
type LazyQueryTuple<TData, TValiables> = [
  LazyDispatcher<TValiables>,
  QueryResult<TData, TValiables>
]
export const useStateLazyQuery = <TData, TVariables>(
  lazyQueryRes: LazyQueryTuple<TData, TVariables>
) => {
  const [dispatcher, result] = lazyQueryRes
  const state = useApolloResultState(result)
  return {
    dispatcher,
    state
  }
}

type ApolloResult<TData, TVariables> =
  | MutationTuple<TData, TVariables>[1]
  | QueryResult<TData, TVariables>
const useApolloResultState = <TData, TValiables>(
  result: ApolloResult<TData, TValiables>
) => {
  return AS.toState(result.loading, result.error, result.data)
}
