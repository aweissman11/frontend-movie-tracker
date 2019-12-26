import fetchCall from './fetchCall';
import { apiKey } from './apiKey';

export const getTodaysDate = () => {
  const today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth() + 1;
  let yyyy = today.getFullYear();
  if (dd < 10) {
    dd = '0' + dd;
  }
  if (mm < 10) {
    mm = '0' + mm;
  }
  return `${mm}-${dd}-${yyyy}`;
}

export const getMoviePosterUrl = (movies) => {
  return movies.map(movie => {
    return movie.poster_path
  })
}

export const today = getTodaysDate()

export const movieListUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&/movie?primary_release_date.lte=${today}&append_to_response=videos`

export const getFavoritesInfo = async (IDs) => {
  return Promise.all(IDs.map(async (id) => {
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US&append_to_response=release_date`
    return await fetchCall(url)
  }))
}

export const getCurrentFavorites = async (id) => {
  const url = `http://localhost:3000/api/v1/users/${id}/favorites`;
  return await fetchCall(url);
}

export const getFullUrl = (filterProperties, searchQuery) => {
  let url;
  const today = getTodaysDate();

  if (searchQuery.length < 1) {
    url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US?primary_release_date.lte=${today}&sort_by=popularity.desc`
  } else {
    url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${searchQuery}&page=1&include_adult=false`
  }

  const { genre, year, rating, sort } = filterProperties;
  if (genre && genre !== 'GENRE') {
    url += `&with_genres=${genre}`
  }

  if (year && year !== 'YEAR') {
    url += `&primary_release_year=${year}`
  }

  if (rating && rating !== 'RATING') {
    url += `&certification_country=US&certification=${rating}`
  }

  if (sort && sort !== 'SORT') {
    url += `&sort_by=${sort}`
  }

  return url;
}