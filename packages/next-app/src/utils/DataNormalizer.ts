import { useState, useCallback } from "react"
type Id = { id: string | number }

export type NormalizedData<T extends Id> = {
  ids: ReadonlyArray<Id["id"]>
  items: { [key: string]: T }
}

export const normalize = <T extends Id>(items: ReadonlyArray<T>) =>
  items.reduce(
    (p: NormalizedData<T>, c) => ({
      ids: [...p.ids, c.id],
      items: { ...p.items, [c.id]: c },
    }),
    { ids: [], items: {} } as NormalizedData<T>,
  )

export const remove = <T extends Id>(
  normalizedData: NormalizedData<T>,
  id: Id["id"],
) =>
  normalizedData.ids.reduce(
    (p: NormalizedData<T>, c) => {
      if (id === c) return p
      return {
        ids: [...p.ids, c],
        items: { ...p.items, [c]: normalizedData.items[c] },
      }
    },
    { ids: [], items: {} } as NormalizedData<T>,
  )

export const add = <T extends Id>(
  normalizedData: NormalizedData<T>,
  item: T,
): NormalizedData<T> => ({
  ids: [...normalizedData.ids, item.id],
  items: { ...normalizedData.items, [item.id]: item },
})

export const map = <V, T extends Id>(
  normalizedData: NormalizedData<T>,
  fn: (item: T) => V,
) => normalizedData.ids.map((id) => fn(normalizedData.items[id]))

export const itemsFromIds = <T extends Id>(
  normlizedData: NormalizedData<T>,
  ids: ReadonlyArray<Id["id"]>,
) =>
  ids.reduce<ReadonlyArray<T>>((p, c) => {
    const d = normlizedData.items[c]
    if (d) {
      return [...p, d]
    }
    return p
  }, [])

// it might be better to use this function with useMemo
export const toList = <T extends Id>(normalizedData: NormalizedData<T>) =>
  normalizedData.ids.map((id) => normalizedData.items[id])

// for hooks
export const useNormalizedData = <T extends Id>() => {
  const [normalizedData, setNormalizedData] = useState<NormalizedData<T> | null>(
    null,
  )

  const withNormalize = useCallback((items: ReadonlyArray<T>) => {
    setNormalizedData(normalize(items))
  }, [])
  const _itemsFromIds = useCallback(
    (ids: ReadonlyArray<Id["id"]>) => {
      return normalizedData ? itemsFromIds(normalizedData, ids) : []
    },
    [normalizedData],
  )

  return {
    normalizedData,
    itemsFromIds: _itemsFromIds,
    withNormalize,
  }
}
