import React, { Component } from 'react';

import fetchCall from './utilities/fetchCall';
// import * as Cleaners from './utilities/cleaners';
import Login from './components/Login';
import MoviesList from './components/MoviesList';
import Loading from './components/Loading';
import { getMovieList } from './actions';

// import { connect } from 'react-redux';
import { Route } from 'react-router-dom';


export class App extends Component {
  render() {
    return (
      <div className="App">
        <Loading />
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
  movies: state.movies
})

export const mapDispatchToProps = (dispatch) => ({
  setFetchedMovies: (data) => dispatch(getMovieList(data))
})

export default App;
