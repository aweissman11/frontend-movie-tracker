const showSignupReducer = (state='signup-hide', action) => {
  switch(action.type) {
    case 'DISPLAY_LOGIN' :
      return 'signup-hide';
    case 'DISPLAY_SIGN_UP' :
      return 'signup-display';
    default:
      return state;
  }
}

export default showSignupReducer;