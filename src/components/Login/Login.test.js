import React from 'react';
import { shallow } from 'enzyme';

import { Login, mapDispatchToProps, mapStateToProps } from './index';
import * as Actions from '../../actions';

describe('Login', () => {
  // React component tests
  it('should match the snapshot', () => {
    const wrapper = shallow(<Login />)
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

  describe('mapDispatchToProps', () => {
    it('should map the dispatch to props', () => {
      const mockUser = {
        name: 'Aaron',
        id: 1
    }

    const mockDispatch = jest.fn();
    const actionToDispatch = Actions.getUserLoggedIn(mockUser.id, mockUser.name)
    const mappedProps = mapDispatchToProps(mockDispatch);
    
    mappedProps.logUserIn(mockUser.id, mockUser.name)

    expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    })
  })
})