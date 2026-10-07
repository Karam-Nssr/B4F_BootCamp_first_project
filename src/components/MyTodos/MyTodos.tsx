import React, { useEffect, useState } from 'react'
import { useUser } from '../../userContext';
import { base_url, my_todos_url} from '../../../core/end_points';
import { getData } from '../../../core/http_methods';
import Navbar from '../Navbar/Navbar';

const MyTodos = () => {
  const { currentId } = useUser();
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentId) return;

    const fetchUserTodos = async () => {
      try {
        setLoading(true);
        const response = await getData(`${base_url}${my_todos_url}?userId=${currentId}`);
        setTodos(response.data || response);
      } catch (error) {
        console.error("Error fetching user todos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserTodos();
  }, [currentId]);

  if (!currentId) return <h1>No user selected. Please go back and choose a user.</h1>;
  if (loading) return <h1>Loading todos...</h1>;

  return (
    <>
    <Navbar />
    <div>
      <h1>User {currentId}'s Todos</h1>
      {todos.length === 0 ? (
        <p>This user hasn't created any todos yet.</p>
      ) : (
        <ul>
          {todos.map((todo: any) => (
            <li key={todo.id}>
              <h3>{todo.title}</h3>
              <p>{todo.body}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
    </>
  )
}

export default MyTodos
