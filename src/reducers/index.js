import { combineReducers } from 'redux';

import moviesReducer from './moviesReducer';
import userReducer from './userReducer'

export const rootReducer = combineReducers({
  movies: moviesReducer, 
  user: userReducer,
});
