import { useEffect, useState } from 'react';

import {
  base_url,
  posts_url,
  users_url
} from '../../../core/end_points';

import { getData } from '../../../core/http_methods';

import { useUser } from '../../userContext';

import { useNavigate } from 'react-router';

import './Users.css';

const Users = () => {

  const [users, setUsers] = useState([]);

  const { userIdProvider } = useUser();

  const navigate = useNavigate();

  useEffect(() => {

    const fetchUsers = async () => {

      try {

        const response = await getData(
          base_url + users_url
        );

        setUsers(response.data || response);

      } catch (error) {

        console.error("Error fetching users:", error);

      }

    };

    fetchUsers();

  }, []);

  const handleUserSelection = (id: number) => {

    userIdProvider(id);

    navigate(`/${posts_url}/${id}`);

  };

  return (

    <div className="users-container">

      <h1>Users</h1>

      <table className="users-table">

        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
          </tr>
        </thead>

        <tbody>

          {users.map((user) => (

            <tr
              key={user.id}
              onClick={() => handleUserSelection(user.id)}
            >

              <td>
                {user.id}
              </td>

              <td>
                {user.name}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );
};

export default Users;