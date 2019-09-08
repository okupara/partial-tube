export type Status<T> = {
  tag: T
}
export const buildStatusCreator = <T, S extends Status<T>>(
  tag: T
): (() => S) => {
  return () => {
    const res = { tag }
    return res as S // mmm... I should figure out a better way...
  }
}
