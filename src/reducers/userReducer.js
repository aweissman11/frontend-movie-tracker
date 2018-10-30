const userReducer = (state={name: null}, action) => {
  switch(action.type) {
    case 'GET_USER_LOGGED_IN' :
      return action.user;
    case 'LOG_USER_OUT' :
      return {name: null}
    default :
      return state;
  }
}

export default userReducer;