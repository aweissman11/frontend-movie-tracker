/* eslint-disable */
import hasErroredReducer from '../hasErroredReducer'

describe('hasErroredReducer', () => {
  it('should return the default state', () => {
    
    const expected = false 

    const result = hasErroredReducer(undefined, {})

    expect(result).toEqual(expected)
  })

  it('should return state with the movies', () => {
    
    const expected = true

    const mockAction = {
      type: 'SET_HAS_ERRORED',
      hasErrored: expected
    }

    const result = hasErroredReducer(true, mockAction)

    expect(result).toEqual(expected)
  })
})