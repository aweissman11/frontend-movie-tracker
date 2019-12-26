export const getUserLoggedIn = (id, name) => {
  return {
    type: 'GET_USER_LOGGED_IN',
    user: { id, name }
  }
}

export const logUserOut = () => {
  return {
    type: 'LOG_USER_OUT'
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

export const setFavorites = (favorites = []) => {
  return {
    type: 'SET_FAVORITES',
    favorites
  }
}

export const updateFilters = (filters) => {
  return {
    type: 'UPDATE_FILTERS',
    filters
  }
}
export const updateSearchQuery = (searchQuery) => {
  return {
    type: 'UPDATE_QUERY',
    searchQuery
  }
}

export const setMovieList = (movies) => {
  return {
    type: 'SET_MOVIE_LIST',
    movies
  }
}

export const setHasErrored = (bool) => {
  return {
    type: 'SET_HAS_ERRORED',
    hasErrored: bool
  }
}

export const setIsOk = (bool) => {
  return {
    type: 'SET_IS_NOT_OK',
    notOk: bool
  }
}

export const isLoading = (bool) => {
  return {
    type: 'IS_LOADING',
    isLoading: bool
  }
}

export const deployFilterModal = (bool) => {
  return {
    type: 'DEPLOY_FILTER_MODAL',
    status: bool
  }
}