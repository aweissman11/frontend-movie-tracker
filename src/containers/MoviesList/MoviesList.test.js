/* eslint-disable */
import React from 'react';
import { shallow } from 'enzyme';
import { MoviesList, mapStateToProps, mapDispatchToProps } from './index'
import { getMovieList, updateFavorites } from '../../actions/thunkActions/movieListThunk'
import { getUserLoggedIn } from '../../actions/'

describe('MoviesList', () => {
  it('should match the snapshot MoviesList', () => {
    const setFetchedMovies = jest.fn()
    const setFavorites = jest.fn()
    const user = {
      name: 'Laura', 
      id: 2
    }
    const wrapper = shallow(<MoviesList user={user} setFavorites={setFavorites} setFetchedMovies={setFetchedMovies} movies={{}}/>)
    expect(wrapper).toMatchSnapshot()
    })

  describe('mapStateToProps', () => {
    it('should map the state to props', () => {
      const user = {
          name: 'Laura',
          id: 1
      }

      const movies = {
        title: "Back To The Future"
      }

      const favorites = {
        title: 'Boyhood'
      } 

      const expected = {user, movies, favorites}

      const mockState = {
        user: user,
        movies: movies, 
        favorites: favorites
      }
      const mappedProps = mapStateToProps(mockState)
      expect (mappedProps).toEqual(expected)

  })
})

  describe('mapDispatchToProps', () => {
    it('calls dispatch with a getMovieList action when setFetchedMovies is called', () => {

      const movies = [ {title: 'Mean Girls'}, {title: 'Spiderman'} ]
      
      const mockDispatch = jest.fn()
      const actionToDispatch = getMovieList(movies)
      
      const mappedProps = mapDispatchToProps(mockDispatch)
      mappedProps.setFetchedMovies(movies)
      
      expect(mockDispatch).toHaveBeenCalled
    })
    it('should dispatch with a updateFavorites action when setFavorites is called', () => {
      const favorites = [ {title: 'Mean Girls'}, {title: 'Spiderman'} ]
      
      const movies = [ {title: 'Mean Girls'}, {title: 'Spiderman'} ]
      const mockDispatch = jest.fn()
      
      const actionToDispatch = updateFavorites(favorites)
      
      const mappedProps = mapDispatchToProps(mockDispatch)
      mappedProps.setFavorites(favorites)

      expect(mockDispatch).toHaveBeenCalled
    })
    it('should dispatch with getUserLoggedIn action when logIn is called', () => {

      const user = {name: 'Laura', id: 1}

      const mockDispatch = jest.fn()

      const actionToDispatch = getUserLoggedIn({user})

      const mappedProps = mapDispatchToProps(mockDispatch)
      mappedProps.logIn({user})

      expect(mockDispatch).toHaveBeenCalled
    })
  })
})

