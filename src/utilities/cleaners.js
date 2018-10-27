 import fetchCall from './fetchCall'; 
 import { apiKey } from './apiKey';

export const getMoviePosterUrl = (movies) => {
  return movies.map( movie => {
    return movie.poster_path
  })
}

 const getTodaysDate = () => {
    const today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth()+1;
    let yyyy = today.getFullYear();
    if(dd<10) {
        dd = '0'+dd
    } 
    if(mm<10) {
        mm = '0'+mm
    } 
    return `${mm}-${dd}-${yyyy}`;
  }

export const today = getTodaysDate()

export const movieList = fetchCall(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&/movie?primary_release_date.lte=${today}`)