// import { useEffect, useState } from 'react'
import { MutationTuple } from '@apollo/react-hooks'
import * as AS from '@partial-tube/domain/lib/ApolloState'
import { QueryResult } from '@apollo/react-common'
import { QueryLazyOptions } from '@apollo/react-hooks'

type Validate<TData> = { validate?: AS.Validate<TData> }

type StateMutationParam<TData, TVariables> = {
  mutationResult: MutationTuple<TData, TVariables>
}

export const useStateMutation = <TData, TVariables>({
  mutationResult,
  validate
}: StateMutationParam<TData, TVariables> & Validate<TData>) => {
  const [dispatcher, result] = mutationResult
  const state = useApolloResultState({ apolloResult: result, validate })
  return {
    dispatcher,
    state
  }
}

type LazyDispatcher<TVariables> = (option: QueryLazyOptions<TVariables>) => void
type LazyQueryTuple<TData, TVariables> = [
  LazyDispatcher<TVariables>,
  QueryResult<TData, TVariables>
]
type StateLazyQueryParam<TData, TVariables> = {
  lazyQueryResult: LazyQueryTuple<TData, TVariables>
}
export const useStateLazyQuery = <TData, TVariables>({
  lazyQueryResult,
  validate
}: StateLazyQueryParam<TData, TVariables> & Validate<TData>) => {
  const [dispatcher, result] = lazyQueryResult
  const state = useApolloResultState({ apolloResult: result, validate })
  return {
    dispatcher,
    state
  }
}

type ApolloResult<TData, TVariables> = {
  apolloResult:
    | MutationTuple<TData, TVariables>[1]
    | QueryResult<TData, TVariables>
}

const useApolloResultState = <TData, TValiables>({
  apolloResult,
  validate
}: ApolloResult<TData, TValiables> & Validate<TData>) => {
  return AS.toState({
    waiting: apolloResult.loading,
    error: apolloResult.error,
    data: apolloResult.data,
    validate
  })
}
