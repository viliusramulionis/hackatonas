import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

export const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [languages, setLanguages] = useState('');
  const [github, setGithub] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [format, setFormat] = useState('');
  const [slackUsername, setSlackUsername] = useState('');

  const { register } = useContext(AuthContext);

  const validateForm = () => {
    setPasswordError('');

    if (password !== confirmPassword) {
      setPasswordError('Passwords are not same');
      return false;
    }

    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters long');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      await register(name, email, password);
    }
  };

  return (
    <div className="auth-container">
      <div className="form-wrapper">
        <h2>Become A Tech Buddy</h2>

        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label htmlFor="name">What is your full name?</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">What is your email?</label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Choose your password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirm-password">Repeat your password:</label>
            <input
              type="password"
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            {passwordError && <p className="error-message">{passwordError}</p>}
          </div>

          <div className="form-group">
            <label>What languages do you work with?</label>
            <select
              value={languages}
              onChange={(e) => setLanguages(e.target.value)}
              required
            >
              <option value="python">Python</option>
              <option value="javascript">Javascript</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="github">What is your GitHub?</label>
            <input
              type="text"
              id="github"
              value={github}
              onChange={(e) => setGithub(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="linkedin">What is your LinkedIn?</label>
            <input
              type="text"
              id="linkedin"
              value={linkedin}
              onChange={(e) => setLinkedin(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Tell a bit about yourself:</label>
            <textarea
              id="description"
              rows={3}
              required
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="location">Where are you based?</label>
            <input
              type="text"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="format">How would you like to meet?</label>
            <select
              value={format}
              onChange={(e) => setFormat(e.target.value)}
              required
            >
              <option value="online">Online</option>
              <option value="inperson">In Person</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="slack">
              What is your slack username (if you have one)?
            </label>
            <input
              type="text"
              id="slack"
              value={slackUsername}
              onChange={(e) => setSlackUsername(e.target.value)}
            />
          </div>

          <button type="submit">Register</button>
        </form>

        <div className="link">
          Already have an account? <Link to="/login">Login here</Link>
        </div>
      </div>
    </div>
  );
};
