export const checkUserList = async (data) => {
  const url = 'http://localhost:3000/api/v1/users'

  const optionsObject = {
    method: "POST",
    body: JSON.stringify(data),
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    }
  }

  const response = await fetch(url, optionsObject);
  return await response.json();
}

export const createNewUser = async (data) => {
  const url = 'http://localhost:3000/api/v1/users/new'

  const optionsObject = {
    method: "POST",
    body: JSON.stringify(data),
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    }
  }

  const response = await fetch(url, optionsObject);
  return await response.json();
}

export const addFavorite = async (data) => {
  const url = 'http://localhost:3000/api/v1/users/favorites/new'

  const optionsObject = {
    method: "POST",
    body: JSON.stringify(data),
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    }
  }

  const response = await fetch(url, optionsObject);
  return await response.json();
}

export const removeFavorite = async (userId, movieId) => {
  const url = `http://localhost:3000/api/v1/users/${userId}/favorites/${movieId}`

  const optionsObject = {
    method: "DELETE",
    body: JSON.stringify({
      user_id: userId,
      movie_id: movieId
    }),
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    }
  }

  const response = await fetch(url, optionsObject);
  return await response.json();
}

