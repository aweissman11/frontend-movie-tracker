import React from 'react';
import { shallow } from 'enzyme';

import { Filters, mapDispatchToProps, mapStateToProps } from './index';

describe('Filters', () => {
  let wrapper;

  const mockEvent = {
    preventDefault: jest.fn(),
    target: {
      name: 'mock name',
      value: 'mock value'
    }
  }

  const mockSetFetchedMovies = jest.fn().mockImplementation(() => {
    return;
  })

  const mockDispatch = jest.fn();
  const mockSubscribe = jest.fn();
  const mockGetState = jest.fn();

  const mockStore = {
    setFetchedMovies: mockSetFetchedMovies,
    subscribe: mockSubscribe,
    dispatch: mockDispatch,
    getState: mockGetState
  }

  beforeEach(() => {
    wrapper = shallow(<Filters store={mockStore} />)
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
  })
})