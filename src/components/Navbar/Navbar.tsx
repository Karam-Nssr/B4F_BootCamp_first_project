import { Link } from 'react-router';
import { my_albums_url, my_todos_url, posts_url, users_url } from '../../../core/end_points'
import { useUser } from '../../userContext';
import './Navbar.css'
const Navbar = () => {
    const {userIdClear} = useUser();
    const handleUsersClick = () => {
        userIdClear();
    };
  return (
    <>
    <nav>
        <div>
            <h1>App</h1>
        </div>
        <ul>
            
            <li>
                <Link to={`/${users_url}`} onClick={handleUsersClick}>Users</Link>
            </li>
            <li>
          <Link to={`/${posts_url}`}>Posts</Link>
        </li>
        <li>
          <Link to={`/${posts_url}/:id`}>My Posts</Link>
        </li>
        <li>
          <Link to={`/${my_todos_url}`}>My Todos</Link>
        </li>
        <li>
          <Link to={`/${my_albums_url}`}>My Albums</Link>
        </li>
        </ul>
    </nav>
    </>
  )
}

export default Navbar