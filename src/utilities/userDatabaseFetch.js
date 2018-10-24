export const checkUserList = async (userData) => {
  const url = 'http://localhost:3000/api/users'
  console.log('userData:', userData);

  const optionsObject = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(userData),
    credentials: "same-origin"
  }

  const response = await fetch(url, optionsObject);
    
  return response;
}