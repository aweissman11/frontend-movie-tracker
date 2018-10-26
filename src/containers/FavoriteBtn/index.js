import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as userDataBaseFetch from '../../utilities/userDatabaseFetch';
import fetchCall from '../../utilities/fetchCall';
import { updateFavorites } from '../../actions';

export class FavoriteBtn extends Component {
  constructor() {
    super()
    this.state = {
      isFavorite: false
    }
  }

  toggleFavorite = async (movieId) => {
    const { movies, user, favorites } = this.props;
    if (!user.id) {
      console.log("You're not logged in!");
    } else {
      if (!favorites.find(favorite => favorite.movie_id === movieId)) {
        try {
          await userDataBaseFetch.addFavorite(this.formatFavorite(movies, user, movieId));
          this.setState({ isFavorite: true })
          const newFavorites = [...favorites, this.formatFavorite(movies, user, movieId)]
          this.props.setFavorites(newFavorites);
          console.log('add favorite')
        } catch(error) {
          console.error(error);
        }
      } else {
        await this.removeFavorite(user.id, movieId);
        const newFavorites = favorites.filter( favorite => favorite.movie_id !== movieId)
        this.props.setFavorites(newFavorites);
        this.setState({ isFavorite: false })
        console.log('remove favorite')
      }
    }
  }

  removeFavorite = async (userId, movieId) => {
    await userDataBaseFetch.removeFavorite(userId, movieId)
  }
  
  formatFavorite = (movies, user, movieId) => {
    const movie = movies.filter( movie => movie.id === movieId)[0]
    return {
      movie_id: movie.id,
      user_id: user.id,
      title: movie.title,
      poster_path: movie.poster_path,
      release_date: movie.release_date,
      vote_average: movie.vote_average,
      overview: movie.overview,
      genre_ids: movie.genre_ids
    }
  }

  getFavorites = async () => {
    const url = `http://localhost:3000/api/users/${this.props.user.id}/favorites`
    return await fetchCall(url)    
  }

  render() {
    return (
    <button
      onClick={() => this.toggleFavorite(this.props.movieId)}
      className='favorite-btn'
    >&hearts;</button>
    )
  }
}

const mapStateToProps = ({movies, user, favorites}) => ({movies, user, favorites});


const mapDispatchToProps = (dispatch) => ({
  setFavorites: (data) => dispatch(updateFavorites(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(FavoriteBtn);