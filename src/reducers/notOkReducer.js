const notOkReducer = (state = false, action) => {
  switch(action.type) {
    case 'SET_IS_NOT_OK' :
      return action.notOk;
    default:
      return state;
  }
}

export default notOkReducer;