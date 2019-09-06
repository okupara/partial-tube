import { concatNullable } from '../ClassConcatinator'
describe('class concatinator', () => {
  it('should create invalid className', () => {
    expect(concatNullable('classA')).toEqual('classA')
    expect(concatNullable('classA', undefined)).toEqual('classA')
    expect(concatNullable('classA', 'classB')).toEqual('classA classB')
    expect(concatNullable(undefined)).toEqual('')
  })
})
