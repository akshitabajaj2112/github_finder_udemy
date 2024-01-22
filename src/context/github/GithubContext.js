import { createContext, useReducer } from 'react';
import githubReducer from './GithubReducer';
import { useSearchParams } from 'react-router-dom';

const GithubContext = createContext();

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const GithubProvider = ({ children }) => {
  const initialState = {
    users: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(githubReducer, initialState);

  // search users
  const searchUsers = async (text) => {
    setLoading();

    const params = new URLSearchParams({
      q: text,
    });

    const response = await fetch(`${GITHUB_URL}/search/users?${params}`, {
      method: 'GET',
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
        'User-Agent': 'github_finder_udemy',
        // Remove the Cache-Control header
      },
    });

    const { items } = await response.json();
    dispatch({
      type: 'GET_USERS',
      payload: items,
    });
  };

  // set loading
  const setLoading = () => dispatch({ type: 'SET_LOADING' });

  return (
    <GithubContext.Provider value={{
      users: state.users,
      loading: state.loading,
      searchUsers,
    }}>
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
