import React, { Component } from 'react';

import fetchCall from './utilities/fetchCall';
import { apiKey } from './utilities/apiKey';
import * as Cleaners from './utilities/cleaners';
import SingleMovie from './components/SingleMovie/'

class App extends Component {
  constructor() {
    super()
    this.state = {
      fetchCall: fetchCall,
      movies: []
    }
  }

  async componentDidMount() {
    const movies = await fetchCall(`https://api.themoviedb.org/3/discover/movie?api_key=db393102c6d38bb71fed129f3aaf36d8&/discover/movie?primary_release_date.gte=2014-09-15&primary_release_date.lte=2018-10-23`)
    this.setState({ movies: movies.results });
  }
  


  posters = () => {
    if (this.state.movies.length) {
      return this.state.movies.map( movie => (
        <SingleMovie {...movie} />
        ))
    } else {
      return <SingleMovie />
    }
  }
  
  render() {
    return (
      <div className="App">
        { this.posters() }
      </div>
    );
  }
}

export default App;
