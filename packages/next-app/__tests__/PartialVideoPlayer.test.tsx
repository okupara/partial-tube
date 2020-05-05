import { renderHook, act } from "@testing-library/react-hooks"
import { usePlayerQueue } from "../src/layouts/PartialVideoPlayer"
import { partialVideListMock } from "../__mocks__/ParitalVideoList"

describe("PartialVideoPlayer", () => {
  it("should work as a iterator", () => {
    const { result } = renderHook(() => usePlayerQueue(partialVideListMock))
    expect(result.current.currentPartialVideo).toStrictEqual(partialVideListMock[0])
    act(() => {
      result.current.next()
    })
    expect(result.current.currentPartialVideo).toStrictEqual(partialVideListMock[1])
    act(() => {
      result.current.next()
    })
    expect(result.current.currentPartialVideo).toStrictEqual(partialVideListMock[2])
    act(() => {
      result.current.next()
    })
    // nothing changes because it reaches the end of the elements
    expect(result.current.currentPartialVideo).toStrictEqual(partialVideListMock[2])
  })
  it("should returns the first one when prev() calls too much", () => {
    const { result } = renderHook(() => usePlayerQueue(partialVideListMock))
    for (let i = 0; i < 2; i++) {
      act(() => {
        result.current.next()
      })
    }
    expect(result.current.currentPartialVideo).toStrictEqual(partialVideListMock[2])
    for (let i = 0; i < 4; i++) {
      act(() => {
        result.current.prev()
      })
    }
    expect(result.current.currentPartialVideo).toStrictEqual(partialVideListMock[0])
  })
})
