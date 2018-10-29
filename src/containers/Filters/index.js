import React, { Component } from 'react';
import { connect } from 'react-redux';

import { genres, ratings, sortOptions } from './filtersInfo';
import { getMovieList } from '../../actions/thunkActions/FiltersThunk';

import './Filters.css';

export class Filters extends Component {
  constructor() {
    super()
    this.state = {
      genre: null,
      year: null,
      rating: null,
      sort: null,
      genreState: '',
      yearState: '',
      ratingState: '',
      sortState: ''
    }
  }

  getGenreOptions = () => {
    return genres.map( genre => {
      return (<li 
        key={genre.id} 
        onClick={(e) => {this.handleSelect(e, 'genre')}}
      >
        {genre.name}
      </li>)
    })
  }
  
  getYearOptions = () => {
    let years = [];
    for (let i = 1; i < 50; i++) {
      years.push(2019 - i)
    }
    return years.map( year => {
      return (<li 
        key={year} 
        onClick={(e) => {this.handleSelect(e, 'year')}}
      >
        {year}
      </li>)
    })


  }
  
  getRatingOptions = () => {
    return ratings.map( rating => {
      return (<li 
        key={rating.certification} 
        onClick={(e) => {this.handleSelect(e, 'rating')}}
      >
        {rating.certification}
      </li>)
    })
    
  }
  
  getSortOptions = () => {
    return sortOptions.map( sortOption => {
      return (<li 
        key={sortOption.value} 
        onClick={(e) => {this.handleSelect(e, 'sort')}}
      >
        {sortOption.text}
      </li>)
    })
  }

  handleSelect = (e, name) => {
    this.setState({ 
      [name]: e.target.innerText,
      genreState: '',
      yearState: '',
      ratingState: '',
      sortState: ''
    });
  }

  handleSubmitFilters = () => {
    this.props.setFetchedMovies(this.state)
  }

  deployList = (e) => {
    this.setState({
      genreState: '',
      yearState: '',
      ratingState: '',
      sortState: ''
    })
    this.setState({
      [e.target.id]: 'deployed'
    })
  }

  render() {
    return (
      <aside className='filters'>
        <section className='genre-filter'>
          <h3 
            className='genre-slct'
            onClick={(e) => {this.deployList(e)}}
            id='genreState'
          >
            {this.state.genre || 'genre'}
          </h3>
          <ul className={`${this.state.genreState} genre-list`}>
            {this.getGenreOptions()}
          </ul>
        </section>
        <section className='year-filter'>
          <h3
            className='year-slct'
            onClick={(e) => {this.deployList(e)}}
            id='yearState'
          >
            {this.state.year || 'year'}
          </h3>
          <ul className={`${this.state.yearState} year-list`}>
            {this.getYearOptions()}
          </ul>
        </section>
        <section className='rating-filter'>
         <h3
            className='rating-slct'
            onClick={(e) => {this.deployList(e)}}
            id='ratingState'
          >
            {this.state.rating || 'rating'}
          </h3>
          <ul className={`${this.state.ratingState} rating-list`}>
            {this.getRatingOptions()}
          </ul>
        </section>
        <section className='sort-filter'>
          <h3
            className='sort-by-slct'
            onClick={(e) => {this.deployList(e)}}
            id='sortState'
          >{this.state.sort || 'sort-by'}
          </h3>
          <ul className={`${this.state.sortState} sort-list`}>
            {this.getSortOptions()}
          </ul>
        </section>
        <button
          className='filter-submit'
          onClick={this.handleSubmitFilters}
        >
          Submit
        </button>
      </aside>
    )
  }
}


export const mapDispatchToProps = (dispatch) => ({
  setFetchedMovies: (data) => dispatch(getMovieList(data)),
});

export default connect(null, mapDispatchToProps)(Filters);