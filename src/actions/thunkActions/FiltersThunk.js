import * as Cleaners from '../../utilities/cleaners';
import fetchCall from '../../utilities/fetchCall';

export const getMovieList = (filters, query = '') => {
  return async (dispatch) => {
    try {
      const movies = await fetchCall(Cleaners.getFullUrl(filters, query));
      dispatch({
        type: 'GET_MOVIE_LIST',
        movies: movies
      })
    } catch(e) {
      dispatch({ type: 'ERROR'})
    }
  }
}

