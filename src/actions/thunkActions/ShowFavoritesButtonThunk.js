import * as Cleaners from '../../utilities/cleaners';

export const getMovieList = (IDs) => {
  return async (dispatch) => {
    try {
      const results = await Cleaners.getFavoritesInfo(IDs);
      const movies = {
        results
      }
      console.log('movies:', movies);
      await dispatch({
        type: 'GET_MOVIE_LIST',
        movies: movies
      })
    } catch(e) {
      dispatch({ type: 'ERROR'})
    }
  }
}

