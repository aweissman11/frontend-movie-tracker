import { combineReducers } from 'redux';

import moviesReducer from './moviesReducer';
import userReducer from './userReducer';
import showSingupReducer from './showSignupReducer';
import showLoginReducer from './showLoginReducer';
import favoritesReducer from './favoritesReducer';
import filtersReducer from './filtersReducer';
import searchQueryReducer from './searchQueryReducer';
import hasErroredReducer from './hasErroredReducer';
import notOkReducer from './notOkReducer';
import isLoadingReducer from './isLoadingReducer';
import deployFilterModalReducer from './deployFilterModalReducer';

export const rootReducer = combineReducers({
  movies: moviesReducer,
  user: userReducer,
  showLogin: showLoginReducer,
  showSignup: showSingupReducer,
  favorites: favoritesReducer,
  filters: filtersReducer,
  searchQuery: searchQueryReducer,
  hasErrored: hasErroredReducer,
  notOk: notOkReducer,
  isLoading: isLoadingReducer,
  deployFilterModal: deployFilterModalReducer
});
