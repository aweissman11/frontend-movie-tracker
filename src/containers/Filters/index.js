import React, { Component } from 'react';
import { connect } from 'react-redux';

import { updateFilters } from '../../actions/index';
import { getMovieList } from '../../actions/thunkActions/FiltersThunk';
import { genres, ratings, sortOptions } from './filtersInfo';

export class Filters extends Component {
  constructor() {
    super()
    this.state = {
      genre: null,
      year: null,
      rating: null,
      sort: null
    }
  }

  getGenreOptions = () => {
    return genres.map( genre => {
      return (<option key={genre.id} value={genre.id} >{genre.name}</option>)
    })
  }
  
  getYearOptions = () => {
    let years = [];
    for (let i = 1; i < 50; i++) {
      years.push(2019 - i)
    }
    return years.map( year => {
      return (<option key={year} value={year} >{year}</option>)
    })
  }
  
  getRatingOptions = () => {
    return ratings.map( rating => {
      return (<option key={rating.certification} value={rating.certification} >{rating.certification}</option>)
    })
    
  }
  
  getSortOptions = () => {
    return sortOptions.map( sortOption => {
      return (<option key={sortOption.value} value={sortOption.value} >{sortOption.text}</option>)
    })
  }

  handleSelect = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({ [name]: value});
  }

  handleSubmitFilters = (e) => {
    e.preventDefault();
    this.props.setFilters(this.state);    
    this.props.setFetchedMovies(this.state, this.props.searchQuery);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmitFilters}>
        <h1>Filters</h1>
        <select onChange={this.handleSelect} name='genre' className='genre-slct'>
          <option value={null}>GENRE</option>
          {this.getGenreOptions()}
        </select>
        <select onChange={this.handleSelect} name='year' className='year-slct'>
          <option value={null}>YEAR</option>
          {this.getYearOptions()}
        </select>
        <select onChange={this.handleSelect} name='rating' className='rating-slct'>
          <option value={null}>RATING</option>
          {this.getRatingOptions()}
        </select>
        <span>Sort by:</span>
        <select onChange={this.handleSelect} name='sort' className='sort-by-slct'>
          <option value={null}>SORT BY</option>
          {this.getSortOptions()}
        </select>
        <input type='submit' />
      </form>
    )
  }
}

export const mapStateToProps = (state) => ({
  filters: state.filters,
  searchQuery: state.searchQuery
})

export const mapDispatchToProps = (dispatch) => ({
  setFetchedMovies: (filters, searchQuery) => dispatch(getMovieList(filters, searchQuery)),
  setFilters: (filters) => dispatch(updateFilters(filters))
});

export default connect(mapStateToProps, mapDispatchToProps)(Filters);