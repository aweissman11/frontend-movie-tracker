export const getMoviePosterUrl = (movies) => {
  return movies.map( movie => {
    return movie.poster_path
  })
}

