import React, { Component } from 'react';
import { connect } from 'react-redux';

export class FavoriteBtn extends Component {

  toggleFavorite = (movieId) => {
    
  }

  render() {
    return (
    <button
      onClick={() => this.props.toggleFavorite(this.props.movieId)}
      className='favorite-btn'
    >&hearts;</button>
    )
  }
}

export default FavoriteBtn;