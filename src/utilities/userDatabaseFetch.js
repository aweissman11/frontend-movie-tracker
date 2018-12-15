export const checkUserList = async (data) => {
  const url = '/api/v1/users'

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
  const url = '/api/v1/users/new'

  const optionsObject = {
    method: "POST", 
    body: JSON.stringify(data),
    credentials: "same-origin", 
    headers: {
        "Content-Type": "application/json",
    }
  }

  console.log('new user url:', url);

  const response = await fetch(url, optionsObject);
  return await response.json();
}

export const addFavorite = async (data) => {
  const url = '/api/v1/users/favorites/new'

  console.log('userDB addFavorite');
  console.log('url:', url);
  console.log('data:', data);

  const optionsObject = {
    method: "POST", 
    body: JSON.stringify(data),
    credentials: "same-origin", 
    headers: {
        "Content-Type": "application/json",
    }
  }

  const response = await fetch(url, optionsObject);

  await console.log('userDB response:', response.json());

  return await response.json();
}

export const removeFavorite = async (userId, movieId) => {
  const url = `/api/v1/users/${userId}/favorites/${movieId}`

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

