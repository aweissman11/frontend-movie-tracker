import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { updateSearchQuery } from '../../actions';
import { getMovieList } from '../../actions/thunkActions/SearchBarThunk';
import './SearchBar.css';

export class SearchBar extends Component {
  constructor() {
    super()
    this.state = {
      searchInput: ''
    }
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  };

  handleSubmitSearch = (e) => {
    e.preventDefault();
    this.props.setSearchQuery(this.state.searchInput)
    this.props.setFetchedMovies(this.props.filters, this.state.searchInput)
  };

  render() {
    return(
      <form 
        className='search-form'
        aria-label='search-form'
        onSubmit={this.handleSubmitSearch}
      >
        <input 
          aria-label='search-input'
          className='search-input'
          value={this.state.searchInput}
          name='searchInput'
          onChange={(e) => this.handleChange(e)}
          placeholder='search'
        />
        <input 
          aria-label='submit-search'
          className='search-submit'
          type='submit'
          value=''
        ></input>
      </form>
    )
  }
};

export const mapStateToProps = (state) => ({
  filters: state.filters,
  searchQuery: state.searchQuery
})

export const mapDispatchToProps = (dispatch) => ({
  setFetchedMovies: (filters, search) => dispatch(getMovieList(filters, search)),
  setSearchQuery: (query) => dispatch(updateSearchQuery(query))
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);

SearchBar.propTypes = {
  filter: PropTypes.string,
  searchQuery: PropTypes.string,
  setFetchedMovies: PropTypes.func,
  setSearchQuery: PropTypes.func,
};