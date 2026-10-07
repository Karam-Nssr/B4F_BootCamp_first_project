import { useEffect, useState } from 'react'
import { base_url, my_posts_url, users_url, } from '../../../core/end_points';
import { getData } from '../../../core/http_methods';
import { useUser } from '../../userContext';
import { useNavigate } from 'react-router'; 

const Users = () => {
  const [users, setUsers] = useState([]);
  const { userIdProvider } = useUser(); 
  const navigate = useNavigate();

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
  }, []);

  const handleUserSelection = (id: number) => {
    userIdProvider(id); 
    navigate(`/${my_posts_url}`); 
  };

  return (
    <>
      <ol>
        {users.map((user) => (   
          <li 
            key={user.id} 
            onClick={() => handleUserSelection(user.id)}
            style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}
          >
            {user.name}
          </li>
        ))}
      </ol>
    </>
  );
}

export default Users;
