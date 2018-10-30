/* eslint-disable */
import searchQueryReducer from '../searchQueryReducer';

describe('searchQueryReducer', () => {
  it('should return the default state', () => {
    const expected = ''

    const result = searchQueryReducer(undefined, {})

    expect(result).toEqual(expected)
  })

  it('should return the state when a search is inputed', () => {
    const expected = 'comedy'

    const mockAction = {
      type: 'UPDATE_QUERY',
      searchQuery: expected
    }

    const result = searchQueryReducer(null, mockAction)

    expect(result).toEqual(expected)
  })

})