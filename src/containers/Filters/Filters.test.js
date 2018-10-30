/* eslint-disable */
import React from 'react';
import { shallow } from 'enzyme';
import { genres, ratings, sortOptions } from './filtersInfo';

import { Filters, mapDispatchToProps, mapStateToProps } from './index';

describe('Filters', () => {
  let wrapper;

  const mockPreventDefault = jest.fn();

  const mockEvent = {
    preventDefault: mockPreventDefault,
    target: {
      name: 'year',
      value: '2018',
      innerText: '2018',
      id: 1
    }
  }

  const mockHideFilterModal = jest.fn()
  const mockSetFetchedMovies = jest.fn();
  const mockDispatch = jest.fn();
  const mockSubscribe = jest.fn();
  const mockGetState = jest.fn();
  const mockSetFilters = jest.fn();

  const mockStore = {
    subscribe: mockSubscribe,
    dispatch: mockDispatch,
    getState: mockGetState
  }

  const mockFilters = {
    genre: null,
    year: null,
    rating: null,
    sort: null
  }

  const mockSearchQuery = 'die hard';

  beforeEach(() => {
    wrapper = shallow(<Filters
      hideFilterModal={mockHideFilterModal} 
      store={mockStore}
      setFetchedMovies={mockSetFetchedMovies}
      filters={mockFilters}
      searchQuery={mockSearchQuery}
      setFilters={mockSetFilters}
    />)
  })

  it.skip('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should have default state', () => {
    const expected = {
      selected: null,
      genre: null,
      genreName: null,
      year: null,
      rating: null,
      sort: null,
      sortName: null,
      genreState: '',
      yearState: '',
      ratingState: '',
      sortState: '',
      mobileDisplay: false
    };

    expect(wrapper.state()).toEqual(expected);
  });

  describe('getGenreOptions', () => {
    it('should return react elements', () => {
      const returned = wrapper.instance().getGenreOptions();

      expect(returned[0].$$typeof.toString()).toEqual('Symbol(react.element)');
    });
  });

  describe('getYearOptions', () => {
    it('should return react elements', () => {
      const returned = wrapper.instance().getYearOptions();

      expect(returned[0].$$typeof.toString()).toEqual('Symbol(react.element)');
    });
  });

  describe('getRatingOptions', () => {
    it('should return react elements', () => {
      const returned = wrapper.instance().getRatingOptions();

      expect(returned[0].$$typeof.toString()).toEqual('Symbol(react.element)');
    });
  });

  describe('getSortOptions', () => {
    it('should return react elements', () => {
      const returned = wrapper.instance().getSortOptions();

      expect(returned[0].$$typeof.toString()).toEqual('Symbol(react.element)');
    });
  });

  describe('handleSelect', () => {

    it('should handle genre select)', () => {

     const fakeEvent = {
        target: {
          value: 12,
          innerText: 'action',
          id: 1,
        }
      }

      const name = 'genre'

      const expected = {
      selected: null,
      genre: 12,
      genreName: 'action',
      year: null,
      rating: null,
      sort: null,
      sortName: null,
      genreState: '',
      yearState: '',
      ratingState: '',
      sortState: '',
      mobileDisplay: false
    };

      wrapper.instance().handleSelect(fakeEvent, name);

      expect(wrapper.state()).toEqual(expected);
    });

    it('should handle sort select)', () => {

     const fakeEvent = {
          target: {
            value: '',
            innerText: 'oldest',
            id: 1,
          }
        }

      const name = 'sort'

      const expected = {
      selected: null,
      genre: null,
      genreName: null,
      year: null,
      rating: null,
      sort: 1,
      sortName: 'oldest',
      genreState: '',
      yearState: '',
      ratingState: '',
      sortState: '',
      mobileDisplay: false
    };

      wrapper.instance().handleSelect(fakeEvent, name);

      expect(wrapper.state()).toEqual(expected);
    });

    it('should handle rating/year select)', () => {

     const fakeEvent = {
          target: {
            innerText: '2018',
          }
        }

      const name = 'year'

      const expected = '2018'

      wrapper.instance().handleSelect(fakeEvent, name);

      expect(wrapper.state()[name]).toEqual(expected);
    });
  });

  describe('handleSubmitFilters', () => {
    it('should call preventDefault', () => {
      wrapper.instance().handleSubmitFilters(mockEvent);

      expect(mockPreventDefault).toHaveBeenCalled();
    });

    it('should call setFetchedMovies with the correct parameters', () => {
      const mockState = {
      genre: null,
      year: null,
      rating: null,
      sort: null
    }

      wrapper.instance().handleSubmitFilters(mockEvent);

      expect(mockSetFetchedMovies).toHaveBeenCalledWith(mockState, 'die hard')
    });
  });
})