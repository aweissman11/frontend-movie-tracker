import React from 'react';
import PropTypes from 'prop-types';

import FavoriteBtn from '../../containers/FavoriteBtn';

const SingleMovie = (props) => {
  const date = props.release_date;
  const year = date ? date.split('').splice(0, 4).join('') : 'today';
  return (
    <div className='single-movie-wrapper' aria-label='single-movie-card'>
      <div className='favorite-btn-wrapper'>
        <FavoriteBtn movieId={props.id} />
      </div>
      {
        props.poster_path ?
          <img
            src={`https://image.tmdb.org/t/p/w370_and_h556_bestv2${props.poster_path}`}
            alt={props.title}
          /> :
          <img
            src={'http://www.beguilingbooksandart.com/wp-content/uploads/2015/01/at_marcy.png'}
            alt={props.title}
          />
      }
      <section className='movie-poster-text' aria-label='movie-info'>
        <h2>{props.title}</h2>
        <h3>{year}</h3>
      </section>
    </div>
  )
};


SingleMovie.propTypes = {
  date: PropTypes.object,
  year: PropTypes.object
};

export default SingleMovie;