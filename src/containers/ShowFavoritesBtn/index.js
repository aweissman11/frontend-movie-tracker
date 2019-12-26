import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getMovieList } from '../../actions/thunkActions/ShowFavoritesButtonThunk';

export class ShowFavoritesBtn extends Component {
  showFavorites = () => {
    const IDs = this.props.favorites.map(favorite => {
      return favorite.movie_id
    })

    this.props.setFavorites(IDs)
  };

  render() {
    return (
      <button
        aria-label='show-favorites-button'
        onClick={this.showFavorites}
        className='show-favorites'>
        favorites
      </button>
    )
  }
};

export const mapStateToProps = ({ favorites }) => ({ favorites });

export const mapDispatchToProps = (dispatch) => ({
  setFavorites: (movieIds) => dispatch(getMovieList(movieIds))
});

export default connect(mapStateToProps, mapDispatchToProps)(ShowFavoritesBtn);

ShowFavoritesBtn.propTypes = {
  favorites: PropTypes.array,
  setFavorites: PropTypes.func,
};