import React from 'react';
import { shallow, mount } from 'enzyme';

import { LogButton, mapDispatchToProps, mapStateToProps } from './index';
import * as Actions from '../../actions';


describe('LogButton', () => {
  let mockToggleFavorite;
  let wrapper;

  beforeEach(() => {
    mockToggleFavorite = jest.fn();
    wrapper = shallow(<LogButton user={{}}/>)
  })
  
  it('should match the snapshot logged out', () => {
    expect(wrapper).toMatchSnapshot();
  })

  it('should match the snapshot logged in', () => {
    wrapper = shallow(<LogButton user={{id: 2}}/>)
    expect(wrapper).toMatchSnapshot();
  })
})