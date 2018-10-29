const searchQueryReducer = (state = '', action) => {
  switch(action.type) {
    case 'UPDATE_QUERY' :
      return action.searchQuery;
    default:
      return state;
  }
}

export default searchQueryReducer;