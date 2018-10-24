export const moviesReducer = (state = [], action) => {
  switch(action.type) {
    case 'GET_MOVIE_LIST' :
      return action.movies;
    default:
      return state;
  }
}