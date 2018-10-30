/* eslint-disable */
import isLoadingReducer from '../isLoadingReducer';

describe('isLoadingReducer', () => {
  it('should return the default state', () => {
    const expected = false

    const result = isLoadingReducer(undefined, {})

    expect(result).toEqual(expected)
  })

  it('should return state when loading', () => {
    const expected = true

    const mockAction = {
    type: 'IS_LOADING',
    isLoading: true
  }
    const result = isLoadingReducer(true, mockAction)

    expect(result).toEqual(expected)
  })

})