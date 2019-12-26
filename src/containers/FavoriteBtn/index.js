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
      fetchCall: fetchCall,
      failed: false,
      notLoggedIn: false
    }
  };

  favorited = '';

  callAddFavorite = async (movies, user, favorites, movieId) => {
    try {
      let formattedFavorite = this.formatFavorite(movies.results, user, movieId);

      this.state.userDataBaseFetch.addFavorite(formattedFavorite);
      this.setState({ isFavorite: true })
      const newFavorites = [...favorites, formattedFavorite]
      this.props.setFavorites(newFavorites);
    } catch (error) {
      this.setState({
        failed: true
      });

      window.setTimeout(this.clearFailedFav, 5000);
    }
  };

  clearFailedFav = () => {
    this.setState({
      failed: false
    })
  };

  callRemoveFavorite = async (user, movieId, favorites) => {
    await this.removeFavorite(user.id, movieId);
    const newFavorites = favorites.filter(favorite => favorite.movie_id !== movieId)
    this.props.setFavorites(newFavorites);
    await this.setState({ isFavorite: false })
  }

  toggleFavorite = async (movieId) => {
    const { movies, user, favorites } = this.props;
    if (!user.id) {
      this.setState({
        notLoggedIn: true
      });

      setTimeout(this.clearNotLoggedIn, 5000);
    } else {
      if (!favorites.find(favorite => favorite.movie_id === movieId)) {
        await this.callAddFavorite(movies, user, favorites, movieId);
      } else {
        await this.callRemoveFavorite(user, movieId, favorites)
      }
    }
  };

  clearNotLoggedIn = () => {
    this.setState({
      notLoggedIn: false
    })
  };

  removeFavorite = async (userId, movieId) => {
    await this.state.userDataBaseFetch.removeFavorite(userId, movieId)
  };

  getPosterPath = (posterPath) => {
    if (!posterPath) {
      return 'http://www.beguilingbooksandart.com/wp-content/uploads/2015/01/at_marcy.png'
    } else {
      return `https://image.tmdb.org/t/p/w400_and_h600_bestv2${posterPath}`
    }
  };

  formatFavorite = (movies, user, movieId) => {
    const movie = movies.filter(movie => movie.id === movieId)[0]
    return {
      movie_id: movie.id,
      user_id: user.id,
      title: movie.title,
      poster_path: this.getPosterPath(movie.poster_path),
      release_date: movie.release_date,
      vote_average: movie.vote_average,
      overview: movie.overview
    }
  };

  render() {
    if (this.props.favorites.find((film => film.movie_id === this.props.movieId))) {
      this.favorited = 'favorited';
    } else {
      this.favorited = ''
    }

    return (
      <div className='button-component-wrapper' aria-label='favorite-button'>
        <p className={`not-logged-in-warning ${this.state.notLoggedIn}`}>you are not logged in</p>
        <button
          onClick={() => this.toggleFavorite(this.props.movieId)}
          className={`favorite-btn ${this.favorited}`}
        ></button>
      </div>
    )
  }
};

export const mapStateToProps = ({ movies, user, favorites }) => ({ movies, user, favorites });


export const mapDispatchToProps = (dispatch) => ({
  setFavorites: (data) => dispatch(setFavorites(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(FavoriteBtn);

FavoriteBtn.propTypes = {
  movies: PropTypes.object,
  user: PropTypes.object,
  favorites: PropTypes.array
};