//  import ReduxThunk from 'redux-thunk'
//  import fetchCall from '../../utilities/fetchCall'; 
//  import { apiKey } from '../../utilities/apiKey';
 import * as cleaner from '../../utilities/cleaners';

export const getMovieList = () => {
  return async (dispatch) => {
    try {
      const movies = await cleaner.movieList
      dispatch({
        type: 'GET_MOVIE_LIST',
        movies: movies
      })
    } catch(e) {
      dispatch({ type: 'ERROR'})
    }
    }
  }

