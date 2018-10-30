/* eslint-disable */
import React from 'react';
import SingleMovie from './';
import { shallow } from 'enzyme';

describe('SingleMovie', () => {
  it('should match the snapshot', () => {
    const wrapper = shallow(<SingleMovie
      title='test-title'
      release_date='2018-01-01'
      id='100'
      poster_path='test_path'
    />);
    
    expect(wrapper).toMatchSnapshot()
  });
});

