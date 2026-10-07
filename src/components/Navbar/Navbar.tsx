import { NavLink } from 'react-router';
import { my_albums_url, my_todos_url, posts_url, users_url } from '../../../core/end_points';
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
        <NavLink to="/" end> 
          App 
        </NavLink>
      </div>
      <ul className="navbar-links">
        <li>
          <NavLink to={`/${users_url}`} onClick={handleUsersClick}>
            Users
          </NavLink>
        </li>
        <li>
          <NavLink to={`/${posts_url}`} end> 
            Posts 
          </NavLink>
        </li>
        {currentId && (
          <>
            <li>
              <NavLink to={`/${posts_url}/${currentId}`}> 
                My Posts 
              </NavLink>
            </li>
            <li>
              <NavLink to={`/${my_todos_url}/${currentId}`}> 
                My Todos 
              </NavLink>
            </li>
            <li>
              <NavLink to={`/${my_albums_url}/${currentId}`}> 
                My Albums 
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
