import * as Actions from '../index';

describe('actions', () => {
  it('should have a type of GET_MOVIE_LIST', () => {
    const movies = [
      {
        title: 'Die Hard',
        rating: 'R'
      },
      {
        title: 'Die Hard',
        rating: 'R'
      }
    ]
    const expected = {
      type: 'GET_MOVIE_LIST',
      movies
    }

    const result = Actions.getMovieList(movies)

    expect(result).toEqual(expected);
  })
})