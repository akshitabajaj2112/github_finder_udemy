import { createContext , useState} from 'react'


const GithubContext = createContext()

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;


export const GithubProvider = ({children}) =>{
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);


    const fetchUsers = async () => {
        try {
            const response = await fetch(`${GITHUB_URL}/users`, {
                method: 'GET',
                headers: {
                  Authorization: `token ${GITHUB_TOKEN}`,
                  'User-Agent': 'github_finder_udemy',
                  // Remove the Cache-Control header
                },
              
          });
    
          if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`GitHub API error: ${response.status} - ${errorMessage}`);
          }
    
          const contentType = response.headers.get("content-type");
          if (!contentType || !contentType.includes("application/json")) {
            console.error("Unexpected response format. Expected JSON but received:", await response.text());
            // Handle the unexpected response format accordingly
            return;
          }
    
          const data = await response.json();
          setUsers(data);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching users:", error.message);
        }
      };
    

      return <GithubContext.Provider value={{
        users, 
        loading,
        fetchUsers
      }}>
        {children}
      </GithubContext.Provider>


}

export default GithubContext