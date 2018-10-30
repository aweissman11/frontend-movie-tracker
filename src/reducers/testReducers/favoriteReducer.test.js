/* eslint-disable */
import favoritesReducer from '../favoritesReducer';
import * as Actions from '../../actions';

describe('favoritesReducer', () => {
  it('should return the default state', () => {
    const expected = []

    const result = favoritesReducer(undefined, {})

    expect(result).toEqual(expected)
  })

  it('should return state with favorites', () => {
    const expected = [
      {
        title: 'Mean Girls'
      },
      {
        title: 'Back to the future'
      }
    ]
    const mockAction = {
      type: 'SET_FAVORITES',
      favorites: expected
    }

    const result = favoritesReducer(null, mockAction)

    expect(result).toEqual(expected)
  })  
})