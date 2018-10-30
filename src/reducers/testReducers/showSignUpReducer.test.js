/* eslint-disable */
import showSignupReducer from '../showSignupReducer';
import * as Actions from '../../actions';

describe('showSignupReducer', () => {
  it('should return the default state of signup-hide', () => {
    const expected = 'signup-hide'

    const result = showSignupReducer(undefined, {})

    expect(result).toEqual(expected)
  })
  it('should return state of singup-display if user wants to singup', () => {
    const expected = 'signup-display'

    const mockAction = {
      type: 'DISPLAY_SIGN_UP'
    }
    const result = showSignupReducer(null, mockAction)
    expect(result).toEqual(expected)
  })
  it('should return state of signup-hide if user wants to sign in', () => {
    const expected = 'signup-hide'

    const mockAction = {
      type: 'DISPLAY_LOGIN'
    }
    const result = showSignupReducer(null, mockAction)
    expect(result).toEqual(expected)
  })
})  