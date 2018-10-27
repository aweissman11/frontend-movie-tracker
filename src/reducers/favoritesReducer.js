const favoritesReducer = (state = [], action) => {
  switch(action.type) {
    case 'UPDATE_FAVORITES' :
      return action.favorites;
    default:
      return state;
  }
}

export default favoritesReducer;