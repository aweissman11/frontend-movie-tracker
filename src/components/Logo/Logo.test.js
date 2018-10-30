/* eslint-disable */
import React from 'react';
import Logo from './index';
import { shallow } from 'enzyme';

describe('Logo', () => {
  it('should match the snapshot', () => {
    const wrapper = shallow(<Logo />)
    expect(wrapper).toMatchSnapshot()
  })
})