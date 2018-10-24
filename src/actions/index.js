export const getMovieList = (movies) => {
  return {
    type: 'GET_MOVIE_LIST',
    movies
  }
}