const fetchCall = async (url) => {
  const response = await fetch(url);
  return await response.json();
}

export default fetchCall;