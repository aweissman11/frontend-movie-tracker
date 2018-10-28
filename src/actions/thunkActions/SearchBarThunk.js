import * as Cleaners from '../../utilities/cleaners';
import fetchCall from '../../utilities/fetchCall';

export const getMovieList = (query) => {
  return async (dispatch) => {
    try {
      console.log('query:', query);
      const movies = await fetchCall(Cleaners.getSearchUrl(query));
      dispatch({
        type: 'GET_MOVIE_LIST',
        movies: movies
      })
    } catch(e) {
      dispatch({ type: 'ERROR'})
    }
  }
}

