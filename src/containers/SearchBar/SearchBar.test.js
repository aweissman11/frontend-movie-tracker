import React from 'react'
import { SearchBar } from './';

import { shallow } from 'enzyme';

describe('SearchBar', () => {
  let wrapper;
  const mockPreventDefault = jest.fn();

  const mockEvent = {
    preventDefaut: mockPreventDefault,
    target: {
      name: 'searchInput',
      value: 'die hard'
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
    wrapper = shallow(<SearchBar store={mockStore} setFetchedMovies={mockSetFetchedMovies}/>)
  });

  it('should match the snapShot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should have default state', () => {
    const expected = {
      searchInput: ''
    }

    expect(wrapper.state()).toEqual(expected);
  });

  it('should call handleChange on text input', () => {
    const event = {target: {
      value: 'a', 
      name: 'searchInput'
    }};
    const mockHandleChange = jest.fn();
    wrapper.instance().handleChange = mockHandleChange;

    wrapper.find('.search-input').simulate('change', event);

    expect(mockHandleChange).toHaveBeenCalledWith(event);
  });

  it('should set state when handleChange is called', () => {
    const event = {target: {
      value: 'a', 
      name: 'searchInput'
    }};

    wrapper.instance().handleChange(event);

    expect(wrapper.state().searchInput).toEqual('a');
  });

});