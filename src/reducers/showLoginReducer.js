const showLoginReducer = (state='login_display', action) => {
  switch(action.type) {
    case 'DISPLAY_LOGIN' :
      return 'login-display';
    case 'DISPLAY_SIGN_UP' :
      return 'login-hide';
    default:
      return state;
  }
}

export default showLoginReducer;