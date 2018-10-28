import * as Cleaners from '../../utilities/cleaners';

export const getMovieList = () => {
  return async (dispatch) => {
    try {
      const movies = await Cleaners.movieList
      dispatch({
        type: 'GET_MOVIE_LIST',
        movies
      })
    } catch(e) {
      dispatch({ type: 'ERROR'})
    }
  }
}

export const updateFavorites = (id) => {
  return async (dispatch) => {
    try {
      const favorites = await Cleaners.getCurrentFavorites(id);
      dispatch({
        type: 'UPDATE_FAVORITES',
        favorites: favorites.data
      })
    } catch(e) {
      dispatch({ type: 'ERROR'})
    }
  }
}