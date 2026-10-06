import { useEffect, useState } from 'react'
import { createContext } from 'react'
import { base_url, users_url, } from '../../../core/end_points';
import { getData } from '../../../core/http_methods';
const Users = () => {
    const UserContext = createContext();
    const [users, setUsers] = useState([]);
    
      useEffect(() => {
        const fetchUsers = async () => {
        try {
            const response = await getData(base_url + users_url);
            setUsers(response.data || response); 
          } catch (error) {
            console.error("Error fetching users:", error);
          }
        };
        fetchUsers();
        console.log(users);
      }, []);
  return (
    <>
      <ol>
        {users.map((user) => (
          <li key={user.id}><a href={`/users/${user.id}`}>{user.name}</a></li>
        ))}
      </ol>
    </>
  );
}

export default Users