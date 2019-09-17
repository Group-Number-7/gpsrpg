export default reducer = (state, action) => {
    switch (action.type) {
      case 'pos':
        return {
          ...state,
          pos: action.value
        };
      default:
        return state;
    }
  };