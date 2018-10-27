import { apiKey } from "./apiKey";

export const getMoviePosterUrl = (movies) => {
  return movies.map( movie => {
    return movie.poster_path
  })
}

export const getTodaysDate = () => {
  const today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth()+1;
  let yyyy = today.getFullYear();
  if(dd<10) {
      dd = '0'+dd;
  } 
  if(mm<10) {
      mm = '0'+mm;
  } 
  return `${mm}-${dd}-${yyyy}`;
}

export const getFilterUrl = (filterProperties) => {
  const today = getTodaysDate();

  let url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US?primary_release_date.lte=${today}&sort_by=popularity.desc`

  const { genre, year, rating, sort } = filterProperties;
  if (genre && genre !== 'GENRE') {
    url += `&with_genres=${genre}`
  }
  
  if (year && year !== 'YEAR') {
    url += `&year=${year}`
  }

  if (rating && rating !== 'RATING') {
    url += `&certification_country=US&certification=${rating}`
  }

  if (sort && sort !== 'SORT') {
    url += `&sort_by=${sort}`
  }

  return url;

}