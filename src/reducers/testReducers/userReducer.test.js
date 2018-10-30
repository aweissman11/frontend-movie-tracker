/* eslint-disable */
import userReducer from '../userReducer';
import * as Actions from '../../actions';

describe('userReducer', () => {
  it('should return the default state', () => {
    const expected = ({
      name: null
    })
    
    const result = userReducer(undefined, {})
    
    expect(result).toEqual(expected);
  })
  
  it('should return the user', () => {
    const expected = ({
      name: 'Aaron',
      id: 3
    })
    
    const mockAction = Actions.getUserLoggedIn(expected.id, expected.name);
    
    const mockState = ({
      name: null
    })

    const result = userReducer(mockState, mockAction);

    expect(result).toEqual(expected);
  })
  
  it('should log the user out', () => {
    const expected = ({
      name: null
    })
    
    const mockAction = Actions.logUserOut();
    
    const mockState = ({
      name: 'Aaron',
      id: 1
    })

    const result = userReducer(mockState, mockAction);

    expect(result).toEqual(expected);
  })
})