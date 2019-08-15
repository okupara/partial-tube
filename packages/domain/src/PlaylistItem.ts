// import * as ds from './DateFromString'
// import * as t from 'io-ts'
// import * as id from './Id'

// type TagForId = { tag: 'PlayItemId' }
// type Id = TagForId & id.BaseStringId

// const Id = id.createIdType<Id>(value => ({ tag: 'PlayItemId', value }))

// const Command = t.type({
//   id: Id,
//   title: t.string,
//   videoId: t.string,
//   startSec: t.number,
//   endSec: t.number,
//   description: t.string,
//   created: ds.DateFromStringType,
//   modified: ds.DateFromStringType
// })
