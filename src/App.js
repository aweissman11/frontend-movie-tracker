import React, { Component } from 'react';

import Login from './containers/Login';
import MoviesList from './containers/MoviesList';
import { getMovieList } from './actions';
import './App.css'

// import { connect } from 'react-redux';
import { Route } from 'react-router-dom';


export class App extends Component {
  render() {
    return (
      <div className="App">
        <Route
          exact path='/'
          component={Login}
        />
        <Route
          exact path='/login'
          component={Login}
        />
        <Route
          exact path='/release-date' render={() => {
            return <MoviesList movies={this.props.movies} />
          }} 
        />
      </div>
    );
  }
}

export const mapStateToProps = (state) => ({
  movies: state.movies,
})

export const mapDispatchToProps = (dispatch) => ({
  setFetchedMovies: (data) => dispatch(getMovieList(data))
})

export default App;
