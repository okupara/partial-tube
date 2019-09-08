import * as t from 'io-ts'
import * as FilledString from './core/FilledString'

const RecordRuntime = t.type({ value: FilledString.runtimeType })
export type Record = t.TypeOf<typeof RecordRuntime>

const tokenRecordRuntime = new t.Type<Record, string, string>(
  'Token',
  (i): i is Record => RecordRuntime.is(i),
  i => t.success({ value: i }),
  a => a.value
)

export const runtimeType = FilledString.runtimeType.pipe(tokenRecordRuntime)

export const create = runtimeType.decode
