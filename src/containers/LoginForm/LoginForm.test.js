import React from 'react';
import { shallow } from 'enzyme';
import { connect } from 'react-redux';
import * as userDatabaseFetch from '../../utilities/userDatabaseFetch';

import { LoginForm, mapDispatchToProps, mapStateToProps } from './index';
import * as Actions from '../../actions';

describe('LoginForm', () => {
  let wrapper;
  const mockUser = {
    id: 1
  }
  const mockShowLogin = true;
  const mockLogUserIn = jest.fn();
  const mockDisplaySignUp = jest.fn();
  const mockSubscribe = jest.fn();
  const mockDispatch = jest.fn();
  const mockGetState = jest.fn();
  const mockUserDatabaseFetch = {
    checkUserList: jest.fn().mockImplementation(() => {
      return Promise.resolve({
        data: {
          id: 1,
          name: 'mock name'
        }
      });
    })
  }

  const mockStore = {
    subscribe: mockSubscribe,
    dispatch: mockDispatch,
    getState: mockGetState
  };

  const defaultState = {
    email: '',
    password: '',
    loginError: '',
    userDatabaseFetch: userDatabaseFetch
  };

  const mockPreventDefault = jest.fn();

  const mockEvent = {
    target: {
      name: 'email',
      value: 'email@email.com'
    },
    preventDefault: mockPreventDefault
  }

  beforeEach(() => {
    wrapper = shallow(<LoginForm 
      store={mockStore}
      user={mockUser}
      showLogin={mockShowLogin}
      logUserIn={mockLogUserIn}
      displaySignUp={mockDisplaySignUp}
    />);
  });

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should have default state', () => {
    expect(wrapper.state()).toEqual(defaultState)
  });

  describe('handleChange', () => {
    it('should call set state', async () => {
      const expected = 'email@email.com'
      await wrapper.instance().handleChange(mockEvent);

      expect(wrapper.state().email).toEqual(expected);
    });
  });

  describe('removeWarning', () => {
    it('should call set state', async () => {
      const expected = '';

      await wrapper.instance().removeWarning();

      expect(wrapper.state().loginError).toEqual('');
    });
  })

  describe('userWarning', () => {
    it('should call set state', async () => {
      const mockType = 'loginError'
      const mockWarning = 'mock warning'

      await wrapper.instance().userWarning(mockType, mockWarning);

     expect(wrapper.state()[mockType]).toEqual(mockWarning);
    });

    // it('should call removeWarning', async () => {
    //   const mockRemoveWarning = jest.fn();

    //   wrapper.instance().removeWarning = mockRemoveWarning;
    //   await wrapper.instance().userWarning()

    //   expect(mockRemoveWarning).toHaveBeenCalled()
    // });
  });

  describe('submitLogin', () => {

    const mockCheckUserList = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        data: {
          id: 1,
          name: 'mock name'
        }
      });
    });

    const mockUserDataBaseFetch = {
      checkUserList: mockCheckUserList
    }

    const mockEmail = 'mock email';
    const mockPassword = 'mock password';

    beforeEach(async () => {
      await wrapper.setState({
        email: mockEmail,
        password: mockPassword,
        userDatabaseFetch: mockUserDataBaseFetch
      });
    });

    it('should call preventDefault', async () => {
      await wrapper.instance().submitLogin(mockEvent);

      expect(mockPreventDefault).toHaveBeenCalled();
    });

    it('should call checkUserList with the correct params', async () => {
      const expected = {
        email: mockEmail,
        password: mockPassword,
      }
      await wrapper.instance().submitLogin(mockEvent);

      expect(mockCheckUserList).toHaveBeenCalledWith(expected);
    });

    it('should call logUserIn with the correct params', async () => {
      const expected = {data : {
        id: 1, name: 'mock name'
      }}

      expect(mockLogUserIn).toHaveBeenCalledWith(1, 'mock name');
    });

    it('should call userWarning on failed fetch', async () => {
      const mockFailedCall = jest.fn().mockImplementation(() => {
        return Promise.reject({
          error: 'error'
        });
      });

      const mockFailedDatabase = {checkUserList: mockFailedCall}
      const mockUserWarning = jest.fn();

      await wrapper.setState({
        userDatabaseFetch: mockFailedDatabase
      });

      wrapper.instance().userWarning = mockUserWarning

      await wrapper.instance().submitLogin(mockEvent);

      expect(mockUserWarning).toHaveBeenCalled();
    })

  });

});