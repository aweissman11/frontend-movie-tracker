export const getUserLoggedIn = (id, name) => {
  return {
    type: 'GET_USER_LOGGED_IN',
    user: { id, name }
  }
}

export const logUserOut = () => {
  return {
    type:  'LOG_USER_OUT'
  }
}

export const displayLogin = () => {
  return {
    type: 'DISPLAY_LOGIN'
  }
}

export const displaySignUp = () => {
  return {
    type: 'DISPLAY_SIGN_UP'
  }
}

export const updateFavorites = (favorites) => {
  return {
    type: 'UPDATE_FAVORITES',
    favorites
  }
}