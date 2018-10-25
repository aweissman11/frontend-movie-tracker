export const checkUserList = async (data) => {
  const url = 'http://localhost:3000/api/users'

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
  const url = 'http://localhost:3000/api/users/new'

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
