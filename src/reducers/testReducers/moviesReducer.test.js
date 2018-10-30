/* eslint-disable */
import moviesReducer from '../moviesReducer';

describe('moviesReducer', () => {
  it('should return the default state', () => {
    const expected = {}

    const result = moviesReducer(undefined, {})

    expect(result).toEqual(expected)
  })

  it('should return state with the movies', () => {
    const expected = [
      {
        title: 'Die Hard',
        rating: 'R'
      },
      {
        title: 'Die Hard 2',
        rating: 'R'
      },
      {
        title: 'Die Hard with a Vengeance',
        rating: 'R'
      }
    ]

    const mockAction = {
      type: 'SET_MOVIE_LIST',
      movies: expected
    }

    const result = moviesReducer(null, mockAction)

    expect(result).toEqual(expected)
  })
})