import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as userDataBaseFetch from '../../utilities/userDatabaseFetch';
import fetchCall from '../../utilities/fetchCall';
import { setFavorites } from '../../actions';

export class FavoriteBtn extends Component {
  constructor() {
    super()
    this.state = {
      isFavorite: false,
      userDataBaseFetch: userDataBaseFetch,
      fetchCall: fetchCall
    }
  }

  favorited = '';

  callAddFavorite = async (movies, user, favorites, movieId) => {
    try {
      await this.state.userDataBaseFetch.addFavorite(this.formatFavorite(movies.results, user, movieId));
      this.setState({ isFavorite: true })
      const newFavorites = [...favorites, this.formatFavorite(movies.results, user, movieId)]
      this.props.setFavorites(newFavorites);
    } catch(error) {
      console.error(error);
    }
  }

  callRemoveFavorite = async (user, movieId, favorites) => {
    await this.removeFavorite(user.id, movieId);
    const newFavorites = favorites.filter( favorite => favorite.movie_id !== movieId)
    this.props.setFavorites(newFavorites);
    await this.setState({ isFavorite: false })
  }

  toggleFavorite = async (movieId) => {
    const { movies, user, favorites } = this.props;
    if (!user.id) {
      console.log("You're not logged in!");
    } else {
      if (!favorites.find(favorite => favorite.movie_id === movieId)) {
        await this.callAddFavorite(movies, user, favorites, movieId);
      } else {
        await this.callRemoveFavorite(user, movieId, favorites)
      }
    }
  }

  removeFavorite = async (userId, movieId) => {
    await this.state.userDataBaseFetch.removeFavorite(userId, movieId)
  }
  
  formatFavorite = (movies, user, movieId) => {
    const movie = movies.filter( movie => movie.id === movieId)[0]
    return {
      movie_id: movie.id,
      user_id: user.id,
      title: movie.title,
      poster_path: movie.poster_path || 'test.jpg',
      release_date: movie.release_date,
      vote_average: movie.vote_average,
      overview: movie.overview,
      genre_ids: movie.genre_ids
    }
  }

  render() {
    if (this.props.favorites.find((film => film.movie_id === this.props.movieId))) {
      this.favorited = 'favorited';
    } else {
      this.favorited = ''
    }

    return (
    <button
      onClick={() => this.toggleFavorite(this.props.movieId)}
      className={`favorite-btn ${this.favorited}`}
    ></button>
    )
  }
}

export const mapStateToProps = ({movies, user, favorites}) => ({movies, user, favorites});


export const mapDispatchToProps = (dispatch) => ({
  setFavorites: (data) => dispatch(setFavorites(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(FavoriteBtn);

FavoriteBtn.propTypes = {
  movies: PropTypes.object,
  user: PropTypes.object,
  favorites: PropTypes.array
};