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
    it('should map the dispatch to props', () => {
      const mockDispatch = jest.fn();
      const actionToDispatch = Actions.logUserOut()
      const mappedProps = mapDispatchToProps(mockDispatch);
      
      mappedProps.logOut()

    expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    })
  })
})