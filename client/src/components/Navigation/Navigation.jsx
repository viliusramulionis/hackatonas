import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

export const Navigation = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);

  return (
    <nav className="navigation">
      <div className="navigation-container">
        <Link to="/" className="navigation-logo">
          <span>Tech Buddies</span>
        </Link>
        <ul>
          <li>
            <Link to="/">Homepage</Link>
          </li>

          {isAuthenticated ? (
            <>
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <button onClick={logout}>Logout</button>
              </li>
            </>
          ) : (
            <>
              <li className="login-item">
                <Link to="/login">Login</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};
