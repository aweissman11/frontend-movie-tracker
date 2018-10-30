/* eslint-disable */
import filtersReducer from '../filtersReducer'

describe('filtersReducer', () => {
  it('should return the default state', () => {
    
    const expected = {
    genre: null,
    year: null,
    rating: null,
    sort: null
    }

    const result = filtersReducer(undefined, {})

    expect(result).toEqual(expected)
  })

  it('should return state with the movies', () => {
    
    const expected = {
    genre: 'comedy',
    year: 2018,
    rating: 5,
    sort: 'most popular'
    }

    const mockAction = {
      type: 'UPDATE_FILTERS',
      filters: expected
    }

    const result = filtersReducer(null, mockAction)

    expect(result).toEqual(expected)
  })
})