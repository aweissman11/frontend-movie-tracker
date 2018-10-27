import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as Cleaners from '../../utilities/cleaners';
import fetchCall from '../../utilities/fetchCall';
import { genres, ratings, sortOptions } from './filtersInfo';
import { getMovieList } from '../../actions';

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

  handleSubmitFilters = async (e) => {
    e.preventDefault();
    
    const url = Cleaners.getFilterUrl(this.state)
    console.log('url:', url);
    const movieData = await fetchCall(url)
    this.props.setFetchedMovies(movieData.results)
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
        <a>Sort by:</a>
        <select onChange={this.handleSelect} name='sort' className='sort-by-slct'>
          <option value={null}>SORT BY</option>
          {this.getSortOptions()}
        </select>
        <input type='submit' />
      </form>
    )
  }
}


export const mapDispatchToProps = (dispatch) => ({
  setFetchedMovies: (data) => dispatch(getMovieList(data)),
});

export default connect(null, mapDispatchToProps)(Filters);