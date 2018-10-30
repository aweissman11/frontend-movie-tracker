import * as Cleaners from '../../utilities/cleaners';
import { setMovieList, setHasErrored, setIsOk, isLoading } from '../index';

export const getMovieList = (IDs) => {
  return async (dispatch) => {
    dispatch(isLoading(true));
    try {
      const results = await Cleaners.getFavoritesInfo(IDs);
      if (results === 'failed') {
        dispatch(setIsOk(true));
      }
      dispatch(isLoading(false));
      const movies = {
        results
      }
      await dispatch(setMovieList(movies));
    } catch(e) {
      dispatch(setHasErrored(true));
    }
  }
}

