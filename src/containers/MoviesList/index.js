import React, { Component } from 'react';
import { connect } from 'react-redux';

import fetchCall from '../../utilities/fetchCall';
import { getMovieList, updateFavorites } from '../../actions';
import { apiKey } from '../../utilities/apiKey';

import SingleMovie from '../../components/SingleMovie';
import LogButton from '../LogButton'


class MoviesList extends Component {

  async componentDidMount() {
    const today = this.getTodaysDate()
    const filmObject = await fetchCall(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&/movie?primary_release_date.lte=${today}`)
    this.props.setFetchedMovies(filmObject.results)
    if (this.props.user.id) {
      const favorites = await this.getFavorites();
      console.log('favorites:', favorites);
      this.props.setFavorites(favorites.data)
    }
  }

  getTodaysDate = () => {
    const today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth()+1;
    let yyyy = today.getFullYear();
    if(dd<10) {
        dd = '0'+dd
    } 
    if(mm<10) {
        mm = '0'+mm
    } 
    return `${mm}-${dd}-${yyyy}`;
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
        <div>
          <LogButton />
          {this.getMovies()}
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
