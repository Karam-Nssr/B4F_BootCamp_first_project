import { Link } from 'react-router';
import {
  my_albums_url,
  my_todos_url,
  posts_url,
  users_url
} from '../../../core/end_points';

import { useUser } from '../../userContext';

import './Navbar.css';

const Navbar = () => {
  const { currentId, userIdClear } = useUser();

  const handleUsersClick = () => {
    userIdClear();
  };

  return (
    <nav className="navbar">

      <div className="navbar-logo">
        <Link to="/">
          App
        </Link>
      </div>

      <ul className="navbar-links">

        <li>
          <Link
            to={`/${users_url}`}
            onClick={handleUsersClick}
          >
            Users
          </Link>
        </li>

        <li>
          <Link to={`/${posts_url}`}>
            Posts
          </Link>
        </li>

        {currentId && (
          <>
            <li>
              <Link to={`/${posts_url}/${currentId}`}>
                My Posts
              </Link>
            </li>

            <li>
              <Link to={`/${my_todos_url}/${currentId}`}>
                My Todos
              </Link>
            </li>

            <li>
              <Link to={`/${my_albums_url}/${currentId}`}>
                My Albums
              </Link>
            </li>
          </>
        )}

      </ul>

    </nav>
  );
};

export default Navbar;