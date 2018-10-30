import * as Cleaners from '../../utilities/cleaners';
import fetchCall from '../../utilities/fetchCall';
import { setMovieList, setHasErrored, setIsOk, isLoading } from '../index';

export const getMovieList = (filterProperties, searchQuery) => {
  return async (dispatch) => {
    dispatch(isLoading(true));    
    try {
      const movies = await fetchCall(Cleaners.getFullUrl(filterProperties, searchQuery));
      if (movies === 'failed') {
        dispatch(setIsOk(true));
      }
      dispatch(isLoading(false));    
      dispatch(setMovieList(movies));
    } catch(e) {
      dispatch(setHasErrored(true));
    }
  }
}

