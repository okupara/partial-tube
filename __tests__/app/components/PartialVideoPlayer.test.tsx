import { renderHook, act } from "@testing-library/react-hooks"
import { usePlayerQueue } from "../../../src/app/components/organisms/PartialVideoPlayer"
import { partialVideList } from "../../../mocks/ParitalVideoList"

describe("PartialVideoPlayer", () => {
  it("should work as a iterator", () => {
    const { result } = renderHook(() => usePlayerQueue(partialVideList))
    expect(result.current.currentPartialVideo).toStrictEqual(partialVideList[0])
    act(() => {
      result.current.next()
    })
    expect(result.current.currentPartialVideo).toStrictEqual(partialVideList[1])
    act(() => {
      result.current.next()
    })
    expect(result.current.currentPartialVideo).toStrictEqual(partialVideList[2])
    act(() => {
      result.current.next()
    })
    // nothing changes because it reaches the end of the elements
    expect(result.current.currentPartialVideo).toStrictEqual(partialVideList[2])
  })
  it("should returns the first one when prev() calls too much", () => {
    const { result } = renderHook(() => usePlayerQueue(partialVideList))
    for (let i = 0; i < 2; i++) {
      act(() => {
        result.current.next()
      })
    }
    expect(result.current.currentPartialVideo).toStrictEqual(partialVideList[2])
    for (let i = 0; i < 4; i++) {
      act(() => {
        result.current.prev()
      })
    }
    expect(result.current.currentPartialVideo).toStrictEqual(partialVideList[0])
  })
})
