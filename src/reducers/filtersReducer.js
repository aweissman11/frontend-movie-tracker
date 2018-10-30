const defaultState = {
  genre: null,
  year: null,
  rating: null,
  sort: null
};

const filtersReducer = (state = defaultState, action) => {
  switch(action.type) {
    case 'UPDATE_FILTERS' :
      return action.filters;
    default:
      return state;
  }
}

export default filtersReducer;