import React from 'react';

import FavoriteBtn from '../../containers/FavoriteBtn';

const SingleMovie = (props) => (
  <div>
    <h2>{props.title}</h2>
    <FavoriteBtn />
    <img src={`https://image.tmdb.org/t/p/w400_and_h600_bestv2${props.poster_path}`} alt={props.title}/>
  </div>
)

export default SingleMovie;