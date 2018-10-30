import * as Actions from '../index';

describe('actions', () => {
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

  it('should have a type SET_FAVORITES', () => {
    const favorites = [
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
    
    const expected = {
      type: 'SET_FAVORITES',
      favorites
    }

    const result = Actions.setFavorites(favorites);

    expect(result).toEqual(expected);
  })

  it('should have a type DISPLAY_LOGIN', () => {
    const expected = {type: 'DISPLAY_LOGIN'}

    const result = Actions.displayLogin()

    expect(result).toEqual(expected)
  })

  it('should have a type DISPLAY_SIGN_UP', () => {
    const expected = {type: 'DISPLAY_SIGN_UP'}

    const result = Actions.displaySignUp()

    expect(result).toEqual(expected)
  })

  it('should have a type of UPDATE_FILTERS', () => {
    const filters = {genre: 'comedy'}
    const expected = {
      type: 'UPDATE_FILTERS', 
      filters
    }

    const result = Actions.updateFilters(filters)

    expect(result).toEqual(expected)
  })

  it('should have a type of UPDATE_QUERY', () => {
    const searchQuery = 'abc'

    const expected = {
      type: 'UPDATE_QUERY', 
      searchQuery
    }

    const result = Actions.updateSearchQuery(searchQuery)

    expect(result).toEqual(expected)
  })

  it('should have a type of SET_MOVIE_LIST', () => {
    
    const movies = {title: 'Pasta'}

    const expected = {
      type: 'SET_MOVIE_LIST', 
      movies
    }

    const result = Actions.setMovieList(movies)
    
    expect(result).toEqual(expected)
  })

  it('should have a type of SET_HAS_ERRORED', () => {
    
    const bool = true

    const expected = 
    {"hasErrored": true, "type": "SET_HAS_ERRORED"}
    

    const result = Actions.setHasErrored(bool)
    
    expect(result).toEqual(expected)
  })

  it('should have a type of SET_IS_OK', () => {
    
    const bool = true

    const expected = {"notOk": true, "type": "SET_IS_NOT_OK"}
    
    const result = Actions.setIsOk(bool)
    
    expect(result).toEqual(expected)
  })

  it('should have a type of IS_LOADING', () => {
    
    const bool = true

    const expected = {"isLoading": true, "type": "IS_LOADING"}

    const result = Actions.isLoading(bool)
    
    expect(result).toEqual(expected)
  })

  it('should have a type of DEPLOY_FILTER_MODAL', () => {

    const bool = true

    const expected = {
      type: 'DEPLOY_FILTER_MODAL', 
      status: true
    }

    const result = Actions.deployFilterModal(bool)

    expect(result).toEqual(expected)
  })

})