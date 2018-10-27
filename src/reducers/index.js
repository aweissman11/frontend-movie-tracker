import { combineReducers } from 'redux';

import moviesReducer from './moviesReducer';
import userReducer from './userReducer';
import showSingupReducer from './showSignupReducer';
import showLoginReducer from './showLoginReducer';
import favoritesReducer from './favoritesReducer';

export const rootReducer = combineReducers({
  movies: moviesReducer, 
  user: userReducer,
  showLogin: showLoginReducer,
  showSignup: showSingupReducer,
  favorites: favoritesReducer
});
