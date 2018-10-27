import React, { Component } from 'react';
import { connect } from 'react-redux';

import fetchCall from '../../utilities/fetchCall';
import { updateFavorites, getUserLoggedIn } from '../../actions';
import { apiKey } from '../../utilities/apiKey';
import { getMovieList } from '../../actions/thunkActions/movieListThunk'
import SingleMovie from '../../components/SingleMovie';
import LogButton from '../LogButton';
import Logo from '../../components/Logo';
import SearchBar from '../../components/SearchBar';

import './MoviesList.css'


class MoviesList extends Component {

  async componentDidMount() {

    await this.props.setFetchedMovies(this.props.movies.results)
    if (this.props.user.id) {
      const favorites = await this.getFavorites();
      localStorage.setItem('userInfo', JSON.stringify({
        favorites: favorites.data,
        user: this.props.user
      }));
      this.props.setFavorites(favorites.data);
    }

    if (localStorage.getItem('userInfo')) {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      this.props.logIn(userInfo.user.id, userInfo.user.name);
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

  render() {
      return (
        <div className='movies-list'>
          <header>
            <section className='header-wrapper'>
              <section className='left-side-header-btns'>
                <LogButton />
                <button className='show-favorites'>
                  favorites
                </button>
              </section>
              <SearchBar />
            </section>
          </header>
          <section className='movies-wrapper'>
            <div className='movies-stripe'></div>
            {this.getMovies()}
          </section>
          <footer>
            <div className='footer-wrap'>
              <section className='logo-footer-section'>
                <Logo />
                <h1><span>movie</span>Tracker</h1>
              </section>
              <section className='scroll-social-wrapper'>
                <i className="fab fa-facebook scroll-social"></i>
                <i className="fab fa-instagram scroll-social"></i>
                <i className="fab fa-twitter scroll-social"></i>
              </section>
              <h3 className='footer-copyright'>© 2018 MovieTracker - All Rights Reserved</h3>
            </div>
          </footer>
        </div>
    );
  }
}

const mapStateToProps = (state) => ({
  movies: state.movies,
  user: state.user,
  favorites: state.favorites
});

const mapDispatchToProps = (dispatch) => ({
  setFetchedMovies: (data) => dispatch(getMovieList(data)),
  setFavorites: (data) => dispatch(updateFavorites(data)),
  logIn: (id, name) => dispatch(getUserLoggedIn(id, name))
});

export default connect(mapStateToProps, mapDispatchToProps)(MoviesList);
