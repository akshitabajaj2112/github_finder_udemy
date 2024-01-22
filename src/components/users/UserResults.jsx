import { useEffect, useState } from "react";

function UserResults() {
const [users, setUsers] = useState([])
const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch("/users", {
        headers: {
          Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
          "User-Agent": "github_finder_udemy",
          "Cache-Control": "no-cache",
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
      setLoading(false)
  
    } catch (error) {
      console.error("Error fetching users:", error.message);
    }
  };
  
if(!loading){
    return (
        <div className='grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2'>
            {users.map((user) => (
              <h3> {user.login}  </h3>
            ))}
          </div>
      );
}else{
    return <h3>Loading...</h3>
}
  
}

export default UserResults;
