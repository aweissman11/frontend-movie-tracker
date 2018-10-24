import React, { Component } from 'react';

import fetchCall from './utilities/fetchCall';
import { apiKey } from './utilities/apiKey';
// import * as Cleaners from './utilities/cleaners';
import SingleMovie from './components/SingleMovie/'
import Login from './components/Login'

import { connect } from 'react-redux';
import { NavLink, Switch, Route } from 'react-router-dom';

import { getMovieList } from './actions';

class App extends Component {

  async componentDidMount() {
    const filmObject = await fetchCall(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&/discover/movie?primary_release_date.gte=2014-09-15&primary_release_date.lte=2018-10-23`)
    this.props.setFetchedMovies(filmObject.results)
  }

  posters = () => {
    if (this.props.movies.length > 1) {
      return this.props.movies.map( movie => (
        <SingleMovie key={movie.title} {...movie} />
        ))
    } else {
      return ''
    }
  }
  
  render() {
    return (
      <div className="App">
      <Switch>
        <Route to='/login' component={Login} />
      </Switch>
      {/* <Link exact path to='/home'>
          { this.posters() }
      </Link>           */}
        <p>test</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  movies: state.movies
})

const mapDispatchToProps = (dispatch) => ({
  setFetchedMovies: (data) => dispatch(getMovieList(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
