/* eslint-disable */
import showLoginReducer from '../showLoginReducer';
import * as Actions from '../../actions';

describe('showLoginReducer', () => {
  it('should return the default state of login-display', () => {
    const expected = 'login_display'

    const result = showLoginReducer(undefined, {})

    expect(result).toEqual(expected)
  })
  it('should return state of login-display if user is logged in', () => {
    const expected = 'login-display'

    const mockAction = {
      type: 'DISPLAY_LOGIN'
    }
    const result = showLoginReducer(null, mockAction)
    expect(result).toEqual(expected)
  })
  it('should return state of login-display if user if user wants to login', () => {
    const expected = 'login-hide'

    const mockAction = {
      type: 'DISPLAY_SIGN_UP'
    }
    const result = showLoginReducer(null, mockAction)
    expect(result).toEqual(expected)
  })
})