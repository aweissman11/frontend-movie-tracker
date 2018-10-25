export const checkUserList = async (data) => {
  const url = 'http://localhost:3000/api/users/new'

  const weee = {email: 'brian@aol.com', password: 'password', name: 'brian'}

  const optionsObject = {
    method: "POST", 
    body: JSON.stringify(weee),
    credentials: "same-origin", 
    headers: {
        "Content-Type": "application/json",
    }
  }

  const response = await fetch(url, optionsObject);
  return await response.json();
}