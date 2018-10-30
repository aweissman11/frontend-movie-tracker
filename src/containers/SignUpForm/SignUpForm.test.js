/* eslint-disable */
import React from 'react';
import { shallow } from 'enzyme';
import { connect } from 'react-redux';
import * as userDatabaseFetch from '../../utilities/userDatabaseFetch';

import { SignUpForm, mapDispatchToProps, mapStateToProps } from './index';
import * as Actions from '../../actions';

describe('SignUpForm', () => {
  let wrapper;
  const mockUser = {
    id: 1
  }
  let mockShowSignUp = true;
  let mockLogUserIn;
  let mockSetIsLoading;
  let mockDisplayLogin;
  let mockSubscribe;
  let mockDispatch;
  let mockGetState;
  let mockUserDatabaseFetch = {
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
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    signUpError: '',
    userDatabaseFetch: userDatabaseFetch,
    activeErrorText: 'email address already registered'
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
    mockLogUserIn = jest.fn();
    mockSetIsLoading = jest.fn();
    mockDisplayLogin = jest.fn();
    mockSubscribe = jest.fn();
    mockDispatch = jest.fn();
    mockGetState = jest.fn();

    wrapper = shallow(<SignUpForm 
      store={mockStore}
      user={mockUser}
      showSignUp={mockShowSignUp}
      logUserIn={mockLogUserIn}
      displayLogin={mockDisplayLogin}
      setIsLoading={mockSetIsLoading}
    />);
  });

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should have default state', () => {
    expect(wrapper.state()).toEqual(defaultState)
  });

  it('should call displayLogin on click', () => {
    wrapper.find('.skip-sign-up-button').simulate('click', mockEvent);

    expect(mockDisplayLogin).toHaveBeenCalled();

  });

  describe('handleChange', () => {
    it('should call set state', async () => {
      const expected = 'email@email.com'
      await wrapper.instance().handleChange(mockEvent);

      expect(wrapper.state().email).toEqual(expected);
    });

    it('should call handleChange on email input', () => {
      const spy = spyOn(wrapper.instance(), 'handleChange')
      wrapper.instance().forceUpdate();

      wrapper.find('.email-input').simulate('change', mockEvent);

      expect(spy).toHaveBeenCalledWith(mockEvent);
    });

    it('should call handleChange on password input', () => {
      const spy = spyOn(wrapper.instance(), 'handleChange')
      wrapper.instance().forceUpdate();

      wrapper.find('.password-input').simulate('change', mockEvent);

      expect(spy).toHaveBeenCalledWith(mockEvent);
    });

    it('should call handleChange on confirm password input', () => {
      const spy = spyOn(wrapper.instance(), 'handleChange')
      wrapper.instance().forceUpdate()

      wrapper.find('.password-confirm-input').simulate('change', mockEvent);

      expect(spy).toHaveBeenCalledWith(mockEvent);
    });

    it('should call handleChange on name input', () => {
      const spy = spyOn(wrapper.instance(), 'handleChange');
      wrapper.instance().forceUpdate()

      wrapper.find('.name-input').simulate('change', mockEvent);

      expect(spy).toHaveBeenCalledWith(mockEvent);
    });
  });

  describe('removeWarning', () => {
    it('should call set state', async () => {
      const expected = '';

      await wrapper.instance().removeWarning();

      expect(wrapper.state().signUpError).toEqual(expected);
    });
  })

  describe('userWarning', () => {
    it('should call set state', async () => {
      const mockErrorText = 'activeErrorText'
      const mockWarning = 'mock warning'
      const mockSignUpError = 'sign-up-error-active'

      await wrapper.instance().userWarning(mockWarning);

     expect(wrapper.state()[mockErrorText]).toEqual(mockWarning);
     expect(wrapper.state().signUpError).toEqual(mockSignUpError);
    });

  });

  describe('createNewUser', () => {

    const mockCreateNewUser = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        data: {
          id: 1,
          name: 'mock name'
        }
      });
    });

    const mockUserDataBaseFetch = {
      createNewUser: mockCreateNewUser
    }

    const mockEmail = 'mock email';
    const mockPassword = 'mock password';
    const mockName = 'mock name'

    beforeEach(async () => {
      await wrapper.setState({
        email: mockEmail,
        password: mockPassword,
        name: mockName,
        userDatabaseFetch: mockUserDataBaseFetch
      });
    });

    it('should call preventDefault', async () => {
      await wrapper.instance().createNewUser(mockEvent);

      expect(mockPreventDefault).toHaveBeenCalled();
    });

    it('should call userWarning with the correct params when an error response is returned', async () => {

      const spy = spyOn(wrapper.instance(), 'userWarning');
      wrapper.instance().forceUpdate();
      const mockErrorResponse = jest.fn().mockImplementation(() => {
        return Promise.resolve({error: 'error'})
      });

      await wrapper.instance().createNewUser(mockEvent);

      expect(spy).toHaveBeenCalled();
    });

    it('should call createNewUser on submit', () => {
      const spy = spyOn(wrapper.instance(), 'createNewUser')
      wrapper.instance().forceUpdate();

      wrapper.find('form').simulate('submit');

      expect(spy).toHaveBeenCalled();
    })

  });

});