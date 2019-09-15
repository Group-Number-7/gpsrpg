export default reducer = (state, action) => {
    switch (action.type) {
      case 'test':
        return {
          ...state,
          test: "testing complete"
        };
      default:
        return state;
    }
  };