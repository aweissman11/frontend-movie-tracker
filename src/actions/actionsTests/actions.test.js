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

  it('should have a type of GET_USER_LOGGED_IN', () => {
    const id = 1
    const name = 'Laura'
    
    const expected = {
      type: 'GET_USER_LOGGED_IN',
      user: {
        name: 'Laura',
        id: 1
      }
    }

    const result = Actions.getUserLoggedIn(id, name);

    expect(result).toEqual(expected);
  })

  it('should have a type of LOG_USER_OUT', () => {
    const expected = {
      type: 'LOG_USER_OUT'
    }

    const result = Actions.logUserOut();

    expect(result).toEqual(expected);
  })
})