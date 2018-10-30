/* eslint-disable */
import setIsOk from '../notOkReducer'

describe('setIsOk', () => {
  it('should return the default state', () => {
    
    const expected = false 

    const result = setIsOk(undefined, {})

    expect(result).toEqual(expected)
  })

  it('should return state with the movies', () => {
    
    const expected = true

    const mockAction = {
      type: 'SET_IS_NOT_OK',
      hasErrored: true
    }

    const result = setIsOk(true, true)

    expect(result).toEqual(expected)
  })
})