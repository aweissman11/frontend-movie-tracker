import React from 'react';
import { SingleMovie } from './index';
import { shallow } from 'enzyme';

describe('SingleMovie', () => {
  it('should match the snapshot', () => {
    const wrapper = shallow(<SingleMovie />)
    expect(wrapper).toMatchSnapshot()
  })
})