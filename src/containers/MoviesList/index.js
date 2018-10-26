import React, { Component } from 'react';
import { connect } from 'react-redux';

import fetchCall from '../../utilities/fetchCall';
import { getMovieList } from '../../actions';
import { apiKey } from '../../utilities/apiKey';

import SingleMovie from '../../components/SingleMovie';
import LogButton from '../LogButton'


class MoviesList extends Component {

  async componentDidMount() {
    const filmObject = await fetchCall(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&/movie?primary_release_date.lte=2018-10-23`)
    this.props.setFetchedMovies(filmObject.results)
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
  user: state.user
})

const mapDispatchToProps = (dispatch) => ({
  setFetchedMovies: (data) => dispatch(getMovieList(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(MoviesList);
