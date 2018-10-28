import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as Cleaners from '../../utilities/cleaners';
import fetchCall from '../../utilities/fetchCall';
// import { genres, ratings, sortOptions } from './filtersInfo';
import { getMovieList } from '../../actions/thunkActions/SearchBarThunk';


import './SearchBar.css';

class SearchBar extends Component {
  constructor() {
    super()

    this.state = {
      searchInput: ''
    }

  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmitSearch = async (e) => {
    e.preventDefault();
    this.props.setFetchedMovies(this.state.searchInput)
  }

  render() {
    return(
      <form 
        className='search-form'
        onSubmit={this.handleSubmitSearch}
      >
        <input 
          className='search-input'
          value={this.state.searchInput}
          name='searchInput'
          onChange={(e) => this.handleChange(e)}
          placeholder='movie/genre search'
        />
        <input 
          className='search-submit'
          type='submit'
          value=''
        ></input>
      </form>
    )
  }
}

export const mapDispatchToProps = (dispatch) => ({
  setFetchedMovies: (data) => dispatch(getMovieList(data)),
});

export default connect(null, mapDispatchToProps)(SearchBar);