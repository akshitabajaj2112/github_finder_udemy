// GithubReducer.js
const githubReducer = (state, action) => {
  switch (action.type) {
    case 'GET_USERS':
      return {
        ...state,
        users: action.payload,
        loading: false, // Set loading to false when the data is fetched
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: true, // Set loading to true when the search is initiated
      };
      case 'CLEAR_USERS':
        return{
          ...state,
          users :[],
        }
    default:
      return state;
  }
};

export default githubReducer;
