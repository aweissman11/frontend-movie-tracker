/* eslint-disable */
import React from 'react';
import { shallow } from 'enzyme';

import { Login, mapStateToProps } from './index';
import * as Actions from '../../actions';

describe('Login', () => {
  it('should match the snapshot logged out', () => {
    const wrapper = shallow(<Login user={{}}/>)
    expect(wrapper).toMatchSnapshot()
  })
  
  it('should match the snapshot logged ouint', () => {
    const wrapper = shallow(<Login user={{id: 3}}/>)
    expect(wrapper).toMatchSnapshot()
  })

  describe('mapStateToProps', () => {
    it('should map the state to props', () => {
      const mockUser = {
          name: 'Aaron',
          id: 1
      }

      const expected = mockUser
      const mockState = {
        user: {...mockUser}
      }

      const mappedProps = mapStateToProps(mockState);
      expect(mappedProps.user).toEqual(expected)
    })
  })
})