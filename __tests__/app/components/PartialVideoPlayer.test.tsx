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
})
