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
      value: '2018'
    }
  }

  const mockSetFetchedMovies = jest.fn();
  const mockDispatch = jest.fn();
  const mockSubscribe = jest.fn();
  const mockGetState = jest.fn();

  const mockStore = {
    subscribe: mockSubscribe,
    dispatch: mockDispatch,
    getState: mockGetState
  }

  beforeEach(() => {
    wrapper = shallow(<Filters store={mockStore} setFetchedMovies={mockSetFetchedMovies}/>)
  })

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should have default state', () => {
    const expected = {
      genre: null,
      year: null,
      rating: null,
      sort: null
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
    it('should call preventDefault', () => {
      wrapper.instance().handleSelect(mockEvent);

      expect(mockPreventDefault).toHaveBeenCalled();
    });

    it('should set state)', () => {
      const expected = {
        genre: null,
        year: "2018",
        rating: null,
        sort: null
    };

      wrapper.instance().handleSelect(mockEvent);

      expect(wrapper.state()).toEqual(expected);
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

      expect(mockSetFetchedMovies).toHaveBeenCalledWith(mockState)
    });
  });
})