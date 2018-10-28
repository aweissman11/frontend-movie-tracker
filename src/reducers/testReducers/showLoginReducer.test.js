import showLoginReducer from '../showLoginReducer';
import * as Actions from '../../actions';

describe('showLoginReducer', () => {
  it('should return the default state of login_display', () => {
    const expected = 'login_display'

    const result = showLoginReducer(undefined, {})

    expect(result).toEqual(expected)
  })
  it('should return state of login-hide if user is logged in', () => {
    const expected = 'login-hide'

    const mockAction = {
      type: 'DISPLAY_SIGN_UP'
    }
    const result = showLoginReducer(null, mockAction)
    expect(result).toEqual(expected)
  })
})