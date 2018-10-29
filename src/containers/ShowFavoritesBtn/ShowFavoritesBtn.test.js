import React from 'react';
import { shallow } from 'enzyme';
import { showFavoritesBtn, mapStateToProps, mapDispatchToProps } from './index'
import { getMovieList } from '../../actions/thunkActions/movieListThunk'

describe('showFavoritesBtn', () => {
  it('should match the snapshot MoviesList', () => {
    const showFavorites = jest.fn()
    const wrapper = shallow(<showFavoritesBtn  showFavorites={showFavorites} />)
    expect(wrapper).toMatchSnapshot()
    })
})

  describe('mapStateToProps', () => {
    it('should map the state to props', () => {
      
      const favorites = 
       {"title": "Green Mile"}

      const expected = {favorites}

      const mockState = {
       favorites: favorites    
      }

      const mappedProps = mapStateToProps(mockState)
      expect (mappedProps).toEqual(expected)
  })
})

  describe('mapDispatchToProps', () => {
    it('should map dispatch with getMovieList when setFavorites is called', () => {

      const mockDispatch = jest.fn()

      const movieId = 1000
      const actionToDispatch = getMovieList(movieId)

      const mappedProps = mapDispatchToProps(mockDispatch)
      mappedProps.setFavorites(movieId)

      expect(mockDispatch).toHaveBeenCalled
    })
  })