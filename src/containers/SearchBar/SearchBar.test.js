import React from 'react'
import SearchBar from './';

import { shallow } from 'enzyme';

describe('SearchBar', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<SearchBar />);
  });

  it('should match the snapShot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should have default state', () => {
    expect(wrapper.state()).toEqual({searchInput: ''});
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