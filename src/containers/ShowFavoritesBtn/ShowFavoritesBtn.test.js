/* eslint-disable */
import React from 'react';
import { shallow } from 'enzyme';
import { ShowFavoritesBtn, mapStateToProps, mapDispatchToProps } from './index'
import { getMovieList } from './__mocks__/getMovieList';

jest.mock('../../actions/thunkActions/movieListThunk');

describe('ShowFavoritesBtn', () => {
  let wrapper;
  let mockShowFavorites;
  let mockSetFavorites;
  const mockFavorites = [
    {
      movie_id: 4
    },
    {
      movie_id: 3
    },
  ];
  
  beforeEach(() => {
    mockShowFavorites = jest.fn();
    mockSetFavorites = jest.fn();

    wrapper = shallow(<ShowFavoritesBtn 
      favorites={mockFavorites}
      setFavorites={mockSetFavorites}
    />)
  });

  it.skip('should match the snapshot MoviesList', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('showfavorites should call setFavorites w/ the right params', () => {
    const expected = [4, 3];
    wrapper.instance().showFavorites();
    expect(mockSetFavorites).toHaveBeenCalledWith(expected);
  });

  // it('should call showFavorites on click', () => {
  //   wrapper.showFavorites = mockShowFavorites;
  //   wrapper.find('button').simulate('click');

  //   console.log(wrapper.instance().showFavorites)
  //   expect(mockShowFavorites).toHaveBeenCalled();
  // });
});

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
  });
});

  describe('mapDispatchToProps', () => {
    it('should map dispatch with getMovieList when setFavorites is called', () => {
      const mockDispatch = jest.fn();
      const movieIds = [100, 45];
      const mappedProps = mapDispatchToProps(mockDispatch)
      mappedProps.setFavorites(movieIds)
      expect(mockDispatch).toHaveBeenCalled()
    });
  });