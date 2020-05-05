import { normalize, add, remove } from "../src/utils/DataNormalizer"

test("normalize", () => {
  const dummyItems = [
    { id: "hoge1234", name: "hogename 1234", age: 88 },
    { id: "hoge1235", name: "hogename 1235", age: 90 },
    { id: "hoge1236", name: "hogename 1236", age: 91 },
    { id: "hoge1237", name: "hogename 1237", age: 92 },
    { id: "hoge1238", name: "hogename 1238", age: 93 },
  ]
  const hoge = normalize(dummyItems)
  expect(hoge.ids.length).toBe(dummyItems.length)
  expect(hoge.items[dummyItems[0].id]).toStrictEqual(dummyItems[0])

  const newRecord = { id: "hoge1239", name: "hogename 1239", age: 94 }
  const addedHoge = add(hoge, newRecord)
  expect(addedHoge.ids.length).toBe(dummyItems.length + 1)
  const theLastIndex = addedHoge.ids.length - 1
  expect(addedHoge.items[addedHoge.ids[theLastIndex]]).toStrictEqual(newRecord)

  const removedhoge = remove(hoge, dummyItems[0].id)
  expect(removedhoge.ids.length).toBe(dummyItems.length - 1)
})
