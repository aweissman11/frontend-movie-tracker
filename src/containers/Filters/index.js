import React, { Component } from 'react';
import { connect } from 'react-redux';

import { updateFilters } from '../../actions/index';
import { getMovieList } from '../../actions/thunkActions/FiltersThunk';
import { genres, ratings, sortOptions } from './filtersInfo';

import './Filters.css';

export class Filters extends Component {
  constructor() {
    super()
    this.state = {
      selected: null,
      genre: null,
      genreName: null,
      year: null,
      rating: null,
      sort: null,
      sortName: null,
      genreState: '',
      yearState: '',
      ratingState: '',
      sortState: '',
      mobileDisplay: false
    }
  }

  getGenreOptions = () => {
    return genres.map( genre => {
      return (<li 
        value={genre.id}
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
        id={sortOption.value}
        onClick={(e) => {this.handleSelect(e, 'sort')}}
      >
        {sortOption.text}
      </li>)
    })
  }

  handleSelect = (e, name) => {
    if (e.target.value && name === 'genre') {
      this.setState({ 
        genre: e.target.value,
        genreName: e.target.innerText,
        genreState: '',
        yearState: '',
        ratingState: '',
        sortState: ''
      });
    } else if (name === 'sort') {
      console.log(e.target)
      this.setState({
        sort: e.target.id,
        sortName: e.target.innerText,
        genreState: '',
        yearState: '',
        ratingState: '',
        sortState: ''
      })
    } else {
      this.setState({ 
        [name]: e.target.innerText,
        genreState: '',
        yearState: '',
        ratingState: '',
        sortState: ''
      });
    }
  }

  handleSubmitFilters = (e) => {
    e.preventDefault();
    const filters = {
      genre: this.state.genre,
      year: this.state.year,
      rating: this.state.rating,
      sort: this.state.sort
    }

    this.props.setFilters(filters);    
    this.props.setFetchedMovies(filters, this.props.searchQuery);
  }

  deployList = (e) => {
    if (e.target.id === this.state.selected) {
      this.setState({
        selected: null,
        [e.target.id]: ''
      })
    } else {
      this.setState({
        [this.state.selected]: '',
        [e.target.id]: 'deployed',
        selected: e.target.id
      });
    }
  }

  clearFilters = async () => {
    const mockEvent = {preventDefault: () => {}}
    await this.setState({
      genre: null,
      genreName: null,
      year: null,
      rating: null,
      sort: null,
      sortName: null,
      genreState: '',
      yearState: '',
      ratingState: '',
      sortState: ''
    });

    this.handleSubmitFilters(mockEvent);
  }

  render() {
    return (
      <aside className='filters'>
        <section className='filters-desktop'>
          <section className='genre-filter'>
            <h3 
              className='genre-slct'
              onClick={(e) => {this.deployList(e)}}
              id='genreState'
            >
              {this.state.genreName || 'genre'}
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
            >{this.state.sortName || 'sort-by'}
            </h3>
            <ul className={`${this.state.sortState} sort-list`}>
              {this.getSortOptions()}
            </ul>
          </section>
          <button
            className='filter-submit'
            onClick={this.handleSubmitFilters}
          >
            submit
          </button>
          <button 
            className='filter-clear'
            onClick={this.clearFilters}
          >
            clear
          </button>
        </section>


        <section className='filters-mobile'>
          <section className='genre-filter'>
            <h3 
              className='genre-slct'
              onClick={(e) => {this.deployList(e)}}
              id='genreState'
            >
              {this.state.genreName || 'genre'}
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
            >{this.state.sortName || 'sort-by'}
            </h3>
            <ul className={`${this.state.sortState} sort-list`}>
              {this.getSortOptions()}
            </ul>
          </section>
          <button
            className='filter-submit'
            onClick={this.handleSubmitFilters}
          >
            submit
          </button>
          <button 
            className='filter-clear'
            onClick={this.clearFilters}
          >
            clear
          </button>
        </section>
      </aside>
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