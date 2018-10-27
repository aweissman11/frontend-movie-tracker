import { apiKey } from "./apiKey";

export const getMoviePosterUrl = (movies) => {
  return movies.map( movie => {
    return movie.poster_path
  })
}

export const getFilterUrl = (filterProperties) => {
  let url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US`
  if (filterProperties.genre) {
    url += `&with_genres=${filterProperties.genre}`
  }
  
  if (filterProperties.year) {
    url += `&year=${filterProperties.year}`
  }

  if (filterProperties.rating) {
    url += `&certification_country=US&certification=${filterProperties.rating}`
  }

  if (filterProperties.sort) {
    url += `&sort_by=${filterProperties.sort}`
  }

  return url;

}