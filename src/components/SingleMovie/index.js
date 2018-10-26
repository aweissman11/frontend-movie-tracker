import React from 'react';

const SingleMovie = (props) => (
  <div>
    <h2>{props.title}</h2>
    <button className='favorite-btn'>&hearts;</button>
    <img src={`https://image.tmdb.org/t/p/w400_and_h600_bestv2${props.poster_path}`} alt={props.title}/>
  </div>
)

export default SingleMovie;