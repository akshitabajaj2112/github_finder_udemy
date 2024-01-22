import { createContext, useReducer } from 'react';
import githubReducer from './GithubReducer';
// import { useSearchParams } from 'react-router-dom';

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
    try {
      console.log('Searching for users...');
      setLoading(true);
  
      const params = new URLSearchParams({
        q: text,
      });
  
      try {
        const response = await fetch(`${GITHUB_URL}/search/users?${params}`, {
          method: 'GET',
          headers: {
            Authorization: `token ${GITHUB_TOKEN}`,
            'User-Agent': 'github_finder_udemy',
          },
        });
        // console.log('API URL:', `${GITHUB_URL}/search/users?${params}`);
  
        if (!response.ok) {
          const errorMessage = await response.text();
          throw new Error(`GitHub API error: ${response.status} - ${errorMessage}`);
        }
  
        const { items } = await response.json();
        console.log('Fetched users:', items);
  
        dispatch({
          type: 'GET_USERS',
          payload: items || [],
        });
      } catch (error) {
        console.error('Error fetching users:', error.message);
      } finally {
        console.log('Search complete.');
        setLoading(false); // Ensure loading is set to false even in case of an error
      }
    } catch (error) {
      console.error('Error initiating search:', error.message);
    }
  };
  
  
  //clear users from state 
  const clearUsers = () => dispatch({type: 'CLEAR_USERS'})

  // set loading
  const setLoading = (isLoading) => {
    console.log('Setting loading to:', isLoading);
    dispatch({ type: 'SET_LOADING', payload: isLoading });
  };

  return (
    <GithubContext.Provider value={{
      users: state.users,
      loading: state.loading,
      searchUsers,
      clearUsers
    }}>
      {children}
    </GithubContext.Provider>
  );
}

export default GithubContext;
