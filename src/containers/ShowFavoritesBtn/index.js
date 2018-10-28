import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getMovieList } from '../../actions/thunkActions/ShowFavoritesButtonThunk';

export class ShowFavoritesBtn extends Component {
  showFavorites = () => {
    const IDs = this.props.favorites.map( favorite => {
      return favorite.movie_id
    })

    this.props.setFavorites(IDs)
  }

  render() {
    return (
      <button onClick={this.showFavorites}className='show-favorites'>
      favorites
    </button>
    )
  }
}

export const mapStateToProps = ({ favorites }) => ({ favorites })

export const mapDispatchToProps = (dispatch) => ({
  setFavorites: (movieIds) => dispatch(getMovieList(movieIds))
})

export default connect(mapStateToProps, mapDispatchToProps)(ShowFavoritesBtn);