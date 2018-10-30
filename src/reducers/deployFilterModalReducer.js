export const deployFilterModalReducer = (state = false, action) => {
  switch(action.type) {
    case 'DEPLOY_FILTER_MODAL':
      return action.status;
    default:
      return state;
  }
}

export default deployFilterModalReducer;