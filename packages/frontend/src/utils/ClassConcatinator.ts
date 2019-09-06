type NullableString = string | null | undefined

export const concatNullable = (...args: NullableString[]) =>
  args.filter(e => !!e).join(' ')
