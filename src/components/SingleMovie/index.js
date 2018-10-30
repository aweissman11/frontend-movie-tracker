import React from 'react';
import PropTypes from 'prop-types';

import FavoriteBtn from '../../containers/FavoriteBtn';

const SingleMovie = (props) => {
  const date = props.release_date;
  const year = date.split('').splice(0, 4).join('');
  return (
  <div className='single-movie-wrapper'>
    <div className='favorite-btn-wrapper'>
      <FavoriteBtn movieId={props.id}/>
    </div>
    {
      props.poster_path ?
    <img
      src={`https://image.tmdb.org/t/p/w400_and_h600_bestv2${props.poster_path}`} 
      alt={props.title}
      /> :
    <img
      src={'http://www.beguilingbooksandart.com/wp-content/uploads/2015/01/at_marcy.png'} 
      alt={props.title}
      />
    }
    <section className='movie-poster-text'>
      <h2>{props.title}</h2>
      <h3>{year}</h3>
    </section>
  </div>
)}


SingleMovie.propTypes = {
  date: PropTypes.object,
  year: PropTypes.object
};

export default SingleMovie;