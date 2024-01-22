import { useEffect, useContext } from "react";
// import Spinner from "../layout/Spinner";
import UserItem from "./UserItem";
import GithubContext from "../../context/github/GithubContext";

function UserResults() {
  const { users  } = useContext(GithubContext);
  

  useEffect(() => {
    console.log('UserResults component rendered');
    console.log('Number of users:', users.length);
    
  }, [users]); //, loading

  

  

  // if (users.length === 0) {
  //   return <div>No users found.</div>;
  // }else  if (loading) {
  //   return <Spinner />;
  // }

  return (
    <div className='grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2'>
      {users.map((user) => (
        <UserItem key={user.id} user={user} />
      ))}
    </div>
  );
}

export default UserResults;
