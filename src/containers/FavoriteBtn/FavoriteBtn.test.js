import React from 'react';
import { shallow, mount } from 'enzyme';

import { FavoriteBtn, mapDispatchToProps, mapStateToProps } from './index';
import * as Actions from '../../actions';


describe('FavoriteBtn', () => {
  let wrapper;
  let movies = [{
    movie_id: 1,
    user_id: 1,
    title: 'mock title',
    poster_path: 'mockpath',
    release_date: 20180101,
    vote_average: 5,
    overview: 'mock overview',
    genre_ids: [0, 1]
  }];
  let user = {
    id: 1
  }
  let favorites = [{
    movie_id: 1,
    user_id: 1,
    title: 'mock title',
    poster_path: 'mockpath',
    release_date: 20180101,
    vote_average: 5,
    overview: 'mock overview',
    genre_ids: [0, 1]
  }];

  beforeEach(() => {
    wrapper = shallow(<FavoriteBtn 
      user={user}
      movies={movies}
      favorites={favorites}
    />)
  })
  
  
  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  })
  
  
  it('should toggle favorite on click', () => {
    const mockToggleFavorite = jest.fn();

    wrapper.instance().toggleFavorite = mockToggleFavorite;

    wrapper.find('.favorite-btn').simulate('click');

    expect(mockToggleFavorite).toHaveBeenCalled();
  });

  describe('callAddFavorite', () => {
    beforeEach(() => {

    });

    it('should call fetch with the correct parameters', async () => {
      const mockAddFavorite = jest.fn().mockImplementation(() => {
        return Promise.resolve({})
      });

      await wrapper.setState({
        userDataBaseFetch: {
          addFavorite: mockAddFavorite()
        }
      });

      await wrapper.instance().callAddFavorite(movies, user, favorites, 2);

      expect(mockAddFavorite).toHaveBeenCalledWith(movies)
    });
  });



  it('should be isFavorited if it has been favorited', () => {
    
  })

  describe.skip('mapStateToProps', () => {
    it('should map the state to props', () => {
      const mockUser = {
          name: 'Aaron',
          id: 1
      }

      const mockMovies = [
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

      const mockFavorites = [
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
      
      const expectedUser = mockUser
      const expectedMovies = mockMovies
      const expectedFavorites = mockFavorites
      const mockState = {
        user: {...mockUser},
        movies: mockMovies,
        favorites: mockFavorites
      }
      
      const mappedProps = mapStateToProps(mockState);
      expect(mappedProps.user).toEqual(expectedUser)
      expect(mappedProps.movies).toEqual(expectedMovies)
      expect(mappedProps.favorites).toEqual(expectedFavorites)
    })
    
  })
  
  describe.skip('mapDispatchToProps', () => {
    it('should map the dispatch to props', () => {
      const mockUser = {
        name: 'Aaron',
        id: 1
      }

      const mockFavorites = [
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

      const mockDispatch = jest.fn();
      const actionToDispatch = Actions.updateFavorites(mockFavorites)
      const mappedProps = mapDispatchToProps(mockDispatch);
      
      mappedProps.setFavorites(mockFavorites)

    expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    })
  })
})