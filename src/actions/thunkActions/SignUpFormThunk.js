import { createNewUser } from '../../utilities/userDatabaseFetch';
import { isLoading, getUserLoggedIn, setHasErrored } from '../index';

export const submitNewUser = (name, email, password) => {
  return async (dispatch) => {
    dispatch(isLoading(true));
    try {
      const newUserResponse = await createNewUser({ name, email, password });
      if (newUserResponse.error) {
        dispatch(setHasErrored(true));
      }
      dispatch(isLoading(false));
      await dispatch(getUserLoggedIn(newUserResponse.id, name));
    } catch(error) {
      dispatch(setHasErrored(true));
    }
  }
}