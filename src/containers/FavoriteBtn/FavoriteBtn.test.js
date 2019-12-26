/* eslint-disable */
import React from 'react';
import { shallow, mount } from 'enzyme';

import { FavoriteBtn, mapDispatchToProps, mapStateToProps } from './index';
import * as Actions from '../../actions';
1

describe('FavoriteBtn', () => {
  let wrapper;

  let movies = [{
    id: 1,
    movie_id: 1,
    user_id: 1,
    title: 'mock title',
    poster_path: 'mockpath',
    release_date: 20180101,
    vote_average: 5,
    overview: 'mock overview'
  }];

  let formatedMovie = {
    movie_id: 1,
    user_id: 1,
    title: 'mock title',
    poster_path: 'https://image.tmdb.org/t/p/w400_and_h600_bestv2mockpath',
    release_date: 20180101,
    vote_average: 5,
    overview: 'mock overview'
  }

  let user = {id: 1}

  let favorites = [{
    movie_id: 1,
    user_id: 1,
    title: 'mock title',
    poster_path: 'https://image.tmdb.org/t/p/w400_and_h600_bestv2mockpath',
    release_date: 20180101,
    vote_average: 5,
    overview: 'mock overview'
  }];

  const mockSetFavorites = jest.fn();

  beforeEach(() => {
    wrapper = shallow(<FavoriteBtn 
      user={user}
      movies={movies}
      favorites={favorites}
      setFavorites={mockSetFavorites}
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
    let mockAddFavorite;

    beforeEach(async () => {
      mockAddFavorite = jest.fn().mockImplementation(() => {
        return Promise.resolve({})
      });

      await wrapper.setState({
        userDataBaseFetch: {
          addFavorite: mockAddFavorite
        }
      });
    });

    it('should call fetch with the correct parameters', async () => {
      wrapper.instance().formatFavorite = jest.fn(() => {
        return (formatedMovie);
      });

      await wrapper.instance().callAddFavorite(movies, user, favorites, 1);

      expect(mockAddFavorite).toHaveBeenCalledWith(formatedMovie)
    });

    it('should call formatFavorite with the correct parameters', async () => {
      const mockFormatFavorite = jest.fn();
      wrapper.instance().formatFavorite = mockFormatFavorite;

      await wrapper.instance().callAddFavorite(movies, user, favorites, 1);
    });

    it('should set state when callAddFavorite is called', async () => {
      const mockFormatFavorite = jest.fn(() => {
        return formatedMovie;
      });
      wrapper.instance().formatFavorite = mockFormatFavorite;

      await wrapper.instance().callAddFavorite(movies, user, favorites, 1);

      expect(wrapper.state().isFavorite).toEqual(true);
    });

    it('should call setFavorites', async () => {
      const mockFormatFavorite = jest.fn(() => {
        return formatedMovie;
      });
      wrapper.instance().formatFavorite = mockFormatFavorite;

      await wrapper.instance().callAddFavorite(movies, user, favorites, 1); 

      expect(mockSetFavorites).toHaveBeenCalledWith([formatedMovie, formatedMovie]);   
    });

    it('should call setState on a catch', () => {
      mockAddFavorite = jest.fn().mockImplementation(() => {
        return Promise.reject({})
      });
      wrapper.instance().clearFailedFav = jest.fn();

      wrapper.setState({
        userDataBaseFetch: {addFavorite: mockAddFavorite}
      });

      wrapper.instance().callAddFavorite();

      expect(wrapper.state().failed).toEqual(true);
    });
  });

  describe('clearFailedFav', () => {
    it('should call setState', () => {
      wrapper.setState({
        failed: true
      });

      wrapper.instance().clearFailedFav();

      expect(wrapper.state().failed).toEqual(false);
    });
  });

  describe('callRemoveFavorite', () => {
    let mockRemoveFavorite;

    beforeEach(() => {
      mockRemoveFavorite = jest.fn().mockImplementation(() => {
        return Promise.resolve({});
      });
      wrapper.instance().removeFavorite = mockRemoveFavorite;
    });

    it('should call removeFavorite with the correct parameters', async () => {
      await wrapper.instance().callRemoveFavorite(user, 1, favorites);

      expect(mockRemoveFavorite).toHaveBeenCalledWith(1, 1);
    });

    it('should call setFavorites with the correct parameters', async () => {
      await wrapper.instance().callRemoveFavorite(user, 1, favorites);

      expect(mockSetFavorites).toHaveBeenCalledWith([]);
    });

    it('should set state when called', async () => {
      await wrapper.instance().callRemoveFavorite(user, 1, favorites);

      expect(wrapper.state().isFavorite).toEqual(false);
    })

  });

  describe('clearNotLoggedIn', () => {
    it('should set state', () => {
      wrapper.setState({
        notLoggedIn: true
      });

      wrapper.instance().clearNotLoggedIn()

      expect(wrapper.state().notLoggedIn).toEqual(false)
    });
  });

  describe('toggleFavorite', () => {
    let mockCallAddFavorite;
    let mockCallRemoveFavorite;

    beforeEach(() => {
      mockCallAddFavorite = jest.fn().mockImplementation(() => {
        return Promise.resolve({})
      });
      mockCallRemoveFavorite = jest.fn().mockImplementation(() => {
        return Promise.resolve({})
      })
      wrapper.instance().callAddFavorite = mockCallAddFavorite;
      wrapper.instance().callRemoveFavorite = mockCallRemoveFavorite;
    });

    it('should call addFavorites if the movie is not in favorites and the user is logged in', async () => {
      await wrapper.instance().toggleFavorite(2);

      expect(mockCallAddFavorite).toHaveBeenCalledWith(movies, user, favorites, 2);
    });

    it('should call removeFavorite if the movie is in favorites and the user is logged in', async () => {
      await wrapper.instance().toggleFavorite(1);

      expect(mockCallRemoveFavorite).toHaveBeenCalledWith({id: 1}, 1, favorites);
    });

  });

  describe('removeFavorite', () => {
    let mockRemoveFavorite;

    beforeEach(async () => {
      mockRemoveFavorite = jest.fn().mockImplementation(() => {
        return Promise.resolve({});
      });

      await wrapper.setState({
        userDataBaseFetch: {removeFavorite: mockRemoveFavorite}
      });
    });

    it('should call removeFavorite with the correct parameters', async () => {


      await wrapper.instance().removeFavorite(1, 2);

      expect(mockRemoveFavorite).toHaveBeenCalledWith(1, 2);
    });
  });

  describe('formatFavorite', () => {
    it('should return an array', () => {
      const expected = formatedMovie
      const result = wrapper.instance().formatFavorite(movies, {id: 1}, 1)

      expect(result).toEqual(expected);
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