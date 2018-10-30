/* eslint-disable */
import React from 'react';
import Loading from './index';
import { shallow } from 'enzyme';

describe('Loading', () => {
  it('should match the snapshot', () => {
    const wrapper = shallow(<Loading />)
    expect(wrapper).toMatchSnapshot()
  })
})