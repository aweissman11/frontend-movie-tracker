const fetchCall = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    console.error(Error(response.statusText));
    return 'failed'
  }
  return await response.json();
}

export default fetchCall;