import { validateVideoId } from '../src/workflow/AddVideo'

describe('AddVideo', () => {
  it('should be succeeded', () => {
    const res = validateVideoId('https://www.youtube.com/watch?v=JkF8AZeiY5E')
    expect(res).toEqual('JkF8AZeiY5E')
  })
  it('should be null', () => {
    const res = validateVideoId('https://www.youte.com/watch?v=JkF8AZeiY5E')
    expect(res).toEqual(null)
  })
})
