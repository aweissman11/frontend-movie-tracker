const moviesReducer = (state = {}, action) => {
  switch(action.type) {
    case 'SET_MOVIE_LIST' :
      return action.movies;
    default:
      return state;
  }
}

export default moviesReducer;