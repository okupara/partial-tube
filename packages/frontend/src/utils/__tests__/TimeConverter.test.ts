import { secToColoned } from '../TimeConverter'

describe('TimeConverter', () => {
  it('should show the times with coloned style ', () => {
    expect(secToColoned(60.1)).toEqual('01:00')
    expect(secToColoned(600.5)).toEqual('10:00')
  })
})
