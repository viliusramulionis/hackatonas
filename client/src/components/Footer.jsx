import { Link } from 'react-router';

// This component allows users to filter members by programming language, 
// But this component is unfinished and not used in UI yet (searchParams need to be setup)

export const Footer = () => {
  return (
    <nav className="footer">
      <div className="column">
        <Link to="/" className="footer-logo">
          <span>Tech Buddies</span>
        </Link>
        <p>
          Become part of tech community. Get help, help other members and make
          friends in tech.
        </p>
      </div>
      <div className="footer-column">
        <ul>
          <li>
            <Link to="/?category=go" aria-label="Go category">
              <span>Go</span>
            </Link>
          </li>
          <li>
            <Link to="/?category=javascript" aria-label="Javascript category">
              <span>Python</span>
            </Link>
          </li>
          <li>
            <Link to="/?category=python" aria-label="Python category">
              <span>Python</span>
            </Link>
          </li>
          <li>
            <Link to="/?category=c++" aria-label="C++ category">
              <span>C++</span>
            </Link>
          </li>
        </ul>
      </div>
      <div className="footer-column">
        <ul>
          <li>
            <Link to="/?category=java" aria-label="Java category">
              <span>Java</span>
            </Link>
          </li>
          <li>
            <Link to="/?category=sql" aria-label="SQL category">
              <span>SQL</span>
            </Link>
          </li>
          <li>
            <Link to="/?category=ruby" aria-label="Ruby category">
              <span>Ruby</span>
            </Link>
          </li>
          <li>
            <Link to="/?category=all" aria-label="All categories">
              <span>All</span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};
