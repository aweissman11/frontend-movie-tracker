import * as Cleaners from '../../utilities/cleaners';
import { isLoading, setMovieList, setFavorites, setHasErrored, setIsOk } from '../index';

export const getMovieList = () => {
  return async (dispatch) => {
    dispatch(isLoading(true))
    try {
      const movies = await Cleaners.movieList
      if (movies === 'failed') {
        dispatch(setIsOk(true))
      }
      dispatch(isLoading(false))
      dispatch(setMovieList(movies))
    } catch(e) {
      dispatch(setHasErrored(true))
    }
  }
}

export const updateFavorites = (id) => {
  return async (dispatch) => {
    try {
      const favorites = await Cleaners.getCurrentFavorites(id);
      dispatch(setFavorites(favorites.data))
    } catch(e) {
      dispatch(setHasErrored(true))
    }
  }
}