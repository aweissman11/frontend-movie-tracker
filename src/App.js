import React, { Component } from 'react';
import Login from './containers/Login';
import MoviesList from './containers/MoviesList';
import './App.css'
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
          exact path='/movies' render={() => (
            <MoviesList movies={this.props.movies} />
          )}
        />
      </div>
    );
  }
}

export default App;
