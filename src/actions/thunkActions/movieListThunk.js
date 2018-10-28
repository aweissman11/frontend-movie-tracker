import * as Cleaners from '../../utilities/cleaners';

export const getMovieList = () => {
  return async (dispatch) => {
    try {
      const movies = await Cleaners.movieList
      dispatch({
        type: 'GET_MOVIE_LIST',
        movies: movies
      })
    } catch(e) {
      dispatch({ type: 'ERROR'})
    }
  }
}

