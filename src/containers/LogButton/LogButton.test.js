/* eslint-disable */
import React from 'react';
import { shallow, mount } from 'enzyme';

import { LogButton, mapDispatchToProps, mapStateToProps } from './index';
import * as Actions from '../../actions';
import LocalStorage from '../../setupTests'


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
  
  describe('mapStateToProps', () => {
    it('should map the state to props', () => {
      const mockUser = {
          name: 'Aaron',
          id: 1
      }

      const expected = mockUser
      const mockState = {
        user: {...mockUser},
      }
      
      const mappedProps = mapStateToProps(mockState);
      expect(mappedProps.user).toEqual(expected)
    })
    
  })

  describe('mapDispatchToProps', () => {
    it('should map the dispatch to props on logOut', () => {
      const mockDispatch = jest.fn();
      const actionToDispatch = Actions.logUserOut()
      const mappedProps = mapDispatchToProps(mockDispatch);
      
      mappedProps.logOut()

    expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    });

    it('should map the dispatch to props on removeFavorites', () => {
      const mockDispatch = jest.fn();
      const actionToDispatch = Actions.setFavorites()
      const mappedProps = mapDispatchToProps(mockDispatch);
      
      mappedProps.removeFavorites()

    expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    })
  });

  describe('logOutUser', () => {
    beforeEach(() => {
      const mockLogOut = jest.fn();
      const mockRemoveFavorites = jest.fn();
      const mockUser = {id: 1}

      wrapper = shallow(<LogButton 
        logOut={mockLogOut}
        removeFavorites={mockRemoveFavorites}
        user={mockUser}
      />);

      let localStorage = new LocalStorage();
      window.localStorage = localStorage;
      localStorage.setItem('userInfo', JSON.stringify(mockUser))
    });

    it('should call logOutUser on click', () => {
      const mockLogOutUser = jest.fn()
      wrapper.instance().logOutUser = mockLogOutUser;

      wrapper.find('.login-logout-btn').simulate('click');

      expect(mockLogOutUser).toHaveBeenCalled();
    });

    it('should call logOut', () => {
      const mockLogOut = jest.fn();
      const mockRemoveFavorites = jest.fn();
      const mockUser = {id: 1}

      wrapper = shallow(<LogButton 
        logOut={mockLogOut}
        removeFavorites={mockRemoveFavorites}
        user={mockUser}
      />);

      wrapper.instance().logOutUser();

      expect(mockLogOut).toHaveBeenCalled();
    });

    it('should call removeFavorites', () => {
      const mockLogOut = jest.fn();
      const mockRemoveFavorites = jest.fn();
      const mockUser = {id: 1}

      wrapper = shallow(<LogButton 
        logOut={mockLogOut}
        removeFavorites={mockRemoveFavorites}
        user={mockUser}
      />);

      wrapper.instance().logOutUser();

      expect(mockRemoveFavorites).toHaveBeenCalled();
    });

    it('should remove userinfo from local storage', () => {
      wrapper.instance().logOutUser();

      expect(localStorage.store).toEqual(undefined);
    });
  });
})