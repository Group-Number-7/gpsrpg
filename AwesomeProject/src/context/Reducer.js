export default reducer = (state, action) => {
    switch (action.type) {
      case 'pos':
        return {
          ...state,
          pos: action.value
        };
      case 'logout':
        return {
          ...state,
          loggedIn: false
        }
      case 'login':
        return{
          ...state,
          loggedIn: true
        }
      default:
        return state;
    }
  };