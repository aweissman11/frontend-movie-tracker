import React from 'react';
// import ReactDOM from 'react-dom';
import { App, mapDispatchToProps, mapStateToProps } from './App';
import { getMovieList } from './actions';

describe('App', () => {
  // React component tests

  describe('mapStateToProps', () => {
    it('should map the state to props', () => {

      const mockMovies = [
        {
          title: 'Die Hard',
          rating: 'R'
        },
        {
          title: 'Die Hard',
          rating: 'R'
        }
      ]
      
      const expected = mockMovies
      
      const mockState = {
        movies: mockMovies,
        nothing: 'should be gone in expected'
      }
      
      const mappedProps = mapStateToProps(mockState)
      
      expect(mappedProps.movies).toEqual(expected)
    })
  })
  
  describe('mapDispatchToProps', () => {
    it('should map the dispatch to props', () => {
      const mockMovies = [
        {
          title: 'Die Hard',
          rating: 'R'
        },
        {
          title: 'Die Hard',
          rating: 'R'
        }
      ]
      const mockDispatch = jest.fn()
      const actionToDispatch = getMovieList(mockMovies)
      
      const mappedProps = mapDispatchToProps(mockDispatch)
      mappedProps.setFetchedMovies(mockMovies)

      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch)
      
    })
  })
})
  
  