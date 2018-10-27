import React, { Component } from 'react';
import { connect } from 'react-redux';

import fetchCall from '../../utilities/fetchCall';
import { getMovieList, updateFavorites } from '../../actions';
import { apiKey } from '../../utilities/apiKey';

import SingleMovie from '../../components/SingleMovie';
import LogButton from '../LogButton'
import Logo from '../../components/Logo'

import './MoviesList.css'


class MoviesList extends Component {

  async componentDidMount() {
    const filmObject = await fetchCall(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&/movie?primary_release_date.lte=2018-10-23`)
    this.props.setFetchedMovies(filmObject.results)
    if (this.props.user.id) {
      const favorites = await this.getFavorites();
      console.log('favorites:', favorites);
      this.props.setFavorites(favorites.data)
    }
  }

  getFavorites = async () => {
    const url = `http://localhost:3000/api/users/${this.props.user.id}/favorites`
    return await fetchCall(url)    
  }

  getMovies = () => {
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
        <div className='movies-list'>
          <header>
            <LogButton />
          </header>
          <section className='movies-wrapper'>
            <div className='movies-stripe'></div>
            {this.getMovies()}
          </section>
          <footer>
            <Logo />
          </footer>
        </div>
    )
  }
}


const mapStateToProps = (state) => ({
  movies: state.movies,
  user: state.user,
  favorites: state.favorites
})

const mapDispatchToProps = (dispatch) => ({
  setFetchedMovies: (data) => dispatch(getMovieList(data)),
  setFavorites: (data) => dispatch(updateFavorites(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(MoviesList);
