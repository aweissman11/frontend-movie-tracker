import React, { Component } from 'react';
import { connect } from 'react-redux';

import fetchCall from '../../utilities/fetchCall';
import { updateFavorites, getUserLoggedIn } from '../../actions';
import { apiKey } from '../../utilities/apiKey';
import { getMovieList } from '../../actions/thunkActions/movieListThunk'
import SingleMovie from '../../components/SingleMovie';
import LogButton from '../LogButton'


class MoviesList extends Component {

  async componentDidMount() {
    await this.props.setFetchedMovies(this.props.movies.results)
    if (this.props.user.id) {
      const favorites = await this.getFavorites();
      localStorage.setItem('userInfo', JSON.stringify({
        favorites: favorites.data,
        user: this.props.user
      }))
      this.props.setFavorites(favorites.data)
    }

    if (localStorage.getItem('userInfo')) {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'))
      this.props.logIn(userInfo.user.id, userInfo.user.name)
    }
  }

  getFavorites = async () => {
    const url = `http://localhost:3000/api/users/${this.props.user.id}/favorites`
    return await fetchCall(url)    
  }

  getMovies =  () => {
    if (this.props.movies.results) {
      return this.props.movies.results.map( movie => (
        <SingleMovie key={movie.title} {...movie} />
        ));
    } else {
      return '';
    }
  }

  films = async () => {
    const filmDisplay = await this.props.movies.results.map( movie => { 
      console.log(movie.title)
      return movie
    })
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
  setFavorites: (data) => dispatch(updateFavorites(data)),
  logIn: (id, name) => dispatch(getUserLoggedIn(id, name))
})

export default connect(mapStateToProps, mapDispatchToProps)(MoviesList);
